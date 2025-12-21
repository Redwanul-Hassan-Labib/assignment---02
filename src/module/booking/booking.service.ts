import { pool } from "../../config/db";

const postBookingService = async (payload: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  
  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    throw new Error("rent_end_date must be after rent_start_date");
  }


  const vehicleResult = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const dailyPrice = Number(vehicleResult.rows[0].daily_rent_price);

  
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = days * dailyPrice;

  const result = await pool.query(
    `INSERT INTO bookings 
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  return result;
};



const getBookingService = async () => {
  const result = await pool.query(`SELECT * FROM bookings JOIN vehicles USING(id)`);

  return result;
};

const putBookingService = async (Payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, id } = Payload;

 
  if (new Date(rent_end_date as string) <= new Date(rent_start_date as string)) {
    throw new Error("rent_end_date must be after rent_start_date");
  }

 
  const vehicleResult = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const dailyPrice = Number(vehicleResult.rows[0].daily_rent_price);


  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const totalPrice = days * dailyPrice;


  const result = await pool.query(
    `
    UPDATE bookings 
    SET  
      customer_id = $1, 
      vehicle_id = $2, 
      rent_start_date = $3, 
      rent_end_date = $4, 
      total_price = $5 
    WHERE id = $6 
    RETURNING *
  `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, id]
  );

  return result;
};



export const bookingService = {
  getBookingService,
  postBookingService,
  putBookingService,
};

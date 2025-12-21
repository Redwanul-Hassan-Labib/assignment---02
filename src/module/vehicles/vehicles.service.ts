import { pool } from "../../config/db";


const postVehicleService = async (Payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = Payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getVehicleService = async () => {

  const result = await pool.query(
    `SELECT * FROM vehicles JOIN bookings USING(id)`,
    
  );

  return result;
};

const singleGetVehiclesService = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM vehicles JOIN bookings USING(id) WHERE id = $1 `,
    [id]
  );
  return result;
};



const putVehiclesService = async (Payload: Record<string, unknown>)=>{

  const {vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id} = Payload
  const result = await pool.query(`
    UPDATE vehicles SET  vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, 
  [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id
    ]);
    return result;
}

const deleteVehicleService = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id = $1 RETURNING *`,
    [id]
  );

  return result;
};

export const vehicleService = {
  postVehicleService,
  getVehicleService,
  singleGetVehiclesService,
  putVehiclesService,
  deleteVehicleService
};

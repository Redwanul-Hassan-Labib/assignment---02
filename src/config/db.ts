import { Pool } from "pg";
import config from "./env_config";

export const pool = new Pool({
  connectionString: `${config.connect_str}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE  TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15),
        role VARCHAR(50) NOT NULL
        )
        `);
  await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number TEXT UNIQUE NOT NULL,
            daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
            availability_status TEXT NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )
            `);

  await pool.query(`
                CREATE TABLE IF NOT EXISTS bookings(
                id SERIAL PRIMARY KEY,
                customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
                total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
                status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')),
                created_at TIMESTAMP DEFAULT NOW()
                )
                `);
};

export default initDB;

import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/env_config";

const signupUserService = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { name, email, password, role } = payload;

  const checkUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (checkUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

 
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role)
   VALUES($1, $2, $3, $4)
   RETURNING id, name, email, role`,
    [name, email, hashedPassword, role]
  );

  return result;
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1 `, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const token = jwt.sign(
    { user: user.name, email: user.email, role: user.role },
    config.secrete as string,
    {
      expiresIn: "7d",
    }
  );

  console.log({ token });

  return { token, user };
};

export const authUserService = {
  signupUserService,
  loginUser,
};

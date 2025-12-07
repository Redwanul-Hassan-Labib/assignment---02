import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const postUserService = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashed = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashed, phone, role]
  );
  return result;
};

const getUserService = async ()=>{
    const result = await pool.query(`SELECT * FROM users `)

    return result;
};
const putUserService = async (Payload: Record<string, unknown>)=>{

  const {name, email, password, phone, role, id} = Payload
  const result = await pool.query(`
    UPDATE users SET  name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`, 
  [
      name, email, password, phone, role, id
    ]);
    return result;
}

const deleteUserService = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );

  return result;
};

export const userService = {
  postUserService,
  getUserService,
  deleteUserService,
  putUserService,
};

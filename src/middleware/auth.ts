import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/env_config";
import { pool } from "../config/db";

const loginAuth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided"
        });
      }

      const token = authHeader.split(" ")[1]; 
      const decoded = jwt.verify(token as string, config.secrete as string) as JwtPayload;
     

      const userResult = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      

      
      req.user = {
        id: userResult.rows[0].id,
        email: userResult.rows[0].email,
        role: userResult.rows[0].role
      };


      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Forbidden: You don't have permission" });
      }

      next();

    } catch (err: any) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};

export default loginAuth;





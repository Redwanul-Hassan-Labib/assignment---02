import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import config from "./config/env_config";
import { userRoutes } from "./module/users/user.routes";
import { vehiclesRoutes } from "./module/vehicles/vehicles.routes";
import { bookingRoutes } from "./module/booking/booking.routes";
import { userAuth } from "./module/auth/auth.routes";



const app = express();


app.use(express.json());



initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello this Redwan Labib");
});

app.use("/api/v1/users", userRoutes)

app.use("/api/v1/vehicles", vehiclesRoutes)

app.use("/api/v1/bookings", bookingRoutes)

app.use("/api/v1/auth", userAuth)


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});


export default app


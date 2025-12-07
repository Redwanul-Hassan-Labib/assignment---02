import { Router } from "express";
import { bookingController } from "./booking.controller";
import loginAuth from "../../middleware/auth";


const routes = Router()

routes.post("/" , loginAuth("admin" , "customer"),  bookingController.postBookingController)
routes.get("/" , bookingController.getBookingController)
routes.put("/:bookingId" , bookingController.putBookingController)

export const bookingRoutes = routes
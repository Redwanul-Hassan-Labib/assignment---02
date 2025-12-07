import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { userAuth } from "../auth/auth.routes";


export const postBookingController = async (req: Request, res: Response) => {
    //  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
  try {
    const result = await bookingService.postBookingService(req.body );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};





const getBookingController = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBookingService() ;
    res.status(201).json({
      success: true,
      message: "Booking Instered Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const putBookingController = async (req: Request, res: Response) => {
 
  try {
    const result = await bookingService.putBookingService( {
      ...req.body,
      id: req.params.id,
    }
     
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
    getBookingController,
    postBookingController,
    putBookingController
}
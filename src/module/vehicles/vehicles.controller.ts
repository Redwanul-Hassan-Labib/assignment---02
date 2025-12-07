import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const postVehicleController = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.postVehicleService(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicles Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicleController = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicleService();
    res.status(201).json({
      success: true,
      message: "Vehicles Instered Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const singleGetVehicleController = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.singleGetVehiclesService(
      req.params.id!
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle fetched successfully",
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


const putVehiclesController = async (req: Request, res: Response) => {
 
  try {
    const result = await vehicleService.putVehiclesService( {
      ...req.body,
      id: req.params.id,
    }
     
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicles updated successfully",
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

const deleteVehicleController = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteVehicleService(req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicles deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const vehiclesController = {
  postVehicleController,
  getVehicleController,
  singleGetVehicleController,
  putVehiclesController,
  deleteVehicleController
};

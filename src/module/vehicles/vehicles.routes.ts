import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { userAuth } from "../auth/auth.routes";
import loginAuth from "../../middleware/auth";


const routes = Router()

routes.post("/", loginAuth("admin"), vehiclesController.postVehicleController)
routes.get("/", vehiclesController.getVehicleController)
routes.get("/:vehicleId", vehiclesController.singleGetVehicleController)
routes.put("/:vehicleId",loginAuth("admin"), vehiclesController.putVehiclesController)
routes.delete("/:vehicleId",loginAuth("admin"), vehiclesController.deleteVehicleController)


export const vehiclesRoutes = routes
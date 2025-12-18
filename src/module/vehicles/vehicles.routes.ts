import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import loginAuth from "../../middleware/auth";


const routes = Router()

routes.post("/", loginAuth("admin", "customer"), vehiclesController.postVehicleController)
routes.get("/", vehiclesController.getVehicleController)
routes.get("/:id", vehiclesController.singleGetVehicleController)
routes.put("/:id",loginAuth("admin"), vehiclesController.putVehiclesController)
routes.delete("/:id",loginAuth("admin"), vehiclesController.deleteVehicleController)


export const vehiclesRoutes = routes
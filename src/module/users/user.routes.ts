import { Router } from "express";
import { userController } from "./user.controller";
import loginAuth from "../../middleware/auth";


const routes = Router()

routes.post("/", userController.postUserController);

routes.get("/", loginAuth("admin"),  userController.getUserController);
routes.put("/:userId" , loginAuth("admin"),  userController.putUserController)
routes.delete("/:userId",loginAuth("admin"),  userController.deleteUserController);


export const userRoutes = routes;
import { Router } from "express";
import { authUserController} from "./auth.controller";



const authRoutes = Router()



authRoutes.post("/signin", authUserController.loginUser);
authRoutes.post("/signup", authUserController.signupUserController)



export const userAuth = authRoutes;
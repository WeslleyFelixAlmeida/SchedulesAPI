import { Router } from "express";
import userController from "../controllers/userController";
import { userValidateRegister, userValidateLogin } from "../middlewares/userMiddlewares";

const userRoutes = Router();

userRoutes.post("/create", userValidateRegister, userController.createUser.bind(userController));
userRoutes.post("/login", userValidateLogin, userController.login.bind(userController));


export default userRoutes;

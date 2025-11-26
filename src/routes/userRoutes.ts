import { Router } from "express";
import userController from "../controllers/userController";
import { userValidate } from "../middlewares/userMiddlewares";

const userRoutes = Router();

userRoutes.post("/create", userValidate, userController.createUser.bind(userController));

export default userRoutes;

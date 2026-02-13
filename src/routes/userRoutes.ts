import { Router } from "express";
import userController from "../controllers/userController";
import {
  userValidateRegister,
  userValidateLogin,
  authMiddleware,
  validateUpdateUsername,
} from "../middlewares/userMiddlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  userValidateRegister,
  userController.createUser.bind(userController)
);

userRoutes.post(
  "/login",
  userValidateLogin,
  userController.login.bind(userController)
);

userRoutes.post("/logout", userController.logout.bind(userController));

userRoutes.get(
  "/isAuth",
  authMiddleware,
  userController.isAuth.bind(userController)
);

userRoutes.get(
  "/",
  authMiddleware,
  userController.getUserInfo.bind(userController)
);

userRoutes.patch(
  "/update/username",
  authMiddleware,
  validateUpdateUsername,
  userController.updateUsername.bind(userController)
);


export default userRoutes;

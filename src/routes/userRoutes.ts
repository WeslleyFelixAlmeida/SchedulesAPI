import { Router } from "express";
import userController from "../controllers/userController";
import {
  userValidateRegister,
  userValidateLogin,
  authMiddleware,
  validateUpdateUsername,
  validateUpdateProfileImage,
  userValidateChangePassword,
} from "../middlewares/userMiddlewares";
import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

const userRoutes = Router();

userRoutes.post(
  "/register",
  userValidateRegister,
  userController.createUser.bind(userController),
);

userRoutes.post(
  "/login",
  userValidateLogin,
  userController.login.bind(userController),
);

userRoutes.post("/logout", userController.logout.bind(userController));

userRoutes.get(
  "/isAuth",
  authMiddleware,
  userController.isAuth.bind(userController),
);

userRoutes.get(
  "/",
  authMiddleware,
  userController.getUserInfo.bind(userController),
);

userRoutes.patch(
  "/update/username",
  authMiddleware,
  validateUpdateUsername,
  userController.updateUsername.bind(userController),
);

userRoutes.patch(
  "/update/profileImage",
  authMiddleware,
  upload.single("profileImage"),
  validateUpdateProfileImage,
  userController.updateProfileImage.bind(userController),
);

userRoutes.delete(
  "/deleteAcc",
  authMiddleware,
  userController.deleteAcc.bind(userController),
);

userRoutes.delete(
  "/changePassword",
  authMiddleware,
  userValidateChangePassword,
  userController.changePassword.bind(userController),
);

export default userRoutes;

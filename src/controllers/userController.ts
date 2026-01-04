import { UserService } from "../services/userService";
import { Response, Request } from "express";
import { UserLoginType, UserRegisterType } from "../types/userTypes";
import { InvalidCredentialsException } from "../Exceptions/Exceptions";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    const { username, email, password }: UserRegisterType = req.body;

    try {
      const createUser = await this.userService.createUser({
        username: username,
        email: email,
        password: password,
      });

      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json("Erro interno no servidor." + err);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password }: UserLoginType = req.body;

    try {
      const login = await this.userService.login({
        email: email,
        password: password,
      });

      res.cookie("auth_token", login.auth_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 1000,
      });

      res.status(200).json({ success: true });
    } catch (err: any) {
      if (err instanceof InvalidCredentialsException) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      res.status(500).json({ message: "Erro interno no servidor. " + err });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(200).json({ message: "Logout realizado com sucesso." });
    } catch (err: any) {
      res.status(500).json("Erro interno no servidor");
    }
  }

  async getUserInfo(req: Request, res: Response) {
    const userId = req.user?.id as number;
    try {
      const userData = await this.userService.getUserData({ userId: userId });

      res.status(200).json({ userData: userData });
    } catch (err: any) {
      res.status(500).json("Erro interno no servidor");
    }
  }

  async isAuth(req: Request, res: Response) {
    res.status(200).json({ allowed: true });
  }
}
const userController = new UserController();

export default userController;

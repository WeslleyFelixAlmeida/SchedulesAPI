import { UserService } from "../services/userService";
import { Response, Request } from "express";
import { UserLoginType, UserRegisterType } from "../types/types";
import jwt from "jsonwebtoken";
import { InvalidCredentialsException } from "../Exceptions/Exceptions";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    console.log("Entrou no controller");

    const { username, email, password }: UserRegisterType = req.body;

    try {
      const createUser = await this.userService.createUser({
        username: username,
        email: email,
        password: password,
      });

      res.status(201).json({ message: "usuário criado com sucesso!" });
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

      res.status(200).json({ success: true });
    } catch (err: any) {
      if (err instanceof InvalidCredentialsException) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      res.status(500).json({ message: "Erro interno no servidor. " + err });
    }
  }
}
const userController = new UserController();

export default userController;

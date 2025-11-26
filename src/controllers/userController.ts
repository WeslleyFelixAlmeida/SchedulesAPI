import { UserService } from "../services/userService";
import { Response, Request } from "express";
import { UserRegisterType } from "../types/types";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    console.log("Entrou no controller");

    const {username, email, password}: UserRegisterType = req.body;

    try {
      const createUser = await this.userService.createUser({username: username, email: email, password: password});

      res.status(201).json({ message: "usuário criado com sucesso!" });
    } catch (err) {
      res.status(500).json("Erro interno no servidor." + err);
    }
  }
}
const userController = new UserController();

export default userController;

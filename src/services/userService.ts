import { UserModel } from "../models/userModel";
import type { UserRegisterType } from "../types/types";

class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async createUser(data: UserRegisterType) {
    console.log("Entrou no service");

    return await this.userModel.createUser(data);
  }
}

export { UserService };

import { UserModel } from "../models/userModel";
import type { UserLoginType, UserRegisterType, UserType } from "../types/types";
import bcrypt from "bcrypt";
import { InvalidCredentialsException } from "../Exceptions/Exceptions";

class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  private readonly falseHash: string =
    "$2b$10$rHqQjGZ0aKx4vXM7L8b5e.8N3wJ2P1dR6fT9mK4sA7nY5cB0uV8hW";

  async createPasswordHash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(data: UserRegisterType) {
    const passwordHash = await this.createPasswordHash(data.password);

    return await this.userModel.createUser({ ...data, password: passwordHash });
  }

  async login(data: UserLoginType) {
    const userData = await this.userModel.getUserByEmail({
      email: data.email,
    });

    const passwordToCompare = userData?.password || this.falseHash;

    const isPasswordValid = await bcrypt.compare(
      data.password,
      passwordToCompare
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return userData;
  }
}

export { UserService };

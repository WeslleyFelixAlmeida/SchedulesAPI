import { UserModel } from "../models/userModel";
import type {
  UserLoginType,
  UserRegisterType,
  UserType,
} from "../types/userTypes";
import bcrypt from "bcrypt";
import { InvalidCredentialsException } from "../Exceptions/Exceptions";
import jwt from "jsonwebtoken";

class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  private readonly falseHash: string =
    "$2b$10$rHqQjGZ0aKx4vXM7L8b5e.8N3wJ2P1dR6fT9mK4sA7nY5cB0uV8hW";

  private async createPasswordHash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async generateToken(payload: object) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "30m",
    });

    return token;
  }

  async createUser(data: UserRegisterType) {
    const passwordHash = await this.createPasswordHash(data.password);
    const additionalInfos = { password: passwordHash };

    return await this.userModel.createUser({ ...data, ...additionalInfos });
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

    const createJWT = await this.generateToken({
      id: userData?.id,
      role: userData?.role,
    });

    return { auth_token: createJWT };
  }

  async getUserData(data: { userId: number }) {
    const userdata = await this.userModel.getUserData(data.userId);

    return userdata;
  }
}

export { UserService };

import prisma from "../Connection/prismaClient";
import type { UserRegisterType } from "../types/types";

class UserModel {
  async createUser(data: UserRegisterType) {
    console.log("Entrou no model");

    try {
      const newUser = await prisma.user.create({
        data: data,
      });
      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { UserModel };

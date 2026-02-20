import prisma from "../Connection/prismaClient";
import type { UserType, UserRegisterType } from "../types/userTypes";

class UserModel {
  async createUser(data: UserRegisterType) {
    try {
      const newUser = await prisma.user.create({
        data: data,
      });

      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserByEmail(data: UserType) {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      return userData;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserData(userId: number) {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          username: true,
          profileImage: true,
          imageType: true,
        },
      });
      return userData;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUsername(data: { username: string; userId: number }) {
    try {
      const update = await prisma.user.update({
        where: { id: data.userId },
        data: { username: data.username },
      });

      return update.username;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateProfileImage(data: {
    profileImage: Buffer;
    imageType: string;
    userId: number;
  }) {
    try {
      const update = await prisma.user.update({
        where: { id: data.userId },
        data: {
          profileImage: new Uint8Array(data.profileImage),
          imageType: data.imageType,
        },
      });

      return update.username;
    } catch (error) {
      throw error;
    }
  }
}

export { UserModel };

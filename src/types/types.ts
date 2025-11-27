import { z } from "zod";
import { userSchemaRegister } from "../Schemas/Schemas";

export type UserRegisterType = Omit<
  z.infer<typeof userSchemaRegister>,
  "confirmPassword"
>;

export type UserType = Pick<
  z.infer<typeof userSchemaRegister>,
  "email"
>;


export type UserLoginType = Pick<
  z.infer<typeof userSchemaRegister>,
  "email" | "password"
>;
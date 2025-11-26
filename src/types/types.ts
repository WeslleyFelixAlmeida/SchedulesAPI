import { z } from "zod";
import { userSchemaRegister } from "../Schemas/Schemas";

export type UserRegisterType = Omit<
  z.infer<typeof userSchemaRegister>,
  "confirmPassword"
>;

import { email, string, z } from "zod";

const registerMessages = {
  invalidEmail: "E-mail inválido",
  usernameLowerThan5: "O campo de username precisa ter no mínimo 5 caracteres",
  passwordLowerThan5: "O campo de senha precisa ter no mínimo 5 caracteres",
  passwordDifferent: "A senha e a confirmação de senha precisam ser iguais",
};

const userSchemaRegister = z
  .object({
    email: z.email({ message: registerMessages.invalidEmail }),
    username: z
      .string()
      .min(5, { message: registerMessages.usernameLowerThan5 }),
    password: z
      .string()
      .min(5, { message: registerMessages.passwordLowerThan5 }),
    confirmPassword: z
      .string()
      .min(5, { message: "Confirmação deve ter no mínimo 5 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: registerMessages.passwordDifferent,
    path: ["confirmPassword"],
  });

const userSchemaLogin = z.object({
  email: z.email({ message: registerMessages.invalidEmail }),
  password: z.string().min(5, { message: registerMessages.passwordLowerThan5 }),
});

export { userSchemaRegister, userSchemaLogin };

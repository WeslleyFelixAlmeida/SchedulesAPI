import { email, string, z } from "zod";
import multer from "multer";

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

const updateUsername = z.object({
  username: z.string().min(5, { message: registerMessages.usernameLowerThan5 }),
});

const updateProfileImage = z.object({
  profileImage: z
    .custom<Express.Multer.File>()
    .refine((file) => !!file, "Arquivo é obrigatório")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype),
      "Formato de imagem inválido",
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Imagem deve ter no máximo 2MB",
    ),
});

const changePassword = z.object({
  oldPassword: z.string().min(5).max(225),
  newPassword: z.string().min(5).max(225),
});

export {
  userSchemaRegister,
  userSchemaLogin,
  updateUsername,
  updateProfileImage,
  changePassword,
};

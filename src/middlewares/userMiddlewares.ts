import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { userSchemaLogin, userSchemaRegister } from "../Schemas/Schemas";
import jwt from "jsonwebtoken";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const auth_token = req.cookies?.auth_token;
    if (!auth_token) {
      return res.status(401).json({ message: "Acesso negado!" });
    }

    const decodeCookie = jwt.verify(auth_token, process.env.JWT_SECRET!);

    next();
  } catch (err: any) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
      error: err.message,
    });
  }
}

async function userValidateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    userSchemaRegister.parse(req.body);
    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json("Erro interno no servidor");
    }
  }
}

async function userValidateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    userSchemaLogin.parse(req.body);
    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json("Erro interno no servidor");
    }
  }
}
export { authMiddleware, userValidateRegister, userValidateLogin };

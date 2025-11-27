import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { userSchemaLogin, userSchemaRegister } from "../Schemas/Schemas";

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {}

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

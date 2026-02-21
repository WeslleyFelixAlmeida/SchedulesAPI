import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import {
  changePassword,
  updateProfileImage,
  updateUsername,
  userSchemaLogin,
  userSchemaRegister,
} from "../Schemas/userSchemas";
import jwt, { JwtPayload } from "jsonwebtoken";

interface authTokenPayload extends JwtPayload {
  id: number;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const auth_token = req.cookies?.auth_token;

    if (!auth_token) {
      return res
        .status(401)
        .json({ message: "Acesso negado!", allowed: false });
    }

    const decodeCookie = jwt.verify(
      auth_token,
      process.env.JWT_SECRET!,
    ) as authTokenPayload;

    req.user = { id: decodeCookie.id };

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
  next: NextFunction,
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
  next: NextFunction,
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

async function validateUpdateUsername(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    updateUsername.parse(req.body);
    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json("Erro interno no servidor");
    }
  }
}

async function validateUpdateProfileImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    updateProfileImage.parse({ profileImage: req.file });
    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json("Erro interno no servidor");
    }
  }
}

async function userValidateChangePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log(req.body)
    const teste = changePassword.parse(req.body);

    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json("Erro interno no servidor");
    }
  }
}
export {
  authMiddleware,
  userValidateRegister,
  userValidateLogin,
  validateUpdateUsername,
  validateUpdateProfileImage,
  userValidateChangePassword,
};

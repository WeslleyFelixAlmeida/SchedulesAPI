import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

async function eventIdValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const { id } = paramsSchema.parse(req.params);

    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Identificador inválido" });
    }
    return res.status(500).json({ error: "Houve um erro no servidor." });
  }
}

export { eventIdValidation };

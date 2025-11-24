import { Router } from "express";
import { Request, Response } from "express";

const userRoutes = Router();

userRoutes.get("/users", (req: Request, res: Response) => {
  const users = [
    {
      username: "teste",
      email: "teste@example.com",
      password: "123456",
    },
    {
      username: "maria_silva",
      email: "maria.silva@example.com",
      password: "senha_segura",
    },
    {
      username: "joao_souza",
      email: "joao.souza@example.com",
      password: "abc123",
    },
    {
      username: "ana_lima",
      email: "ana.lima@example.com",
      password: "minhaSenha2024",
    },
    {
      username: "carlos_oliveira",
      email: "carlos.oliveira@example.com",
      password: "pass1234",
    },
  ];

  res.json({ data: users });
});

export default userRoutes;

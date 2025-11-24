import express from "express";
import { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use("/user", userRoutes);

server.listen(PORT, () => {
  console.log("Servidor ligado!");
});

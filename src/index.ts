import express from "express";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

server.use("/user", userRoutes);
server.use("/event", eventRoutes);

server.listen(PORT, () => {
  console.log("Servidor ligado!");
});

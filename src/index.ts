import express from "express";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";

const server = express();
const PORT = 3000;

server.use(express.json());

server.use("/user", userRoutes);
server.use("/event", eventRoutes);

server.listen(PORT, () => {
  console.log("Servidor ligado!");
});

import { Router } from "express";
import eventController from "../controllers/eventController";
import { authMiddleware } from "../middlewares/userMiddlewares";

const eventRoutes = Router();

eventRoutes.post(
  "/create/unique",
  // authMiddleware,
  eventController.createEventUniqueSchedule.bind(eventController)
);

eventRoutes.post(
  "/create/multiple",
  // authMiddleware,
  eventController.createEventMultipleSchedule.bind(eventController)
);

eventRoutes.get(
  "/",
  // authMiddleware,
  eventController.getEvents.bind(eventController)
);


export default eventRoutes;

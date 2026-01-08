import { Router } from "express";
import eventController from "../controllers/eventController";
import { authMiddleware } from "../middlewares/userMiddlewares";
import { eventIdValidation } from "../middlewares/eventMiddlewares";

const eventRoutes = Router();

eventRoutes.post(
  "/create/unique",
  authMiddleware,
  eventController.createEventUniqueSchedule.bind(eventController)
);

eventRoutes.post(
  "/create/multiple",
  authMiddleware,
  eventController.createEventMultipleSchedule.bind(eventController)
);

eventRoutes.get(
  "/",
  authMiddleware,
  eventController.getEvents.bind(eventController)
);

eventRoutes.get(
  "/:id",
  authMiddleware,
  eventIdValidation,
  eventController.getEventsById.bind(eventController)
);

export default eventRoutes;

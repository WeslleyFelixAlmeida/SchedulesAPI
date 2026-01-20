import { Router } from "express";
import eventController from "../controllers/eventController";
import { authMiddleware } from "../middlewares/userMiddlewares";
import {
  eventIdValidation,
  eventDayValidation,
} from "../middlewares/eventMiddlewares";

const eventRoutes = Router();

eventRoutes.post(
  "/create/unique",
  authMiddleware,
  eventController.createEventUniqueSchedule.bind(eventController),
);

eventRoutes.post(
  "/create/multiple",
  authMiddleware,
  eventController.createEventMultipleSchedule.bind(eventController),
);

eventRoutes.get(
  "/",
  authMiddleware,
  eventController.getEvents.bind(eventController),
);

eventRoutes.get(
  "/eventData/:id",
  authMiddleware,
  eventIdValidation,
  eventController.getEventsById.bind(eventController),
);

eventRoutes.get(
  "/userEvents",
  authMiddleware,
  eventController.getUserEvents.bind(eventController),
);

eventRoutes.get(
  "/personal/unique/:id",
  authMiddleware,
  eventIdValidation,
  eventController.getEventSchedules.bind(eventController),
);

eventRoutes.get(
  "/personal/multiple/:id",
  authMiddleware,
  eventIdValidation,
  eventDayValidation,
  eventController.getEventSchedulesMultiple.bind(eventController),
);

eventRoutes.get(
  "/personal/multiple/days/:id",
  authMiddleware,
  eventIdValidation,
  eventController.getMultipleSchedulesDays.bind(eventController),
);

export default eventRoutes;

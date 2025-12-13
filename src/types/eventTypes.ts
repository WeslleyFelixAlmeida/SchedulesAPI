import { z } from "zod";
import {
  multipleScheduleSchema,
  uniqueScheduleSchema,
} from "../Schemas/eventSchemas";
import {
  Events,
  EventMultipleSchedules,
  EventUniqueSchedules,
} from "@prisma/client";

//Uniqueschedule:
export type eventUniqueType = z.infer<typeof uniqueScheduleSchema>;
export type eventModelType = Omit<Events, "id">;
export type eventUniqueSchedulesType = Omit<EventUniqueSchedules, "id">;

//Multipleschedule:
export type multipleSchedulesType = z.infer<typeof multipleScheduleSchema>;

export type schedulesMultipleType = eventModelType;

export type createMultipleSchedModelType = Omit<
  schedulesMultipleType,
  "days" | "id"
>;

export type schedulesArrayType = Omit<
  EventMultipleSchedules,
  "id" | "userId" | "occupied"
>;

import { z } from "zod";
import { multipleScheduleSchema } from "../Schemas/eventSchemas";
import { Events, EventMultipleSchedules } from "@prisma/client";

export type multipleSchedulesType = z.infer<typeof multipleScheduleSchema>;

export type schedulesMultipleType = Events;
// {
//   days: { day: number; schedules: string[] }[];
//   month: number;
//   year: number;
//   image: string;
//   name: string;
//   shortDescription: string;
//   longDescription: string;
//   type: "multiple";
//   userId: number;
// };

export type createMultipleSchedModelType = Omit<
  schedulesMultipleType,
  "days" | "id"
>;

export type schedulesArrayType = Omit<
  EventMultipleSchedules,
  "id" | "userId" | "occupied"
>;

export type uniqueSchedulesType = {
  day: number;
  maxAmount: number;
  month: number;
  image: Blob;
  name: string;
  shortDescription: string;
  longDescription: string;
};

import { z } from "zod";
import { multipleScheduleSchema } from "../Schemas/eventSchemas";

export type multipleSchedulesType = z.infer<typeof multipleScheduleSchema>;

export type uniqueSchedulesType = {
  day: number;
  maxAmount: number;
  month: number;
  image: Blob;
  name: string;
  shortDescription: string;
  longDescription: string;
};

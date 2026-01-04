import { EventUniqueSchedules } from "@prisma/client";
import prisma from "../Connection/prismaClient";

import type {
  createMultipleSchedModelType,
  eventModelType,
  eventUniqueSchedulesType,
  multipleSchedulesType,
} from "../types/eventTypes";

class EventModel {
  async createEventMultipleSchedule(eventData: createMultipleSchedModelType) {
    try {
      const create = await prisma.events.create({
        data: eventData,
      });
      return create.id;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createSchedulesMultiple(
    schedules: Pick<multipleSchedulesType, "days">,
    eventId: number
  ) {
    // Inserindo os dias
    try {
      await prisma.eventMultipleSchedules.createMany({
        data: schedules.days.flatMap((day) =>
          day.schedules.map((schedule) => ({
            eventId: eventId,
            day: day.day,
            schedule: schedule,
          }))
        ),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createEventUniqueSchedule(eventData: eventModelType) {
    try {
      const create = await prisma.events.create({
        data: eventData,
      });
      return create.id;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createSchedulesUnique(eventsArray: eventUniqueSchedulesType[]) {
    // Inserindo os dias
    try {
      const create = await prisma.eventUniqueSchedules.createMany({
        data: eventsArray,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getEvents(){
    try {
      const events = await prisma.events.findMany({take: 10});
      return events;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getMultipleSchedules(){

  }
  async getUniqueSchedules(){

  }
}

export { EventModel };

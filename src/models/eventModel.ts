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
    eventId: number,
  ) {
    // Inserindo os dias
    try {
      await prisma.eventMultipleSchedules.createMany({
        data: schedules.days.flatMap((day) =>
          day.schedules.map((schedule) => ({
            eventId: eventId,
            day: day.day,
            schedule: schedule,
          })),
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

  async getEventById(eventId: number) {
    try {
      const events = await prisma.events.findUnique({
        where: { id: eventId },
        select: {
          id: true,
          month: true,
          year: true,
          image: true,
          name: true,
          shortDescription: true,
          longDescription: true,
          type: true,
          imageType: true,
          status: true,
        },
      });
      return events;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getEvents() {
    try {
      const events = await prisma.events.findMany({
        take: 10,
        select: {
          id: true,
          month: true,
          year: true,
          image: true,
          name: true,
          shortDescription: true,
          longDescription: true,
          type: true,
          imageType: true,
          status: true,
        },
      });
      return events;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getMaxAndCurrentAmountUnique(eventId: number) {
    try {
      const maxAmount = await prisma.eventUniqueSchedules.count({
        where: { eventId: eventId },
      });

      const eventData = await prisma.eventUniqueSchedules.findMany({
        where: { eventId: eventId },
      });

      let currentAmount = 0;

      const count = eventData.forEach((event) => {
        if (event.userId !== null) {
          currentAmount += 1;
        }
      });

      return { maxAmount: maxAmount, currentAmount: currentAmount };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async isParticipatingUnique(userId: number, eventId: number) {
    try {
      const isParticipating = await prisma.eventUniqueSchedules.count({
        where: { userId: userId, eventId: eventId },
      });
      return isParticipating > 0 ? true : false;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUniqueSchedules(eventId: number) {
    try {
      const eventData = await prisma.eventUniqueSchedules.findMany({
        where: { eventId: eventId },
        select: {
          id: true,
          date: true,
          schedule: true,
          eventId: true,
          userId: true,
        },
      });

      return eventData;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserEvents(userId: number) {
    try {
      const eventData = await prisma.events.findMany({
        where: { userId: userId },
        take: 10,
        select: {
          id: true,
          month: true,
          year: true,
          image: true,
          name: true,
          shortDescription: true,
          longDescription: true,
          type: true,
          imageType: true,
          status: true,
        },
      });

      return eventData;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getMultipleSchedules(eventId: number, day: number) {
    //Cuidado ao puxar as informações deste tipo de evento, pois um unico evento pode ter centenas de registros

    try {
      const eventData = await prisma.eventMultipleSchedules.findMany({
        where: { eventId: eventId, day: day },
        select: {
          id: true,
          schedule: true,
          eventId: true,
          userId: true,
          day: true,
        },
      });

      return eventData;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getMultipleSchedulesDays(eventId: number) {
    const result = await prisma.eventMultipleSchedules.findMany({
      where: { eventId: eventId },
      distinct: ["day"],
      select: { day: true },
      orderBy: { day: "asc" },
    });

    return result.map((r) => r.day);
  }

  async userAllowed(eventId: number, userId: number) {
    const result = await prisma.events.findFirst({
      where: { id: eventId, userId: userId },
    });

    if (!result) {
      return false;
    }

    return true;
  }
}

export { EventModel };

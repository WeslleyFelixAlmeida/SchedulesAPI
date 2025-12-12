import prisma from "../Connection/prismaClient";

import type {
  createMultipleSchedModelType,
  multipleSchedulesType,
  uniqueSchedulesType,
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

  async createSchedules(
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

  async createEventUniqueSchedule(eventData: uniqueSchedulesType) {}
}

export { EventModel };

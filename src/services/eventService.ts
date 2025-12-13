import { EventModel } from "../models/eventModel";
import {
  eventModelType,
  eventUniqueSchedulesType,
  eventUniqueType,
  multipleSchedulesType,
  schedulesMultipleType,
} from "../types/eventTypes";

class EventService {
  private eventModel: EventModel;
  constructor() {
    this.eventModel = new EventModel();
  }

  async createEventMultipleSchedule(data: multipleSchedulesType) {
    const eventData: Omit<schedulesMultipleType, "days" | "id"> = {
      month: data.month,
      year: new Date().getFullYear(),
      image: Buffer.from(data.eventImage.split(",")[1], "base64"),
      name: data.eventName,
      shortDescription: data.eventShortDesc,
      longDescription: data.eventLongDesc,
      type: "MULTIPLE",
      userId: 1,
    };

    const createdEventId = await this.eventModel.createEventMultipleSchedule(
      eventData
    );

    const createSchedules = await this.eventModel.createSchedulesMultiple(
      { days: data.days },
      createdEventId
    );

    return { eventId: createdEventId };
  }

  async createEventUniqueSchedule(data: eventUniqueType) {
    const eventDate = new Date(data.date);

    const eventData: Omit<eventModelType, "days" | "id"> = {
      month: eventDate.getMonth(),
      year: eventDate.getFullYear(),
      image: Buffer.from(data.eventImage.split(",")[1], "base64"),
      name: data.eventName,
      shortDescription: data.eventShortDesc,
      longDescription: data.eventLongDesc,
      type: "UNIQUE",
      userId: 1,
    };

    const createdEventId = await this.eventModel.createEventUniqueSchedule(
      eventData
    );

    let eventsArray: eventUniqueSchedulesType[] = [];
    for (let i = 0; i < data.maxAmount; i++) {
      eventsArray.push({
        date: eventDate,
        schedule: data.hour,
        eventId: createdEventId,
        userId: null,
      });
    }

    const createSchedules = await this.eventModel.createSchedulesUnique(
      eventsArray
    );

    return { eventId: createdEventId };
  }
}

export { EventService };

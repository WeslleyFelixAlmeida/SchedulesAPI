import { EventModel } from "../models/eventModel";
import {
  multipleSchedulesType,
  schedulesMultipleType,
  uniqueSchedulesType,
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

    const createSchedules = await this.eventModel.createSchedules(
      { days: data.days },
      createdEventId
    );

    return { eventId: createdEventId };
  }

  async createEventUniqueSchedule(eventData: uniqueSchedulesType) {}
}

export { EventService };

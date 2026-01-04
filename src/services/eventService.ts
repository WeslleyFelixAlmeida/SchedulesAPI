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

  private treatImage(image: string) {
    const [meta, base64] = image.split(",");

    const imageType = meta.replace("data:", "").replace(";base64", "");
    const imageBuffer = Buffer.from(base64, "base64");

    return { image: imageBuffer, imageType: imageType };
  }

  async createEventMultipleSchedule(data: multipleSchedulesType) {
    const treatedImage = this.treatImage(data.eventImage);

    const eventData: Omit<schedulesMultipleType, "days" | "id"> = {
      month: data.month,
      year: new Date().getFullYear(),
      image: treatedImage.image,
      imageType: treatedImage.imageType,
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
    const treatedImage = this.treatImage(data.eventImage);
    const eventDate = new Date(data.date);

    const eventData: Omit<eventModelType, "days" | "id"> = {
      month: eventDate.getMonth(),
      year: eventDate.getFullYear(),
      image: treatedImage.image,
      imageType: treatedImage.imageType,
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

  async getEvents() {
    const events = await this.eventModel.getEvents();

    const formatEventsImage = events.map((event) => ({
      ...event,
      image: event.image
        ? `data:${event.imageType};base64,${Buffer.from(event.image).toString(
            "base64"
          )}`
        : null,
    }));

    return formatEventsImage;
  }
}

export { EventService };

import { InvalidCredentialsException } from "../Exceptions/Exceptions";
import { EventModel } from "../models/eventModel";
import { UserModel } from "../models/userModel";
import {
  eventModelType,
  eventUniqueSchedulesType,
  eventUniqueType,
  multipleSchedulesType,
  schedulesMultipleType,
} from "../types/eventTypes";

class EventService {
  private eventModel: EventModel;
  private userModel: UserModel;

  constructor() {
    this.eventModel = new EventModel();
    this.userModel = new UserModel();
  }

  private treatImage(image: string) {
    const [meta, base64] = image.split(",");

    const imageType = meta.replace("data:", "").replace(";base64", "");
    const imageBuffer = Buffer.from(base64, "base64");

    return { image: imageBuffer, imageType: imageType };
  }

  private async isAllowed(eventId: number, userId: number) {
    const isAllowed = await this.eventModel.userAllowed(eventId, userId);
    if (!isAllowed) {
      throw new InvalidCredentialsException();
    }
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
      status: "OPEN",
    };

    const createdEventId =
      await this.eventModel.createEventMultipleSchedule(eventData);

    const createSchedules = await this.eventModel.createSchedulesMultiple(
      { days: data.days },
      createdEventId,
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
      status: "OPEN",
    };

    const createdEventId =
      await this.eventModel.createEventUniqueSchedule(eventData);

    let eventsArray: eventUniqueSchedulesType[] = [];
    for (let i = 0; i < data.maxAmount; i++) {
      eventsArray.push({
        date: eventDate,
        schedule: data.hour,
        eventId: createdEventId,
        userId: null,
      });
    }

    const createSchedules =
      await this.eventModel.createSchedulesUnique(eventsArray);

    return { eventId: createdEventId };
  }

  async getEvents(userId: number) {
    const events = await this.eventModel.getEvents();

    const formatEventsImage = events.map((event) => ({
      ...event,
      image: event.image
        ? `data:${event.imageType};base64,${Buffer.from(event.image).toString(
            "base64",
          )}`
        : null,
    }));

    const isParticipating = await Promise.all(
      formatEventsImage.map(async (event) => {
        if (event.type === "UNIQUE") {
          const isParticipating = await this.eventModel.isParticipatingUnique(
            userId,
            event.id,
          );

          const { maxAmount, currentAmount } =
            await this.eventModel.getMaxAndCurrentAmountUnique(userId);

          return {
            id: event.id,
            title: event.name,
            shortDescription: event.shortDescription,
            currentStatus: event.status,
            eventType: event.type,
            currentAmount: currentAmount,
            maxAmount: maxAmount,
            eventImage: event.image,
            isParticipating: isParticipating,
          };
        } else if (event.type === "MULTIPLE") {
          return {
            id: event.id,
            title: event.name,
            shortDescription: event.shortDescription,
            currentStatus: event.status,
            eventType: event.type,
            currentAmount: 0,
            maxAmount: 0,
            eventImage: event.image,
            isParticipating: false,
          };
        }
      }),
    );

    return isParticipating;
  }

  async getEventsById(eventId: number, userId: number) {
    const eventData = await this.eventModel.getEventById(eventId);

    if (!eventData) {
      return null;
    }

    const event = {
      ...eventData,
      image: eventData!.image
        ? `data:${eventData!.imageType};base64,${Buffer.from(
            eventData!.image,
          ).toString("base64")}`
        : null,
    };

    if (event.type === "UNIQUE") {
      const isParticipating = await this.eventModel.isParticipatingUnique(
        userId,
        event.id,
      );

      const { maxAmount, currentAmount } =
        await this.eventModel.getMaxAndCurrentAmountUnique(userId);

      return {
        id: event.id,
        title: event.name,
        shortDescription: event.shortDescription,
        description: event.longDescription,
        currentStatus: event.status,
        eventType: event.type,
        currentAmount: currentAmount,
        maxAmount: maxAmount,
        eventImage: event.image,
        isParticipating: isParticipating,
      };
    } else if (event.type === "MULTIPLE") {
      return {
        id: event.id,
        title: event.name,
        shortDescription: event.shortDescription,
        description: event.longDescription,
        currentStatus: event.status,
        eventType: event.type,
        currentAmount: 0,
        maxAmount: 0,
        eventImage: event.image,
        isParticipating: false,
      };
    }
  }

  async getUserEvents(userId: number) {
    const events = await this.eventModel.getUserEvents(userId);

    const formatEventsImage = events.map((event) => ({
      ...event,
      image: event.image
        ? `data:${event.imageType};base64,${Buffer.from(event.image).toString(
            "base64",
          )}`
        : null,
    }));

    return formatEventsImage;
  }

  async getEventSchedules(eventId: number) {
    const schedules = await this.eventModel.getUniqueSchedules(eventId);

    const checkIfHasUser = await Promise.all(
      schedules.map(async (schedule) => {
        const day = String(schedule.date.getDate()).padStart(2, "0");
        const month = String(schedule.date.getMonth() + 1).padStart(2, "0");
        const year = schedule.date.getFullYear();
        const formatedDate = `${year}-${month}-${day}`;

        if (!schedule.userId) {
          return {
            id: schedule.id,
            date: formatedDate,
            schedule: schedule.schedule,
            eventId: schedule.eventId,
            username: null,
          };
        }

        const username = await this.userModel.getUserData(schedule.userId);
        return {
          id: schedule.id,
          date: formatedDate,
          schedule: schedule.schedule,
          eventId: schedule.eventId,
          username: username?.username,
        };
      }),
    );

    return checkIfHasUser;
  }

  async getEventSchedulesMultiple(
    eventId: number,
    day: number,
    userId: number,
  ) {
    const data = await this.eventModel.getMultipleSchedules(
      eventId,
      day,
    );

    return data;
  }

  async getMultipleSchedulesDays(eventId: number, userId: number) {
    const isAllowed = await this.isAllowed(eventId, userId);
    const days = await this.eventModel.getMultipleSchedulesDays(eventId);

    return days;
  }
}

export { EventService };

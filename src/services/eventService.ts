import { EventModel } from "../models/eventModel";
import {
  multipleSchedulesType,
  uniqueSchedulesType,
} from "../types/eventTypes";

class EventService {
  private eventModel: EventModel;
  constructor() {
    this.eventModel = new EventModel();
  }

  async createEventMultipleSchedule(eventData: multipleSchedulesType) {}

  async createEventUniqueSchedule(eventData: uniqueSchedulesType) {}
}

export { EventService };

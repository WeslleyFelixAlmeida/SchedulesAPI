import { EventService } from "../services/eventService";
import { Request, Response } from "express";

class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  async createEventMultipleSchedule(req: Request, res: Response) {
    const data = req.body;

    res.status(201).json({ data: data });
  }

  async createEventUniqueSchedule(req: Request, res: Response) {
    const data = req.body;

    res.status(201).json({ data: data });
  }
}

const eventController = new EventController();

export default eventController;

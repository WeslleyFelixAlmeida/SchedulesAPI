import { EventService } from "../services/eventService";
import { Request, Response } from "express";
import {
  multipleScheduleSchema,
  uniqueScheduleSchema,
} from "../Schemas/eventSchemas";
import { ZodError } from "zod";

class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  async createEventMultipleSchedule(req: Request, res: Response) {
    try {
      const data = multipleScheduleSchema.parse(req.body);
      const createEvent = await this.eventService.createEventMultipleSchedule(
        data
      );

      res.status(201).json({ eventId: createEvent.eventId });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json(
            `A ação não pode ser concluída devido a dados inválidos, verifique e tente novamente ` +
              err
          );
      }
      res.status(500).json("Erro interno no servidor " + err);
    }
  }

  async createEventUniqueSchedule(req: Request, res: Response) {
    try {
      const data = uniqueScheduleSchema.parse(req.body);
      
      const createEvent = await this.eventService.createEventUniqueSchedule(data);
      
      res.status(201).json({ data: createEvent });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json(
            `A ação não pode ser concluída devido a dados inválidos, verifique e tente novamente ` +
              err
          );
      }
      res.status(500).json("Erro interno no servidor " + err);
    }
  }
}

const eventController = new EventController();

export default eventController;

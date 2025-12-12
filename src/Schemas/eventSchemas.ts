import { z } from "zod";

const multipleScheduleSchema = z.object({
  days: z.array(
    z.object({
      day: z.number().int().min(1).max(31),
      schedules: z.array(z.string()),
    })
  ),
  month: z.number().min(1).max(12),
  eventImage: z
    .string()
    .regex(
      /^data:image\/(png|jpg|jpeg|gif|webp|bmp|svg\+xml);base64,([A-Za-z0-9+/=]+)$/,
      "Imagem deve estar em formato base64 válido"
    ),
  eventName: z.string().min(1, "Nome é obrigatório"),
  eventShortDesc: z.string().min(1, "Descrição curta é obrigatória"),
  eventLongDesc: z.string().min(1, "Descrição longa é obrigatória"),
});

export { multipleScheduleSchema };

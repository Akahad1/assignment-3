import { z } from "zod";

const slotValidationSchema = z.object({
  room: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.boolean().default(false),
});
const slotValidation = {
  slotValidationSchema,
};

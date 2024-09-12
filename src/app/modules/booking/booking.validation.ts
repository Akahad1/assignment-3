import { z } from "zod";

const bookingValidationSchema = z.object({
  room: z.string(),
  slots: z.array(z.string()),
  user: z.string(),
  date: z.date(),
  totalAmount: z.number().optional(),
  isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  isDeleted: z.boolean().optional().default(false),
});

export const bookingValidation = {
  bookingValidationSchema,
};

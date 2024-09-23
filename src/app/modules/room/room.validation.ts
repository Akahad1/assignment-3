import { z } from "zod";

// Define Zod schema for Room validation
export const roomSchemaZod = z.object({
  body: z.object({
    name: z.string(),
    Image: z.string(),
    roomNo: z.number().positive("Room number must be a positive number"), // Ensure it's a number
    floorNo: z
      .number()
      .int()
      .positive("Floor number must be a positive integer"),
    capacity: z.number().int().positive("Capacity must be a positive integer"),
    pricePerSlot: z
      .number()
      .positive("Price per slot must be a positive number"),
    amenities: z.array(z.string()).nonempty("At least one amenity is required"),
    isDeleted: z.boolean().default(false),
  }),
});

export const roomValidation = {
  roomSchemaZod,
};

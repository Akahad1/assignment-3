import z from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    role: z.enum(["admin", "user"]),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string().email("Email is not valid"),
  }),
});

export const userValidation = {
  userValidationSchema,
};

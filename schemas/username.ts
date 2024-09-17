import { z } from "zod";

const invalidCharacters = /[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export const UsernameSchemas = z.object({
  username: z
    .string({
      invalid_type_error: "Invalid characters.",
    })
    .max(10, { message: "The username must be a maximum of 10 characters long." })
    .min(3, { message: "Username must be at least 3 characters." })
    .refine((val) => !invalidCharacters.test(val), {
      message: "Invalid characters.",
    }),
});

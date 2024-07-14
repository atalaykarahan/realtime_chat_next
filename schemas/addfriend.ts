import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AddFriendSchemas = z.object({
  email: z
    .string({
      invalid_type_error: "Geçersiz karakter",
    })
    .min(3, { message: "Minimum 3 karakter uzunluğunda olmalı" })
    .refine((val) => emailRegex.test(val), {
      message: "Geçersiz email adresi formatı",
    }),
});

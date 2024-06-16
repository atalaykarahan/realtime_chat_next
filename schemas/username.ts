import { z } from "zod";

const invalidCharacters = /[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export const UsernameSchemas = z.object({
  username: z
    .string({
      invalid_type_error: "Geçersiz karakter",
    })
    .max(10, { message: "En fazla 10 karakter uzunluğunda olmalı" })
    .min(3, { message: "Minimum 3 karakter uzunluğunda olmalı" })
    .refine((val) => !invalidCharacters.test(val), {
      message: "Geçersiz karakter",
    }),
});

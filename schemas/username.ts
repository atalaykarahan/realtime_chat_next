import { z } from "zod";

export const UsernameSchemas = z.object({
  username: z.string({
    invalid_type_error: "Geçersiz karakter",
  }).max(10).min(3),
});

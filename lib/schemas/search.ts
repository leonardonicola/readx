import { z } from "zod";

export const searchSchema = z.object({
  search: z
    .string({ invalid_type_error: "Ao menos 3 caracteres para pesquisa!" })
    .trim()
    .min(3, "Ao menos 3 caracteres para pesquisa!")
});

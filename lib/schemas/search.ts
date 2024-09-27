import { z } from "zod";

export const searchSchema = z.object({
  search: z
    .string({
      required_error: "Procure por algum título ou autor!",
      invalid_type_error: "Procure por algum título ou autor!"
    })
    .trim()
    .min(1, "Procure por algum título ou autor!")
});

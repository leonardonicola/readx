import { z } from "zod";

export const startConversationSchema = z.object({
  userId: z.string({ required_error: "Usuário não encontrado!" }),
  book: z.object(
    {
      title: z.string(),
      id: z.string()
    },
    {
      required_error: "Livro não encontrado!",
      invalid_type_error: "Livro não encontrado!"
    }
  )
});

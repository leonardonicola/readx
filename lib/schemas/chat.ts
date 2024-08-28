import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string({ required_error: "Destinatário inválido!" }),
  content: z.string().trim()
});

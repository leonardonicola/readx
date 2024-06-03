import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .trim()
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(8, "Mínimo 8 caracteres")
    .max(150, "Máximo 150 caracteres"),
});

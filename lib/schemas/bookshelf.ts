import { z } from "zod";

export const bookSchema = z.object({
  id: z.string(),
  author: z.string(),
  genre_id: z.number(),
  release_date: z.date().or(z.string().date()),
  title: z.string()
});

export const searchSchema = z.object({
  result: z.array(bookSchema.pick({ id: true, author: true, title: true }))
});
export const createBookSchema = z.object({
  author: z
    .string({ required_error: "Autor é obrigatório" })
    .min(2, "Nome muito curto"),
  genre_id: z
    .string({ required_error: "Gênero é obrigatório" })
    .min(1, "Gênero é obrigatório"),
  release_date: z
    .string({
      required_error: "Data de lançamento é obrigatória",
      invalid_type_error: "Data inválida"
    })
    .length(10, "Data inválida")
    .transform((val) => new Date(val).toISOString()),
  title: z
    .string({ required_error: "Título é obrigatório" })
    .min(2, "Título muito curto")
});

export const bookshelf = z.array(bookSchema);

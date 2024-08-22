"use server";

import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { addBookToBookshelf } from "@/lib/api/bookshelf";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import {
  addToBookshelfSchema,
  createBookSchema
} from "@/lib/schemas/bookshelf";
import { returnValidationErrors } from "next-safe-action";

export const addBookToBookshelfWhileCreating = actionClient
  .schema(createBookSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { userId } = auth();
      if (!userId) redirect("/login");
      const date = dayjs(parsedInput.release_date, "DD/MM/YYYY", true);
      if (!date.isValid()) {
        returnValidationErrors(createBookSchema, {
          release_date: {
            _errors: ["Data inválida"]
          }
        });
      }
      const book = await prisma.book.create({
        data: {
          ...parsedInput,
          release_date: date.toISOString(),
          genre_id: Number(parsedInput.genre_id)
        }
      });
      const { error } = await addBookToBookshelf(book.id);
      if (error) {
        logger.error(error);
        return { error };
      }
      return {
        book,
        message: "Livro criado e adicionado com sucesso"
      };
    } catch (error) {
      logger.error(error);
      return {
        error: "Erro ao criar e adicionar livro!"
      };
    }
  });

export const addBookToBookshelfAction = actionClient
  .schema(addToBookshelfSchema)
  .action(async ({ parsedInput }) => {
    return await addBookToBookshelf(parsedInput.bookId);
  });

export async function deleteBookFromBookshelf(bookshelfId: string) {
  try {
    const { userId } = auth();
    if (!userId) redirect("/login");
    await prisma.bookshelf.delete({
      where: { id: bookshelfId }
    });
    revalidatePath("/bookshelf", "page");
    return {
      message: "Deletado com sucesso!"
    };
  } catch (error) {
    return {
      errors: "Não foi possível deletar o livro da estante!"
    };
  }
}

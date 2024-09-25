"use server";

import { addBookToBookshelf, createBook } from "@/lib/api/bookshelf";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import {
  addToBookshelfSchema,
  createBookSchema
} from "@/lib/schemas/bookshelf";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addBookToBookshelfWhileCreating = actionClient
  .schema(createBookSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { error: createError, data: book } = await createBook(parsedInput);
      if (createError) {
        return { error: createError };
      }
      const { error, data } = await addBookToBookshelf(book!.id);
      if (error) {
        return { error };
      }
      return {
        book,
        message: data
      };
    } catch (error) {
      logger.error(error, `addBookToBookshelf(${JSON.stringify(parsedInput)})`);
      return {
        error: "Erro ao criar e adicionar livro!"
      };
    }
  });

export const addBookToBookshelfAction = actionClient
  .schema(addToBookshelfSchema)
  .action(
    async ({ parsedInput }) => await addBookToBookshelf(parsedInput.bookId)
  );

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

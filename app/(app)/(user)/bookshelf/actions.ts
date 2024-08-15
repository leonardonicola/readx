"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@/lib/db";
import { createBookSchema } from "@/lib/schemas/bookshelf";

export async function createBook(values: z.output<typeof createBookSchema>) {
  try {
    console.info(values.release_date);
    const book = await prisma.book.create({
      data: { ...values, genre_id: Number(values.genre_id) }
    });
    return {
      error: null,
      book
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Não foi possível adicionar o livro aos registros!",
      book: null
    };
  }
}

export async function addBookToBookshelf(bookId: string) {
  try {
    const { userId } = auth();
    if (!userId) redirect("/login");
    const isAlreadyInBookshelf = await prisma.bookshelf.findFirst({
      where: { user_id: userId, book_id: bookId },
      select: { id: true }
    });
    if (isAlreadyInBookshelf) {
      return {
        error: "Livro já está na estante",
        message: "Livro já está na estante"
      };
    }
    await prisma.bookshelf.create({
      data: { book_id: bookId, user_id: userId },
      select: { book: true }
    });
    revalidatePath("/bookshelf", "page");
    return {
      error: null,
      message: "Adicionado com sucesso!"
    };
  } catch (error) {
    console.log(error);
    return {
      error: (error as Error).message,
      message: "Não foi possível adicionar o livro a sua estante!"
    };
  }
}

export async function deleteBookFromBookshelf(bookshelfId: string) {
  try {
    const { userId } = auth();
    if (!userId) redirect("/login");
    await prisma.bookshelf.delete({
      where: { id: bookshelfId }
    });
    revalidatePath("/bookshelf", "page");
    return {
      errors: null,
      message: "Deletado com sucesso!"
    };
  } catch (error) {
    return {
      errors: error as Error,
      message: "Não foi possível deletar o livro da estante!"
    };
  }
}

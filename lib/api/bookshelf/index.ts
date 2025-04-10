import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { createBookSchema } from "@/lib/schemas/bookshelf";
import { DefaultFetchResponse, toISOString, validateDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

async function getUserBookshelf() {
  try {
    const { userId } = auth();
    if (!userId) redirect("/");
    const bookshelves = await prisma.bookshelf.findMany({
      where: { user_id: userId },
      include: { book: true }
    });
    return {
      bookshelves
    };
  } catch (error) {
    logger.error(error);
    return {
      error: (error as Error).message,
      bookshelves: []
    };
  }
}

async function createBook({
  release_date,
  author,
  title,
  genre_id
}: z.output<typeof createBookSchema>): Promise<DefaultFetchResponse<Book>> {
  const { userId } = auth();
  if (!userId) redirect("/login");

  const isValid = validateDate(release_date, "DD/MM/YYYY");
  if (!isValid) {
    return { data: null, error: "Data inválida dayjs" };
  }
  try {
    const book = await prisma.book.create({
      data: {
        author,
        title,
        release_date: toISOString(release_date, "DD/MM/YYYY"),
        genre_id: Number(genre_id)
      }
    });
    return { data: book, error: null };
  } catch (error) {
    logger.error(error, `USER ${userId} - createBook(${title})`);
    return {
      data: null,
      error: "Não foi possível criar um registro para este livro!"
    };
  }
}

async function addBookToBookshelf(
  bookId: string
): Promise<DefaultFetchResponse<string>> {
  const { userId } = auth();
  if (!userId) redirect("/login");
  try {
    const count = await prisma.bookshelf.count({
      where: { user_id: userId, book_id: bookId }
    });
    if (count > 0) {
      return {
        data: null,
        error: "Livro já está na estante"
      };
    }
    await prisma.bookshelf.create({
      data: { book_id: bookId, user_id: userId },
      select: { book: true }
    });
    revalidatePath("/bookshelf", "page");
    return {
      data: "Adicionado com sucesso!",
      error: null
    };
  } catch (error) {
    logger.error(error, `addBookToBookshelf(${bookId})`);
    return {
      data: null,
      error: "Não foi possível adicionar o livro em sua estante, desculpe!"
    };
  }
}

async function searchTrades(search: string) {
  const { userId } = auth();
  if (!userId) redirect("/");
  try {
    const trades = await prisma.bookshelf.findMany({
      where: {
        AND: [
          { book: { title: { contains: search, mode: "insensitive" } } },
          {
            user_id: { not: userId }
          }
        ]
      },
      include: {
        user: { select: { firstName: true } },
        book: {
          select: { title: true, release_date: true, author: true }
        }
      }
    });
    return {
      trades
    };
  } catch (error) {
    return {
      error: "Não foi possível listar ofertas!"
    };
  }
}
export { addBookToBookshelf, createBook, getUserBookshelf, searchTrades };

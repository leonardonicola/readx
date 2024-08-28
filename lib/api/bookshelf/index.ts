import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

async function addBookToBookshelf(bookId: string) {
  try {
    const { userId } = auth();
    if (!userId) redirect("/login");
    const isAlreadyInBookshelf = await prisma.bookshelf.findFirst({
      where: { user_id: userId, book_id: bookId },
      select: { id: true }
    });
    if (isAlreadyInBookshelf) {
      return {
        error: "Livro já está na estante"
      };
    }
    await prisma.bookshelf.create({
      data: { book_id: bookId, user_id: userId },
      select: { book: true }
    });
    revalidatePath("/bookshelf", "page");
    return {
      message: "Adicionado com sucesso!"
    };
  } catch (error) {
    logger.error(error);
    return {
      error: (error as Error).message
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
export { addBookToBookshelf, getUserBookshelf, searchTrades };

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";

async function getUserBookshelf() {
  try {
    const { userId } = auth();
    if (!userId) redirect("/");
    const bookshelves = await prisma.bookshelf.findMany({
      where: { user_id: userId },
      include: { book: true }
    });
    return {
      error: null,
      bookshelves
    };
  } catch (error) {
    return {
      error: (error as Error).message,
      bookshelves: []
    };
  }
}

async function searchTrades(search: string) {
  const { userId } = auth();
  if (!userId) redirect("/");
  try {
    const trades = await prisma.bookshelf.findMany({
      where: { book: { title: { contains: search, mode: "insensitive" } } },
      include: {
        user: { select: { firstName: true, id: true } },
        book: {
          select: { title: true, id: true, release_date: true, author: true }
        }
      }
    });
    return {
      error: null,
      trades
    };
  } catch (error) {
    return {
      error: (error as Error).message,
      trades: []
    };
  }
}
export { getUserBookshelf, searchTrades };

import prisma from "../../lib/db";

export async function resetDb() {
  await prisma.$transaction([
    prisma.book.deleteMany(),
    prisma.user.deleteMany(),
    prisma.bookshelf.deleteMany(),
    prisma.genre.deleteMany()
  ]);
}

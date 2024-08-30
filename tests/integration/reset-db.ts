import prisma from "../../lib/db";

export async function resetDb() {
  await prisma.$transaction([
    prisma.book.deleteMany(),
    prisma.user.deleteMany(),
    prisma.message.deleteMany(),
    prisma.bookshelf.deleteMany(),
    prisma.conversation.deleteMany(),
    prisma.conversationParticipants.deleteMany(),
    prisma.genre.deleteMany()
  ]);
}

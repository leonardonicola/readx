import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

async function main() {
  // Create multiple genres
  await prisma.genre.createMany({
    data: [
      { id: 1, name: "Ação" },
      { id: 2, name: "Aventura" },
      { id: 3, name: "Comédia" },
      { id: 4, name: "Drama" },
      { id: 5, name: "Fantasia" },
      { id: 6, name: "Horror" },
      { id: 7, name: "Mistério" },
      { id: 8, name: "Romance" },
      { id: 9, name: "Sci-Fi" },
      { id: 10, name: "Thriller" },
      { id: 11, name: "Suspense" },
      { id: 12, name: "Biografia" },
      { id: 13, name: "Automóvel" },
      { id: 14, name: "Desenvolvimento Pessoal" },
      { id: 15, name: "Desenvolvimento Profissional" },
      { id: 16, name: "Programação" },
      { id: 17, name: "Programação Web" },
      { id: 18, name: "Programação Mobile" },
      { id: 19, name: "Programação de Jogos" },
      { id: 20, name: "Redes" },
      { id: 21, name: "Sistemas Operacionais" },
      { id: 22, name: "Banco de Dados" },
      { id: 23, name: "Segurança" },
      { id: 24, name: "Anime" },
      { id: 25, name: "Cartoon" }
    ],
    skipDuplicates: true
  });

  logger.info("Database seeded successfully");

  if (process.env.NODE_ENV === "development") {
    const id = process.env.DEV_USER_ID || "default_user_id";
    await prisma.user.upsert({
      where: {
        id
      },
      update: {
        email: "leonardonicolares@gmail.com",
        firstName: "Leonardo",
        lastName: "Nicola",
        id
      },
      create: {
        email: "leonardonicolares@gmail.com",
        firstName: "Leonardo",
        lastName: "Nicola",
        id
      }
    });
  }
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

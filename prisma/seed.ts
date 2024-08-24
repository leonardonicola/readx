import prisma from "@/lib/db";
import { logger } from "@/lib/logger";

async function main() {
  // Create genres
  const [fiction, _fantasy, _scifi, adventure, progamming, _kitchen] =
    await prisma.genre.createManyAndReturn({
      data: [
        {
          name: "Ficção Científica"
        },
        { name: "Fantasia" },
        { name: "Sci-Fi" },
        { name: "Aventura" },
        { name: "Programação" },
        { name: "Culinária" }
      ]
    });

  // Create books
  const [book1, book2, book3, book4] = await prisma.book.createManyAndReturn({
    data: [
      {
        title: "Dune",
        release_date: new Date("1965-08-01"),
        author: "Frank Herbert",
        genre_id: fiction.id
      },
      {
        title: "The Hobbit",
        release_date: new Date("1937-09-21"),
        author: "J.R.R. Tolkien",
        genre_id: adventure.id
      },
      {
        title: "Clean Code",
        release_date: new Date("2009-08-01"),
        author: "Robert C. Martin",
        genre_id: progamming.id
      },
      {
        title: "1984",
        release_date: new Date("1965-08-01"),
        author: "George Orwell",
        genre_id: fiction.id
      }
    ]
  });

  // Create users
  await prisma.user.upsert({
    where: {
      email: "leonicola@hotmail.com"
    },
    update: {
      bookshelves: {
        create: [
          {
            book: {
              connect: { id: book1.id }
            }
          },
          {
            book: {
              connect: { id: book3.id }
            }
          },
          {
            book: {
              connect: { id: book4.id }
            }
          },
          {
            book: {
              connect: { id: book2.id }
            }
          }
        ]
      }
    },
    create: {
      id: "user_2hDMCBi0KJXPmV4avSx5RuFQBgn",
      email: "leonicola@hotmail.com",
      firstName: "Leonardo",
      lastName: "Nicola",
      bookshelves: {
        create: [
          {
            book: {
              connect: { id: book1.id }
            }
          },
          {
            book: {
              connect: { id: book3.id }
            }
          },
          {
            book: {
              connect: { id: book4.id }
            }
          },
          {
            book: {
              connect: { id: book2.id }
            }
          }
        ]
      }
    }
  });

  logger.info("Dev Database seeded successfully");
}

if (process.env.NODE_ENV === "development") {
  main()
    .catch((e) => {
      logger.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

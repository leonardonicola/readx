import prisma from "@/lib/db";

async function main() {
  // Create genres
  await prisma.genre.createManyAndReturn({
    data: [
      {
        name: "Ficção Científica",
        id: 1
      },
      { name: "Fantasia", id: 2 },
      { name: "Sci-Fi", id: 3 },
      { name: "Aventura", id: 4 },
      { name: "Programação", id: 5 },
      { name: "Culinária", id: 6 }
    ]
  });

  // Create books
  const [book1, book2, book3, book4] = await prisma.book.createManyAndReturn({
    data: [
      {
        title: "Dune",
        release_date: new Date("1965-08-01"),
        author: "Frank Herbert",
        genre_id: 1
      },
      {
        title: "The Hobbit",
        release_date: new Date("1937-09-21"),
        author: "J.R.R. Tolkien",
        genre_id: 4
      },
      {
        title: "Clean Code",
        release_date: new Date("2009-08-01"),
        author: "Robert C. Martin",
        genre_id: 5
      },
      {
        title: "1984",
        release_date: new Date("1965-08-01"),
        author: "George Orwell",
        genre_id: 1
      }
    ]
  });

  // Create users
  await prisma.user.upsert({
    where: {
      email: "leonardonicolares@gmail.com"
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
      email: "leonardonicolares@gmail.com",
      name: "Leonardo",
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

  console.log("Dev Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

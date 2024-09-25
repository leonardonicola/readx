import prisma from "@/lib/db";
import { logger } from "@/lib/logger";

async function main() {
  await prisma.user.create({
    data: {
      id: "user_2hDMCBi0KJXPmV4avSx5RuFQBgn",
      email: "leonardonicolares@gmail.com",
      firstName: "Leonardo",
      lastName: "Nicola"
    }
  }),
    // Create users

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

import prisma from "@/lib/db";

async function getGenres() {
  try {
    const genres = await prisma.genre.findMany({
      take: 20,
      select: { id: true, name: true }
    });
    return {
      error: null,
      genres
    };
  } catch (error) {
    return {
      error: (error as Error).message,
      genres: []
    };
  }
}
export { getGenres };

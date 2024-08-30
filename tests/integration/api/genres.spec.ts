import { getGenres } from "@/lib/api/genres";
import prisma from "@/lib/db";

describe("api/genres", () => {
  it("should return genres when the database query is successful", async () => {
    // Arrange
    const mockedGenres = [
      { id: 1, name: "Fantasy" },
      { id: 2, name: "Science Fiction" }
    ];

    // Act
    await prisma.genre.createMany({ data: [...mockedGenres] });
    const result = await getGenres();

    // Assert
    expect(result).toEqual({
      error: null,
      genres: mockedGenres
    });
  });
});

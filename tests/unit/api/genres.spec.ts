import { getGenres } from "@/lib/api/genres";

import prismaMock from "../prisma.mock";

describe("api/genres", () => {
  it("SUCCESS: should return genres on the system", async () => {
    // Arrange
    const mockedGenres = [
      { id: 1, name: "Fantasy" },
      { id: 2, name: "Science Fiction" }
    ];

    // Act
    await prismaMock.genre.findMany.mockResolvedValue(mockedGenres);
    const result = await getGenres();

    // Assert
    expect(result).toEqual({
      error: null,
      genres: mockedGenres
    });
    expect(prismaMock.genre.findMany).toHaveBeenCalledWith({
      take: 20,
      select: { id: true, name: true }
    });
  });
  it("ERROR: should return an error message and empty genres array when db throws an error", async () => {
    const mockError = new Error("Database connection error");

    // Mock the findMany method to reject with an error
    prismaMock.genre.findMany.mockRejectedValue(mockError);

    const result = await getGenres();

    expect(result).toEqual({
      error: "Database connection error",
      genres: []
    });
  });
});

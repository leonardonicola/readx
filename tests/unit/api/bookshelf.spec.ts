import { addBookToBookshelf, getUserBookshelf } from "@/lib/api/bookshelf";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Mock } from "vitest";

import prismaMock from "../prisma.mock";

vi.mock("next/navigation", () => ({
  redirect: vi.fn()
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn()
}));

describe("api/bookshelf", () => {
  const FAKE_BOOK_ID = "book-123";
  const FAKE_USER_ID = "user-123";
  describe("getUserBookshelf", () => {
    it("SUCCESS: should return bookshelves when user logged in", async () => {
      const fakeBookshelves: Prisma.BookshelfGetPayload<{
        include: { book: true };
      }>[] = [
        {
          book_id: "book-1",
          user_id: FAKE_USER_ID,
          id: "bookshelf-1",
          book: {
            id: "book-1",
            title: "Book 1",
            author: "Author 1",
            release_date: new Date(),
            genre_id: 1
          }
        },
        {
          id: "bookshelf-2",
          user_id: FAKE_USER_ID,
          book_id: "book-2",
          book: {
            id: "book-2",
            title: "Book 2",
            author: "Author 2",
            release_date: new Date(),
            genre_id: 2
          }
        }
      ];

      // Mock the auth function to return a userId
      (auth as Mock).mockReturnValueOnce({ userId: FAKE_USER_ID });

      // Mock the findMany method to resolve with mock data
      prismaMock.bookshelf.findMany.mockResolvedValueOnce(fakeBookshelves);

      const result = await getUserBookshelf();

      expect(result).toEqual({
        bookshelves: fakeBookshelves
      });
      expect(prismaMock.bookshelf.findMany).toHaveBeenCalledWith({
        where: { user_id: FAKE_USER_ID },
        include: { book: true }
      });
    });
  });
  describe("addBookToBookshelf", () => {
    it("SUCCESS: should redirect to login if userId is not present", async () => {
      (auth as Mock).mockReturnValueOnce({ userId: null });

      await addBookToBookshelf("book-123");

      expect(redirect).toHaveBeenCalledWith("/login");
    });
    it("ERROR: should return an error message if the book is already in the bookshelf", async () => {
      (auth as Mock).mockReturnValueOnce({
        userId: FAKE_USER_ID
      });

      prismaMock.bookshelf.findFirst.mockResolvedValueOnce({
        id: "bookshelf-123",
        book_id: FAKE_BOOK_ID,
        user_id: FAKE_USER_ID
      });

      const result = await addBookToBookshelf(FAKE_BOOK_ID);

      expect(result).toEqual({ error: "Livro já está na estante", data: null });
      expect(prismaMock.bookshelf.findFirst).toHaveBeenCalledWith({
        where: { user_id: FAKE_USER_ID, book_id: FAKE_BOOK_ID },
        select: { id: true }
      });
      expect(prismaMock.bookshelf.create).not.toHaveBeenCalled();
    });

    it("SUCCESS: should add the book to the bookshelf and revalidate the path if the book is not already in the bookshelf", async () => {
      const stubBook = {
        id: FAKE_BOOK_ID,
        book_id: FAKE_BOOK_ID,
        user_id: FAKE_USER_ID
      };

      (auth as Mock).mockReturnValueOnce({ userId: FAKE_USER_ID });

      prismaMock.bookshelf.findFirst.mockResolvedValue(null); // Book is not in bookshelf
      prismaMock.bookshelf.create.mockResolvedValue(stubBook);

      const result = await addBookToBookshelf("book-123");

      expect(result).toEqual({ data: "Adicionado com sucesso!", error: null });
      expect(prismaMock.bookshelf.findFirst).toHaveBeenCalledWith({
        where: { user_id: FAKE_USER_ID, book_id: FAKE_BOOK_ID },
        select: { id: true }
      });
      expect(prismaMock.bookshelf.create).toHaveBeenCalledWith({
        data: { book_id: FAKE_BOOK_ID, user_id: FAKE_USER_ID },
        select: { book: true }
      });
      expect(revalidatePath).toHaveBeenCalledWith("/bookshelf", "page");
    });

    it("ERROR: should return an error message if an exception occurs", async () => {
      const fakeError = new Error("Database error");
      (auth as Mock).mockReturnValueOnce({ userId: FAKE_USER_ID });
      prismaMock.bookshelf.findFirst.mockRejectedValueOnce(fakeError);

      const result = await addBookToBookshelf("book-123");

      expect(result).toEqual({
        error: "Não foi possível adicionar o livro em sua estante, desculpe!",
        data: null
      });
    });
  });
});

import CreateBookModal from "@/components/bookshelf/create-modal";
import BookshelfFeed from "@/components/bookshelf/feed";
import { getGenres } from "@/lib/api/genres";
import { Prisma } from "@prisma/client";

export type Bookshelfs = Array<
  Prisma.BookshelfGetPayload<{
    select: { book: true; id: true };
  }>
>;

export type Genres = Array<
  Prisma.GenreGetPayload<{ select: { id: true; name: true } }>
>;

export default async function Bookshelf() {
  const { genres } = await getGenres();

  return (
    <div className="space-y-8 max-w-screen-lg mx-auto pt-12">
      <BookshelfFeed />
      <CreateBookModal genres={genres} />
    </div>
  );
}

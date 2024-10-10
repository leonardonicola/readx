import { getUserBookshelf } from "@/lib/api/bookshelf";

import BookCard from "./bookcard";

export default async function BookshelfFeed() {
  const { bookshelves } = await getUserBookshelf();

  return (
    <>
      <h1>Estes são seus livros disponíveis a troca:</h1>
      {bookshelves.length ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookshelves.map((bookshelf) => (
            <BookCard
              key={bookshelf.book.id}
              id={bookshelf.id}
              title={bookshelf.book.title}
              author={bookshelf.book.author}
              releaseDate={bookshelf.book.release_date}
            />
          ))}
        </section>
      ) : (
        <h2>Você não tem livros na sua estante! Deseja adicionar?</h2>
      )}
    </>
  );
}

import { getUserBookshelf } from "@/lib/api/bookshelf";

import BookCard from "./bookcard";

export default async function BookshelfFeed() {
  const { bookshelves } = await getUserBookshelf();

  return (
    <>
      {bookshelves.length ? (
        <>
          <h2>Estes são seus livros disponíveis para troca:</h2>
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
        </>
      ) : (
        <h2>
          Você não tem livros na sua estante! Comece adicionando-os pelo botão
          abaixo.
        </h2>
      )}
    </>
  );
}

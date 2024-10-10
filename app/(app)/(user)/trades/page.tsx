import { StartConversation } from "@/components/trades/start-conversation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { searchTrades } from "@/lib/api/bookshelf";

export default async function Trades({
  searchParams
}: {
  searchParams: { search: string };
}) {
  const { trades, error } = await searchTrades(searchParams.search);
  if (error) {
    return (
      <div className="space-y-6 p-4 max-w-screen-lg pt-12">
        <h1>Ooopss...</h1>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg h-full w-full mx-auto pt-12">
      {trades?.length ? (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {trades.map((trade) => (
            <Card
              key={trade.id}
              className="flex min-h-fit flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{trade.book.title}</CardTitle>
                <CardDescription>
                  {trade.book.author} -{" "}
                  {trade.book.release_date.toLocaleDateString("pt-BR")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full">
                    <span className="max-w-sm truncate font-semibold">
                      {trade.user.firstName}
                    </span>{" "}
                    tem o livro {trade.book.title} disponível para troca!
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <StartConversation
                  bookId={trade.book_id}
                  bookTitle={trade.book.title}
                  userId={trade.user_id}
                />
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <h1>Nenhuma trade disponível para o livro desejado!</h1>
      )}
    </div>
  );
}

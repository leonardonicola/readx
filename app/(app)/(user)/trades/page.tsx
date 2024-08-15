import { Button } from "@/components/ui/button";
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
  [key: string]: { search: string };
}) {
  const { trades } = await searchTrades(searchParams.search);

  return (
    <>
      {trades && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  <p className="w-full">
                    O usuário{" "}
                    <p className="max-w-sm truncate font-semibold">
                      {trade.user.firstName}
                    </p>{" "}
                    tem o livro {trade.book.title} disponível para troca!
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Contatar</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}
      {trades.length === 0 && (
        <h1>Nenhuma trade disponível para o livro desejado!</h1>
      )}
    </>
  );
}

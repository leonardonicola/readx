import Search from "@/components/dashboard/search";
import { ArrowPointer } from "@/components/icons/ArrowPointer";
import { StarIcon } from "@/components/icons/Star";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <div className="relative flex h-[calc(100dvh-theme(spacing.56))] w-full items-center justify-center overflow-hidden border-b-2 bg-main px-4 pt-10 xl:px-0">
      <StarIcon className="absolute -right-6 -top-12 h-64 w-64 rotate-[10deg] md:right-12 md:top-10" />
      <StarIcon className="absolute -left-32 bottom-1/3 hidden h-80 w-80 rotate-[33deg] md:block" />
      <StarIcon className="absolute -bottom-32 left-1/2 hidden h-80 w-80 translate-x-2/3 rotate-[67deg] md:block" />
      <StarIcon className="absolute -bottom-24 -left-6 block h-64 w-64 rotate-[33deg] md:hidden" />

      <div className="relative z-10 w-full max-w-screen-lg text-center">
        <ArrowPointer className="absolute bottom-12 left-0 hidden h-96 w-96 lg:block" />
        <h1>Olá {user?.firstName}!</h1>
        <h2 className="mt-4">Qual nova experiência procura hoje?</h2>
        <section className="mt-6">
          <Search />
        </section>
      </div>
    </div>
  );
}

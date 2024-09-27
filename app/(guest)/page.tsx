import { ArrowPointer } from "@/components/icons/ArrowPointer";
import { StarIcon } from "@/components/icons/Star";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex h-[calc(100dvh-theme(spacing.56))] w-full items-center justify-center overflow-hidden border-b-2 bg-main px-4 pt-10 xl:px-0">
      <StarIcon className="absolute -right-6 -top-12 h-64 w-64 rotate-[10deg] duration-700 animate-in fade-in-0 zoom-in-100 md:right-12 md:top-10" />
      <StarIcon className="absolute -left-32 bottom-1/3 hidden h-80 w-80 rotate-[33deg] duration-1000 animate-in fade-in-0 zoom-in-100 md:block" />
      <StarIcon className="absolute -bottom-32 left-1/2 hidden h-80 w-80 translate-x-2/3 rotate-[67deg] duration-1000 animate-in fade-in-0 zoom-in-100 md:block" />
      <StarIcon className="absolute -bottom-24 -left-6 block h-64 w-64 rotate-[33deg] md:hidden" />

      <div className="relative z-10 w-full max-w-screen-lg text-center">
        <ArrowPointer className="absolute -left-12 bottom-28 hidden h-96 w-96 duration-700 animate-in fade-in-0 zoom-in-50 lg:block" />
        <h1 className="duration-700 animate-in fade-in slide-in-from-top">
          Troque histórias, conecte leitores
        </h1>
        <h2 className="mt-4 duration-1000 animate-in fade-in-0 slide-in-from-top">
          Dê nova vida aos seus livros
        </h2>
        <Button
          asChild
          size="lg"
          variant="neutral"
          className="mt-10 rounded-none"
        >
          <Link
            href="/login"
            className="font-semibold duration-1000 animate-in slide-in-from-bottom"
          >
            COMECE AGORA MESMO
          </Link>
        </Button>
      </div>
    </div>
  );
}

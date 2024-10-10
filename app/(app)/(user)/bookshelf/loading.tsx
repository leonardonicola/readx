import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBookshelf() {
  return (
    <section className="grid h-[calc(100dvh-theme(space.96))] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
      {Array.from({ length: 12 }, (v, k) => k + 1).map((key) => (
        <Skeleton key={key} className="h-full w-full" />
      ))}
    </section>
  );
}

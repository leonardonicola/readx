import { Skeleton } from "@/components/ui/skeleton";

export default function TradesLoading() {
  return (
    <section className="mx-auto grid h-full max-w-screen-lg grid-cols-1 gap-4 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 15 }, (_, k) => k++).map((val) => (
        <Skeleton key={val} className="min-h-24 w-full"></Skeleton>
      ))}
    </section>
  );
}

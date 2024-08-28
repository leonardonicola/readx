import { Skeleton } from "@/components/ui/skeleton";

export default function TradesLoading() {
  return (
    <section className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 15 }, (_, k) => k++).map((val) => (
        <Skeleton key={val} className="min-h-30 w-full"></Skeleton>
      ))}
    </section>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfile() {
  return (
    <section className="relative h-full w-full space-y-4 rounded-xl border-2">
      <div className="h-72">
        <div className="h-1/3 w-full bg-main/10"></div>
        <div className="mt-4 flex h-1/3 justify-between px-4">
          <div className="relative flex h-1/2 justify-between gap-4">
            <Skeleton className="top-0 h-40 w-40 -translate-y-1/2 rounded-full shadow-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-72"></Skeleton>
              <Skeleton className="h-4 w-52"></Skeleton>
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="mx-auto h-1/5 max-w-4xl"></Skeleton>
      <Skeleton className="mx-auto h-1/5 max-w-4xl"></Skeleton>
      <Skeleton className="absolute bottom-6 right-6 h-8 w-24"></Skeleton>
      <Skeleton className="absolute bottom-6 right-40 h-8 w-24"></Skeleton>
    </section>
  );
}

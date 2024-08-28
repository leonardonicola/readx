import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingChat() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <section className="w-full flex-1 space-y-4 overflow-y-auto">
        <Skeleton className="ml-auto h-12 w-1/2" />
        <Skeleton className="ml-auto h-8 w-1/3" />
        <Skeleton className="mr-auto h-8 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="ml-auto h-8 w-1/3" />
        <Skeleton className="ml-auto h-10 w-1/2" />
        <Skeleton className="ml-auto h-8 w-1/3" />
        <Skeleton className="ml-auto h-10 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="ml-auto h-10 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="ml-auto h-10 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
        <Skeleton className="mr-auto h-12 w-1/2" />
      </section>

      <Skeleton className="mt-auto h-12 w-full rounded-xl"></Skeleton>
    </div>
  );
}

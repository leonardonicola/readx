import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-base border-2 border-border bg-white dark:border-darkBorder dark:bg-darkBg",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

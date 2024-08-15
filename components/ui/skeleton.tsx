import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-base dark:bg-darkBg dark:border-darkBorder animate-pulse border-2 border-border bg-white",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

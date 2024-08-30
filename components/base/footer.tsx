import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      data-testid="footer"
      className={cn(
        "sticky top-[100dvh] border-t border-gray-300 py-8 text-center text-sm font-bold",
        className
      )}
    >
      © Copyright {new Date().getFullYear()} Readx.
    </footer>
  );
}

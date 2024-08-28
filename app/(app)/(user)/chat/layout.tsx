import { ChatAside } from "@/components/chat/aside";
import { Loader } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  description: "Suas conversas recentes."
};

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full max-h-[calc(100%-theme(spacing.32))] w-full">
      <aside className="flex h-full w-1/4 flex-col items-center gap-4 border-2">
        <Suspense fallback={<Loader className="animate-spin"></Loader>}>
          <ChatAside />
        </Suspense>
      </aside>
      <section className="h-full w-3/4 border-y-2 border-r-2">
        {children}
      </section>
    </div>
  );
}

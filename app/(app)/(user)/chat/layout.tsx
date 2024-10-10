import { ChatAside } from "@/components/chat/aside";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  description: "Suas conversas recentes."
};

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }
  return (
    <div className="flex h-full max-h-[calc(100dvh-theme(spacing.32))] min-h-[calc(100dvh-theme(spacing.32))] max-w-screen-lg py-4 mx-auto fade-in duration-1000 animate-in">
      <aside className="flex h-full w-1/4 flex-col items-center gap-4 border-2 ">
        <ChatAside />
      </aside>
      <section className="h-full w-3/4 border-y-2 border-r-2">
        {children}
      </section>
    </div>
  );
}

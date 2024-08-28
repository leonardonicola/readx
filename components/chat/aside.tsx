import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { MessageCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ContactButton } from "./contact-button";

export async function ChatAside() {
  const user = await currentUser();
  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }
  const conversations = await prisma.conversation.findMany({
    where: {
      ConversationParticipants: { some: { user_id: user.id } }
    },
    select: {
      name: true,
      id: true,
      Message: {
        orderBy: { created_at: "desc" },
        take: 1,
        select: { content: true, id: true, created_at: true }
      },
      ConversationParticipants: {
        where: { user_id: { not: user.id } },
        take: 1,
        select: {
          User: {
            select: {
              firstName: true
            }
          }
        }
      }
    }
  });

  return (
    <>
      <div className="flex h-12 w-full items-center justify-center gap-4 border-b-2 font-bold">
        <MessageCircle />
        <h3 className="p-0">Conversas</h3>
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-4 overflow-y-auto p-2 pt-0">
        {conversations.length ? (
          conversations.map((chat) => (
            <ContactButton
              key={chat.id}
              chatId={chat.id}
              contactName={chat.ConversationParticipants[0].User.firstName}
              lastMessage={chat.Message[0]?.content ?? ""}
            />
          ))
        ) : (
          <h3>Sem conversas recentes!</h3>
        )}
      </div>
    </>
  );
}

import { Messages } from "@/components/chat/messages";
import { SendMessageInput } from "@/components/chat/send-input";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Chat({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  const currentConversation = await prisma.conversation.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      ConversationParticipants: {
        select: { User: { select: { firstName: true } } },
        where: { user_id: { not: user.id } },
        take: 1
      }
    }
  });
  if (!currentConversation) {
    redirect("/chat");
  }
  const messages = await prisma.message.findMany({
    where: { conversation_id: params.id },
    select: {
      id: true,
      user_id: true,
      content: true
    },
    orderBy: { created_at: "asc" },
    take: 30
  });
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-12 w-full items-center border-b-2 px-4">
        <p className="font-semibold">
          {currentConversation.ConversationParticipants[0].User.firstName}
        </p>
      </div>
      <div className="flex w-full flex-1 flex-col gap-4 p-6">
        <Messages initialMessages={messages}></Messages>
        <SendMessageInput className="mt-auto h-12 w-full"></SendMessageInput>
      </div>
    </div>
  );
}

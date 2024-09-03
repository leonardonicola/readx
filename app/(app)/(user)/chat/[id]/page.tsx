import { Messages } from "@/components/chat/messages";
import { SendMessageInput } from "@/components/chat/send-input";
import {
  getConversationById,
  getMessagesByConversationId
} from "@/lib/api/chat";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function Chat({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  const queryClient = new QueryClient();

  const currentConversation = await getConversationById(params.id, user.id);

  if (!currentConversation) {
    redirect("/chat");
  }

  await queryClient.prefetchQuery({
    queryKey: ["messages", currentConversation.id],
    queryFn: async () =>
      await getMessagesByConversationId(currentConversation.id)
  });

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-12 min-h-12 w-full items-center border-b-2 px-4">
        <p className="font-semibold">
          {currentConversation.ConversationParticipants[0].User.firstName ??
            currentConversation.name}
        </p>
      </div>
      <div className="flex min-h-0 w-full flex-auto flex-col gap-4 p-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Messages></Messages>
        </HydrationBoundary>
        <SendMessageInput className="mt-auto h-12 w-full"></SendMessageInput>
      </div>
    </div>
  );
}

"use client";
import { defaultFetch } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader, MessageCircle } from "lucide-react";

import { ContactButton } from "./contact-button";

type Conversation = Prisma.ConversationGetPayload<{
  select: {
    name: true;
    id: true;
    ConversationParticipants: {
      select: {
        User: {
          select: {
            firstName: true;
          };
        };
      };
    };
  };
}>;

export function ChatAside() {
  const { user } = useUser();

  const {
    data = [],
    isLoading,
    isError,
    error
  } = useQuery<Conversation[]>({
    queryKey: ["conversations", user?.id],
    enabled: !!user?.id,
    queryFn: async () => await defaultFetch("/chat/api")
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <div className="flex h-12 min-h-12 w-full items-center justify-center gap-4 border-b-2 font-bold">
        <MessageCircle />
        <h3 className="p-0">Conversas</h3>
      </div>

      {isLoading || !user ? (
        <Loader className="mt-10" />
      ) : (
        <div className="flex w-full flex-1 flex-col items-center gap-4 overflow-y-auto p-2 pt-0">
          {data.length > 0 ? (
            data.map((chat) => (
              <ContactButton
                key={chat.id}
                chatId={chat.id}
                contactName={chat.ConversationParticipants[0].User.firstName}
              />
            ))
          ) : (
            <h3>Sem conversas recentes!</h3>
          )}
        </div>
      )}
    </>
  );
}

"use client";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher/client";
import { cn, defaultFetch } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Message as PrismaMessage } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";

type Message = Pick<PrismaMessage, "id" | "content" | "user_id">;

export function Messages() {
  const { conversationId } = useConversation();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    isLoading,
    isError,
    error,
    data: messages = []
  } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    retry: false,
    queryFn: async () => await defaultFetch(`/chat/${conversationId}/api`),
    enabled: !!user
  });
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    pusherClient.bind("messages:new", (message: Message) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (prev: Message[]) => [...prev, message]
      );
    });

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new");
    };
  }, [conversationId]);

  useLayoutEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, user?.id]);

  if (isLoading || !user) return <Loader />;
  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <section className="flex h-full w-full flex-col gap-4 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              user?.id === message.user_id ? "ml-auto" : "mr-auto",
              "w-fit min-w-fit max-w-2xl rounded-xl bg-gray-200 px-4 py-2"
            )}
          >
            <p className="font-semibold">{message.content}</p>
          </div>
        ))
      ) : (
        <h3>Nenhuma conversa!</h3>
      )}
      <div ref={boxRef}></div>
    </section>
  );
}

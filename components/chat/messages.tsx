"use client";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher/client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

type Message = Prisma.MessageGetPayload<{
  select: {
    id: true;
    user_id: true;
    content: true;
  };
}>;

export function Messages({
  initialMessages
}: {
  initialMessages: Array<Message>;
}) {
  const { conversationId } = useConversation();
  const { user } = useUser();
  const [messages, setMessages] = useState(initialMessages);
  const endDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    pusherClient.bind("messages:new", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      endDivRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new");
    };
  }, [conversationId]);

  return (
    <section className="w-full flex-1 space-y-4 overflow-y-auto">
      {messages && messages.length ? (
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
      <div ref={endDivRef} />
    </section>
  );
}

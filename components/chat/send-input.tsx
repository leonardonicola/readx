"use client";

import { sendMessage } from "@/app/(app)/(user)/chat/[id]/actions";
import useConversation from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonalIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function SendMessageInput({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();
  const { conversationId } = useConversation();
  const { toast } = useToast();
  const { executeAsync } = useAction(sendMessage);
  const { mutate } = useMutation({
    mutationFn: async () => await executeAsync({ content, conversationId }),
    onSettled: (res) => {
      setContent("");
      if (res?.data?.error) {
        toast({ title: "Oopps...", description: res.data.error });
      }
    }
  });

  return (
    <div
      {...props}
      className={cn(
        className,
        "flex items-center justify-between gap-4 rounded-xl border-2 py-1 pl-1 pr-4"
      )}
    >
      <Input
        className="w-full border-none bg-transparent outline-none ring-0 focus-visible:ring-0"
        value={content}
        onKeyDown={(evt) => (evt.key === "Enter" ? mutate() : null)}
        onInput={(evt) => setContent(evt.currentTarget.value)}
      />
      <Button
        variant="link"
        size="icon"
        className="ml-auto h-full transform cursor-pointer transition-transform active:scale-90"
        onClick={() => mutate()}
      >
        <SendHorizonalIcon />
      </Button>
    </div>
  );
}

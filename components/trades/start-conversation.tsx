"use client";

import { startConversation } from "@/app/(app)/(user)/trades/actions";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface StartConversationProps {
  userId: string;
  bookTitle: string;
  bookId: string;
}

export function StartConversation({
  userId,
  bookTitle,
  bookId
}: StartConversationProps) {
  const { executeAsync, isExecuting } = useAction(startConversation);
  const { toast } = useToast();
  const router = useRouter();

  async function handleClick() {
    const res = await executeAsync({
      book: { id: bookId, title: bookTitle },
      userId
    });

    if (res?.data?.error) {
      toast({ title: "Ooops...", description: res.data.error });
      return;
    }
    if (res?.data?.val) {
      router.push(`/chat/${res.data.val.id}`);
    }
  }
  return (
    <Button disabled={isExecuting} onClick={handleClick}>
      Contatar
    </Button>
  );
}

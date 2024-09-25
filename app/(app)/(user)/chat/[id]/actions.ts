"use server";

import { sendMessageToUser } from "@/lib/api/chat";
import { pusherServer } from "@/lib/pusher/server";
import { actionClient } from "@/lib/safe-action";
import { sendMessageSchema } from "@/lib/schemas/chat";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const sendMessage = actionClient
  .schema(sendMessageSchema)
  .action(async ({ parsedInput: { content, conversationId } }) => {
    const { userId } = auth();
    if (!userId) {
      redirect("/login");
    }
    const { data, error } = await sendMessageToUser({
      content,
      conversationId,
      userId
    });
    if (error) {
      return { error };
    }
    await pusherServer.trigger(conversationId, "messages:new", data);
    return { message: data };
  });

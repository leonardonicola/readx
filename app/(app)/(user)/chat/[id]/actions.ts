"use server";

import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { pusherServer } from "@/lib/pusher/server";
import { actionClient } from "@/lib/safe-action";
import { sendMessageSchema } from "@/lib/schemas/chat";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const sendMessage = actionClient
  .schema(sendMessageSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { userId } = auth();
      if (!userId) {
        redirect("/login");
      }
      const newMessage = await prisma.message.create({
        data: {
          conversation_id: parsedInput.conversationId,
          content: parsedInput.content,
          user_id: userId
        },
        select: {
          content: true,
          id: true,
          user_id: true
        }
      });
      await pusherServer.trigger(
        parsedInput.conversationId,
        "messages:new",
        newMessage
      );
      return { message: newMessage };
    } catch (error) {
      logger.error(error);
      return { error: "Não foi possível enviar a mensagem" };
    }
  });

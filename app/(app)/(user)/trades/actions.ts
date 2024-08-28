"use server";

import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import { startConversationSchema } from "@/lib/schemas/trades";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const startConversation = actionClient
  .schema(startConversationSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = auth();
    if (!userId) {
      revalidatePath("/", "layout");
      redirect("/login");
    }

    try {
      const conversation = await prisma.conversation.findFirst({
        where: {
          is_group: false,
          AND: [
            {
              ConversationParticipants: {
                some: { user_id: userId }
              }
            },
            {
              ConversationParticipants: {
                some: { user_id: parsedInput.userId }
              }
            }
          ]
        },
        select: { id: true }
      });
      logger.info(conversation, "[FOUND CONVERSATION]: ");

      if (conversation) {
        return { val: conversation };
      }

      const newConversation = await prisma.conversation.create({
        data: {
          is_group: false,
          ConversationParticipants: {
            create: [
              {
                User: { connect: { id: parsedInput.userId } }
              },
              {
                User: { connect: { id: userId } }
              }
            ]
          }
        },
        select: {
          id: true
        }
      });
      logger.info(newConversation, "[CREATE CONVERSATION]: ");

      return { val: newConversation };
    } catch (error) {
      logger.error(error);
      return {
        error: "Não foi possível contatar o usuário!"
      };
    }
  });

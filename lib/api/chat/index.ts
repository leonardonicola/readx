import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { DefaultFetchResponse } from "@/lib/utils";

import { ConversationBase, ConversationDTO, MessageBase } from "./dto";

async function getAllConversations(
  userId: string
): Promise<DefaultFetchResponse<ConversationBase[]>> {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        ConversationParticipants: { some: { user_id: userId } }
      },
      select: {
        name: true,
        id: true,
        ConversationParticipants: {
          where: { user_id: { not: userId } },
          take: 1,
          select: {
            User: {
              select: {
                firstName: true
              }
            }
          }
        }
      }
    });

    const mappedConversation = ConversationDTO.mapToDto(conversations);
    return { data: mappedConversation, error: null };
  } catch (error) {
    logger.error(error);
    return {
      error: "Não conseguimos encontrar seu histórico de conversas!",
      data: null
    };
  }
}

async function getConversationById(
  id: string,
  userId: string
): Promise<DefaultFetchResponse<ConversationBase>> {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        ConversationParticipants: {
          select: { User: { select: { firstName: true } } },
          where: { user_id: { not: userId } },
          take: 1
        }
      }
    });
    if (!conversation) {
      return { data: null, error: "Nenhum chat encontrado!" };
    }
    const mappedConversation = ConversationDTO.mapToDto(conversation);
    return { data: mappedConversation, error: null };
  } catch (error) {
    logger.error(error);
    return { error: "Não conseguimos achar essa conversa!", data: null };
  }
}
async function getMessagesByConversationId(
  conversation_id: string
): Promise<DefaultFetchResponse<MessageBase[]>> {
  try {
    const data = await prisma.message.findMany({
      where: { conversation_id },
      select: {
        id: true,
        user_id: true,
        content: true
      },
      orderBy: { created_at: "asc" },
      take: 30
    });
    return { data, error: null };
  } catch (error) {
    logger.error(error);
    return {
      error: "Não conseguimos achar informações dessa conversa!",
      data: null
    };
  }
}
async function sendMessageToUser({
  conversationId,
  content,
  userId
}: {
  conversationId: string;
  content: string;
  userId: string;
}): Promise<DefaultFetchResponse<MessageBase>> {
  try {
    const data = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        content: content,
        user_id: userId
      },
      select: {
        content: true,
        id: true,
        user_id: true
      }
    });
    return { data, error: null };
  } catch (error) {
    logger.error(error);
    return {
      error: "Não conseguimos entregar essa mensagem, algo aconteceu!",
      data: null
    };
  }
}

export {
  getAllConversations,
  getConversationById,
  getMessagesByConversationId,
  sendMessageToUser
};

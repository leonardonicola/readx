import prisma from "@/lib/db";

async function getAllConversations(userId: string) {
  return await prisma.conversation.findMany({
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
}

async function getConversationById(id: string, userId: string) {
  return await prisma.conversation.findUnique({
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
}
async function getMessagesByConversationId(conversation_id: string) {
  return await prisma.message.findMany({
    where: { conversation_id },
    select: {
      id: true,
      user_id: true,
      content: true
    },
    orderBy: { created_at: "asc" },
    take: 30
  });
}

export {
  getAllConversations,
  getConversationById,
  getMessagesByConversationId
};

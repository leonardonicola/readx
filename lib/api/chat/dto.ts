import { Prisma } from "@prisma/client";

interface ConversationBase {
  name: string;
  id: string;
}
interface MessageBase {
  id: string;
  content: string;
  user_id: string;
}

type PrismaConversation = Prisma.ConversationGetPayload<{
  select: {
    name: true;
    id: true;
    ConversationParticipants: {
      select: { User: { select: { firstName: true } } };
    };
  };
}>;

class ConversationDTO {
  static mapToDto(conversation: PrismaConversation): ConversationBase;
  static mapToDto(conversation: PrismaConversation[]): ConversationBase[];
  static mapToDto(
    conversation: PrismaConversation[] | PrismaConversation
  ): ConversationBase[] | ConversationBase {
    if (Array.isArray(conversation)) {
      return conversation.map((convo) => ({
        id: convo.id,
        name: convo.name ?? convo.ConversationParticipants[0].User.firstName
      }));
    }

    return {
      id: conversation.id,
      name:
        conversation.name ??
        conversation.ConversationParticipants[0].User.firstName
    };
  }
}

export { ConversationDTO };
export type { ConversationBase, MessageBase };

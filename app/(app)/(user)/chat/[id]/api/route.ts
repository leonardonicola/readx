import { getMessagesByConversationId } from "@/lib/api/chat";
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { error: "Essa conversa não existe!" },
      { status: 404 }
    );
  }
  try {
    const data = await getMessagesByConversationId(params.id);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: "Não foi possível retornar informações dessa conversa" },
      { status: 500 }
    );
  }
}

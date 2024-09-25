import { getMessagesByConversationId } from "@/lib/api/chat";
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
  const { data, error } = await getMessagesByConversationId(params.id);
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data });
}

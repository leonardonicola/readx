import { getAllConversations } from "@/lib/api/chat";
import { logger } from "@/lib/logger";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    revalidatePath("/", "layout");
    redirect("/login");
  }
  try {
    const data = await getAllConversations(userId);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: "Não foi possível encontrar seu histórico de conversas!" },
      { status: 500 }
    );
  }
}

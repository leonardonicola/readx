import { getAllConversations } from "@/lib/api/chat";
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
  const { data, error } = await getAllConversations(userId);
  if (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
  return NextResponse.json({ data });
}

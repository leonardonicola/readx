"use server";
import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type EmailProtocol = {
  emailAddress: string;
  id: string;
};

export async function modifyEmail(email: EmailProtocol) {
  const { userId } = auth();
  if (!userId) redirect("/login");
  try {
    // Makes email address primary
    await clerkClient.emailAddresses.updateEmailAddress(email.id, {
      primary: true
    });

    // Updates DB with new email
    await prisma.user.update({
      where: { id: userId },
      data: { email: email.emailAddress }
    });
    revalidatePath("/profile", "page");
    return { message: "E-mail alterado com sucesso!" };
  } catch (error) {
    console.error(error);
    return {
      error: "Não foi possível modificar seu e-mail :("
    };
  }
}

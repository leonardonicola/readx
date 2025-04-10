"use server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import { nameEditSchema } from "@/lib/schemas/profile";
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
    return { data: "E-mail alterado com sucesso!", error: null };
  } catch (error) {
    logger.error(error);
    return {
      error:
        "Não foi possível modificar seu e-mail. Tente novamente mais tarde."
    };
  }
}

export const modifyName = actionClient
  .schema(nameEditSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = auth();
    if (!userId) redirect("/login");

    const [firstName, ...remaining] = parsedInput.name.split(" ");
    const lastName = remaining.join(" ");

    try {
      await clerkClient.users.updateUser(userId, {
        firstName,
        lastName
      });
      await prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName }
      });
      revalidatePath("/profile", "page");
      return { data: "Nome alterado com sucesso!", error: null };
    } catch (error) {
      logger.error(error);
      return {
        data: null,
        error: "Não foi possível modificar seu nome."
      };
    }
  });

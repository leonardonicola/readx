import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    const ERROR_MSG =
      "Please add WEBHOOK_SECRET from Clerk Dashboard to your environment variables";
    logger.error(ERROR_MSG);
    return NextResponse.json(ERROR_MSG, { status: 500 });
  }

  // Get the Svix headers
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();

  //This could raise an error if the secret isn't the same as in Clerk Dashboard
  let wh: Webhook;
  try {
    wh = new Webhook(WEBHOOK_SECRET);
  } catch (error) {
    logger.error(error);
    return NextResponse.json("WEBHOOK_SECRET isn't valid", { status: 500 });
  }

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent;
  } catch (err) {
    logger.error(err);
    return NextResponse.json("Error while verifying webhook signature", {
      status: 400
    });
  }

  const eventType = evt.type;
  const user = evt.data as UserJSON;
  const userPrimaryEmail = user.email_addresses.find(
    (infos) => infos.id === user.primary_email_address_id
  )?.email_address;

  // E-mail is always necessary!
  if (!userPrimaryEmail) {
    return NextResponse.json("Email não encontrado", {
      status: 422
    });
  }

  try {
    switch (eventType) {
      // Created with ID provider
      case "user.created":
        await prisma.user.create({
          data: {
            email: userPrimaryEmail,
            firstName: user.first_name ?? user.id,
            lastName: user.last_name,
            id: user.id
          }
        });
        break;
      // Updated with Clerk <Profile/>
      case "user.updated":
        await prisma.user.update({
          data: {
            firstName: user.first_name ?? user.id,
            lastName: user.last_name ?? "",
            updated_at: dayjs().toISOString()
          },
          where: { id: user.id }
        });
        break;
      case "user.deleted":
        await prisma.user.update({
          data: { deleted_at: dayjs().toISOString() },
          where: { id: user.id }
        });
    }
  } catch (error) {
    logger.error(error);
    return NextResponse.json("Error while handling user event", {
      status: 500
    });
  }

  revalidatePath("/profile", "page");
  revalidatePath("/", "layout");
  logger.info("HANDLED USER WEBHOOK");
  return NextResponse.json("Sucessfully handled event.", { status: 200 });
}

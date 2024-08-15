import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import prisma from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
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
    throw new Error("WEBHOOK_SECRET isn't valid");
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
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400
    });
  }

  const eventType = evt.type;
  const user = evt.data as UserJSON;
  const userPrimaryEmail = user.email_addresses.find(
    (infos) => infos.id === user.primary_email_address_id
  )?.email_address;

  // Phone number isn't always necessary, because user could receive trades offers by email too
  const userPhoneNumber =
    user.phone_numbers.find(
      (phone) => phone.id === user.primary_phone_number_id
    )?.phone_number ?? "";
  switch (eventType) {
    // Created with ID provider
    case "user.created":
      // E-mail is always necessary!
      if (!userPrimaryEmail) {
        return new Response("Email not found", {
          status: 404
        });
      }
      await prisma.user.create({
        data: {
          email: userPrimaryEmail,
          firstName: user.first_name ?? user.id,
          lastName: user.last_name,
          id: user.id,
          phoneNumber: userPhoneNumber
        }
      });
      break;
    // Updated with Clerk <Profile/>
    case "user.updated":
      await prisma.user.update({
        data: {
          firstName: user.first_name ?? user.id,
          lastName: user.last_name,
          phoneNumber: userPhoneNumber
        },
        where: { id: user.id }
      });
  }

  return new Response("Sucessfully handled event.", { status: 200 });
}

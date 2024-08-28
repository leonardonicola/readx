import { z } from "zod";

export const serverPusherEnv = z.object({
  PUSHER_KEY: z.string({ required_error: "PUSHER_KEY not found" }),
  PUSHER_ID: z.string({ required_error: "PUSHER_ID not found" }),
  PUSHER_SECRET: z.string({ required_error: "PUSHER_SECRET not found" })
});

export const clientPusherEnv = serverPusherEnv.pick({ PUSHER_KEY: true });

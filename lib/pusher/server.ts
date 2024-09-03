import PusherServer from "pusher";
import { z } from "zod";

import { serverPusherEnv } from "../schemas/env";

const { PUSHER_ID, PUSHER_KEY, PUSHER_SECRET } = serverPusherEnv.parse({
  PUSHER_ID: process.env.PUSHER_ID,
  PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET
} as z.infer<typeof serverPusherEnv>);

export const pusherServer = new PusherServer({
  appId: PUSHER_ID,
  key: PUSHER_KEY,
  cluster: "",
  host: "127.0.0.1",
  port: "6001",
  useTLS: false,
  secret: PUSHER_SECRET
});

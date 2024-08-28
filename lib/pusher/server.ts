import PusherServer from "pusher";
import { z } from "zod";

import { PUSHER_CLUSTER } from ".";
import { serverPusherEnv } from "../schemas/env";

const { PUSHER_ID, PUSHER_KEY, PUSHER_SECRET } = serverPusherEnv.parse({
  PUSHER_ID: process.env.PUSHER_ID,
  PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET
} as z.infer<typeof serverPusherEnv>);

export const pusherServer = new PusherServer({
  appId: PUSHER_ID,
  key: PUSHER_KEY,
  cluster: PUSHER_CLUSTER,
  secret: PUSHER_SECRET
});

import PusherClient from "pusher-js";
import { z } from "zod";

import { clientPusherEnv } from "../schemas/env";

const { PUSHER_KEY } = clientPusherEnv.parse({
  PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY
} as z.infer<typeof clientPusherEnv>);

export const pusherClient = new PusherClient(PUSHER_KEY, {
  cluster: "",
  wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"]
});

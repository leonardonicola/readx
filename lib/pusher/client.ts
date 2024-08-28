import PusherClient from "pusher-js";
import { z } from "zod";

import { PUSHER_CLUSTER } from ".";
import { clientPusherEnv } from "../schemas/env";

const { PUSHER_KEY } = clientPusherEnv.parse({
  PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY
} as z.infer<typeof clientPusherEnv>);

export const pusherClient = new PusherClient(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER
});
pusherClient.connection.bind("state_change", (states: any) => {
  console.log("Pusher state changed: ", states);
});

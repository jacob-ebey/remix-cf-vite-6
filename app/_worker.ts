import { createRequestHandler } from "@remix-run/cloudflare";

import { WorkerEnv } from "./env.js";

export { Counter } from "./durable-objects/counter.js";

const handler = createRequestHandler(
  // @ts-expect-error - no types
  () => import("virtual:remix/server-build"),
  import.meta.env.MODE
);

export default {
  fetch(request: Request, env: WorkerEnv) {
    return handler(request, { env });
  },
};

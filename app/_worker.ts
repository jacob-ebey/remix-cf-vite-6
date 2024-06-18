import { createRequestHandler } from "@remix-run/cloudflare";
// @ts-expect-error - no types
import * as build from "virtual:remix/server-build";

import { WorkerEnv } from "./env.js";

export { Counter } from "./durable-objects/counter.js";

const handler = createRequestHandler(build, import.meta.env.MODE);

export default {
  fetch(request: Request, env: WorkerEnv) {
    return handler(request, { env });
  },
};

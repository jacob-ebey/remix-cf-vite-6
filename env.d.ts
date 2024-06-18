import "@remix-run/cloudflare";

import { WorkerEnv } from "./app/env.js";

declare module "@remix-run/cloudflare" {
  export interface AppLoadContext {
    env: WorkerEnv;
  }
}

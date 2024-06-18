import * as fsp from "fs/promises";

import {
  vitePlugin as reactRouter,
  cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import throwforward from "throwforward-dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  environments: {
    ssr: {
      build: {
        manifest: true,
        rollupOptions: {
          input: "/app/_worker.ts",
        },
      },
      nodeCompatible: false,
      webCompatible: true,
      resolve: {
        mainFields: ["module", "main"],
        externalConditions: ["workerd", "import", "module"],
        conditions: ["workerd", "import", "module"],
        noExternal: true,
        alias: {
          module: "./module.mock.js",
        },
      },
      dev: {
        optimizeDeps: {
          include: [
            "@remix-run/cloudflare",
            "cookie",
            "react",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
            "react-dom/server",
            "react-dom",
            "set-cookie-parser",
          ],
        },
      },
    },
  },
  plugins: [
    throwforward({
      environments: ["ssr"],
      serverEntry: "app/_worker.ts",
      wranglerConfig: "wrangler.dev.toml",
      durableObjects: {
        COUNTER: {
          environment: "ssr",
          file: "/app/durable-objects/counter.ts",
        },
      },
    }),
    reactRouter({
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
}));

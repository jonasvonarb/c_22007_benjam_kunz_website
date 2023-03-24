import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            NODE_ENV: process.env.NODE_ENV,
            PAGE_TITLE: process.env.VITE_PAGE_TITLE,
            // OG_DESCRIPTION: process.env.VITE_OG_DESCRIPTION,
            // OG_IMAGE: process.env.VITE_OG_IMAGE,
            // GA_MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID,
          },
          ejsOptions: {
            escape: false,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        // "|": path.resolve(__dirname, "src/scripts"),
        ...(process.env.NODE_ENV === "development"
          ? {
              // "@azt": path.resolve(__dirname,"../MODULES/azt"),
              // "@3ms": path.resolve(__dirname,"../MODULES/3ms"),
            }
          : {}),
      },
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  });
};

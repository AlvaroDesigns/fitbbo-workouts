import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-pages-spa-fallback",
      closeBundle() {
        copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"));
      },
    },
  ],
  base: "/",
});

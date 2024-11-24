import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import dotenv from "dotenv";
import vercel from "@astrojs/vercel";

dotenv.config(); // Load .env variables
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

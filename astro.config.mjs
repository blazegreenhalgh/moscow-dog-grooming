// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import astroInspectClip from "astro-inspect-clip";

// https://astro.build/config
export default defineConfig({
  output: "static",
  security: {
    allowedDomains: [
      {
        protocol: "https",
        hostname: "tuzikgrooming.twc1.net",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), keystatic(), icon(), astroInspectClip()],
  adapter: node({
    mode: "standalone",
  }),
});

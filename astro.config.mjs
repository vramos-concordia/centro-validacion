import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {},
  },
  output: "server",
  adapter: cloudflare()
});
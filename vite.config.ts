import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  build: {
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
  },
});

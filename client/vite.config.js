import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3001",
        target: "https://basic-crud-app-z9e9.onrender.com",
        changeOrigin: true,
      },
    },
  },
});

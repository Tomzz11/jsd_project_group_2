import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { config } from "../fornt_jsd_project_group_2/src/config/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    proxy: {
      "/api": {
        target: config.apiUrl, // 🔥 เปลี่ยนเป็น port backend ของอัส
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
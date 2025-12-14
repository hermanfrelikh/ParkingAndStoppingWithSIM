/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import svgr from "vite-plugin-svgr";

// Корень проекта как файловый путь
const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-cn5s.onrender.com', // Куда реально стучаться
        changeOrigin: true,
        secure: false,      
      },
    },
  },
  resolve: {
    alias: {
      // Алиас для импорта из src (работает и в TS/JS, и в SCSS)
      "@": path.resolve(root, "src")
    }
  },
  // Ничего про includePaths не нужно — Vite резолвит алиасы и в SCSS
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(root, ".storybook")
          })
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }]
          },
          setupFiles: [".storybook/vitest.setup.ts"]
        }
      }
    ]
  }
});

/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig(({ mode }) => {
  const isProd = mode === "production"
  const base = isProd ? "/front_5th_chapter2-3/" : "/"

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})

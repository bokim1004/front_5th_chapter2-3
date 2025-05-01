import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig, Plugin } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production"
  const base = isProd ? "/front_5th_chapter2-3/" : "/"

  return {
    base,
    plugins: [react(), replaceAPI()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          // target: 'https://jsonplaceholder.typicode.com',
          target: "https://dummyjson.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})

function replaceAPI(): Plugin {
  return {
    name: "api-replace",
    transform(code, id) {
      if (id.endsWith(".ts") || id.endsWith(".js")) {
        return code.replace(/(["'`])\/api/g, `$1https://dummyjson.com`)
      }
    },
  }
}

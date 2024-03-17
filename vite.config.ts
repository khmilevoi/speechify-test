import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 8080,
      proxy: {
        "/speech-to-text": "http://localhost:3000/",
      },
    },
    define: Object.entries(env).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[`import.meta.env.${key}`] = JSON.stringify(value);
        return acc;
      },
      {},
    ),
  };
});

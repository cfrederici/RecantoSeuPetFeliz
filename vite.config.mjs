import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { viteStaticCopy } from "vite-plugin-static-copy";

// ESM replacements for CommonJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Em ESM não podemos usar require, então omitimos os plugins do Replit
// que usam require
const replitPlugins = [];

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...replitPlugins,
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "public/_redirects"),
          dest: ".", // destino: raiz do dist
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
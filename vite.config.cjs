const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const path = require("path");
const runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");
const { viteStaticCopy } = require("vite-plugin-static-copy");

// Importação síncrona segura do plugin do Replit (só se estiver no Replit)
let replitPlugins = [];
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const { cartographer } = require("@replit/vite-plugin-cartographer");
    replitPlugins.push(cartographer());
  } catch (err) {
    console.warn("Falha ao carregar o cartographer:", err);
  }
}

module.exports = defineConfig({
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
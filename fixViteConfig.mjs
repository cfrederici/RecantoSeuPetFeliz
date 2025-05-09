/**
 * Este script corrige temporariamente o problema com o vite.config.ts
 * convertendo-o para um formato compatível com ESM
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// O conteúdo que queremos usar para o vite.config.ts
const fixedConfig = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { viteStaticCopy } from "vite-plugin-static-copy";

// ESM replacements for CommonJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replit plugins array
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
`;

// Caminho para o arquivo de configuração Vite
const viteConfigPath = path.resolve(__dirname, 'vite.config.ts');
// Caminho para backup
const backupPath = path.resolve(__dirname, 'vite.config.ts.bak');

// Verificar se o arquivo existe
if (fs.existsSync(viteConfigPath)) {
  // Fazer backup do arquivo atual se ainda não existir backup
  if (!fs.existsSync(backupPath)) {
    try {
      const currentConfig = fs.readFileSync(viteConfigPath, 'utf8');
      fs.writeFileSync(backupPath, currentConfig);
      console.log('✅ Backup do arquivo original criado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar backup:', error);
      process.exit(1);
    }
  }

  // Gravar a nova configuração
  try {
    fs.writeFileSync(viteConfigPath, fixedConfig);
    console.log('✅ Arquivo vite.config.ts atualizado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao atualizar vite.config.ts:', error);
    process.exit(1);
  }
} else {
  console.error('❌ Arquivo vite.config.ts não encontrado');
  process.exit(1);
}

console.log('✨ Configuração do Vite corrigida. Agora você pode iniciar o servidor com:');
console.log('    NODE_ENV=development tsx server/index.ts');
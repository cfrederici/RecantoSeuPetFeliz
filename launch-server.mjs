#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sobrescreve temporariamente o arquivo vite.config.ts com uma versão compatível com ESM
const tempViteConfig = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Evitando require para plugins do Replit no ESM
let replitPlugins = [];

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

const originalConfig = fs.existsSync('./vite.config.ts') 
  ? fs.readFileSync('./vite.config.ts', 'utf8') 
  : '';

try {
  // Backup do arquivo original (se existir)
  if (originalConfig) {
    fs.writeFileSync('./vite.config.ts.bak', originalConfig);
  }
  
  // Escreve a configuração temporária
  fs.writeFileSync('./vite.config.ts', tempViteConfig);
  
  console.log('Iniciando servidor com configuração ESM temporária...');
  
  // Inicia o servidor com a nova configuração
  const serverProcess = spawn('tsx', ['server/index.ts'], { 
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'inherit'
  });
  
  // Monitora o processo do servidor
  serverProcess.on('exit', (code, signal) => {
    console.log(`Servidor encerrado com código: ${code}`);
    restoreConfig();
  });
  
  // Restaura a configuração quando o processo for encerrado
  process.on('SIGINT', () => {
    console.log('Recebido SIGINT. Restaurando configuração e encerrando...');
    serverProcess.kill('SIGINT');
    restoreConfig();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM. Restaurando configuração e encerrando...');
    serverProcess.kill('SIGTERM');
    restoreConfig();
    process.exit(0);
  });
  
} catch (error) {
  console.error('Erro ao iniciar o servidor:', error);
  restoreConfig();
  process.exit(1);
}

function restoreConfig() {
  if (originalConfig) {
    try {
      fs.writeFileSync('./vite.config.ts', originalConfig);
      console.log('Configuração original restaurada.');
    } catch (error) {
      console.error('Erro ao restaurar configuração:', error);
    }
  }
}
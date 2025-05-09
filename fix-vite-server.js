// Script para corrigir os problemas de inicialização do servidor Vite

const express = require('express');
const { createServer } = require('http');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Criar um aplicativo Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Funções de logging
function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Middleware para registrar solicitações de API
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Rota para formulário de contato
const contactSchema = {
  parse: (data) => {
    if (!data.name || data.name.length < 3) throw new Error('Nome inválido');
    if (!email || !email.includes('@')) throw new Error('Email inválido');
    if (!phone || phone.length < 10) throw new Error('Telefone inválido');
    if (!service) throw new Error('Serviço inválido');
    if (!message || message.length < 10) throw new Error('Mensagem inválida');
    return data;
  }
};

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || name.length < 3) throw new Error('Nome inválido');
    if (!email || !email.includes('@')) throw new Error('Email inválido');
    if (!phone || phone.length < 10) throw new Error('Telefone inválido');
    if (!service) throw new Error('Serviço inválido');
    if (!message || message.length < 10) throw new Error('Mensagem inválida');
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.status(200).json({ 
      success: true, 
      message: "Mensagem recebida com sucesso! Entraremos em contato em breve." 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message || "Dados inválidos"
    });
  }
});

// Corrigir o arquivo vite.config.ts temporariamente para o modo CommonJS
const tempViteConfigContent = `
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
`;

// Função principal para iniciar o servidor
async function startServer() {
  try {
    // Criar arquivo vite.config.cjs temporário
    log("Criando configuração Vite temporária...");
    fs.writeFileSync('vite.config.cjs', tempViteConfigContent);
    
    // Iniciar servidor Vite em um processo separado
    log("Iniciando servidor Vite...");
    const viteProcess = exec('NODE_ENV=development npx vite', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao iniciar Vite: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });
    
    // Aguardar inicialização do Vite
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Inicia servidor Express para APIs
    const port = 5000;
    const server = createServer(app);

    server.listen({
      port,
      host: "0.0.0.0",
    }, () => {
      log(`Servidor API iniciado na porta ${port}`);
      log("Acesse o frontend Vite em http://localhost:3000");
    });
    
    // Lidar com encerramento
    process.on('SIGINT', () => {
      log("Encerrando servidores...");
      viteProcess.kill();
      server.close();
      process.exit(0);
    });
    
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

// Iniciar servidor
startServer();
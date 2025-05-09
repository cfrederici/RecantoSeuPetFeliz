import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
// Removemos a importação de routes.js que não existe como .js
// As rotas estão definidas diretamente neste arquivo

// ESM replacements for CommonJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Define as rotas do formulário de contato
const contactSchema = {
  parse: (data) => {
    if (!data.name || data.name.length < 3) throw new Error('Nome inválido');
    if (!data.email || !data.email.includes('@')) throw new Error('Email inválido');
    if (!data.phone || data.phone.length < 10) throw new Error('Telefone inválido');
    if (!data.service) throw new Error('Serviço inválido');
    if (!data.message || data.message.length < 10) throw new Error('Mensagem inválida');
    return data;
  }
};

app.post("/api/contact", async (req, res) => {
  try {
    // Validar os dados
    const validatedData = contactSchema.parse(req.body);
    
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

// Configuração manual para Vite
const viteServerConfig = (await import("./vite.config.mjs")).default;
const { createServer: createViteServer } = await import("vite");

// Criar servidor Vite em modo middleware
const vite = await createViteServer({
  ...viteServerConfig,
  server: { 
    middlewareMode: true,
    hmr: true
  },
  appType: "custom"
});

// Usar middleware Vite
app.use(vite.middlewares);

// Rota para servir o HTML do cliente
app.use("*", async (req, res, next) => {
  try {
    const url = req.originalUrl;
    const template = `
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recanto Seu Pet Feliz - Hospedagem e Day Care para cães em São Paulo</title>
    <meta name="description" content="Hospedagem e Day Care para cães em ambiente familiar, com muito espaço verde e atenção exclusiva. Local seguro e aconchegante no Planalto Paulista, São Paulo.">
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
    `;
    
    const transformed = await vite.transformIndexHtml(url, template);
    res.status(200).set({ "Content-Type": "text/html" }).end(transformed);
  } catch (e) {
    next(e);
  }
});

// Manipulador de erros
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Iniciar o servidor
const port = 5000;
const server = createServer(app);

server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  log(`Servidor iniciado na porta ${port}`);
});
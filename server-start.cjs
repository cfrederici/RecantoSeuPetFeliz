// Arquivo de inicialização CommonJS
const express = require('express');
const { createServer } = require('http');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de logging
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

      console.log(logLine);
    }
  });

  next();
});

// API route for contact form
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
    // Validate the request body
    const validatedData = contactSchema.parse(req.body);
    
    // In a real-world scenario, you'd save this data to a database
    // or send an email notification. For now, we'll just return success.
    
    // Simulating some processing time
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

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

// Não tentamos servir arquivos estáticos nesta versão simplificada
// Apenas respondemos com API

// ALWAYS serve the app on port 5000
// this serves both the API and the client.
// It is the only port that is not firewalled.
const port = 5000;
const server = createServer(app);

server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  console.log(`API server running on port ${port}`);
});
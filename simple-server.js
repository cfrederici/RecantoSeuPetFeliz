const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { createServer: createViteServer } = require('vite');

const app = express();
app.use(express.json());

// API route for contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    // Validação básica
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

async function createVite() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    configFile: path.resolve(__dirname, 'vite.config.ts'),
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      let template = `
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

      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

async function startServer() {
  await createVite();

  const PORT = 5000;
  const httpServer = createServer(app);

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(e => {
  console.error(e);
  process.exit(1);
});
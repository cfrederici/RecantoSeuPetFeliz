import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
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
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erro ao processar solicitação" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

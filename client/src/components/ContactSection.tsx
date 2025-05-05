import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useScroll } from "@/hooks/use-scroll";

const contactSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  message: z.string().min(10, { message: "Mensagem deve ter no mínimo 10 caracteres" })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="contato" className="py-16 md:py-24 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="inline-block text-sm font-bold bg-primary/20 text-primary px-4 py-1 rounded-full mb-2">CONTATO</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Entre em <span className="text-primary">contato</span> conosco
          </h3>
          <p className="text-foreground/70 text-lg">
            Estamos sempre disponíveis para atender você e seu pet.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-foreground font-medium mb-2">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    {...register("name")}
                    placeholder="Seu nome completo" 
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-light-gray'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-foreground font-medium mb-2">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register("email")}
                    placeholder="seu@email.com" 
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-light-gray'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-foreground font-medium mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    {...register("phone")}
                    placeholder="(00) 00000-0000" 
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-light-gray'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="service" className="block text-foreground font-medium mb-2">Serviço de Interesse</label>
                  <select 
                    id="service" 
                    {...register("service")}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.service ? 'border-red-500' : 'border-light-gray'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  >
                    <option value="" disabled>Selecione um serviço</option>
                    <option value="hospedagem">Hospedagem</option>
                    <option value="banho-tosa">Banho e Tosa</option>
                    <option value="day-care">Day Care</option>
                    <option value="adestramento">Adestramento</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-red-500 text-sm">{errors.service.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">Mensagem</label>
                <textarea 
                  id="message" 
                  {...register("message")}
                  rows={5} 
                  placeholder="Como podemos ajudar você e seu pet?" 
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-light-gray'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-white font-medium px-6 py-3 rounded-full transition-colors w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : "Enviar Mensagem"}
                </button>
              </div>
            </form>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h4 className="text-xl font-bold font-montserrat mb-4">Informações de Contato</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold">Endereço</h5>
                    <p className="text-foreground/70">Rua dos Pets Felizes, 123 - Jardim das Flores<br/>São Paulo - SP, 01234-567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <i className="fas fa-phone-alt text-primary"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold">Telefone</h5>
                    <p className="text-foreground/70">(11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold">E-mail</h5>
                    <p className="text-foreground/70">contato@recantoseupetfeliz.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-primary"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold">Horário de Funcionamento</h5>
                    <p className="text-foreground/70">Segunda a Sexta: 8h às 19h<br/>Sábados: 9h às 17h<br/>Domingos: 9h às 14h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold font-montserrat mb-4">Siga-nos nas Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary/10 hover:bg-primary/20 w-12 h-12 flex items-center justify-center rounded-full transition-colors" aria-label="Facebook">
                  <i className="fab fa-facebook-f text-primary text-xl"></i>
                </a>
                <a href="#" className="bg-primary/10 hover:bg-primary/20 w-12 h-12 flex items-center justify-center rounded-full transition-colors" aria-label="Instagram">
                  <i className="fab fa-instagram text-primary text-xl"></i>
                </a>
                <a href="#" className="bg-primary/10 hover:bg-primary/20 w-12 h-12 flex items-center justify-center rounded-full transition-colors" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp text-primary text-xl"></i>
                </a>
                <a href="#" className="bg-primary/10 hover:bg-primary/20 w-12 h-12 flex items-center justify-center rounded-full transition-colors" aria-label="YouTube">
                  <i className="fab fa-youtube text-primary text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold font-montserrat mb-4">Nossa Localização</h4>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8869961505356!2d-46.65499492491026!3d-23.54321477865868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982d6f9030d3ab!2sSP%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1697556231577!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Recanto Seu Pet Feliz"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

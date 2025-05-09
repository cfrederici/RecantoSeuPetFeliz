'use client';

import { motion } from "framer-motion";
import { useScroll } from "../hooks/use-scroll";
import Image from "next/image";

interface Differential {
  id: number;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export default function DifferentialsSection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  
  const differentials: Differential[] = [
    {
      id: 1,
      title: "Segurança Total",
      description: "Monitoramento 24 horas, equipe sempre presente e instalações seguras para tranquilidade total.",
      icon: "fa-shield-alt",
      colorClass: "accent"
    },
    {
      id: 2,
      title: "Cuidado Personalizado",
      description: "Atendimento individualizado respeitando as necessidades e personalidade de cada pet.",
      icon: "fa-hand-holding-heart",
      colorClass: "primary"
    },
    {
      id: 3,
      title: "Equipe Qualificada",
      description: "Profissionais com formação específica e experiência em cuidados animais.",
      icon: "fa-users",
      colorClass: "secondary"
    },
    {
      id: 4,
      title: "Espaço Amplo",
      description: "Área verde extensa para brincadeiras, exercícios e socialização entre os pets.",
      icon: "fa-tree",
      colorClass: "accent"
    }
  ];
  
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
    <section id="diferenciais" className="py-16 md:py-24 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="inline-block text-sm font-bold bg-secondary/20 text-secondary px-4 py-1 rounded-full mb-2">NOSSOS DIFERENCIAIS</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Por que escolher o <span className="text-primary">Recanto</span>
          </h3>
          <p className="text-foreground/70 text-lg">
            Somos apaixonados por pets e oferecemos muito mais do que apenas hospedagem.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentials.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants} 
              className={`bg-light p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`bg-${item.colorClass}/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`fas ${item.icon} text-${item.colorClass} text-2xl`}></i>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-2">{item.title}</h4>
              <p className="text-foreground/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 bg-light-gray rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
                Faça uma visita e conheça nosso espaço
              </h3>
              <p className="text-foreground/70 mb-6">
                Convidamos você e seu pet para conhecer pessoalmente nossas instalações e equipe. Agende uma visita sem compromisso!
              </p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contato" 
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                Agendar Visita Gratuita
              </motion.a>
            </div>
            <div className="h-64 md:h-auto relative">
              <div className="relative w-full h-full">
                <Image 
                  src="https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=800&auto=format&fit=crop" 
                  alt="Área externa do Recanto Seu Pet Feliz" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
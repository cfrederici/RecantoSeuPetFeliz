'use client';

import { motion } from "framer-motion";
import { useScroll } from "../hooks/use-scroll";
import Image from "next/image";

export default function AboutSection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  
  return (
    <section id="quem-somos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="relative w-full h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" 
                alt="Equipe do Recanto com pets" 
                className="rounded-lg shadow-lg"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="mb-6">
              <h2 className="inline-block text-sm font-bold bg-accent/20 text-accent px-4 py-1 rounded-full mb-2">QUEM SOMOS</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                Um <span className="text-primary">recanto de amor</span> para seu melhor amigo
              </h3>
            </div>
            
            <p className="text-foreground/80 mb-6 text-lg">
              O Recanto Seu Pet Feliz nasceu da paixão por animais e do desejo de proporcionar um espaço onde os pets possam se sentir verdadeiramente em casa durante a ausência de seus tutores.
            </p>
            
            <p className="text-foreground/80 mb-8 text-lg">
              Fundado por uma equipe de amantes de animais e profissionais especializados, nosso espaço foi projetado pensando no bem-estar, segurança e diversão dos seus companheiros de quatro patas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-3 rounded-full mr-4">
                  <i className="fas fa-heart text-secondary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Nossa Missão</h4>
                  <p className="text-foreground/80">Proporcionar cuidados excepcionais em um ambiente acolhedor e seguro.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fas fa-shield-dog text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Nossos Valores</h4>
                  <p className="text-foreground/80">Amor, respeito, segurança e dedicação aos animais.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
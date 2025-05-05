import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-secondary relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
            Seu pet merece o <span className="text-primary">melhor cuidado</span>
          </h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato hoje mesmo e agende uma visita para conhecer nossas instalações. Seu melhor amigo vai adorar o Recanto Seu Pet Feliz!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contato" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              Agendar uma Visita
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+5511999999999" 
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              <i className="fas fa-phone-alt mr-2"></i> Ligar Agora
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}

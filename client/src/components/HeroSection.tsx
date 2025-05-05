import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1601758174039-617983b8cdd8?q=80&w=1920&auto=format&fit=crop" 
          alt="Cães felizes brincando no Recanto" 
          className="w-full h-full object-cover" 
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight mb-4">
            Um lugar especial para seu 
            <span className="text-primary"> melhor amigo</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-light">
            Hospedagem e cuidados com amor e atenção que seu pet merece, em um ambiente seguro e acolhedor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contato" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full text-center transition-colors"
            >
              Agendar uma Visita
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#servicos" 
              className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full text-center transition-colors backdrop-blur-sm"
            >
              Conheça Nossos Serviços
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <div className="custom-shape-divider absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export default function ServicesSection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  
  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Hospedagem",
      description: "Acomodações confortáveis e seguras para seu pet durante sua ausência, com monitoramento 24 horas e muito carinho.",
      icon: "fa-home",
      image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Banho e Tosa",
      description: "Serviços de higiene e estética com produtos premium e profissionais experientes para deixar seu pet limpo e cheiroso.",
      icon: "fa-bath",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Day Care",
      description: "Cuidados durante o dia com atividades recreativas, socialização e muito espaço para seu pet brincar e se divertir.",
      icon: "fa-paw",
      image: "https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Adestramento Básico",
      description: "Técnicas positivas de adestramento para melhorar o comportamento do seu pet e fortalecer o vínculo entre vocês.",
      icon: "fa-graduation-cap",
      image: "https://images.unsplash.com/photo-1589860518300-db492d80edd5?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Passeios Diários",
      description: "Caminhadas programadas em nosso amplo jardim para exercitar seu pet e garantir seu bem-estar físico e mental.",
      icon: "fa-walking",
      image: "https://images.unsplash.com/photo-1553529083-1b6cd22e209d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Cuidados Especiais",
      description: "Atendimento personalizado para pets idosos ou com necessidades específicas, incluindo administração de medicamentos.",
      icon: "fa-medkit",
      image: "https://images.unsplash.com/photo-1583511655826-05700442b6b9?q=80&w=600&auto=format&fit=crop"
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
    <section id="servicos" className="py-16 md:py-24 bg-light-gray">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="inline-block text-sm font-bold bg-primary/20 text-primary px-4 py-1 rounded-full mb-2">NOSSOS SERVIÇOS</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Cuidados especiais para seu <span className="text-primary">melhor amigo</span>
          </h3>
          <p className="text-foreground/70 text-lg">
            Oferecemos uma variedade de serviços de alta qualidade para garantir o bem-estar, conforto e alegria do seu pet.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden service-card"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <i className={`fas ${service.icon} text-primary text-xl`}></i>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold font-montserrat mb-2">{service.title}</h4>
                <p className="text-foreground/70 mb-4">
                  {service.description}
                </p>
                <a href="#contato" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                  Saiba mais <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

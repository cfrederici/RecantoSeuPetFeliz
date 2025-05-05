import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  petName: string;
  avatar: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  const [current, setCurrent] = useState(0);
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "Deixamos nosso Theo pela primeira vez e ficamos impressionados com o cuidado e atenção. Recebemos fotos diárias e ele voltou super feliz. Recomendo totalmente!",
      name: "Ana Carolina",
      petName: "Theo",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5
    },
    {
      id: 2,
      content: "A equipe do Recanto é extremamente atenciosa! Minha Luna tem necessidades especiais e eles cuidaram dela perfeitamente, seguindo todas as recomendações. Lugar incrível!",
      name: "Ricardo Mendes",
      petName: "Luna",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 3,
      content: "Meus dois cães adoram o day care do Recanto! Sempre volto para encontrá-los cansados de tanto brincar. O espaço é lindo e a equipe muito carinhosa.",
      name: "Juliana Alves",
      petName: "Max e Nina",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5
    }
  ];
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Auto slide every 5 seconds
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length, isVisible]);
  
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
    <section id="depoimentos" className="py-16 md:py-24 bg-secondary/5">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="inline-block text-sm font-bold bg-secondary/20 text-secondary px-4 py-1 rounded-full mb-2">DEPOIMENTOS</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            O que dizem os <span className="text-primary">tutores felizes</span>
          </h3>
          <p className="text-foreground/70 text-lg">
            A satisfação dos pets e seus tutores é nossa maior recompensa.
          </p>
        </div>
        
        <div className="testimonial-slider relative">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                variants={itemVariants}
                className="testimonial-card bg-white rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-foreground/60 text-sm">Tutor{testimonial.petName.includes(" e ") ? "a" : testimonial.name.endsWith("a") ? "a" : ""} de {testimonial.petName}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-10">
            <a href="#contato" className="inline-flex items-center text-secondary font-medium hover:text-secondary/80 transition-colors">
              Seja o próximo tutor feliz <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

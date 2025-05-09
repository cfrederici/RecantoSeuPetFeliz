'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "./ui/dialog";
import { useScroll } from "../hooks/use-scroll";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export default function GallerySection() {
  const [ref, isVisible] = useScroll<HTMLDivElement>(0.1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorro brincando no jardim"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorros no gramado"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1541599188900-560da83ec2a0?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorros brincando juntos"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1601758174039-617983b8cdd8?q=80&w=400&auto=format&fit=crop",
      alt: "Cuidador com cachorro"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1605244863941-3a3ed5c0fb7d?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorro recebendo banho"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorro feliz"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorro dormindo"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=400&auto=format&fit=crop",
      alt: "Cachorro em área de lazer"
    }
  ];
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="galeria" className="py-16 md:py-24 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="inline-block text-sm font-bold bg-accent/20 text-accent px-4 py-1 rounded-full mb-2">GALERIA</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Momentos <span className="text-primary">especiais</span> no Recanto
          </h3>
          <p className="text-foreground/70 text-lg">
            Confira alguns registros dos nossos hóspedes felizes.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              variants={itemVariants}
              className="gallery-item overflow-hidden rounded-lg cursor-pointer relative h-64"
              onClick={() => openLightbox(image)}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill
                style={{ objectFit: 'cover' }}
                className="gallery-img" 
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-10">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contato" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            Agende uma Visita
          </motion.a>
        </div>
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="flex flex-col items-center">
              <div className="relative w-full h-[60vh]">
                <Image 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-4 text-center text-foreground/70">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
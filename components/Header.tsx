'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full bg-white z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center">
            <div className="relative h-12 w-12 mr-3">
              <Image 
                src="/images/logo.png" 
                alt="Logo Recanto Seu Pet Feliz" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-montserrat text-primary">Recanto</h1>
              <p className="text-sm font-medium text-secondary">Seu Pet Feliz</p>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-primary font-medium transition-colors">Home</a>
            <a href="#quem-somos" className="text-foreground hover:text-primary font-medium transition-colors">Quem Somos</a>
            <a href="#servicos" className="text-foreground hover:text-primary font-medium transition-colors">Serviços</a>
            <a href="#diferenciais" className="text-foreground hover:text-primary font-medium transition-colors">Diferenciais</a>
            <a href="#depoimentos" className="text-foreground hover:text-primary font-medium transition-colors">Depoimentos</a>
            <a href="#galeria" className="text-foreground hover:text-primary font-medium transition-colors">Galeria</a>
            <a href="#contato" className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-full transition-colors">Agendar Visita</a>
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-foreground text-2xl focus:outline-none"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pt-4 pb-2 overflow-hidden"
            >
              <nav className="flex flex-col space-y-3">
                <a href="#home" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Home</a>
                <a href="#quem-somos" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Quem Somos</a>
                <a href="#servicos" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Serviços</a>
                <a href="#diferenciais" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Diferenciais</a>
                <a href="#depoimentos" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Depoimentos</a>
                <a href="#galeria" onClick={closeMenu} className="text-foreground hover:text-primary font-medium py-2 transition-colors">Galeria</a>
                <a href="#contato" onClick={closeMenu} className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-full text-center transition-colors">Agendar Visita</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
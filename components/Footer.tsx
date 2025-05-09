'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-14 w-14 mr-3 bg-white p-1 rounded-lg">
                <Image 
                  src="/images/logo.png" 
                  alt="Logo Recanto Seu Pet Feliz" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold font-montserrat text-primary">Recanto</h2>
                <p className="text-sm font-medium text-white/80">Seu Pet Feliz</p>
              </div>
            </div>
            <p className="text-white/70 mb-6">
              Um espaço pensado especialmente para o bem-estar e felicidade do seu melhor amigo.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/recantoseupetfeliz/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/5511994846333" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary transition-colors" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/70 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#quem-somos" className="text-white/70 hover:text-primary transition-colors">Quem Somos</a></li>
              <li><a href="#servicos" className="text-white/70 hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#diferenciais" className="text-white/70 hover:text-primary transition-colors">Diferenciais</a></li>
              <li><a href="#depoimentos" className="text-white/70 hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#galeria" className="text-white/70 hover:text-primary transition-colors">Galeria</a></li>
              <li><a href="#contato" className="text-white/70 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li><a href="#servicos" className="text-white/70 hover:text-primary transition-colors">Hospedagem</a></li>
              <li><a href="#servicos" className="text-white/70 hover:text-primary transition-colors">Day Care</a></li>
              <li><a href="#servicos" className="text-white/70 hover:text-primary transition-colors">Passeios Diários</a></li>
              <li><a href="#servicos" className="text-white/70 hover:text-primary transition-colors">Cuidados Especiais</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span className="text-white/70">Alameda dos Guainumbis, 446 - Planalto Paulista<br/>São Paulo - SP, 04067-001</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-primary"></i>
                <span className="text-white/70">(11) 99484-6333</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-primary"></i>
                <span className="text-white/70">contato@recantoseupetfeliz.com.br</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-primary"></i>
                <span className="text-white/70">Seg-Sex: 8h às 19h<br/>Sáb: 9h às 17h<br/>Dom: 9h às 14h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Recanto Seu Pet Feliz. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
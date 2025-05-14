"use client";

import { Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function SocialMediaSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Siga-nos nas Redes Sociais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
            >
              <TikTok />
              <span>TikTok</span>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
            >
              <MessageCircle size={24} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
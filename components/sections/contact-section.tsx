"use client";

import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  {
    href: "https://wa.me/5511994846333",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "tel:+5511994846333",
    icon: Phone,
    label: "Telefone",
  },
];

export function ContactSection() {
  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-lg mb-2">Agende uma visita ou tire suas dúvidas</p>
          </div>
          <div className="flex gap-6">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                target={link.icon !== Phone ? "_blank" : undefined}
              >
                <link.icon size={24} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
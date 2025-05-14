"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="font-bold text-lg text-primary hidden md:block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex gap-6">
          <Link
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Agende uma Visita
          </Link>
        </nav>
      </div>
    </header>
  );
}
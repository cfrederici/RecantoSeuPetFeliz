"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop"
        alt="Happy small dogs playing"
        fill
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="mb-8">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-center">{siteConfig.name}</h1>
        <p className="text-xl mb-8 text-center max-w-2xl px-4">
          {siteConfig.description}
        </p>
        <Link
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
        >
          Agende uma Visita
        </Link>
      </div>
    </section>
  );
}
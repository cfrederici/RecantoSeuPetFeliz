"use client";

import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SocialMediaSection } from "@/components/sections/social-media-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <SocialMediaSection />
        <ContactSection />
      </main>
    </>
  );
}
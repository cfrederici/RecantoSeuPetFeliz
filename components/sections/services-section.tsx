"use client";

import Image from "next/image";

const services = [
  {
    title: "Creche",
    description: "Diversão e socialização durante o dia todo para seu pet enquanto você trabalha.",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2971",
  },
  {
    title: "Daycare",
    description: "Cuidados especiais durante o dia com atividades monitoradas e muito carinho.",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=1000",
  },
  {
    title: "Hotel",
    description: "Hospedagem com todo conforto e atenção que seu pet merece durante sua viagem.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2970",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Nossos Serviços</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";

const benefits = [
  "Equipe especializada e apaixonada por pets",
  "Ambiente seguro e climatizado",
  "Monitoramento constante",
  "Área de lazer exclusiva",
];

export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Por que nos escolher?</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1577175889968-f551f5944abd?q=80&w=800&auto=format&fit=crop"
              alt="Cuidados especiais"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4">
                  <div className="h-6 w-6 mt-1 rounded-full bg-primary flex items-center justify-center text-white">
                    ✓
                  </div>
                  <p className="text-lg">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
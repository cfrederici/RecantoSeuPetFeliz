import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recanto Seu Pet Feliz - Creche, Daycare e Hotel para Cães',
  description: 'Creche, daycare e hotel para dogs de pequeno porte em São Paulo. Cuidamos do seu pet com todo amor e carinho que ele merece.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
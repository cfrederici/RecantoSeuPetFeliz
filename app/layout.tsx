import '../styles/globals.css'
import { Montserrat, Open_Sans, Caveat } from 'next/font/google'
import { Metadata } from 'next'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-opensans',
  display: 'swap',
})

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Recanto Seu Pet Feliz | Hospedagem e Day Care para Cães',
  description: 'Um espaço pensado especialmente para o bem-estar e felicidade do seu melhor amigo. Hospedagem e Day Care para cães em São Paulo.',
  keywords: 'pet, cães, hospedagem para cães, day care, hotel para cães, são paulo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable} ${caveat.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="font-opensans">
        {children}
      </body>
    </html>
  )
}
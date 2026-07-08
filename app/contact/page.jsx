import { Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Contact — Maxunittt | Streetwear seconde main',
  description: 'Une question sur une pièce, une taille, un envoi ? Contacte Maxunittt par Instagram ou email. Réponse rapide.',
  alternates: { canonical: 'https://maxunittt.vercel.app/contact' },
}

export default function Contact() {
  return (
    <div className="px-4 md:px-8 py-10 md:py-20 flex flex-col items-center text-center">

      <Link href="/" className="self-start text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-8 md:mb-12">
        ← Retour à l'accueil
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-4">Nous contacter</h1>
      <p className="text-sm text-[#8C7B6B] max-w-md mb-10 md:mb-16">
        Intéressé par une pièce ? Une question sur l'état ou les mensurations ?
        N'hésitez pas à nous écrire, on répond rapidement.
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full max-w-lg">
        <a href="https://www.instagram.com/max.unittt/" target="_blank" className="flex-1 flex flex-col items-center gap-4 border border-[#E8DFD0] rounded-2xl px-6 py-8 hover:border-[#3D2B1F] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#E8DFD0] flex items-center justify-center text-[#3D2B1F] font-bold">
            IG
          </div>
          <div>
            <p className="font-semibold text-[#3D2B1F]">Instagram</p>
            <p className="text-xs text-[#8C7B6B] mb-2">DM pour une réponse rapide</p>
            <p className="text-sm text-[#4A6FA5]">@maxunittt</p>
          </div>
        </a>

        <a href="mailto:max.unittt@gmail.com" className="flex-1 flex flex-col items-center gap-4 border border-[#E8DFD0] rounded-2xl px-6 py-8 hover:border-[#3D2B1F] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#E8DFD0] flex items-center justify-center text-[#3D2B1F]">
            <Mail size={20} />
          </div>
          <div>
            <p className="font-semibold text-[#3D2B1F]">Email</p>
            <p className="text-xs text-[#8C7B6B] mb-2">Pour demandes et collaborations</p>
            <p className="text-sm text-[#4A6FA5]">max.unittt@gmail.com</p>
          </div>
        </a>
      </div>

      <div className="mt-12 md:mt-16 border-t border-[#E8DFD0] pt-8 md:pt-10 w-full max-w-md">
        <p className="text-sm text-[#8C7B6B]">Envie de parcourir la collection ?</p>
        <Link href="/boutique" className="inline-block mt-4 bg-[#3D2B1F] text-[#F5F0E8] px-8 py-3 rounded-full hover:opacity-80 transition-opacity text-sm">
          Explorer la collection →
        </Link>
      </div>

    </div>
  )
}
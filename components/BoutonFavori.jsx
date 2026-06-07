'use client'

import { Heart } from 'lucide-react'
import { useFavoris } from '@/lib/FavoriContext'

export default function BoutonFavori({ produit }) {
  const { toggleFavori, estFavori } = useFavoris()
  const favori = estFavori(produit.id)

  return (
    <button
      onClick={() => toggleFavori(produit)}
      className={`border rounded-full p-3 transition-colors ${favori ? 'bg-[#3D2B1F] border-[#3D2B1F]' : 'border-[#E8DFD0] hover:border-[#3D2B1F]'}`}
    >
      <Heart
        size={20}
        className={favori ? 'text-white fill-white' : 'text-[#3D2B1F]'}
      />
    </button>
  )
}
'use client'

import { useFavoris } from '@/lib/FavoriContext'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import CarteProduit from '@/components/CarteProduit'

export default function Favoris() {
  const { favoris } = useFavoris()

  return (
    <div className="px-4 md:px-8 py-6 md:py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-1">Favoris</h1>
      <p className="text-sm text-[#8C7B6B] mb-6 md:mb-10">
        {favoris.length} article{favoris.length > 1 ? 's' : ''} sauvegardé{favoris.length > 1 ? 's' : ''}
      </p>

      {favoris.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 border border-[#E8DFD0] rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-[#E8DFD0] flex items-center justify-center mb-6">
            <Heart size={24} className="text-[#8C7B6B]" />
          </div>
          <p className="text-lg font-semibold text-[#3D2B1F] mb-2">Aucun favori pour le moment</p>
          <p className="text-sm text-[#8C7B6B] max-w-xs text-center mb-8">
            Explorez la collection et sauvegardez vos pièces préférées en cliquant sur l'icône cœur.
          </p>
          <Link href="/boutique" className="bg-[#3D2B1F] text-[#F5F0E8] px-8 py-3 rounded-full hover:opacity-80 transition-opacity text-sm">
            Explorer la collection →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
          {favoris.map(produit => (
            <CarteProduit key={produit.id} produit={produit} />
          ))}
        </div>
      )}

    </div>
  )
}
'use client'

import Link from 'next/link'
import { useFavoris } from '@/lib/FavoriContext'
import { Heart } from 'lucide-react'

export default function CarteProduit({ produit, nouveau = false }) {
  const { toggleFavori, estFavori } = useFavoris()
  const favori = estFavori(produit.id)
  const photoUrl = produit.photos ? produit.photos.split(',')[0] : null

  const sauvegarderPosition = () => {
    sessionStorage.setItem('boutique_scroll', window.scrollY)
  }

  return (
    <div className="group">
      <Link href={`/produits/${produit.slug}`} onClick={sauvegarderPosition}>
        <div className="relative rounded-2xl overflow-hidden mb-4 bg-[#E8DFD0] aspect-[3/4]">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#E8DFD0]" />
          )}
          {nouveau && (
            <span className="absolute top-3 left-3 bg-[#4A6FA5] text-white text-xs px-3 py-1 rounded-full">
              Nouveau
            </span>
          )}
          <button
            onClick={e => {
              e.preventDefault()
              toggleFavori(produit)
            }}
            className={`absolute top-3 right-3 rounded-full p-2 transition-all ${favori ? 'bg-[#3D2B1F]' : 'bg-white hover:scale-110'}`}
          >
            <Heart size={16} className={favori ? 'text-white fill-white' : 'text-[#3D2B1F]'} />
          </button>
        </div>
      </Link>
      <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-1">{produit.marque}</p>
      <p className="text-sm text-[#3D2B1F] mb-2">{produit.nom}</p>
      <div className="flex justify-between items-center">
        <p className="text-base font-bold text-[#3D2B1F]">{produit.prix} €</p>
        <span className="text-xs bg-[#E8DFD0] text-[#3D2B1F] px-2 py-1 rounded-full">{produit.taille}</span>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CarteProduit from '@/components/CarteProduit'

export default function Home() {
  const [produitsVedette, setProduitsVedette] = useState([])
  const [nouveautes, setNouveautes] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const chargerProduits = async () => {
      const { data: vedette } = await supabase
        .from('produits')
        .select('*')
        .eq('disponible', true)
        .eq('vedette', true)
      const melanges = (vedette || []).sort(() => Math.random() - 0.5).slice(0, 6)
      setProduitsVedette(melanges)

      const { data: nouv } = await supabase
        .from('produits')
        .select('*')
        .eq('disponible', true)
        .order('created_at', { ascending: false })
        .limit(6)
      setNouveautes(nouv || [])

      const { data: cats } = await supabase
        .from('categories')
        .select('*')
        .order('nom')
      setCategories(cats || [])
    }
    chargerProduits()
  }, [])

  return (
    <div>

      <section className="flex flex-col items-center justify-center text-center px-4 md:px-8 py-16 md:py-32">
        <p className="text-xs tracking-widest text-[#4A6FA5] mb-4 md:mb-6 font-semibold">
          SECONDE MAIN · MULTIMARQUE · CERTIFIÉ
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 md:mb-6">
          <span className="text-[#3D2B1F]">Des marques que tu connais,</span>
          <br />
          <span className="text-[#8C7B6B]">au prix que tu veux</span>
        </h1>
        <p className="text-sm md:text-base text-[#8C7B6B] max-w-lg mb-8 md:mb-10">
          Carhartt, Calvin Klein, Ralph Lauren, Nike et plus. Des pièces de qualité
          sélectionnées une par une, disponibles jusqu'à épuisement du stock.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto px-4 md:px-0">
          <Link href="/boutique" className="bg-[#3D2B1F] text-[#F5F0E8] px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
            Explorer la collection →
          </Link>
          <Link href="/contact" className="border border-[#3D2B1F] text-[#3D2B1F] px-8 py-3 rounded-full text-center hover:opacity-60 transition-opacity">
            Nous contacter
          </Link>
        </div>
      </section>

      <section className="px-4 md:px-8 py-10 md:py-16">
        <div className="flex justify-between items-end mb-6 md:mb-10">
          <div>
            <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-1 md:mb-2">SÉLECTION</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#3D2B1F]">Nos coups de cœur</h2>
          </div>
          <Link href="/boutique" className="text-sm text-[#3D2B1F] hover:opacity-60 transition-opacity whitespace-nowrap">
            Tout voir →
          </Link>
        </div>

        {produitsVedette.length === 0 ? (
          <p className="text-center text-[#8C7B6B] py-10">Aucun coup de cœur pour le moment.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">
            {produitsVedette.map(produit => (
              <CarteProduit key={produit.id} produit={produit} />
            ))}
          </div>
        )}
      </section>
      <section className="px-4 md:px-8 py-10 md:py-16 bg-[#EDE8DE]">
        <div className="flex justify-between items-end mb-6 md:mb-10">
          <div>
            <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-1 md:mb-2">FRAÎCHEMENT ARRIVÉ</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#3D2B1F]">Nouveautés</h2>
          </div>
          <Link href="/nouveautes" className="text-sm text-[#3D2B1F] hover:opacity-60 transition-opacity whitespace-nowrap">
            Voir tout →
          </Link>
        </div>

        {nouveautes.length === 0 ? (
          <p className="text-center text-[#8C7B6B] py-10">Aucune nouveauté pour le moment.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">
            {nouveautes.map(produit => (
              <CarteProduit key={produit.id} produit={produit} nouveau={true} />
            ))}
          </div>
        )}
      </section>
      {/* CATÉGORIES */}
{/* <section className="px-4 md:px-8 py-10 md:py-16 text-center">
  <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-2">PARCOURIR PAR</p>
  <h2 className="text-2xl md:text-4xl font-bold text-[#3D2B1F] mb-6 md:mb-10">Catégories</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
    {categories.map(cat => (
      <Link href={`/boutique?categorie=${cat.slug}`} key={cat.slug}>
        <div className="relative rounded-2xl overflow-hidden h-36 md:h-52 bg-[#E8DFD0] cursor-pointer group">
          <img src={cat.photo || '/placeholder.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-white text-left">
            <p className="font-semibold text-sm md:text-base">{cat.nom}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section> */}

    </div>
  )
}
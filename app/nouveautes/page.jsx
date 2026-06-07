'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import CarteProduit from '@/components/CarteProduit'

export default function Nouveautes() {
  const [nouveautes, setNouveautes] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    const chargerNouveautes = async () => {
      const { data } = await supabase
        .from('produits')
        .select('*')
        .eq('disponible', true)
        .order('created_at', { ascending: false })
        .limit(15)
      setNouveautes(data || [])
      setChargement(false)
    }
    chargerNouveautes()
  }, [])

  if (chargement) return <div className="px-4 py-10 text-[#8C7B6B]">Chargement...</div>

  return (
    <div className="px-4 md:px-8 py-6 md:py-10">

      <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-2">FRAÎCHEMENT ARRIVÉ</p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-1">Nouveautés</h1>
      <p className="text-sm text-[#8C7B6B] mb-6 md:mb-10">{nouveautes.length} derniers articles ajoutés</p>

      {nouveautes.length === 0 ? (
        <div className="text-center py-20 text-[#8C7B6B]">
          <p>Aucun produit pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
          {nouveautes.map(produit => (
            <CarteProduit key={produit.id} produit={produit} nouveau={true} />
          ))}
        </div>
      )}

    </div>
  )
}
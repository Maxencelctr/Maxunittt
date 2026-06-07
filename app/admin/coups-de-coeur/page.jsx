'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CoupsDeCoeur() {
  const router = useRouter()
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const [sauvegarde, setSauvegarde] = useState(false)

  useEffect(() => {
    const verifierSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }
      chargerProduits()
    }
    verifierSession()
  }, [])

  const chargerProduits = async () => {
    const { data } = await supabase
      .from('produits')
      .select('*')
      .eq('disponible', true)
      .order('created_at', { ascending: false })
    setProduits(data || [])
    setChargement(false)
  }

  const toggleVedette = (id) => {
    setProduits(prev => prev.map(p =>
      p.id === id ? { ...p, vedette: !p.vedette } : p
    ))
  }

  const sauvegarder = async () => {
    setSauvegarde(true)
    for (const produit of produits) {
      await supabase
        .from('produits')
        .update({ vedette: produit.vedette || false })
        .eq('id', produit.id)
    }
    setSauvegarde(false)
    alert('Coups de cœur sauvegardés !')
  }

  if (chargement) return <div className="px-8 py-10 text-[#8C7B6B]">Chargement...</div>

  const nbVedette = produits.filter(p => p.vedette).length

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">

      <Link href="/admin" className="text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-8 inline-block">
        ← Retour au dashboard
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3D2B1F]">Coups de cœur</h1>
          <p className="text-sm text-[#8C7B6B] mt-1">{nbVedette} produit{nbVedette > 1 ? 's' : ''} sélectionné{nbVedette > 1 ? 's' : ''} — 5 affichés aléatoirement sur la homepage</p>
        </div>
        <button
          onClick={sauvegarder}
          disabled={sauvegarde}
          className="bg-[#3D2B1F] text-[#F5F0E8] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {sauvegarde ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {produits.map(produit => (
          <div
            key={produit.id}
            onClick={() => toggleVedette(produit.id)}
            className={`flex items-center gap-4 border rounded-2xl px-6 py-4 cursor-pointer transition-colors ${produit.vedette ? 'border-[#3D2B1F] bg-[#F5F0E8]' : 'border-[#E8DFD0] hover:border-[#3D2B1F]'}`}
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8DFD0] shrink-0">
              <img
                src={produit.photos ? produit.photos.split(',')[0] : '/placeholder.jpg'}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#4A6FA5] font-semibold tracking-widest">{produit.marque}</p>
              <p className="text-sm font-semibold text-[#3D2B1F]">{produit.nom}</p>
              <p className="text-xs text-[#8C7B6B]">{produit.taille} · {produit.prix} €</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${produit.vedette ? 'bg-[#3D2B1F] border-[#3D2B1F]' : 'border-[#E8DFD0]'}`}>
              {produit.vedette && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)

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
    const { data } = await supabase.from('produits').select('*').order('created_at', { ascending: false })
    setProduits(data || [])
    setChargement(false)
  }

  const supprimerProduit = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    await supabase.from('produits').delete().eq('id', id)
    chargerProduits()
  }

  const seDeconnecter = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (chargement) return <div className="p-8 text-[#8C7B6B]">Chargement...</div>

  return (
    <div className="px-8 py-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3D2B1F]">Dashboard Admin</h1>
          <p className="text-sm text-[#8C7B6B]">{produits.length} produits en stock</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/ajouter" className="bg-[#3D2B1F] text-[#F5F0E8] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity">
            + Ajouter un produit
          </Link>
          <Link href="/admin/coups-de-coeur" className="border border-[#3D2B1F] text-[#3D2B1F] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity">
  ♥        Coups de cœur
          </Link>
          <Link href="/admin/marques" className="border border-[#3D2B1F] text-[#3D2B1F] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity">
            Marques
          </Link>
          <Link href="/admin/categories" className="border border-[#3D2B1F] text-[#3D2B1F] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity">
            Catégories
          </Link>
          <button onClick={seDeconnecter} className="border border-[#E8DFD0] text-[#8C7B6B] px-6 py-2 rounded-full text-sm hover:border-[#3D2B1F] transition-colors">
            Se déconnecter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {produits.map(produit => (
          <div key={produit.id} className="flex items-center justify-between bg-white border border-[#E8DFD0] rounded-2xl px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-[#E8DFD0] overflow-hidden">
                <img src={produit.photos?.split(',')[0] || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-[#4A6FA5] font-semibold tracking-widest">{produit.marque}</p>
                <p className="text-sm font-semibold text-[#3D2B1F]">{produit.nom}</p>
                <p className="text-xs text-[#8C7B6B]">{produit.taille} · {produit.etat}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="font-bold text-[#3D2B1F]">{produit.prix} €</p>
              <span className={`text-xs px-3 py-1 rounded-full ${produit.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {produit.disponible ? 'Disponible' : 'Vendu'}
              </span>
              
              <Link href={`/admin/modifier/${produit.id}`} className="text-[#4A6FA5] hover:opacity-60 text-sm transition-opacity">
                 Modifier
              </Link>
                <button onClick={() => supprimerProduit(produit.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
                  Supprimer
                </button>
            </div>
          </div>
        ))}

        {produits.length === 0 && (
          <div className="text-center py-20 text-[#8C7B6B]">
            <p className="mb-4">Aucun produit pour le moment.</p>
            <Link href="/admin/ajouter" className="text-[#4A6FA5] text-sm">Ajouter ton premier produit →</Link>
          </div>
        )}
      </div>

    </div>
  )
}
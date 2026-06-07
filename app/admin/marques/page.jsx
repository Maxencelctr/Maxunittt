'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Search } from 'lucide-react'

export default function AdminMarques() {
  const router = useRouter()
  const [marques, setMarques] = useState([])
  const [nouvelleMarque, setNouvelleMarque] = useState('')
  const [chargement, setChargement] = useState(true)
  const [sauvegarde, setSauvegarde] = useState(false)
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    const verifierSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }
      chargerDonnees()
    }
    verifierSession()
  }, [])

  const chargerDonnees = async () => {
    const { data: marquesExistantes } = await supabase
      .from('marques')
      .select('*')
      .order('nom')

    const { data: produits } = await supabase
      .from('produits')
      .select('marque')

    const marquesExistantesNoms = (marquesExistantes || []).map(m => m.nom.toLowerCase())
    const marquesUniques = [...new Set((produits || []).map(p => p.marque))]
    const marquesManquantes = marquesUniques.filter(m => m && !marquesExistantesNoms.includes(m.toLowerCase()))

    if (marquesManquantes.length > 0) {
      await supabase.from('marques').insert(
        marquesManquantes.map(nom => ({ nom, afficher_filtre: false }))
      )
    }

    const { data: toutesMarques } = await supabase
      .from('marques')
      .select('*')
      .order('nom')
    setMarques(toutesMarques || [])
    setChargement(false)
  }

  const ajouterMarque = async (e) => {
    e.preventDefault()
    if (!nouvelleMarque.trim()) return
    await supabase.from('marques').insert([{
      nom: nouvelleMarque.trim(),
      afficher_filtre: false
    }])
    setNouvelleMarque('')
    chargerDonnees()
  }

  const toggleFiltre = (id) => {
    setMarques(prev => prev.map(m =>
      m.id === id ? { ...m, afficher_filtre: !m.afficher_filtre } : m
    ))
  }

  const sauvegarder = async () => {
    setSauvegarde(true)
    for (const marque of marques) {
      await supabase
        .from('marques')
        .update({ afficher_filtre: marque.afficher_filtre })
        .eq('id', marque.id)
    }
    setSauvegarde(false)
    alert('Marques sauvegardées !')
  }

  if (chargement) return <div className="px-8 py-10 text-[#8C7B6B]">Chargement...</div>

  const nbFiltres = marques.filter(m => m.afficher_filtre).length
  const marquesFiltrees = marques.filter(m =>
    m.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="px-8 py-10">

      <Link href="/admin" className="text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-8 inline-block">
        ← Retour au dashboard
      </Link>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-[#3D2B1F]">Gestion des marques</h1>
        <button
          onClick={sauvegarder}
          disabled={sauvegarde}
          className="bg-[#3D2B1F] text-[#F5F0E8] px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {sauvegarde ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
      <p className="text-sm text-[#8C7B6B] mb-6">
        {nbFiltres} marque{nbFiltres > 1 ? 's' : ''} affichée{nbFiltres > 1 ? 's' : ''} dans les filtres · {marques.length} au total
      </p>

      <form onSubmit={ajouterMarque} className="flex gap-3 mb-6">
        <input
          type="text"
          value={nouvelleMarque}
          onChange={e => setNouvelleMarque(e.target.value)}
          placeholder="Ajouter une marque manuellement..."
          className="flex-1 border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent outline-none focus:border-[#3D2B1F]"
        />
        <button type="submit" className="bg-[#3D2B1F] text-[#F5F0E8] px-6 py-3 rounded-xl text-sm hover:opacity-80 transition-opacity">
          + Ajouter
        </button>
      </form>

      <div className="flex items-center gap-2 border border-[#E8DFD0] rounded-full px-4 py-2 mb-6">
        <Search size={16} className="text-[#8C7B6B]" />
        <input
          type="text"
          placeholder="Rechercher une marque..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          className="flex-1 text-sm text-[#3D2B1F] bg-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {marquesFiltrees.map(marque => (
          <div
            key={marque.id}
            onClick={() => toggleFiltre(marque.id)}
            className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-colors ${marque.afficher_filtre ? 'border-[#3D2B1F] bg-[#F5F0E8]' : 'border-[#E8DFD0] hover:border-[#3D2B1F]'}`}
          >
            <p className="text-sm font-semibold text-[#3D2B1F] truncate">{marque.nom}</p>
            <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ml-2 ${marque.afficher_filtre ? 'bg-[#3D2B1F] border-[#3D2B1F]' : 'border-[#E8DFD0]'}`}>
              {marque.afficher_filtre && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
        ))}

        {marquesFiltrees.length === 0 && (
          <p className="col-span-3 text-center text-[#8C7B6B] py-10">Aucune marque trouvée.</p>
        )}
      </div>

    </div>
  )
}
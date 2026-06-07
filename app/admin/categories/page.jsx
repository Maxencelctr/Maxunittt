'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { X, Search } from 'lucide-react'

export default function AdminCategories() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [nouvelleCategorie, setNouvelleCategorie] = useState({ nom: '', slug: '' })
  const [chargement, setChargement] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [uploadEnCours, setUploadEnCours] = useState({})

  useEffect(() => {
    const verifierSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }
      chargerCategories()
    }
    verifierSession()
  }, [])

  const chargerCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('nom')
    setCategories(data || [])
    setChargement(false)
  }

  const ajouterCategorie = async (e) => {
    e.preventDefault()
    if (!nouvelleCategorie.nom.trim()) return
    const slug = nouvelleCategorie.slug.trim() ||
      nouvelleCategorie.nom.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
    await supabase.from('categories').insert([{ nom: nouvelleCategorie.nom.trim(), slug }])
    setNouvelleCategorie({ nom: '', slug: '' })
    chargerCategories()
  }

  const supprimerCategorie = async (id) => {
    if (!confirm('Supprimer cette catégorie ?')) return
    await supabase.from('categories').delete().eq('id', id)
    chargerCategories()
  }

  const uploadPhoto = async (e, categorieId) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadEnCours(prev => ({ ...prev, [categorieId]: true }))

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.url) {
        await supabase
          .from('categories')
          .update({ photo: data.url })
          .eq('id', categorieId)
        chargerCategories()
      }
    } catch (error) {
      console.error('Erreur upload photo catégorie', error)
    }

    setUploadEnCours(prev => ({ ...prev, [categorieId]: false }))
  }

  if (chargement) return <div className="px-8 py-10 text-[#8C7B6B]">Chargement...</div>

  const categoriesFiltrees = categories.filter(c =>
    c.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">

      <Link href="/admin" className="text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-8 inline-block">
        ← Retour au dashboard
      </Link>

      <h1 className="text-3xl font-bold text-[#3D2B1F] mb-2">Gestion des catégories</h1>
      <p className="text-sm text-[#8C7B6B] mb-8">{categories.length} catégorie{categories.length > 1 ? 's' : ''} au total</p>

      <form onSubmit={ajouterCategorie} className="flex gap-3 mb-6">
        <input
          type="text"
          value={nouvelleCategorie.nom}
          onChange={e => setNouvelleCategorie(prev => ({
            ...prev,
            nom: e.target.value,
            slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
          }))}
          placeholder="Nom de la catégorie..."
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
          placeholder="Rechercher une catégorie..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          className="flex-1 text-sm text-[#3D2B1F] bg-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categoriesFiltrees.map(cat => (
          <div key={cat.id} className="border border-[#E8DFD0] rounded-2xl overflow-hidden">
   
            <div className="relative h-32 bg-[#E8DFD0]">
              {cat.photo ? (
                <img src={cat.photo} alt={cat.nom} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#8C7B6B]">
                  {uploadEnCours[cat.id] ? 'Upload...' : '+ Photo'}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={e => uploadPhoto(e, cat.id)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {cat.photo && (
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                  <p className="text-white text-xs opacity-0 hover:opacity-100">Changer</p>
                </div>
              )}
            </div>
}
            <div className="flex items-center justify-between px-3 py-2">
              <div>
                <p className="text-sm font-semibold text-[#3D2B1F]">{cat.nom}</p>
                <p className="text-xs text-[#8C7B6B]">{cat.slug}</p>
              </div>
              <button onClick={() => supprimerCategorie(cat.id)} className="text-red-400 hover:text-red-600 transition-colors">
                <X size={16} />
              </button>
            </div>

          </div>
        ))}

        {categoriesFiltrees.length === 0 && (
          <p className="col-span-3 text-center text-[#8C7B6B] py-10">Aucune catégorie trouvée.</p>
        )}
      </div>

    </div>
  )
}
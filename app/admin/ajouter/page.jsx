'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ZonePhoto from '@/components/ZonePhotos'
import ChampCouleurs from '@/components/ChampCouleurs'

export default function AjouterProduit() {
  const router = useRouter()
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const [photos, setPhotos] = useState(['', '', '', '', '', ''])
  const [uploadEnCours, setUploadEnCours] = useState([false, false, false, false, false, false])
  const [couleurs, setCouleurs] = useState([])
  const [marques, setMarques] = useState([])
  const [categories, setCategories] = useState([])
  const [slugDisponible, setSlugDisponible] = useState(true)
  const [nouvelleMarque, setNouvelleMarque] = useState('')
  const [nouvelleCategorie, setNouvelleCategorie] = useState('')
  const [form, setForm] = useState({
    nom: '',
    marque: '',
    taille: '',
    sexe: 'Homme',
    etat: 'Très bon état',
    prix: '',
    quantite: 1,
    description: '',
    categorie: '',
    disponible: true,
    slug: '',
  })

  useEffect(() => {
    const chargerDonnees = async () => {
      const { data: marquesData } = await supabase
        .from('marques')
        .select('*')
        .order('nom')
      setMarques(marquesData || [])

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('nom')
      setCategories(categoriesData || [])
    }
    chargerDonnees()
  }, [])

  const genererSlugUnique = async (texte) => {
    const slugBase = texte.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    let slug = slugBase
    let compteur = 1
    while (true) {
      const { data } = await supabase
        .from('produits')
        .select('id')
        .eq('slug', slug)
        .single()
      if (!data) break
      slug = `${slugBase}-${compteur}`
      compteur++
    }
    return slug
  }

  const verifierSlug = async (slug) => {
    const slugNettoye = slug.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const { data } = await supabase
      .from('produits')
      .select('id')
      .eq('slug', slugNettoye)
      .single()
    setSlugDisponible(!data)
    return !data
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    if (name === 'nom') {
      const slug = await genererSlugUnique(value)
      setSlugDisponible(true)
      setForm(prev => ({ ...prev, nom: value, slug }))
    } else if (name === 'slug') {
      setForm(prev => ({ ...prev, slug: value }))
      await verifierSlug(value)
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const corrigerSlug = async () => {
    const slugUnique = await genererSlugUnique(form.slug || form.nom)
    setForm(prev => ({ ...prev, slug: slugUnique }))
    setSlugDisponible(true)
  }

  const creerMarque = async () => {
    const nom = nouvelleMarque.trim()
    if (nom.length < 2) return

    const existe = marques.find(m => m.nom.toLowerCase() === nom.toLowerCase())
    if (!existe) {
      const { error } = await supabase.from('marques').insert([{ nom, afficher_filtre: false }])
      if (error) {
        alert('Erreur création marque : ' + error.message)
        return
      }
      const { data } = await supabase.from('marques').select('*').order('nom')
      setMarques(data || [])
    }

    setForm(prev => ({ ...prev, marque: nom }))
    setNouvelleMarque('')
  }

  const creerCategorie = async () => {
    const nom = nouvelleCategorie.trim()
    if (nom.length < 2) return
    const slug = nom.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')

    const existe = categories.find(c => c.slug === slug)
    if (!existe) {
      const { error } = await supabase.from('categories').insert([{ nom, slug }])
      if (error) {
        alert('Erreur création catégorie : ' + error.message)
        return
      }
      const { data } = await supabase.from('categories').select('*').order('nom')
      setCategories(data || [])
    }

    setForm(prev => ({ ...prev, categorie: slug }))
    setNouvelleCategorie('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    const slugFinal = await genererSlugUnique(form.slug || form.nom)
    const photosUrl = photos.filter(p => p !== '').join(',')

    const { error } = await supabase.from('produits').insert([{
      ...form,
      slug: slugFinal,
      prix: parseFloat(form.prix),
      quantite: parseInt(form.quantite),
      photos: photosUrl,
      couleur: couleurs.join(','),
    }])

    if (error) {
      setErreur(error.message)
      setChargement(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">

      <Link href="/admin" className="text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-8 inline-block">
        ← Retour au dashboard
      </Link>

      <h1 className="text-3xl font-bold text-[#3D2B1F] mb-8">Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">NOM</label>
            <input name="nom" value={form.nom} onChange={handleChange} required className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">MARQUE</label>
            <select name="marque" value={form.marque} onChange={handleChange} required className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]">
              <option value="">Choisir une marque...</option>
              {marques.map(m => (
                <option key={m.id} value={m.nom}>{m.nom}</option>
              ))}
              <option value="__nouvelle__">+ Nouvelle marque...</option>
            </select>
            {form.marque === '__nouvelle__' && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={nouvelleMarque}
                  placeholder="Nom de la nouvelle marque"
                  onChange={e => setNouvelleMarque(e.target.value)}
                  className="w-full border border-[#4A6FA5] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={creerMarque}
                  className="bg-[#4A6FA5] text-white px-4 rounded-xl text-sm whitespace-nowrap hover:opacity-80 transition-opacity"
                >
                  Créer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">PRIX (€)</label>
            <input name="prix" type="number" value={form.prix} onChange={handleChange} required className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">TAILLE</label>
            <input name="taille" value={form.taille} onChange={handleChange} required className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">CATÉGORIE</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]">
              <option value="">Choisir...</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.nom}</option>
              ))}
              <option value="__nouvelle__">+ Nouvelle catégorie...</option>
            </select>
            {form.categorie === '__nouvelle__' && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={nouvelleCategorie}
                  placeholder="Nom de la nouvelle catégorie"
                  onChange={e => setNouvelleCategorie(e.target.value)}
                  className="w-full border border-[#4A6FA5] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={creerCategorie}
                  className="bg-[#4A6FA5] text-white px-4 rounded-xl text-sm whitespace-nowrap hover:opacity-80 transition-opacity"
                >
                  Créer
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">ÉTAT</label>
            <select name="etat" value={form.etat} onChange={handleChange} className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]">
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
              <option value="État correct">État correct</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChampCouleurs couleurs={couleurs} setCouleurs={setCouleurs} />
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">SEXE</label>
            <select name="sexe" value={form.sexe} onChange={handleChange} className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F]">
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Unisexe">Unisexe</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">DESCRIPTION</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F] resize-none" />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">SLUG (URL)</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none ${slugDisponible ? 'border-[#E8DFD0] focus:border-[#3D2B1F]' : 'border-red-400 focus:border-red-400'}`}
          />
          {slugDisponible ? (
            <p className="text-xs text-green-600 mt-1">✓ Slug disponible</p>
          ) : (
            <div className="flex items-center gap-3 mt-1">
              <p className="text-xs text-red-500">✗ Slug déjà utilisé</p>
              <button
                type="button"
                onClick={corrigerSlug}
                className="text-xs text-[#4A6FA5] underline hover:opacity-60"
              >
                Corriger automatiquement
              </button>
            </div>
          )}
        </div>

        <ZonePhoto
          photos={photos}
          setPhotos={setPhotos}
          uploadEnCours={uploadEnCours}
          setUploadEnCours={setUploadEnCours}
          setErreur={setErreur}
        />

        {erreur && <p className="text-red-500 text-xs">{erreur}</p>}

        <button type="submit" disabled={chargement} className="bg-[#3D2B1F] text-[#F5F0E8] py-3 rounded-full text-sm hover:opacity-80 transition-opacity disabled:opacity-50 mt-4">
          {chargement ? 'Ajout en cours...' : 'Ajouter le produit'}
        </button>

      </form>
    </div>
  )
}
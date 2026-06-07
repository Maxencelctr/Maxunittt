'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import CarteProduit from '@/components/CarteProduit'
import { useSearchParams } from 'next/navigation'

const tailles = ["XS", "S", "M", "L", "XL", "XXL"]

function BoutiqueContenu() {
  const [produits, setProduits] = useState([])
  const [marques, setMarques] = useState([])
  const [categories, setCategories] = useState([])
  const [recherche, setRecherche] = useState('')
  const [marquesActives, setMarquesActives] = useState([])
  const [categoriesActives, setCategoriesActives] = useState([])
  const [taillesActives, setTaillesActives] = useState([])
  const [prixMin, setPrixMin] = useState('')
  const [prixMax, setPrixMax] = useState('')
  const [filtreOuvert, setFiltreOuvert] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })

  const searchParams = useSearchParams()

  useEffect(() => {
    const rechercheUrl = searchParams.get('recherche')
    if (rechercheUrl) setRecherche(rechercheUrl)
  }, [searchParams])

  useEffect(() => {
    const categorieUrl = searchParams.get('categorie')
    if (categorieUrl) setCategoriesActives([categorieUrl])
  }, [searchParams])

  useEffect(() => {
    const chargerDonnees = async () => {
      const { data: produitsData } = await supabase
        .from('produits')
        .select('*')
        .eq('disponible', true)
        .order('created_at', { ascending: false })
      setProduits(produitsData || [])

      const { data: marquesData } = await supabase
        .from('marques')
        .select('*')
        .eq('afficher_filtre', true)
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

  const toggleFiltre = (valeur, liste, setListe) => {
    if (liste.includes(valeur)) {
      setListe(liste.filter(v => v !== valeur))
    } else {
      setListe([...liste, valeur])
    }
  }

  const produitsFiltres = produits.filter(p => {
    if (recherche && !p.nom.toLowerCase().includes(recherche.toLowerCase()) && !p.marque.toLowerCase().includes(recherche.toLowerCase())) return false
    if (marquesActives.length > 0 && !marquesActives.some(m => m.toLowerCase() === p.marque.toLowerCase())) return false
    if (categoriesActives.length > 0 && !categoriesActives.includes(p.categorie)) return false
    if (taillesActives.length > 0 && !taillesActives.includes(p.taille)) return false
    if (prixMin && p.prix < parseInt(prixMin)) return false
    if (prixMax && p.prix > parseInt(prixMax)) return false
    return true
  })

  const FiltreBtn = ({ label, actifs, children }) => {
    const btnRef = useRef(null)

    const handleClick = () => {
      if (filtreOuvert === label) {
        setFiltreOuvert(null)
      } else {
        const rect = btnRef.current.getBoundingClientRect()
        setDropdownPos({
          top: rect.bottom + 4,
          left: rect.left
        })
        setFiltreOuvert(label)
      }
    }

    return (
      <div>
        <button
          ref={btnRef}
          onClick={handleClick}
          className={`flex items-center gap-1 px-3 py-2 rounded-full border text-xs whitespace-nowrap transition-colors ${actifs > 0 ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]' : 'border-[#E8DFD0] text-[#3D2B1F]'}`}
        >
          {label} {actifs > 0 && `(${actifs})`}
          <ChevronDown size={12} />
        </button>
      </div>
    )
  }

  const contenuMarques = marques.map(m => (
    <label key={m.id} className="flex items-center gap-2 text-sm text-[#3D2B1F] mb-2 cursor-pointer">
      <input type="checkbox" checked={marquesActives.includes(m.nom)} onChange={() => toggleFiltre(m.nom, marquesActives, setMarquesActives)} className="accent-[#3D2B1F]" />
      {m.nom}
    </label>
  ))

  const contenuCategories = categories.map(c => (
    <label key={c.id} className="flex items-center gap-2 text-sm text-[#3D2B1F] mb-2 cursor-pointer">
      <input type="checkbox" checked={categoriesActives.includes(c.slug)} onChange={() => toggleFiltre(c.slug, categoriesActives, setCategoriesActives)} className="accent-[#3D2B1F]" />
      {c.nom}
    </label>
  ))

  const contenuDropdown = {
    'Marque': contenuMarques,
    'Catégorie': contenuCategories,
    'Taille': (
      <div className="flex flex-wrap gap-2">
        {tailles.map(t => (
          <button key={t} onClick={() => toggleFiltre(t, taillesActives, setTaillesActives)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${taillesActives.includes(t) ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]' : 'border-[#E8DFD0] text-[#3D2B1F]'}`}>
            {t}
          </button>
        ))}
      </div>
    ),
    'Prix': (
      <div className="flex flex-col gap-2">
        <input type="number" placeholder="Min €" value={prixMin} onChange={e => setPrixMin(e.target.value)} className="w-full border border-[#E8DFD0] rounded-lg px-3 py-2 text-sm text-[#3D2B1F] bg-[#F5F0E8]" />
        <input type="number" placeholder="Max €" value={prixMax} onChange={e => setPrixMax(e.target.value)} className="w-full border border-[#E8DFD0] rounded-lg px-3 py-2 text-sm text-[#3D2B1F] bg-[#F5F0E8]" />
      </div>
    )
  }

  const panneauFiltresDesktop = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold text-[#3D2B1F] mb-2">Marque</p>
        {contenuMarques}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3D2B1F] mb-2">Catégorie</p>
        {contenuCategories}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3D2B1F] mb-2">Taille</p>
        <div className="flex flex-wrap gap-2">
          {tailles.map(t => (
            <button key={t} onClick={() => toggleFiltre(t, taillesActives, setTaillesActives)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${taillesActives.includes(t) ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]' : 'border-[#E8DFD0] text-[#3D2B1F]'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3D2B1F] mb-2">Fourchette de prix</p>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={prixMin} onChange={e => setPrixMin(e.target.value)} className="w-full border border-[#E8DFD0] rounded-lg px-2 py-1 text-sm text-[#3D2B1F] bg-transparent" />
          <input type="number" placeholder="Max" value={prixMax} onChange={e => setPrixMax(e.target.value)} className="w-full border border-[#E8DFD0] rounded-lg px-2 py-1 text-sm text-[#3D2B1F] bg-transparent" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="px-4 md:px-8 py-6 md:py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-1">Boutique</h1>
      <p className="text-sm text-[#8C7B6B] mb-4">{produitsFiltres.length} articles disponibles</p>

      <div className="flex items-center gap-2 border border-[#E8DFD0] rounded-full px-4 py-2 mb-3">
        <Search size={16} className="text-[#8C7B6B]" />
        <input type="text" placeholder="Rechercher..." value={recherche} onChange={e => setRecherche(e.target.value)} className="flex-1 text-sm text-[#3D2B1F] bg-transparent outline-none" />
        {recherche && <button onClick={() => setRecherche('')}><X size={14} className="text-[#8C7B6B]" /></button>}
      </div>

      {/* Filtres mobile style Vinted */}
      <div className="md:hidden mb-4" style={{overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
        <div style={{display: 'flex', gap: '8px', width: 'max-content', paddingBottom: '8px'}}>
          <FiltreBtn label="Marque" actifs={marquesActives.length} />
          <FiltreBtn label="Catégorie" actifs={categoriesActives.length} />
          <FiltreBtn label="Taille" actifs={taillesActives.length} />
          <FiltreBtn label="Prix" actifs={(prixMin || prixMax) ? 1 : 0} />

          {(marquesActives.length > 0 || categoriesActives.length > 0 || taillesActives.length > 0 || prixMin || prixMax) && (
            <button
              onClick={() => { setMarquesActives([]); setCategoriesActives([]); setTaillesActives([]); setPrixMin(''); setPrixMax('') }}
              className="flex items-center gap-1 px-3 py-2 rounded-full border border-red-200 text-red-400 text-xs whitespace-nowrap"
            >
              <X size={12} /> Effacer
            </button>
          )}
        </div>
      </div>

      {/* Dropdown en position fixe — en dehors du scroll */}
      {filtreOuvert && contenuDropdown[filtreOuvert] && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setFiltreOuvert(null)}
          />
          <div
            className="bg-[#F5F0E8] border border-[#E8DFD0] rounded-2xl p-4 shadow-lg min-w-48 max-h-64 overflow-y-auto"
            style={{position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, zIndex: 9999}}
          >
            {contenuDropdown[filtreOuvert]}
          </div>
        </>
      )}

      <div className="flex gap-8">
        <div className="hidden md:block w-52 shrink-0">
          <p className="text-xs font-semibold tracking-widest text-[#8C7B6B] mb-4">FILTRES</p>
          {panneauFiltresDesktop}
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {produitsFiltres.map(produit => (
              <CarteProduit key={produit.id} produit={produit} />
            ))}
          </div>
          {produitsFiltres.length === 0 && (
            <p className="text-center text-[#8C7B6B] py-20">Aucun produit ne correspond à ta recherche.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Boutique() {
  return (
    <Suspense fallback={<div className="px-8 py-10 text-[#8C7B6B]">Chargement...</div>}>
      <BoutiqueContenu />
    </Suspense>
  )
}
'use client'

import { useState } from 'react'
import { Search, Heart, X, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [rechercheOuverte, setRechercheOuverte] = useState(false)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [terme, setTerme] = useState('')
  const router = useRouter()

  const handleRecherche = (e) => {
    e.preventDefault()
    if (terme.trim()) {
      router.push(`/boutique?recherche=${terme}`)
      setRechercheOuverte(false)
      setMenuOuvert(false)
      setTerme('')
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 bg-[#F5F0E8] border-b border-[#E8DFD0]">

        <div className={rechercheOuverte ? 'hidden md:block' : ''}>
          <Image src="/maxunitt-texte.png" alt="maxunittt" height={28} width={90} />
        </div>

        {rechercheOuverte ? (
          <form onSubmit={handleRecherche} className="flex flex-1 mx-2 md:mx-8 items-center gap-2 border border-[#E8DFD0] rounded-full px-4 py-2">
            <Search size={16} className="text-[#8C7B6B]" />
            <input
              type="text"
              placeholder="Rechercher un produit, une marque..."
              value={terme}
              onChange={e => setTerme(e.target.value)}
              className="flex-1 text-sm text-[#3D2B1F] bg-transparent outline-none"
              autoFocus
            />
            <button type="button" onClick={() => setRechercheOuverte(false)}>
              <X size={16} className="text-[#8C7B6B]" />
            </button>
          </form>
        ) : (
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-sm text-[#3D2B1F] hover:opacity-60 transition-opacity">Accueil</Link>
            <Link href="/boutique" className="text-sm text-[#3D2B1F] hover:opacity-60 transition-opacity">Boutique</Link>
            <Link href="/nouveautes" className="text-sm text-[#3D2B1F] hover:opacity-60 transition-opacity">Nouveautés</Link>
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={() => { setRechercheOuverte(!rechercheOuverte); setMenuOuvert(false) }} className="text-[#3D2B1F] hover:opacity-60 transition-opacity">
            {rechercheOuverte ? <X size={20} /> : <Search size={20} />}
          </button>
          {!rechercheOuverte && (
            <Link href="/favoris" className="text-[#3D2B1F] hover:opacity-60 transition-opacity">
              <Heart size={20} />
            </Link>
          )}
          <Link href="/contact" className="hidden md:block bg-[#3D2B1F] text-[#F5F0E8] text-sm px-5 py-2 rounded-full hover:opacity-80 transition-opacity">
            Contact
          </Link>
          {!rechercheOuverte && (
            <button onClick={() => setMenuOuvert(!menuOuvert)} className="md:hidden text-[#3D2B1F]">
              {menuOuvert ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

      </nav>

      {menuOuvert && !rechercheOuverte && (
        <div className="md:hidden bg-[#F5F0E8] border-b border-[#E8DFD0] px-4 py-6 flex flex-col gap-5">
          <Link href="/" onClick={() => setMenuOuvert(false)} className="text-base text-[#3D2B1F] font-medium">Accueil</Link>
          <Link href="/boutique" onClick={() => setMenuOuvert(false)} className="text-base text-[#3D2B1F] font-medium">Boutique</Link>
          <Link href="/nouveautes" onClick={() => setMenuOuvert(false)} className="text-base text-[#3D2B1F] font-medium">Nouveautés</Link>
          <Link href="/favoris" onClick={() => setMenuOuvert(false)} className="text-base text-[#3D2B1F] font-medium">Favoris</Link>
          <Link href="/contact" onClick={() => setMenuOuvert(false)} className="bg-[#3D2B1F] text-[#F5F0E8] text-sm px-5 py-3 rounded-full text-center">
            Contact
          </Link>
        </div>
      )}
    </>
  )
}
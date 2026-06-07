'use client'

import { useState } from 'react'

export default function ChampCouleurs({ couleurs, setCouleurs }) {
  const [input, setInput] = useState('')

  const ajouterCouleur = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const nouvelle = input.trim()
      if (nouvelle && !couleurs.includes(nouvelle)) {
        setCouleurs([...couleurs, nouvelle])
        setInput('')
      }
    }
  }

  const supprimerCouleur = (couleur) => {
    setCouleurs(couleurs.filter(c => c !== couleur))
  }

  return (
    <div>
      <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">COULEUR(S)</label>
      <div className="mt-1 border border-[#E8DFD0] rounded-xl px-4 py-3 flex flex-wrap gap-2">
        {couleurs.map(couleur => (
          <span key={couleur} className="flex items-center gap-1 bg-[#E8DFD0] text-[#3D2B1F] text-xs px-3 py-1 rounded-full">
            {couleur}
            <button
              type="button"
              onClick={() => supprimerCouleur(couleur)}
              className="text-[#8C7B6B] hover:text-red-500 transition-colors ml-1"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={ajouterCouleur}
          placeholder={couleurs.length === 0 ? 'Taper une couleur + Entrée' : '+ Ajouter'}
          className="flex-1 min-w-24 text-sm text-[#3D2B1F] bg-transparent outline-none"
        />
      </div>
      <p className="text-xs text-[#8C7B6B] mt-1">Appuie sur Entrée pour ajouter une couleur</p>
    </div>
  )
}
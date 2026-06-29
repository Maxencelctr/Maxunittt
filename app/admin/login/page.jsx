'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
  setErreur('Email ou mot de passe incorrect.')
  setChargement(false)
} else {
  setTimeout(() => {
    router.push('/admin')
  }, 500)
}
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        
        <h1 className="text-3xl font-bold text-[#3D2B1F] mb-2 text-center">Admin</h1>
        <p className="text-sm text-[#8C7B6B] text-center mb-8">Connexion à l'espace de gestion</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F] transition-colors"
              placeholder="ton@email.com"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">MOT DE PASSE</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-[#E8DFD0] rounded-xl px-4 py-3 text-sm text-[#3D2B1F] bg-transparent mt-1 outline-none focus:border-[#3D2B1F] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {erreur && (
            <p className="text-red-500 text-xs text-center">{erreur}</p>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="bg-[#3D2B1F] text-[#F5F0E8] py-3 rounded-full text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>
      </div>
    </div>
  )
}
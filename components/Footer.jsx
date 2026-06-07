import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F5F0E8] px-8 py-10">

      {/* Partie haute */}
      <div className="border-b border-[#D4C9B8] pb-8 mb-6 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3D2B1F] whitespace-nowrap mb-6">
          Chaque pièce a une histoire. La tienne commence ici.
        </h2>
        <div className="flex gap-3">
          <Link href="/boutique" className="bg-[#3D2B1F] text-[#F5F0E8] text-sm px-5 py-2 rounded-full hover:opacity-80 transition-opacity">
            Explorer la collection
          </Link>
          <Link href="/contact" className="border border-[#3D2B1F] text-[#3D2B1F] text-sm px-5 py-2 rounded-full hover:opacity-60 transition-opacity">
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Partie basse */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-sm font-semibold text-[#3D2B1F]">maxunittt</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <Link href="/" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Accueil</Link>
          <Link href="/boutique" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Boutique</Link>
          <Link href="/nouveautes" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Nouveautés</Link>
          <Link href="/favoris" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Favoris</Link>
          <Link href="/contact" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Contact</Link>
          <a href="https://www.instagram.com/max.unittt/" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Instagram</a>
          <a href="mailto:max.unittt@gmail.com" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Email</a>
        </div>
        <p className="text-xs text-[#8C7B6B]">© 2026 maxunittt</p>
      </div>

    </footer>
  )
}
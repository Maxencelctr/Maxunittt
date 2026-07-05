import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F5F0E8] px-4 md:px-8 py-8 md:py-10">
      <div className="border-b border-[#D4C9B8] pb-6 mb-6 flex flex-col items-center text-center">
        <h2 className="text-xl md:text-3xl font-bold text-[#3D2B1F] mb-5 max-w-lg">
          Chaque pièce a une histoire. La tienne commence ici.
        </h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto px-4 md:px-0">
          <Link href="/boutique" className="bg-[#3D2B1F] text-[#F5F0E8] text-sm px-5 py-2 rounded-full text-center hover:opacity-80 transition-opacity">
            Explorer la collection
          </Link>
          <Link href="/contact" className="border border-[#3D2B1F] text-[#3D2B1F] text-sm px-5 py-2 rounded-full text-center hover:opacity-60 transition-opacity">
            Nous contacter
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
        <p className="text-sm font-semibold text-[#3D2B1F]">maxunittt</p>
        <div className="flex flex-wrap gap-3 md:gap-6">
          <Link href="/" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Accueil</Link>
          <Link href="/boutique" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Boutique</Link>
          <Link href="/nouveautes" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Nouveautés</Link>
          <Link href="/mon-histoire" className="text-xs text-[#8C7B6B] hover:opacity-60 transition-opacity">Mon Histoire</Link>
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
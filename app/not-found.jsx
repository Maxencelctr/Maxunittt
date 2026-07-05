import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-8">
      <div className="text-center max-w-md">

        <p className="text-8xl font-bold text-[#E8DFD0] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          404
        </p>

        <h1 className="text-2xl font-bold text-[#3D2B1F] mb-3">
          Cette pièce n&apos;existe pas (ou plus)
        </h1>

        <p className="text-sm text-[#8C7B6B] mb-8">
          La page que tu cherches a peut-être été vendue, déplacée, ou n&apos;a jamais existé.
          Comme les bonnes pièces vintage : quand c&apos;est parti, c&apos;est parti.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/boutique"
            className="bg-[#3D2B1F] text-[#F5F0E8] text-sm px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            Voir la boutique
          </Link>
          <Link
            href="/"
            className="border border-[#3D2B1F] text-[#3D2B1F] text-sm px-6 py-3 rounded-full hover:opacity-60 transition-opacity"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </div>
  )
}

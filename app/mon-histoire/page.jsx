import Link from 'next/link'

export const metadata = {
  title: 'Mon Histoire — Maxunittt | Streetwear seconde main sélectionné en Normandie',
  description:
    "Maxunittt, c'est un étudiant de 18 ans passionné de streetwear qui chine, sélectionne et remet en circulation des pièces vintage et seconde main. Découvre l'histoire derrière la marque.",
}

export default function MonHistoire() {
  return (
    <div className="px-8 py-16 max-w-3xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs text-[#4A6FA5] font-semibold tracking-widest mb-3">MON HISTOIRE</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B1F] mb-4">
          Derrière Maxunittt
        </h1>
        <p className="text-[#8C7B6B] text-sm max-w-xl mx-auto">
          Pas une entreprise. Pas un algorithme. Juste un passionné qui chine des pièces
          qui méritent une seconde vie.
        </p>
      </div>

      {/* Section 1 — Qui je suis */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#3D2B1F] mb-4">Qui je suis</h2>
        <div className="text-sm text-[#3D2B1F] leading-relaxed space-y-4">
          <p>
            Moi c&apos;est Maxence, 18 ans, étudiant en développement web en Normandie.
            Maxunittt, c&apos;est mon projet perso : je chine des vêtements streetwear et
            vintage, je les sélectionne un par un, et je les remets en circulation.
          </p>
          <p>
            Ce site, je l&apos;ai codé moi-même de A à Z. Chaque pièce que tu vois ici,
            je l&apos;ai eue entre les mains, inspectée, photographiée. Il n&apos;y a pas
            d&apos;entrepôt, pas de dropshipping : juste ma sélection.
          </p>
        </div>
      </section>

      {/* Section 2 — Pourquoi la seconde main */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#3D2B1F] mb-4">Pourquoi la seconde main</h2>
        <div className="text-sm text-[#3D2B1F] leading-relaxed space-y-4">
          <p>
            Le streetwear d&apos;aujourd&apos;hui sort en masse et se ressemble. Les vraies
            pièces — celles avec une coupe, une matière, une histoire — elles existent déjà.
            Elles dorment dans des friperies, des vide-greniers, des armoires.
          </p>
          <p>
            Acheter seconde main, c&apos;est porter des pièces que personne d&apos;autre
            n&apos;a, payer moins cher pour de la meilleure qualité, et éviter de produire
            du neuf pour rien. Triple gagnant.
          </p>
        </div>
      </section>

      {/* Section 3 — Comment je sélectionne */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#3D2B1F] mb-4">Comment je sélectionne</h2>
        <div className="text-sm text-[#3D2B1F] leading-relaxed space-y-4">
          <p>
            Je ne mets pas tout en ligne. Chaque pièce passe un filtre simple :
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-[#4A6FA5] font-bold shrink-0">01</span>
              <span><strong>L&apos;état.</strong> J&apos;inspecte coutures, cols, zips et
              impressions. L&apos;état annoncé sur la fiche, c&apos;est l&apos;état réel.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4A6FA5] font-bold shrink-0">02</span>
              <span><strong>La marque et l&apos;authenticité.</strong> Étiquettes, logos,
              finitions : je vérifie que la pièce est ce qu&apos;elle prétend être.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#4A6FA5] font-bold shrink-0">03</span>
              <span><strong>Le style.</strong> Si je ne la porterais pas moi-même,
              elle ne rentre pas dans la boutique. Simple.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <div className="bg-[#EDE8DE] rounded-3xl px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-[#3D2B1F] mb-3">
          Jette un œil à la sélection
        </h2>
        <p className="text-sm text-[#8C7B6B] mb-6 max-w-md mx-auto">
          Les pièces partent vite et ne reviennent pas — c&apos;est le principe de
          l&apos;unique. Suis le compte Instagram pour voir les nouveautés en premier.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/boutique"
            className="bg-[#3D2B1F] text-[#F5F0E8] text-sm px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            Voir la boutique
          </Link>
          <a
            href="https://www.instagram.com/max.unittt/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#3D2B1F] text-[#3D2B1F] text-sm px-6 py-3 rounded-full hover:opacity-60 transition-opacity"
          >
            @max.unittt sur Instagram
          </a>
        </div>
      </div>

    </div>
  )
}

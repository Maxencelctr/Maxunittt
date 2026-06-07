import Link from 'next/link'
import BoutonFavori from '@/components/BoutonFavori'
import { supabase } from '@/lib/supabase'
import CarouselPhotos from '@/components/CarouselPhotos'
import CarteProduit from '@/components/CarteProduit'

export default async function FicheProduit({ params }) {
  const { slug } = await params

  const { data: produit } = await supabase
    .from('produits')
    .select('*')
    .eq('slug', slug)
    .single()

  const tabPhotos = produit?.photos ? produit.photos.split(',') : []

  const { data: produitsSimilaires } = await supabase
    .from('produits')
    .select('*')
    .eq('disponible', true)
    .neq('categorie', '')
    .neq('id', produit.id)
    .limit(4)

  if (!produit) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-[#8C7B6B]">Produit introuvable.</p>
        <Link href="/boutique" className="text-[#4A6FA5] text-sm mt-4 inline-block">← Retour à la boutique</Link>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 py-6 md:py-10">

      <Link href="/boutique" className="text-sm text-[#8C7B6B] hover:opacity-60 transition-opacity mb-6 md:mb-8 inline-block">
        ← Retour à la boutique
      </Link>

      <div className="flex flex-col md:flex-row md:gap-12 md:justify-center">

        <div className="w-full md:w-[35%] mb-6 md:mb-0">
          <CarouselPhotos photos={tabPhotos} />
        </div>

        <div className="w-full md:w-[45%]">

          {produit.disponible === false && (
            <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full mb-4 inline-block">Vendu</span>
          )}

          <p className="text-xs tracking-widest text-[#4A6FA5] font-semibold mb-2">{produit.marque}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">{produit.nom}</h1>
          <p className="text-2xl md:text-3xl font-bold text-[#3D2B1F] mb-6">{produit.prix} €</p>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
            <div className="bg-[#F5F0E8] rounded-xl p-3 md:p-4">
              <p className="text-xs text-[#8C7B6B] mb-1">Taille</p>
              <p className="text-sm font-semibold text-[#3D2B1F]">{produit.taille}</p>
            </div>
            <div className="bg-[#F5F0E8] rounded-xl p-3 md:p-4">
              <p className="text-xs text-[#8C7B6B] mb-1">État</p>
              <p className="text-sm font-semibold text-[#3D2B1F]">{produit.etat}</p>
            </div>
            <div className="bg-[#F5F0E8] rounded-xl p-3 md:p-4">
              <p className="text-xs text-[#8C7B6B] mb-1">Couleur</p>
              <p className="text-sm font-semibold text-[#3D2B1F]">{produit.couleur}</p>
            </div>
            <div className="bg-[#F5F0E8] rounded-xl p-3 md:p-4">
              <p className="text-xs text-[#8C7B6B] mb-1">Catégorie</p>
              <p className="text-sm font-semibold text-[#3D2B1F]">{produit.categorie}</p>
            </div>
          </div>

          <p className="text-sm text-[#8C7B6B] mb-6 md:mb-8 leading-relaxed">{produit.description}</p>

          <div className="flex gap-3">
            <a href="https://www.instagram.com/max.unittt/" target="_blank" className="flex-1 bg-[#3D2B1F] text-[#F5F0E8] py-3 rounded-full text-center text-sm hover:opacity-80 transition-opacity">
              Contacter sur Instagram
            </a>
            <BoutonFavori produit={produit} />
          </div>

        </div>
      </div>

      {produitsSimilaires && produitsSimilaires.length > 0 && (
        <section className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#3D2B1F] mb-6 md:mb-8">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {produitsSimilaires.map(p => (
              <CarteProduit key={p.id} produit={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
import { supabase } from '@/lib/supabase'
import { SITE_URL } from '@/lib/config-site'

export default async function sitemap() {
  // Pages statiques
  const pagesStatiques = [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'daily' },
    { url: `${SITE_URL}/boutique`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${SITE_URL}/nouveautes`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${SITE_URL}/mon-histoire`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`, priority: 0.5, changeFrequency: 'monthly' },
  ].map(p => ({ ...p, lastModified: new Date() }))

  // Pages produits (dynamiques depuis Supabase)
  let pagesProduits = []
  try {
    const { data: produits } = await supabase
      .from('produits')
      .select('slug, date_ajout')

    pagesProduits = (produits || []).map(p => ({
      url: `${SITE_URL}/produits/${p.slug}`,
      lastModified: p.date_ajout ? new Date(p.date_ajout) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch (e) {
    // si Supabase ne répond pas, on renvoie au moins les pages statiques
  }

  return [...pagesStatiques, ...pagesProduits]
}
import { SITE_URL } from '@/lib/config-site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/favoris'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
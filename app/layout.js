import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FavorisProvider } from '@/lib/FavoriContext'
import { SITE_URL, SITE_NAME, INSTAGRAM_URL } from '@/lib/config-site'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maxunittt — Streetwear seconde main sélectionné",
    template: "%s | Maxunittt",
  },
  description: "Sélection de pièces streetwear et vintage seconde main multimarques : Carhartt, Calvin Klein, Tommy Hilfiger, Ralph Lauren, Nike, Adidas et plus. Des pièces triées une par une.",
  keywords: ["maxunittt", "streetwear seconde main", "vintage", "friperie en ligne", "Carhartt", "Nike", "Tommy Hilfiger", "Ralph Lauren"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Maxunittt — Streetwear seconde main sélectionné",
    description: "Pièces streetwear et vintage seconde main triées une par une. Chaque pièce est unique.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxunittt — Streetwear seconde main sélectionné",
    description: "Pièces streetwear et vintage seconde main triées une par une.",
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: "Sélection de pièces streetwear et vintage seconde main multimarques.",
    sameAs: [INSTAGRAM_URL],
  }

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FavorisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </FavorisProvider>
      </body>
    </html>
  )
}
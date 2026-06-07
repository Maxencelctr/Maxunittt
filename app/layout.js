import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FavorisProvider } from '@/lib/FavoriContext'

export const metadata = {
  title: "Maxunittt - Pièces de qualité seconde main",
  description: "Sélection de pièces seconde main multimarques : Carhartt, Calvin Klein, Tommy Hilfiger, Ralph Lauren, Nike, Adidas et plus. Des pièces triées avec soin.",
}

export default function RootLayout ({ children}) {
  return (
    <html lang="fr">
      <body>
        <FavorisProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </FavorisProvider>
      </body>
    </html>
  )
}
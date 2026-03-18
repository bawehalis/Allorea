import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import Header    from '@/components/layout/Header'
import Footer    from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import Providers  from '@/components/ui/Providers'

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display:  'swap',
})

export const viewport: Viewport = {
  themeColor: '#0f0e0c',
  width:      'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://allorea-cosmetics.com'),
  title: {
    default:  'ALLOREA — Lüks Cilt Bakımı',
    template: '%s | ALLOREA',
  },
  description: 'En seçkin doğal bileşenlerden ilham alan lüks güzellik ürünleri. Dermatolojik olarak test edilmiş, cruelty-free, sürdürülebilir.',
  keywords: ['lüks kozmetik', 'cilt bakımı', 'allorea', 'serum', 'premium güzellik'],
  authors: [{ name: 'ALLOREA' }],
  creator: 'ALLOREA Cosmetics',
  openGraph: {
    type:     'website',
    locale:   'tr_TR',
    siteName: 'ALLOREA',
    title:    'ALLOREA — Lüks Cilt Bakımı',
    description: 'En seçkin doğal bileşenlerden ilham alan lüks güzellik ürünleri.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ALLOREA Cosmetics' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'ALLOREA Cosmetics',
    description: 'Lüks güzellik ürünleri.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Providers>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

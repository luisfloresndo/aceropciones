import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Montserrat, JetBrains_Mono } from 'next/font/google'
import { StructuredData } from '@/components/seo/StructuredData'
import './globals.css'

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// En Vercel: VERCEL_PROJECT_PRODUCTION_URL = dominio de producción (sin
// protocolo). Cuando se conecte el dominio custom aceropciones.com.mx
// a Vercel, esta variable pasa automáticamente a apuntar ahí.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://aceropciones.com.mx'
const DESCRIPTION =
  'Aceropciones y Maquilas (AOM) — soluciones integrales de acero y maquila industrial de precisión en el norte de México. Acero con precisión, soluciones a la medida.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aceropciones y Maquilas — Acero con precisión',
    template: '%s — Aceropciones y Maquilas',
  },
  description: DESCRIPTION,
  keywords: [
    'acero',
    'maquila industrial',
    'manufactura de precisión',
    'corte láser',
    'rolado',
    'nivelación de lámina',
    'Nuevo León',
    'San Nicolás de los Garza',
    'PTR',
    'viga IPR',
    'acero inoxidable',
  ],
  authors: [{ name: 'Aceropciones y Maquilas' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'Aceropciones y Maquilas',
    title: 'Aceropciones y Maquilas — Acero con precisión',
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aceropciones y Maquilas — Acero con precisión, soluciones a la medida.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aceropciones y Maquilas — Acero con precisión',
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  // TODO: cuando registres el sitio en Google Search Console, agrega
  // el código de verificación aquí (Search Console te da un string):
  // verification: { google: 'TU-CODIGO-AQUI' },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-MX"
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-aom-black font-sans text-aom-white antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  )
}

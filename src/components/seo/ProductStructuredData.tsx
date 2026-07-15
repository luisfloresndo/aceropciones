import type { Producto } from '@/data/content'
import { brand } from '@/data/content'

/**
 * JSON-LD Product schema por página de producto — habilita rich
 * snippets (nombre, imagen, marca, categoría) en resultados de Google.
 */
export function ProductStructuredData({ producto }: { producto: Producto }) {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aceropciones.com.mx'

  const url = `${base}/productos/${producto.slug}`

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.resumen,
    image: `${base}/productos/${producto.slug}.jpg`,
    url,
    category: 'Acero industrial',
    brand: {
      '@type': 'Brand',
      name: brand.fullName,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
    },
    ...(producto.grados && {
      material: producto.grados.join(', '),
    }),
    ...(producto.presentaciones && {
      hasVariant: producto.presentaciones.map((p) => ({
        '@type': 'ProductModel',
        name: p,
      })),
    }),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      url,
      seller: {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

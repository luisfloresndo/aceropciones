import type { MetadataRoute } from 'next'
import { catalogo } from '@/data/content'

/**
 * Sitemap dinámico — home + 11 páginas de producto.
 * Google usa esto para descubrir toda la estructura del sitio.
 * Usa la URL de producción configurada en Vercel (una vez que el
 * dominio custom esté conectado, VERCEL_PROJECT_PRODUCTION_URL
 * apunta a aceropciones.com.mx automáticamente).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aceropciones.com.mx'

  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = catalogo.map((p) => ({
    url: `${base}/productos/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}

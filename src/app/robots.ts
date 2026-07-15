import type { MetadataRoute } from 'next'

/**
 * robots.txt dinámico — permite indexar todo, apunta al sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aceropciones.com.mx'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

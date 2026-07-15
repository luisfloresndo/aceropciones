import { brand, contacto, catalogo } from '@/data/content'

/**
 * Structured data (JSON-LD) para Google — Organization + LocalBusiness.
 * Habilita rich snippets: dirección, teléfono, horario en resultados
 * de búsqueda. Se renderiza como <script type="application/ld+json">.
 */
export function StructuredData() {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aceropciones.com.mx'

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${base}/#organization`,
    name: brand.fullName,
    alternateName: 'AOM',
    legalName: brand.fullName,
    description:
      'Suministro de acero y maquila industrial de precisión en el norte de México. Perfil estructural, lámina, placa, tubería y aceros especiales.',
    url: base,
    logo: `${base}/aom-logo.png`,
    image: `${base}/og-image.jpg`,
    telephone: contacto.telefono,
    email: contacto.ejecutivos[0].correo,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Puerto de Veracruz No. 225, Col. La Fe',
      addressLocality: 'San Nicolás de los Garza',
      addressRegion: 'Nuevo León',
      postalCode: '66477',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7539,
      longitude: -100.2842,
    },
    areaServed: [
      { '@type': 'State', name: 'Nuevo León' },
      { '@type': 'State', name: 'Tamaulipas' },
      { '@type': 'State', name: 'Coahuila' },
      { '@type': 'Country', name: 'México' },
    ],
    slogan: brand.lema,
    foundingDate: '2005',
    knowsAbout: [
      'Suministro de acero',
      'Maquila industrial',
      'Corte láser',
      'Rolado de lámina',
      'Nivelación de lámina',
      'Perfiles estructurales',
      'Fabricación metálica',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de acero AOM',
      itemListElement: catalogo.map((p, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Product',
          name: p.nombre,
          description: p.descripcion,
          url: `${base}/productos/${p.slug}`,
          image: `${base}/productos/${p.slug}.jpg`,
        },
      })),
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base,
    name: brand.fullName,
    publisher: { '@id': `${base}/#organization` },
    inLanguage: 'es-MX',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}

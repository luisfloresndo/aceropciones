import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getProducto, fotoProducto } from '@/data/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Aceropciones y Maquilas'

async function loadLocal(relative: string) {
  const filePath = path.join(process.cwd(), 'public', relative.replace(/^\//, ''))
  return readFile(filePath)
}

async function loadFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&display=swap`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
  ).then((r) => r.text())
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`Font url not found for ${family}`)
  return fetch(url).then((r) => r.arrayBuffer())
}

export default async function ProductOG({
  params,
}: {
  params: { slug: string }
}) {
  const producto = getProducto(params.slug)
  if (!producto) {
    return new ImageResponse(<div>404</div>, size)
  }

  const fotoPath = fotoProducto(producto.slug)

  const [bebas, montLight, montMed, logoBuf, fotoBuf] = await Promise.all([
    loadFont('Bebas Neue', 400).catch(() => null),
    loadFont('Montserrat', 300).catch(() => null),
    loadFont('Montserrat', 500).catch(() => null),
    loadLocal('aom-logo.png').catch(() => null),
    fotoPath ? loadLocal(fotoPath).catch(() => null) : Promise.resolve(null),
  ])

  const logoSrc = logoBuf
    ? `data:image/png;base64,${Buffer.from(logoBuf).toString('base64')}`
    : null
  const fotoSrc = fotoBuf
    ? `data:image/jpeg;base64,${Buffer.from(fotoBuf).toString('base64')}`
    : null

  const fonts: Array<{ name: string; data: ArrayBuffer; weight: 300 | 400 | 500 }> = []
  if (bebas) fonts.push({ name: 'Bebas Neue', data: bebas, weight: 400 })
  if (montLight) fonts.push({ name: 'Montserrat', data: montLight, weight: 300 })
  if (montMed) fonts.push({ name: 'Montserrat', data: montMed, weight: 500 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0A0A0B',
          fontFamily: 'Montserrat',
          color: '#F3F4F6',
          position: 'relative',
        }}
      >
        {/* product photo on the right */}
        {fotoSrc && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 560,
              display: 'flex',
            }}
          >
            <img
              src={fotoSrc}
              width={560}
              height={630}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            {/* gradient fade to left to blend into dark bg */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, #0A0A0B 0%, rgba(10,10,11,0.55) 35%, rgba(10,10,11,0.05) 100%)',
              }}
            />
          </div>
        )}

        {/* radial blue glow */}
        <div
          style={{
            position: 'absolute',
            left: -120,
            top: -120,
            width: 760,
            height: 760,
            background:
              'radial-gradient(circle, rgba(76,107,150,0.32) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '64px 72px',
            width: fotoSrc ? 720 : '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* top — logo + eyebrow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {logoSrc && (
              <img
                src={logoSrc}
                width={260}
                height={158}
                style={{ objectFit: 'contain' }}
              />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 18,
                fontWeight: 500,
                color: '#9CA3AF',
                letterSpacing: 6,
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: '#4C6B96',
                  display: 'flex',
                }}
              />
              Catálogo de acero
            </div>
          </div>

          {/* middle — product name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: 124,
                lineHeight: 0.95,
                letterSpacing: 1,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              {producto.nombre}
            </div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                fontWeight: 300,
                color: '#C6CBD4',
                maxWidth: 620,
                display: 'flex',
              }}
            >
              {producto.resumen}
            </div>
          </div>

          {/* bottom — brand line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 17,
              fontWeight: 500,
              color: '#7B97C2',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Aceropciones y Maquilas
            <span style={{ color: '#4C6B96' }}>·</span>
            <span style={{ color: '#8B95A8' }}>AOM</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  )
}

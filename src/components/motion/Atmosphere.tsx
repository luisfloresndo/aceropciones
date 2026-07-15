import Image from 'next/image'

/**
 * Fondo atmosférico reutilizable — CADA sección tiene su propia paleta y
 * mood: cálido industrial, azul técnico blueprint, metálico neutro,
 * spotlight dramático. Rompe la sensación de "todo azul-acero igual".
 * ATLAS §0: "Atmósfera por sección — texturas, ritmo por escenas".
 */
type Tone =
  | 'warm-amber' // Rebrand, Maquila — chispas, industrial cálido
  | 'blueprint-cool' // Catálogo, Proceso — técnico frío azul-cyan
  | 'steel-neutral' // AntesDespues, Sectores — gris metálico
  | 'spotlight-drama' // Statement — spotlight cinematográfico central
  | 'metal-luminous' // Valores — metal brillante

type Position =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center'
  | 'sides'

const tonePalette: Record<Tone, { primary: string; secondary?: string }> = {
  'warm-amber': {
    primary: 'rgba(216, 145, 74, 0.22)',
    secondary: 'rgba(196, 108, 52, 0.14)',
  },
  'blueprint-cool': {
    primary: 'rgba(88, 148, 200, 0.22)',
    secondary: 'rgba(120, 170, 220, 0.14)',
  },
  'steel-neutral': {
    primary: 'rgba(180, 190, 210, 0.18)',
    secondary: 'rgba(140, 155, 180, 0.10)',
  },
  'spotlight-drama': {
    primary: 'rgba(245, 240, 220, 0.20)',
    secondary: 'rgba(76, 107, 150, 0.14)',
  },
  'metal-luminous': {
    primary: 'rgba(200, 210, 225, 0.24)',
    secondary: 'rgba(76, 107, 150, 0.12)',
  },
}

const positionCoords: Record<Position, string> = {
  'top-right': '82% 18%',
  'top-left': '18% 18%',
  'bottom-right': '82% 82%',
  'bottom-left': '18% 82%',
  center: '50% 50%',
  sides: '12% 40%',
}

export function Atmosphere({
  tone = 'blueprint-cool',
  position = 'center',
  texture = false,
  textureOpacity = 0.08,
}: {
  tone?: Tone
  position?: Position
  texture?: boolean
  textureOpacity?: number
}) {
  const palette = tonePalette[tone]
  const primaryCoords = positionCoords[position]

  // Doble glow para las variantes que lo tienen: primario + secundario opuesto.
  const oppositeCoords =
    position === 'top-right'
      ? '18% 82%'
      : position === 'top-left'
        ? '82% 82%'
        : position === 'bottom-right'
          ? '18% 18%'
          : position === 'bottom-left'
            ? '82% 18%'
            : position === 'sides'
              ? '88% 60%'
              : '50% 20%'

  const bg = palette.secondary
    ? `radial-gradient(ellipse 65% 55% at ${primaryCoords}, ${palette.primary}, transparent 68%), radial-gradient(ellipse 55% 50% at ${oppositeCoords}, ${palette.secondary}, transparent 65%)`
    : `radial-gradient(ellipse 65% 55% at ${primaryCoords}, ${palette.primary}, transparent 68%)`

  return (
    <>
      {texture && (
        <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
          <Image
            src="/valores-textura.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover mix-blend-luminosity"
            style={{ opacity: textureOpacity }}
          />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: bg }}
      />
    </>
  )
}

import Image from 'next/image'

/**
 * Fondo atmosférico reutilizable — mesh gradient con azul-acero + textura
 * fotográfica opcional sutil. Rompe el "fondo plano oscuro" que se sentía
 * estéril (ATLAS §0: "Fondos planos = estéril").
 *
 * `variant` controla la posición del glow radial (cada sección tiene su
 * propia "luz de reflector fuera de cámara").
 */
type Variant =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center'
  | 'sides'

const glowByVariant: Record<Variant, string> = {
  'top-right':
    'radial-gradient(ellipse 70% 55% at 82% 18%, rgba(76,107,150,0.20), transparent 68%)',
  'top-left':
    'radial-gradient(ellipse 70% 55% at 18% 18%, rgba(76,107,150,0.20), transparent 68%)',
  'bottom-right':
    'radial-gradient(ellipse 70% 55% at 82% 82%, rgba(76,107,150,0.20), transparent 68%)',
  'bottom-left':
    'radial-gradient(ellipse 70% 55% at 18% 82%, rgba(76,107,150,0.20), transparent 68%)',
  center:
    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(76,107,150,0.18), transparent 70%)',
  sides:
    'radial-gradient(ellipse 45% 55% at 12% 40%, rgba(76,107,150,0.18), transparent 65%), radial-gradient(ellipse 45% 55% at 88% 60%, rgba(76,107,150,0.16), transparent 65%)',
}

export function Atmosphere({
  variant = 'center',
  texture = false,
  textureOpacity = 0.08,
}: {
  variant?: Variant
  /** Aplica valores-textura.jpg como capa muy sutil por encima del glow. */
  texture?: boolean
  textureOpacity?: number
}) {
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
        style={{ background: glowByVariant[variant] }}
      />
    </>
  )
}

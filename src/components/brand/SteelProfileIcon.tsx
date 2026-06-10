"use client";

import { cn } from '@/lib/utils'
import type { ProductoForma } from '@/data/content'

/**
 * Iconos de sección transversal de perfiles de acero.
 * Cada forma corresponde a una línea real del catálogo AOM.
 */
export function SteelProfileIcon({
  forma,
  className,
}: {
  forma: ProductoForma
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-12 w-12', className)}
      fill="none"
      aria-hidden="true"
    >
      {render(forma)}
    </svg>
  )
}

function render(forma: ProductoForma) {
  const fill = 'currentColor'
  switch (forma) {
    case 'angulo':
      return (
        <path
          d="M10 7H18V31H41V40H10V7Z"
          fill={fill}
        />
      )
    case 'canal':
      return (
        <path
          d="M9 7H41V16H18V32H41V41H9V7Z"
          fill={fill}
        />
      )
    case 'solera':
      return <rect x="5" y="21" width="38" height="6" rx="0.5" fill={fill} />
    case 'ptr':
      return (
        <rect
          x="11"
          y="11"
          width="26"
          height="26"
          rx="1"
          stroke={fill}
          strokeWidth="7"
        />
      )
    case 'viga':
      return (
        <path
          d="M7 7H41V15H28V33H41V41H7V33H20V15H7V7Z"
          fill={fill}
        />
      )
    case 'redondo':
      return <circle cx="24" cy="24" r="15" fill={fill} />
    case 'lamina':
      return <rect x="4" y="22" width="40" height="4" rx="0.5" fill={fill} />
    case 'placa':
      return <rect x="7" y="18" width="34" height="12" rx="0.5" fill={fill} />
    case 'tubo':
      return (
        <circle cx="24" cy="24" r="14" stroke={fill} strokeWidth="7" />
      )
    case 'inox':
      return (
        <>
          <circle cx="24" cy="24" r="14" stroke={fill} strokeWidth="7" />
          <path
            d="M16 16A11 11 0 0 1 27 14"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </>
      )
    case 'aluminio':
      return (
        <>
          <rect x="4" y="24" width="40" height="4" rx="0.5" fill={fill} />
          <path d="M44 24L44 16L36 24Z" fill={fill} opacity="0.6" />
        </>
      )
    default:
      return null
  }
}

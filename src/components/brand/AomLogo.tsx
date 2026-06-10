"use client";

import { cn } from '@/lib/utils'

/**
 * Monograma AOM — recorte del logo oficial HD (versión blanca, fondo transparente).
 * Controla el tamaño con la prop className (ej. "h-8").
 */
export function AomMonogram({ className }: { className?: string }) {
  return (
    <img
      src="/aom-mark.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn('w-auto select-none', className)}
    />
  )
}

/**
 * Logo oficial completo: monograma + "Aceropciones y Maquilas" (versión blanca).
 */
export function AomLogoFull({ className }: { className?: string }) {
  return (
    <img
      src="/aom-logo.png"
      alt="Aceropciones y Maquilas"
      draggable={false}
      className={cn('w-auto select-none', className)}
    />
  )
}


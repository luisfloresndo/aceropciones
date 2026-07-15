'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Divisor fotográfico full-bleed (100vw) del ATLAS §6-A. Foto con
 * zoom parallax al scroll, sin contenedor centrado — corta el sitio
 * en actos cinematográficos.
 */
export function PhotoDivider({
  src,
  alt = '',
  caption,
  height = '70vh',
}: {
  src: string
  alt?: string
  caption?: string
  height?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      aria-hidden={!caption}
      className="relative w-full overflow-hidden bg-aom-black"
      style={{ height }}
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-aom-black via-aom-black/25 to-aom-black/60" />
      <div className="aom-grid-texture absolute inset-0 opacity-25" />

      {caption && (
        <div className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 lg:bottom-14 lg:left-20 lg:right-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-aom-steel-glow" />
            <span className="aom-eyebrow">{caption}</span>
          </div>
        </div>
      )}
    </section>
  )
}

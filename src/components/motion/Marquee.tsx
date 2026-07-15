'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Cinta horizontal con items repetidos. Se mueve sola (autoplay) y
 * suma velocidad al scroll — cuando el usuario baja rápido, la cinta
 * avanza más rápido en la misma dirección. Idea del ATLAS §8.
 */
export function Marquee({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // El scroll añade un boost al desplazamiento (baseline en autoplay).
  const scrollX = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const smooth = useSpring(scrollX, { stiffness: 90, damping: 30, mass: 0.6 })

  // Duplicamos los items para loop infinito visual.
  const loop = [...items, ...items, ...items]

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border-y border-white/[0.08] bg-aom-black py-6 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-aom-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-aom-black to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        style={{ x: smooth }}
      >
        <motion.div
          className="flex shrink-0 items-center gap-14"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 42,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-14 font-display text-3xl uppercase tracking-display text-aom-white/85 sm:text-4xl"
            >
              {item}
              <span className="text-aom-steel-glow">◆</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

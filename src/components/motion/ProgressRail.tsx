'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * Riel de progreso lateral derecho — línea vertical minimalista.
 * En lugar de dots (demasiado presentes), una línea que se llena
 * con el scroll y un indicador que muestra la sección actual junto
 * a un pequeño acento. Más elegante y menos ruidoso.
 *
 * Referencia: Titan Geek. Del ATLAS §8 (progress rail).
 */
const sections = [
  { id: 'top', label: 'Hero' },
  { id: 'sectores', label: 'Sectores' },
  { id: 'rebrand', label: 'Rebrand AOM' },
  { id: 'propuesta', label: 'Propuesta' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'manifiesto', label: 'Manifiesto' },
  { id: 'maquila', label: 'Maquila' },
  { id: 'antes-despues', label: 'Nivelación' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'valores', label: 'Valores' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'footer', label: 'Cierre' },
]

export function ProgressRail() {
  const [activeIdx, setActiveIdx] = useState(0)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  })

  const fillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const markerTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const current = sections[activeIdx]
  const total = String(sections.length).padStart(2, '0')
  const now = String(activeIdx + 1).padStart(2, '0')

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-8 top-1/2 z-40 hidden h-[60vh] -translate-y-1/2 lg:block"
    >
      {/* track — línea vertical thin */}
      <div className="relative h-full w-px bg-white/10">
        {/* fill — se llena con el scroll */}
        <motion.div
          style={{ height: fillHeight }}
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-aom-steel-glow/40 via-aom-steel-glow to-aom-steel-glow"
        />

        {/* indicador que se mueve con el scroll — tick + texto de sección */}
        <motion.div
          style={{ top: markerTop }}
          className="absolute right-0 flex -translate-y-1/2 items-center gap-3 whitespace-nowrap pr-2"
        >
          <span className="font-mono text-[0.62rem] uppercase leading-none tracking-[0.28em] text-aom-steel-glow">
            {now} <span className="text-aom-smoke">/ {total}</span>
            <span className="ml-2 text-aom-white/70">{current.label}</span>
          </span>
          <span className="block h-px w-5 bg-aom-steel-glow" />
        </motion.div>
      </div>
    </div>
  )
}

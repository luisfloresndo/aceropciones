'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Riel de progreso lateral derecho — 12 puntos, uno por escena de la
 * Premium. Muestra en qué parte de la historia va el usuario y le
 * comunica que HAY MÁS contenido para scrollear. Del ATLAS §8.
 *
 * - Cada dot es clicable → navega a la sección
 * - Hover muestra el nombre de la sección
 * - El dot activo se ilumina en steel-glow
 * - Se oculta en móvil (< lg) — el scroll nativo del navegador cumple ahí
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
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })
  const fillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i)
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      aria-label="Navegación por secciones"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="pointer-events-auto relative flex flex-col items-center gap-3">
        {/* riel vertical de fondo (línea muy sutil que conecta los dots) */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-white/10"
        />
        {/* riel llenado con el scroll */}
        <motion.span
          aria-hidden
          style={{ height: fillHeight }}
          className="absolute left-1/2 top-1 w-px origin-top -translate-x-1/2 bg-aom-steel-glow"
        />

        {sections.map((s, i) => {
          const isActive = i === activeIdx
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative z-10 flex items-center py-1.5"
              aria-label={`Ir a ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={`inline-block rounded-full ring-2 ring-aom-black transition-all duration-500 ${
                  isActive
                    ? 'size-2.5 bg-aom-steel-glow shadow-[0_0_12px_rgba(76,107,150,0.9)]'
                    : 'size-1.5 bg-white/35 group-hover:size-2 group-hover:bg-white/70'
                }`}
              />
              <span
                className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-md border border-white/10 bg-aom-black/85 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-aom-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
              >
                {String(i + 1).padStart(2, '0')} · {s.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Statement full-screen scrollytelling: pineado ~280vh, cada palabra
 * de la frase se ilumina secuencialmente conforme el usuario baja.
 * Del ATLAS §6-A checklist (statement palabra por palabra).
 */
const statement =
  'Trazabilidad en cada orden. Precisión que se entrega a tiempo. Un aliado, no un proveedor.'

const acentos = new Set(['a', 'tiempo.', 'aliado,'])

export function StatementScrolly() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const words = statement.split(' ')

  return (
    <section
      ref={ref}
      className="relative h-[280vh] bg-aom-black"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(76,107,150,0.15),transparent_72%)]" />
        <div className="aom-grid-texture absolute inset-0 opacity-25" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-aom-steel-glow" />
            <span className="aom-eyebrow">Manifiesto</span>
          </div>

          <p className="font-display text-[clamp(2.5rem,7vw,7.5rem)] uppercase leading-[0.98] tracking-display text-aom-white/25">
            {words.map((word, i) => {
              // Cada palabra se ilumina en una ventana ligeramente escalonada.
              const start = 0.05 + i * (0.75 / words.length)
              const end = start + 0.12
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1])
              const isAcento = acentos.has(word)
              return (
                <motion.span
                  key={`${word}-${i}`}
                  style={{ opacity }}
                  className={`mr-[0.32em] inline-block ${
                    isAcento ? 'text-aom-steel-glow' : 'text-aom-white'
                  }`}
                >
                  {word}
                </motion.span>
              )
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

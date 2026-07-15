'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { ClipboardList, Calculator, Truck, Factory, Radar } from 'lucide-react'
import { proceso } from '@/data/content'

const icons = [ClipboardList, Calculator, Truck, Factory, Radar]

/**
 * Proceso rediseñado como sección pineada (~500vh) del ATLAS §6-A:
 * sticky viewport donde el contenido cambia con scroll — cada paso
 * es una escena que se releva secuencialmente, con contador 0N/05
 * gigante y línea vertical que se dibuja al progresar.
 */
export function ProcesoPineado() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const total = proceso.length
  const [idx, setIdx] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.max(0, Math.min(total - 1, Math.floor(v * total)))
    setIdx(next)
  })

  const lineHeight = useTransform(scrollYProgress, [0.03, 0.97], ['0%', '100%'])

  return (
    <section
      id="proceso"
      ref={ref}
      className="relative bg-aom-black"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(76,107,150,0.12),transparent_70%)]" />
        <div className="aom-grid-texture absolute inset-0 opacity-25" />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 lg:flex-row lg:items-center lg:gap-24 lg:px-16">
          {/* eyebrow superior */}
          <div className="absolute left-6 top-8 flex items-center gap-3 lg:left-16 lg:top-14">
            <span className="h-px w-10 bg-aom-steel-glow" />
            <span className="aom-eyebrow">Proceso · 05 pasos</span>
          </div>

          {/* riel numérico izquierdo */}
          <div className="relative flex shrink-0 items-center gap-8 pt-24 lg:pt-0">
            <div className="flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-aom-smoke">01</span>
              <div className="relative h-[280px] w-px bg-white/[0.08] sm:h-[380px] lg:h-[440px]">
                <motion.div
                  style={{ height: lineHeight }}
                  className="absolute inset-x-0 top-0 origin-top bg-aom-steel-glow"
                />
              </div>
              <span className="font-mono text-xs text-aom-smoke">
                {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-display text-[clamp(6rem,14vw,12rem)] tracking-display text-aom-steel-glow">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 font-mono text-xs text-aom-smoke">
                de {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* escena que cambia */}
          <div className="relative mt-12 min-h-[400px] flex-1 lg:mt-0">
            <AnimatePresence mode="wait">
              <Scene key={idx} idx={idx} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Scene({ idx }: { idx: number }) {
  const step = proceso[idx]
  const Icon = icons[idx] ?? ClipboardList
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl"
    >
      <div className="mb-8 inline-flex size-16 items-center justify-center rounded-full border border-white/12 bg-aom-graphite text-aom-steel-glow">
        <Icon className="size-7" strokeWidth={1.4} />
      </div>
      <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none tracking-display text-aom-white">
        {step.titulo}
      </h3>
      <p className="mt-6 text-lg leading-relaxed text-aom-mist sm:text-xl">
        {step.descripcion}
      </p>
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-aom-smoke">
        Paso {String(idx + 1).padStart(2, '0')} / {String(proceso.length).padStart(2, '0')}
      </p>
    </motion.div>
  )
}

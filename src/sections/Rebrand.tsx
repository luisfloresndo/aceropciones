"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { AomMonogram } from '@/components/brand/AomLogo'
import { brand, mision } from '@/data/content'
import { Atmosphere } from '@/components/motion/Atmosphere'

const capacidades = [
  'Suministro de acero',
  'Maquila industrial',
  'Manufactura de precisión',
]

export function Rebrand() {
  return (
    <section id="rebrand" className="relative overflow-hidden bg-aom-black">
      <Atmosphere variant="top-right" />
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-aom-steel-glow" />
              <span className="aom-eyebrow">01 — Quiénes somos</span>
              <span className="h-px w-10 bg-aom-steel-glow" />
            </div>
            <h2 className="aom-display text-[clamp(2.5rem,6vw,5rem)] text-aom-white">
              De Aceropciones
              <br />
              <span className="text-aom-steel-glow">a AOM.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-aom-mist sm:text-base">
              Más de 20 años abasteciendo acero al norte de México. En 2025
              consolidamos una nueva identidad —{' '}
              <span className="text-aom-white">Aceropciones y Maquilas</span> —
              que refleja lo que somos hoy: suministro y transformación bajo
              una sola marca.
            </p>
          </div>
        }
      >
        <BrandCard />
      </ContainerScroll>
    </section>
  )
}

function BrandCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-aom-graphite">
      <Image
        src="/planta-aom.jpg"
        alt="Interior de planta de procesamiento de acero"
        fill
        sizes="(max-width: 768px) 100vw, 64rem"
        className="object-cover"
      />
      {/* scrims de legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-aom-black/95 via-aom-black/48 to-aom-black/28" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_66%_at_50%_46%,transparent_26%,rgba(10,10,11,0.52))]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center [&_p]:[text-shadow:0_2px_18px_rgba(0,0,0,0.92)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AomMonogram className="h-12 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:h-16" />
        </motion.div>
        <p className="mt-6 font-display text-3xl uppercase tracking-display text-aom-white sm:text-5xl">
          Aceropciones <span className="text-aom-iron">y</span> Maquilas
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.28em] text-aom-steel-glow sm:text-sm">
          {brand.lema}
        </p>
        <p className="mt-7 hidden max-w-lg text-sm leading-relaxed text-aom-mist sm:block">
          {mision}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {capacidades.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/12 bg-aom-black/55 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-aom-mist backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

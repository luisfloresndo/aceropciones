"use client";

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Layers3,
  Scissors,
  Slice,
  Flame,
  ScanLine,
  Disc3,
} from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { FeatureCard } from '@/components/blocks/grid-feature-cards'
import { maquila } from '@/data/content'

const icons = [Layers3, Scissors, Slice, Flame, ScanLine, Disc3]

export function Maquila() {
  return (
    <section
      id="maquila"
      className="relative bg-aom-black py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="Maquila industrial"
          title="Seis procesos."
          accent="Una sola planta."
          description="Transformamos el acero según el plano del cliente: nivelado, corte, doblez, rolado y láser, con tecnología de punta y personal altamente calificado."
        />

        {/* banda cinematográfica: corte láser */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-14 aspect-[21/9] overflow-hidden rounded-xl border border-white/[0.09]"
        >
          <Image
            src="/maquila-laser.jpg"
            alt="Corte láser CNC de placa de acero con chispas"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-aom-black/90 via-aom-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-aom-black/85 via-aom-black/10 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-8 lg:p-10">
            <span className="font-mono text-xs uppercase tracking-widest text-aom-steel-glow">
              Corte de precisión
            </span>
            <p className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-display text-aom-white sm:text-4xl">
              Tecnología de punta, tolerancias controladas
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {maquila.map((s, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={s.nombre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative bg-aom-graphite transition-colors duration-300 hover:bg-aom-surface"
              >
                <span className="absolute right-6 top-6 z-20 font-mono text-xs text-aom-iron">
                  0{i + 1}
                </span>
                <FeatureCard
                  feature={{
                    title: s.nombre,
                    description: s.descripcion,
                    icon: (props) => (
                      <Icon
                        {...props}
                        className="size-6 text-aom-steel-glow"
                        strokeWidth={1.5}
                      />
                    ),
                  }}
                  className="h-full [&_h3]:font-display [&_h3]:text-xl [&_h3]:uppercase [&_h3]:tracking-display [&_h3]:text-aom-white [&_p]:text-aom-smoke"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

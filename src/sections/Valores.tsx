"use client";

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { Boxes } from '@/components/ui/background-boxes'
import { valores, mision, vision } from '@/data/content'

export function Valores() {
  return (
    <section className="relative border-t border-white/[0.07] bg-aom-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading
          index="07"
          eyebrow="Valores de marca"
          title="El estándar"
          accent="que nos define."
        />

        {/* interactive boxes panel with the 5 brand values */}
        <div className="relative mt-14 overflow-hidden rounded-xl border border-white/[0.09] bg-aom-graphite">
          <div className="absolute inset-0 z-20 bg-aom-graphite [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />

          <div className="relative z-30 grid gap-px bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-5">
            {valores.map((v, i) => (
              <motion.div
                key={v.nombre}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-aom-graphite/90 p-7 backdrop-blur-sm"
              >
                <span className="font-mono text-xs text-aom-steel-glow">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-display text-aom-white">
                  {v.nombre}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-aom-smoke">
                  {v.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* mission & vision */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, label: 'Misión', text: mision },
            { icon: Eye, label: 'Visión', text: vision },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="aom-glass rounded-xl p-8"
            >
              <div className="flex items-center gap-3">
                <card.icon
                  className="size-5 text-aom-steel-glow"
                  strokeWidth={1.6}
                />
                <span className="aom-eyebrow">{card.label}</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-aom-mist">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client";

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { arquetipos, propuestaValor } from '@/data/content'

export function Propuesta() {
  return (
    <section className="relative bg-aom-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="Cómo trabajamos"
          title="No prometemos."
          accent="Entregamos."
          description={propuestaValor}
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {arquetipos.map((a, i) => (
            <motion.article
              key={a.titulo}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-aom-graphite p-8 transition-colors duration-300 hover:border-aom-steel-glow/40"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-aom-steel/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <span className="font-mono text-xs text-aom-iron">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-display text-aom-white">
                {a.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-aom-mist">
                {a.descripcion}
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-aom-steel-glow">
                  {a.expresion}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

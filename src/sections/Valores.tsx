"use client";

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { valores, mision, vision } from '@/data/content'

export function Valores() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-white/[0.07] bg-aom-black py-24 lg:py-32"
    >
      {/* fondo: textura metálica con zoom parallax */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        <Image
          src="/valores-textura.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-aom-black/85 via-aom-black/60 to-aom-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_35%,rgba(76,107,150,0.14),transparent_72%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading
          index="07"
          eyebrow="Valores de marca"
          title="El estándar"
          accent="que nos define."
        />

        {/* 5 valores — cada card con número monumental de fondo + glow hover */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-5">
          {valores.map((v, i) => (
            <motion.article
              key={v.nombre}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-aom-graphite/95 p-8 transition-colors duration-500 hover:bg-aom-black"
            >
              {/* número monumental de fondo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-4 select-none font-display text-[10rem] leading-none text-white/[0.045] transition-all duration-500 group-hover:text-aom-steel-glow/25 group-hover:-translate-y-2"
              >
                0{i + 1}
              </span>
              {/* borde luminoso al hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-aom-steel-glow/0 transition-colors duration-500 group-hover:border-aom-steel-glow/40"
              />
              {/* glow al hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 size-36 rounded-full bg-aom-steel-glow/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative">
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-aom-steel-glow">
                  Valor 0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-3xl uppercase leading-none tracking-display text-aom-white">
                  {v.nombre}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-aom-mist">
                  {v.descripcion}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* misión & visión — manifiestos tipográficos, no cards planas */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[
            { icon: Target, label: 'Misión', text: mision, delay: 0 },
            { icon: Eye, label: 'Visión', text: vision, delay: 0.12 },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: card.delay }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-aom-graphite/60 p-10 backdrop-blur-sm transition-colors duration-500 hover:border-aom-steel-glow/35 lg:p-14"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(76,107,150,0.14),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <card.icon
                    className="size-5 text-aom-steel-glow"
                    strokeWidth={1.5}
                  />
                  <span className="aom-eyebrow">{card.label}</span>
                </div>
                <p className="mt-7 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] uppercase leading-[1.1] tracking-display text-aom-white">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

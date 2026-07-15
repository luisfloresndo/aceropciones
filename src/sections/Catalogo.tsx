"use client";

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { SteelProfileIcon } from '@/components/brand/SteelProfileIcon'
import { Tilt } from '@/components/motion/Tilt'
import { Atmosphere } from '@/components/motion/Atmosphere'
import { catalogo, fotoProducto } from '@/data/content'

const MotionLink = motion.create(Link)

export function Catalogo() {
  return (
    <section
      id="catalogo"
      className="relative overflow-hidden border-t border-white/[0.07] bg-aom-graphite py-24 lg:py-32"
    >
      <Atmosphere tone="blueprint-cool" position="top-left" texture textureOpacity={0.06} />
      <div className="aom-grid-texture absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Catálogo de acero"
            title="Once líneas"
            accent="de producto."
            description="Comercializamos perfil estructural, lámina, placa, tubería y aceros especiales. Cada línea con su ficha técnica completa — medidas, grados y pesos."
          />
          <p className="font-mono text-xs uppercase tracking-wider text-aom-smoke lg:text-right">
            Toca un producto para
            <br className="hidden lg:block" /> ver su ficha técnica
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3 lg:grid-cols-4">
          {catalogo.map((p, i) => {
            const foto = fotoProducto(p.slug)
            return (
              <Tilt key={p.slug} className="group/tilt block h-full">
                <MotionLink
                  href={`/productos/${p.slug}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                  className="group flex h-full flex-col bg-aom-graphite transition-colors duration-300 hover:bg-aom-surface"
                >
                {/* visual */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  {foto ? (
                    <Image
                      src={foto}
                      alt={`${p.nombre} — Aceropciones y Maquilas`}
                      fill
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="object-cover grayscale-[0.25] transition-all duration-500 group-hover:scale-[1.06] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-aom-surface">
                      <SteelProfileIcon
                        forma={p.forma}
                        className="h-16 w-16 text-aom-iron transition-colors duration-300 group-hover:text-aom-steel-glow"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-aom-graphite via-aom-graphite/10 to-transparent" />
                  <span className="absolute right-3 top-3 font-mono text-xs text-aom-white/65">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {foto && (
                    <div className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-md border border-white/15 bg-aom-black/70 backdrop-blur-sm">
                      <SteelProfileIcon
                        forma={p.forma}
                        className="h-5 w-5 text-aom-steel-glow"
                      />
                    </div>
                  )}
                </div>

                {/* content */}
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <h3 className="font-display text-xl uppercase leading-tight tracking-display text-aom-white">
                    {p.nombre}
                  </h3>
                  <p className="text-xs leading-relaxed text-aom-smoke">
                    {p.descripcion}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-2 font-mono text-[0.65rem] uppercase tracking-wider text-aom-iron transition-colors duration-300 group-hover:text-aom-steel-glow">
                    Ficha técnica
                    <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                </MotionLink>
              </Tilt>
            )
          })}

          {/* CTA cell */}
          <a
            href="/#contacto"
            className="group flex flex-col justify-center gap-3 bg-aom-steel/15 p-6 transition-colors duration-300 hover:bg-aom-steel/30"
          >
            <span className="font-mono text-xs text-aom-steel-glow">→</span>
            <span className="font-display text-xl uppercase leading-tight tracking-display text-aom-white">
              ¿Buscas un calibre específico?
            </span>
            <span className="text-xs text-aom-mist">
              Solicita disponibilidad y precio
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

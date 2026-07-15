"use client";

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { AomMonogram } from '@/components/brand/AomLogo'
import { nav, contacto, brand } from '@/data/content'

const manifiesto = 'Acero con precisión, soluciones a la medida.'.split(' ')

const marqueeItems = [
  'AOM',
  'Aceropciones y Maquilas',
  'San Nicolás, N.L.',
  '+20 años',
  'Trazabilidad',
  'Precisión',
  'Acero con precisión',
]

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['12%', '-4%'])
  const monogramY = useTransform(scrollYProgress, [0, 1], ['30%', '-6%'])
  const monogramOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.08, 0.12])

  return (
    <footer
      ref={ref}
      className="relative isolate overflow-hidden bg-aom-black"
    >
      {/* fondo nocturno con parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image
          src="/footer-nocturno.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-aom-black/95 via-aom-black/75 to-aom-black" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(76,107,150,0.16),transparent_70%)]" />

      {/* monograma gigante como firma visual */}
      <motion.div
        style={{ y: monogramY, opacity: monogramOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-[-8%] flex justify-center"
      >
        <AomMonogram className="h-[42vw] max-h-[560px] w-auto" />
      </motion.div>

      <div className="relative mx-auto max-w-[1440px] px-6 pt-24 sm:px-8 lg:px-12 xl:px-16 lg:pt-32">
        {/* manifiesto monumental palabra-por-palabra */}
        <div className="border-b border-white/[0.07] pb-16 lg:pb-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-aom-steel-glow" />
            <span className="aom-eyebrow">{brand.fullName}</span>
          </div>

          <h2 className="aom-display mt-8 max-w-5xl overflow-hidden text-[clamp(2.5rem,6.5vw,6rem)] leading-[1] text-aom-white">
            {manifiesto.map((word, i) => {
              const isAccent =
                word === 'soluciones' ||
                word === 'a' ||
                word === 'la' ||
                word === 'medida.'
              return (
                <span
                  key={i}
                  className="mr-[0.28em] inline-block overflow-hidden"
                >
                  <motion.span
                    initial={{ y: '110%', opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.85,
                      delay: 0.05 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${isAccent ? 'italic text-aom-steel-glow' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              )
            })}
          </h2>

          <a
            href="#top"
            className="group mt-10 inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest text-aom-mist transition-colors hover:border-aom-steel-glow hover:text-aom-white"
          >
            Volver al inicio
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* columnas de datos con hover subrayado */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="aom-eyebrow">Navegación</span>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative inline-block text-sm text-aom-mist transition-colors hover:text-aom-white"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-aom-steel-glow transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Contacto</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-aom-mist">
              <li>
                <a
                  href={contacto.telefonoHref}
                  className="group relative inline-block transition-colors hover:text-aom-white"
                >
                  {contacto.telefono}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-aom-steel-glow transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
              <li className="text-aom-smoke">{contacto.conmutador}</li>
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Atención</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {contacto.ejecutivos.map((ej) => (
                <li key={ej.correo} className="flex flex-col">
                  <span className="text-aom-white">{ej.nombre}</span>
                  <a
                    href={`mailto:${ej.correo}`}
                    className="group relative inline-block self-start text-xs text-aom-smoke transition-colors hover:text-aom-steel-glow"
                  >
                    {ej.correo}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-aom-steel-glow transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Planta</span>
            <p className="mt-5 text-sm leading-relaxed text-aom-mist">
              {contacto.direccion}
            </p>
          </div>
        </div>

        {/* micro-marquee como firma cinematográfica final */}
        <div className="relative -mx-6 overflow-hidden border-y border-white/[0.06] py-4 sm:-mx-8 lg:-mx-12 xl:-mx-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-aom-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-aom-black to-transparent" />
          <motion.div
            className="flex shrink-0 items-center gap-10 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-10 font-mono text-xs uppercase tracking-[0.3em] text-aom-smoke"
              >
                {item}
                <span className="text-aom-steel-glow">◆</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="py-8">
          <p className="font-mono text-xs text-aom-iron">
            © {new Date().getFullYear()} {brand.fullName} — Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client";

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { FloatingPaths } from '@/components/ui/background-paths'
import { CountUp } from '@/components/motion/CountUp'
import { Magnetic } from '@/components/motion/Magnetic'
import { MetalCursor } from '@/components/motion/MetalCursor'
import { hechos } from '@/data/content'

const headline = ['ACERO', 'CON', 'PRECISIÓN']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-aom-black"
    >
      {/* parallax: fotografía de acero + trazos animados */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 -inset-y-[16%]"
      >
        <Image
          src="/hero-acero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 text-aom-steel-glow/20">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </motion.div>
      {/* overlays de legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-aom-black/92 via-aom-black/58 to-aom-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-aom-black via-transparent to-aom-black/25" />
      <div className="aom-grid-texture absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_38%_42%,rgba(76,107,150,0.14),transparent_72%)]" />

      {/* momento signature — reflejo metálico que sigue al cursor */}
      <MetalCursor />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 pt-32 pb-10 lg:px-10 [&_p]:[text-shadow:0_2px_16px_rgba(0,0,0,0.88)]"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-aom-steel-glow" />
          <span className="aom-eyebrow">
            Aceropciones y Maquilas — Identidad 2025
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="aom-display aom-text-shadow text-[clamp(3.5rem,12vw,11rem)] text-aom-white">
          {headline.map((word, wi) => (
            <span key={word} className="mr-[0.22em] inline-block last:mr-0">
              {word.split('').map((ch, ci) => (
                <motion.span
                  key={`${wi}-${ci}`}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + wi * 0.12 + ci * 0.03,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-3 font-display text-[clamp(1.6rem,4vw,3rem)] tracking-display text-aom-steel-glow"
        >
          soluciones a la medida.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-aom-mist sm:text-lg"
        >
          Soluciones integrales de acero y maquila industrial de precisión
          para la industria del norte de México. Suministro, transformación y
          cumplimiento — bajo una sola marca.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-md bg-aom-white px-7 py-4 text-sm font-semibold text-aom-black transition-colors duration-300"
            >
              Solicitar cotización
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#maquila"
              className="inline-flex rounded-md border border-white/15 px-7 py-4 text-sm font-semibold text-aom-white transition-colors duration-300 hover:border-aom-steel-glow hover:bg-white/[0.03]"
            >
              Ver capacidades de maquila
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* verified facts strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 border-t border-white/[0.07] bg-aom-black/40 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-white/[0.07] px-6 lg:grid-cols-4 lg:px-10">
          {hechos.map((h) => (
            <div key={h.detalle} className="px-4 py-6 first:pl-0">
              <div className="flex items-baseline gap-1.5">
                <CountUp
                  text={h.valor}
                  className="font-display text-4xl text-aom-white lg:text-5xl"
                />
                <span className="font-mono text-xs uppercase tracking-wider text-aom-steel-glow">
                  {h.unidad}
                </span>
              </div>
              <p className="mt-1 text-xs text-aom-smoke">{h.detalle}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-[152px] left-1/2 hidden -translate-x-1/2 lg:block">
        <ArrowDown className="size-5 animate-bounce text-aom-smoke" />
      </div>
    </section>
  )
}

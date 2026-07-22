"use client";

import { motion } from 'framer-motion'
import { arquetipos, propuestaValor } from '@/data/content'

/**
 * Propuesta de valor en LIGHT theme — la única escena clara del sitio,
 * pensada como contraste dramático entre secciones oscuras (Marquee →
 * Propuesta → Catálogo). Ritmo claro↔oscuro del ATLAS §6-A.
 */
export function Propuesta() {
  return (
    <section id="propuesta" className="relative bg-[#F5F4EE] py-24 text-aom-black lg:py-32">
      {/* trama sutil sobre paper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0A0A0B 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-aom-black/8 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-aom-black/8 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-aom-steel-glow">02</span>
          <span className="h-px w-8 bg-aom-steel-glow" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-aom-black/60">
            Cómo trabajamos
          </span>
        </div>

        <h2 className="aom-display mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-aom-black">
          No prometemos.
          <br />
          <span className="italic text-aom-steel-glow">Entregamos.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-aom-black/75 sm:text-lg">
          {propuestaValor}
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {arquetipos.map((a, i) => (
            <motion.article
              key={a.titulo}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-aom-black/10 bg-white p-8 shadow-[0_1px_0_rgba(10,10,11,0.04),0_20px_50px_-32px_rgba(10,10,11,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-aom-steel-glow/60 hover:shadow-[0_1px_0_rgba(10,10,11,0.04),0_30px_60px_-30px_rgba(76,107,150,0.45)]"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-aom-steel-glow/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <span className="font-mono text-xs text-aom-black/40">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-display text-aom-black">
                {a.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-aom-black/70">
                {a.descripcion}
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-aom-black/10 pt-5">
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

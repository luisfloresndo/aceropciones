"use client";

import { motion } from 'framer-motion'
import { ClipboardList, Calculator, Truck, Factory, Radar } from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import { proceso } from '@/data/content'

const icons = [ClipboardList, Calculator, Truck, Factory, Radar]

export function Proceso() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden border-t border-white/[0.07] bg-aom-black py-24 lg:py-32"
    >
      {/* ambiente */}
      <div className="aom-grid-texture absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgba(76,107,150,0.12),transparent_72%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading
          index="06"
          eyebrow="Cómo trabajamos contigo"
          title="Trazabilidad"
          accent="en cada orden."
          description="Del requerimiento a la entrega: un flujo de cinco etapas con seguimiento y control en cada paso."
          align="center"
        />

        {/* pasos */}
        <div className="relative mt-20 lg:mt-24">
          {/* línea conectora — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[10%] right-[10%] top-[55px] hidden h-px origin-left bg-gradient-to-r from-transparent via-aom-steel-glow/60 to-transparent lg:block"
          />

          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {proceso.map((step, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={step.titulo}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* nodo / icono */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-aom-steel-glow/25 blur-2xl transition-all duration-500 group-hover:bg-aom-steel-glow/45" />
                    <div className="relative flex size-[110px] items-center justify-center rounded-full border border-white/10 bg-aom-graphite transition-colors duration-400 group-hover:border-aom-steel-glow/50">
                      <div className="absolute inset-2.5 rounded-full border border-white/[0.05]" />
                      <Icon
                        className="size-11 text-aom-steel-glow"
                        strokeWidth={1.4}
                      />
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 flex size-9 items-center justify-center rounded-full border border-white/12 bg-aom-black font-mono text-sm text-aom-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl uppercase leading-none tracking-display text-aom-white">
                    {step.titulo}
                  </h3>
                  <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-aom-mist">
                    {step.descripcion}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client";

import { sectores } from '@/data/content'
import { AomMonogram } from '@/components/brand/AomLogo'

export function Sectores() {
  const loop = [...sectores, ...sectores, ...sectores, ...sectores]

  return (
    <section className="relative border-y border-white/[0.07] bg-aom-graphite py-10">
      <div className="mx-auto mb-6 max-w-[1280px] px-6 lg:px-10">
        <p className="aom-eyebrow text-center">
          Industrias que abastecemos en el norte de México
        </p>
      </div>

      <div className="aom-mask-fade-x relative flex overflow-hidden">
        <div className="flex shrink-0 animate-aom-marquee items-center gap-12 pr-12">
          {loop.map((sector, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12">
              <span className="font-display text-3xl uppercase tracking-display text-aom-mist/55 transition-colors">
                {sector}
              </span>
              <AomMonogram className="h-3.5 shrink-0 opacity-30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

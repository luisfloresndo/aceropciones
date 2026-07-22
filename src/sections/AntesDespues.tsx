"use client";

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/brand/SectionHeading'
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/components/ui/image-comparison'
import { Atmosphere } from '@/components/motion/Atmosphere'

export function AntesDespues() {
  return (
    <section id="antes-despues" className="relative overflow-hidden border-t border-white/[0.07] bg-aom-graphite py-24 lg:py-32">
      <Atmosphere tone="steel-neutral" position="top-left" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading
          index="05"
          eyebrow="Maquila en acción"
          title="Del coil-set"
          accent="a la planitud."
          description="La nivelación elimina la deformación del rollo y entrega lámina y placa estable, lista para corte, doblez y fabricación. Desliza para comparar."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-14 overflow-hidden rounded-xl border border-white/[0.09]"
        >
          <ImageComparison
            enableHover
            className="aspect-[3/2] w-full"
            springOptions={{ bounce: 0, duration: 0 }}
          >
            <ImageComparisonImage
              src="/maquila-antes.svg"
              alt="Lámina de acero sin nivelar con deformación de coil-set"
              position="left"
            />
            <ImageComparisonImage
              src="/maquila-despues.svg"
              alt="Lámina de acero nivelada con planitud uniforme"
              position="right"
            />
            <ImageComparisonSlider className="bg-aom-white/80">
              <div className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-aom-black shadow-xl">
                <ChevronLeft className="size-4 text-aom-white" />
                <ChevronRight className="size-4 text-aom-white" />
              </div>
            </ImageComparisonSlider>
          </ImageComparison>
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-aom-smoke">
            Esquema técnico ilustrativo — proceso de nivelación
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-aom-steel-glow">
            Rolado hasta 10′ × ¼″
          </p>
        </div>
      </div>
    </section>
  )
}

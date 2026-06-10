"use client";

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DecodeText } from '@/components/motion/DecodeText'

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  className,
}: {
  index: string
  eyebrow: string
  title: string
  accent?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-center gap-3"
      >
        <span className="font-mono text-xs text-aom-steel-glow">{index}</span>
        <span className="h-px w-8 bg-aom-steel-glow" />
        <span className="aom-eyebrow">{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="aom-display max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] text-aom-white"
      >
        <DecodeText text={title} />{' '}
        {accent && <DecodeText text={accent} className="text-aom-steel-glow" />}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            'mt-5 max-w-xl text-sm leading-relaxed text-aom-mist sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

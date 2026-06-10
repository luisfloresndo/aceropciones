'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Barra de progreso de scroll fija en el borde superior. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-aom-steel via-aom-steel-glow to-aom-steel-light"
    />
  )
}

'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Tilt 3D con spotlight. La card se inclina siguiendo el cursor y una
 * luz suave la ilumina desde la posición del cursor. Del kit MOEN
 * (ATLAS §8). Auto-desactivado en pantallas táctiles.
 */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), {
    stiffness: 260,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), {
    stiffness: 260,
    damping: 24,
  })
  const bgX = useTransform(x, [0, 1], ['0%', '100%'])
  const bgY = useTransform(y, [0, 1], ['0%', '100%'])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function onLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className ?? ''}`}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle at ${bgX.get()}% ${bgY.get()}%, rgba(255,255,255,0.22), transparent 45%)`,
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  )
}

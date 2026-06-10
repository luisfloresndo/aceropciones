'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Resplandor sutil de acero que sigue el cursor — añade profundidad.
 * Solo en dispositivos con puntero fino (desktop). Respeta no-pointer.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden lg:block"
    >
      <div className="-ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(76,107,150,0.10),transparent_62%)]" />
    </motion.div>
  )
}

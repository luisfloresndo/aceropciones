'use client'

import { useEffect, useRef } from 'react'

/**
 * Momento signature: un "reflejo metálico" que sigue al cursor solo en
 * el contenedor donde se monta. Es un radial gradient con blend `overlay`
 * que hace parecer que la superficie es metal pulido bajo la luz.
 * Se auto-desactiva en pantallas táctiles y con prefers-reduced-motion.
 */
export function MetalCursor() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return

    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
    ) {
      el.style.display = 'none'
      return
    }

    const parent = el.parentElement
    if (!parent) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    function onMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    function loop() {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      if (el) {
        el.style.transform = `translate3d(${currentX - 320}px, ${currentY - 320}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseenter', () => {
      if (el) el.style.opacity = '1'
    })
    parent.addEventListener('mouseleave', () => {
      if (el) el.style.opacity = '0'
    })
    loop()

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[5] h-[640px] w-[640px] opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(197,218,246,0.28) 0%, rgba(76,107,150,0.14) 30%, transparent 65%)',
        mixBlendMode: 'overlay',
        willChange: 'transform',
      }}
    />
  )
}

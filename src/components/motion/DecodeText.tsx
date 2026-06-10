'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const GLYPHS = 'ACEROPMQXZ0123/\\<>=░▒▚▞·'

/**
 * Texto que "decodifica" — al entrar en viewport hace un glitch de glifos
 * y se resuelve de izquierda a derecha. El render inicial es el texto final
 * (seguro para SSR y SEO).
 */
export function DecodeText({
  text,
  className,
  speed = 0.55,
}: {
  text: string
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(text)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let frame = 0

    const id = setInterval(() => {
      frame += 1
      const revealed = frame * speed
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < revealed) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )
      if (revealed >= text.length) {
        clearInterval(id)
        setDisplay(text)
      }
    }, 28)

    return () => clearInterval(id)
  }, [inView, text, speed])

  return (
    <span ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

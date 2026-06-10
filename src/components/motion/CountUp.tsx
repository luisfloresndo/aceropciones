'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion } from 'framer-motion'

/**
 * Cuenta ascendente al entrar en viewport.
 * Acepta texto tipo "+20", "11", "10'" — separa prefijo/número/sufijo.
 * Garantiza que el valor final siempre se muestre (red de seguridad).
 */
export function CountUp({
  text,
  className,
  duration = 2.6,
}: {
  text: string
  className?: string
  duration?: number
}) {
  // Memoizado por `text` — identidad estable entre renders del padre,
  // imprescindible para que el useEffect no se reinicie y cancele el setTimeout.
  const parsed = useMemo(() => {
    const m = /^(\D*)([\d.]+)(\D*)$/.exec(text.trim())
    if (!m) return null
    return {
      prefix: m[1],
      target: parseFloat(m[2]),
      suffix: m[3],
      decimals: m[2].includes('.') ? 1 : 0,
    }
  }, [text])

  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!parsed) return
    const target = parsed.target
    const el = ref.current
    if (!el) return

    let started = false
    let controls: ReturnType<typeof animate> | undefined
    let safety: ReturnType<typeof setTimeout> | undefined

    const finish = () => setValue(target)

    const start = () => {
      if (started) return
      started = true
      setVisible(true)
      // red de seguridad: el valor final aparece sí o sí
      safety = setTimeout(finish, duration * 1000 + 1200)
      controls = animate(0, target, {
        duration,
        ease: [0.16, 0.84, 0.3, 1],
        onUpdate: (v) => setValue(v),
        onComplete: finish,
      })
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      finish()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)

    // si nunca entra en vista, mostrar el valor final de todas formas
    const neverSeen = setTimeout(() => {
      if (!started) finish()
      io.disconnect()
    }, 3500)

    return () => {
      controls?.stop()
      io.disconnect()
      if (safety) clearTimeout(safety)
      clearTimeout(neverSeen)
    }
  }, [parsed, duration])

  if (!parsed) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={
        visible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 10 }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {parsed.prefix}
      {value.toFixed(parsed.decimals)}
      {parsed.suffix}
    </motion.span>
  )
}

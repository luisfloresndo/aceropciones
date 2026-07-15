"use client";

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AomMonogram } from '@/components/brand/AomLogo'
import { Magnetic } from '@/components/motion/Magnetic'
import { nav, contacto } from '@/data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 transition-all duration-300 sm:px-8 lg:px-12 xl:px-16',
          scrolled &&
            'mt-2 h-16 max-w-[1180px] rounded-xl border border-white/[0.07] bg-aom-graphite/80 px-4 backdrop-blur-xl lg:px-6',
        )}
      >
        <a
          href="/"
          aria-label="Aceropciones y Maquilas — inicio"
          className="shrink-0"
        >
          <AomMonogram
            className={cn(
              'transition-all duration-300',
              scrolled ? 'h-11' : 'h-14',
            )}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 font-mono text-xs uppercase tracking-widest text-aom-mist transition-colors hover:text-aom-white"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-aom-steel-glow transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={contacto.telefonoHref}
            className="flex items-center gap-2 font-mono text-xs text-aom-smoke transition-colors hover:text-aom-white"
          >
            <Phone className="size-3.5" strokeWidth={2} />
            {contacto.telefono}
          </a>
          <Magnetic strength={0.5}>
            <a
              href="/#contacto"
              className="group relative inline-flex overflow-hidden rounded-md bg-aom-white px-5 py-2.5 text-sm font-semibold text-aom-black"
            >
              <span className="relative z-10">Cotizar acero</span>
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-md border border-white/10 text-aom-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-4 mt-2 overflow-hidden rounded-xl border border-white/[0.07] bg-aom-graphite/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col p-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.05] py-3 font-mono text-sm uppercase tracking-widest text-aom-mist last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contacto"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md bg-aom-white py-3 text-center text-sm font-semibold text-aom-black"
              >
                Cotizar acero
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

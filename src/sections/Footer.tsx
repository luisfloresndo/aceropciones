"use client";

import { ArrowUp } from 'lucide-react'
import { AomMonogram, AomLogoFull } from '@/components/brand/AomLogo'
import { nav, contacto, brand } from '@/data/content'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-aom-black">
      {/* oversized brand watermark */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 select-none">
        <AomMonogram className="h-56 opacity-[0.035]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* statement */}
        <div className="flex flex-col gap-8 border-b border-white/[0.07] py-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <AomLogoFull className="h-20" />
            <p className="mt-7 max-w-md font-display text-3xl uppercase leading-[0.95] tracking-display text-aom-white sm:text-4xl">
              {brand.lema}
            </p>
          </div>
          <a
            href="/"
            className="group flex items-center gap-2 self-start rounded-md border border-white/12 px-5 py-3 font-mono text-xs uppercase tracking-widest text-aom-mist transition-colors hover:border-aom-steel-glow hover:text-aom-white lg:self-auto"
          >
            Volver al inicio
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="aom-eyebrow">Navegación</span>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-aom-mist transition-colors hover:text-aom-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Contacto</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-aom-mist">
              <li>
                <a
                  href={contacto.telefonoHref}
                  className="transition-colors hover:text-aom-white"
                >
                  {contacto.telefono}
                </a>
              </li>
              <li className="text-aom-smoke">{contacto.conmutador}</li>
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Atención</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {contacto.ejecutivos.map((ej) => (
                <li key={ej.correo} className="flex flex-col">
                  <span className="text-aom-white">{ej.nombre}</span>
                  <a
                    href={`mailto:${ej.correo}`}
                    className="text-xs text-aom-smoke transition-colors hover:text-aom-steel-glow"
                  >
                    {ej.correo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="aom-eyebrow">Planta</span>
            <p className="mt-5 text-sm leading-relaxed text-aom-mist">
              {contacto.direccion}
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-white/[0.07] py-8">
          <p className="font-mono text-xs text-aom-iron">
            © {new Date().getFullYear()} {brand.fullName} — Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

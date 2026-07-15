"use client";

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import {
  SpotlightCTA,
  SpotlightCTAContent,
  SpotlightCTAText,
  SpotlightCTAButton,
} from '@/components/ui/spotlight-cta'
import { Magnetic } from '@/components/motion/Magnetic'
import { contacto } from '@/data/content'

export function CtaContacto() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: '',
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const destinatarios = contacto.ejecutivos.map((x) => x.correo).join(',')
    const subject = encodeURIComponent(
      `Solicitud de cotización — ${form.nombre || 'Sitio web AOM'}`,
    )
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nCorreo: ${form.email}\nTeléfono: ${form.telefono}\n\nComentarios:\n${form.comentarios}`,
    )
    window.location.href = `mailto:${destinatarios}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-white/[0.07] bg-aom-graphite py-24 lg:py-32"
    >
      <Image
        src="/acero-textura.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.05] mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-aom-graphite/40" />
      <div className="aom-grid-texture absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* spotlight banner */}
        <SpotlightCTA
          titleId="cta-title"
          descriptionId="cta-desc"
          className="!max-w-none !rounded-xl !border-white/10 !bg-aom-black !p-8 lg:!p-12"
        >
          <SpotlightCTAContent>
            <SpotlightCTAText
              title="Cotiza tu próximo proyecto en acero"
              description="Atención personalizada, tiempos de respuesta competitivos y trazabilidad en cada orden. Llámanos o envíanos tu requerimiento."
              titleId="cta-title"
              descriptionId="cta-desc"
              className="[&_h2]:font-display [&_h2]:uppercase [&_h2]:tracking-display [&_h2]:!text-aom-white [&_p]:!text-aom-mist"
            />
            <Magnetic strength={0.45}>
              <a href={contacto.telefonoHref}>
                <SpotlightCTAButton
                  type="button"
                  className="!rounded-md !bg-aom-white !text-aom-black hover:!bg-aom-mist"
                >
                  {contacto.telefono}
                </SpotlightCTAButton>
              </a>
            </Magnetic>
          </SpotlightCTAContent>
        </SpotlightCTA>

        {/* contact details + form */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 rounded-xl border border-white/[0.07] bg-aom-black p-8"
          >
            <div>
              <span className="aom-eyebrow">08 — Contacto directo</span>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-display text-aom-white">
                Estamos en Nuevo León
              </h3>
            </div>

            <a
              href={contacto.telefonoHref}
              className="group flex items-start gap-4 border-t border-white/[0.06] pt-6"
            >
              <Phone className="mt-1 size-5 text-aom-steel-glow" strokeWidth={1.6} />
              <span>
                <span className="block font-display text-2xl tracking-display text-aom-white">
                  {contacto.telefono}
                </span>
                <span className="text-xs text-aom-smoke">
                  {contacto.conmutador}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 border-t border-white/[0.06] pt-6">
              <MapPin className="mt-1 size-5 text-aom-steel-glow" strokeWidth={1.6} />
              <span className="text-sm leading-relaxed text-aom-mist">
                {contacto.direccion}
              </span>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-6">
              <span className="aom-eyebrow">Atención personalizada</span>
              {contacto.ejecutivos.map((ej) => (
                <a
                  key={ej.correo}
                  href={`mailto:${ej.correo}`}
                  className="group flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-aom-steel-glow/40"
                >
                  <span>
                    <span className="block text-sm font-semibold text-aom-white">
                      {ej.nombre}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-aom-smoke">
                      <Mail className="size-3" />
                      {ej.correo}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-aom-iron transition-colors group-hover:text-aom-steel-glow" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5 rounded-xl border border-white/[0.07] bg-aom-black p-8"
          >
            <div>
              <span className="aom-eyebrow">Solicitud de cotización</span>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-display text-aom-white">
                Cuéntanos tu requerimiento
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nombre"
                id="nombre"
                value={form.nombre}
                onChange={(v) => setForm({ ...form, nombre: v })}
                required
              />
              <Field
                label="Teléfono"
                id="telefono"
                type="tel"
                value={form.telefono}
                onChange={(v) => setForm({ ...form, telefono: v })}
              />
            </div>
            <Field
              label="Correo electrónico"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="comentarios"
                className="font-mono text-xs uppercase tracking-wider text-aom-smoke"
              >
                Comentarios
              </label>
              <textarea
                id="comentarios"
                rows={4}
                value={form.comentarios}
                onChange={(e) =>
                  setForm({ ...form, comentarios: e.target.value })
                }
                placeholder="Producto, calibre, cantidad o proceso de maquila requerido…"
                className="resize-none rounded-md border border-white/[0.09] bg-aom-graphite px-4 py-3 text-sm text-aom-white outline-none transition-colors placeholder:text-aom-iron focus:border-aom-steel-glow"
              />
            </div>

            <button
              type="submit"
              className="group mt-1 flex items-center justify-center gap-2 rounded-md bg-aom-white px-7 py-4 text-sm font-semibold text-aom-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Enviar solicitud
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-center font-mono text-[0.7rem] text-aom-iron">
              Se abrirá tu cliente de correo para confirmar el envío.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-wider text-aom-smoke"
      >
        {label} {required && <span className="text-aom-steel-glow">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-white/[0.09] bg-aom-graphite px-4 py-3 text-sm text-aom-white outline-none transition-colors placeholder:text-aom-iron focus:border-aom-steel-glow"
      />
    </div>
  )
}

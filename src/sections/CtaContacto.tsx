"use client";

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import { Magnetic } from '@/components/motion/Magnetic'
import { contacto } from '@/data/content'

const heroTitle = ['Cotiza', 'tu', 'próximo', 'proyecto', 'en', 'acero.']

export function CtaContacto() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: '',
  })

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

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
      ref={ref}
      id="contacto"
      className="relative overflow-hidden border-t border-white/[0.07] bg-aom-black py-24 lg:py-36"
    >
      {/* fondo cinematográfico: Monterrey nocturno con parallax */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        <Image
          src="/monterrey-nocturno.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-aom-black via-aom-black/55 to-aom-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_40%,rgba(76,107,150,0.16),transparent_75%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* eyebrow + título monumental palabra-por-palabra */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-aom-steel-glow">08</span>
          <span className="h-px w-8 bg-aom-steel-glow" />
          <span className="aom-eyebrow">Monterrey, Nuevo León</span>
        </div>

        <h2 className="aom-display mt-7 max-w-5xl overflow-hidden text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.98] text-aom-white">
          {heroTitle.map((word, i) => (
            <span key={i} className="mr-[0.28em] inline-block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.85,
                  delay: 0.05 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${i >= 4 ? 'italic text-aom-steel-glow' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-aom-mist sm:text-lg"
        >
          Atención personalizada, tiempos de respuesta competitivos y trazabilidad
          en cada orden. Compártenos tu requerimiento y un asesor te responde.
        </motion.p>

        {/* datos + formulario */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* datos de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7 rounded-xl border border-white/10 bg-aom-graphite/70 p-8 backdrop-blur-md lg:p-10"
          >
            <a
              href={contacto.telefonoHref}
              className="group flex items-start gap-4"
            >
              <Phone className="mt-2 size-5 text-aom-steel-glow" strokeWidth={1.6} />
              <span>
                <span className="block font-display text-3xl leading-none tracking-display text-aom-white sm:text-4xl">
                  {contacto.telefono}
                </span>
                <span className="mt-2 block text-xs text-aom-smoke">
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
                  className="group flex items-center justify-between rounded-md border border-white/[0.06] bg-aom-black/40 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-aom-steel-glow/40 hover:bg-aom-black/70"
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

          {/* formulario editorial */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex flex-col gap-7 overflow-hidden rounded-xl border border-white/10 bg-aom-graphite/70 p-8 backdrop-blur-md lg:p-10"
          >
            <span className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-aom-steel-glow/12 blur-3xl" />

            <div className="relative">
              <span className="aom-eyebrow">Solicitud de cotización</span>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-display text-aom-white sm:text-3xl">
                Cuéntanos tu requerimiento
              </h3>
            </div>

            <div className="relative grid gap-6 sm:grid-cols-2">
              <FieldUnderline
                label="Nombre"
                id="nombre"
                value={form.nombre}
                onChange={(v) => setForm({ ...form, nombre: v })}
                required
              />
              <FieldUnderline
                label="Teléfono"
                id="telefono"
                type="tel"
                value={form.telefono}
                onChange={(v) => setForm({ ...form, telefono: v })}
              />
              <FieldUnderline
                label="Correo electrónico"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
                className="sm:col-span-2"
              />
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="comentarios"
                  className="font-mono text-[0.7rem] uppercase tracking-widest text-aom-smoke"
                >
                  Requerimiento
                </label>
                <textarea
                  id="comentarios"
                  rows={4}
                  value={form.comentarios}
                  onChange={(e) =>
                    setForm({ ...form, comentarios: e.target.value })
                  }
                  placeholder="Producto, calibre, cantidad o proceso de maquila requerido…"
                  className="resize-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-base text-aom-white outline-none transition-colors placeholder:text-aom-iron focus:border-aom-steel-glow"
                />
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-aom-iron">
                Respuesta &lt; 24 h hábiles
              </p>
              <Magnetic strength={0.4}>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-md bg-aom-white px-7 py-4 text-sm font-semibold text-aom-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Enviar solicitud
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function FieldUnderline({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
  className,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <label
        htmlFor={id}
        className="font-mono text-[0.7rem] uppercase tracking-widest text-aom-smoke"
      >
        {label} {required && <span className="text-aom-steel-glow">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 border-b border-white/15 bg-transparent px-0 py-3 text-base text-aom-white outline-none transition-colors placeholder:text-aom-iron focus:border-aom-steel-glow"
      />
    </div>
  )
}

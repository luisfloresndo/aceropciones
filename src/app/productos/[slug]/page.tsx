import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Layers,
  Ruler,
  Boxes,
  Phone,
} from 'lucide-react'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { SteelProfileIcon } from '@/components/brand/SteelProfileIcon'
import { ProductStructuredData } from '@/components/seo/ProductStructuredData'
import { WhatsAppBubble } from '@/components/motion/WhatsAppBubble'
import { catalogo, getProducto, fotoProducto, contacto } from '@/data/content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return catalogo.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) return { title: 'Producto no encontrado' }
  return {
    title: `${producto.nombre} — Catálogo de acero`,
    description: producto.resumen,
    alternates: { canonical: `/productos/${producto.slug}` },
  }
}

export default async function ProductoPage({ params }: Params) {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) notFound()
  const foto = fotoProducto(producto.slug)

  // JSON-LD Product schema — se inyecta al inicio del árbol
  const structuredData = <ProductStructuredData producto={producto} />

  const specs = [
    { icon: Layers, label: 'Grados de acero', items: producto.grados },
    { icon: Ruler, label: 'Tramos', items: producto.tramos },
    { icon: Boxes, label: 'Presentaciones', items: producto.presentaciones },
  ].filter((s) => s.items && s.items.length > 0)

  const related = catalogo.filter((p) => p.slug !== producto.slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-aom-black text-aom-white">
      {structuredData}
      <WhatsAppBubble />
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-6 pt-32 pb-24 sm:px-8 lg:px-12 xl:px-16 lg:pt-40">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-aom-smoke">
          <Link href="/" className="transition-colors hover:text-aom-white">
            Inicio
          </Link>
          <span className="text-aom-iron">/</span>
          <Link
            href="/#catalogo"
            className="transition-colors hover:text-aom-white"
          >
            Catálogo de acero
          </Link>
          <span className="text-aom-iron">/</span>
          <span className="text-aom-steel-glow">{producto.nombre}</span>
        </nav>

        {/* hero */}
        <header className="mt-10 grid gap-10 border-b border-white/[0.08] pb-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="aom-eyebrow">Catálogo de acero</span>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5.5rem)] uppercase leading-[0.92] tracking-display text-aom-white">
              {producto.nombre}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-aom-mist">
              {producto.resumen}
            </p>
          </div>
          {foto ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-aom-graphite lg:w-[440px]">
              <Image
                src={foto}
                alt={`${producto.nombre} — Aceropciones y Maquilas`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aom-black/45 to-transparent" />
              <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-md border border-white/15 bg-aom-black/70 backdrop-blur-sm">
                <SteelProfileIcon
                  forma={producto.forma}
                  className="h-6 w-6 text-aom-steel-glow"
                />
              </div>
            </div>
          ) : (
            <div className="flex size-32 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-aom-graphite lg:size-40">
              <SteelProfileIcon
                forma={producto.forma}
                className="h-20 w-20 text-aom-steel-glow lg:h-24 lg:w-24"
              />
            </div>
          )}
        </header>

        {/* specs */}
        {specs.length > 0 && (
          <section className="mt-14 grid gap-5 md:grid-cols-3">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-white/[0.08] bg-aom-graphite p-6"
              >
                <div className="flex items-center gap-2.5">
                  <spec.icon
                    className="size-4 text-aom-steel-glow"
                    strokeWidth={1.6}
                  />
                  <span className="aom-eyebrow">{spec.label}</span>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {spec.items!.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm text-aom-mist"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-aom-steel-glow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* ficha técnica */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-aom-steel-glow">FT</span>
            <span className="h-px w-8 bg-aom-steel-glow" />
            <h2 className="font-display text-2xl uppercase tracking-display text-aom-white sm:text-3xl">
              Ficha técnica — medidas y pesos
            </h2>
          </div>

          {producto.fichas.length > 0 ? (
            <>
              <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
                {producto.fichas.map((ficha, i) => (
                  <figure
                    key={ficha.src}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl"
                  >
                    <figcaption className="flex items-center gap-2 border-b border-white/[0.06] bg-aom-graphite px-4 py-2.5">
                      <FileText
                        className="size-3.5 text-aom-steel-glow"
                        strokeWidth={1.7}
                      />
                      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-aom-mist">
                        {producto.nombre} · tabla {i + 1}
                      </span>
                    </figcaption>
                    <div className="bg-white p-3">
                      <Image
                        src={ficha.src}
                        width={ficha.w}
                        height={ficha.h}
                        alt={`Tabla de especificaciones ${i + 1} de ${producto.nombre}`}
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="h-auto w-full"
                      />
                    </div>
                  </figure>
                ))}
              </div>
              <p className="mt-5 font-mono text-xs leading-relaxed text-aom-iron">
                Tabla de referencia con las medidas y pesos del catálogo
                Aceropciones. Confirma disponibilidad y medida vigente con un
                asesor antes de tu pedido.
              </p>
            </>
          ) : (
            <div className="mt-8 rounded-xl border border-white/[0.08] bg-aom-graphite p-8">
              <p className="max-w-lg text-sm leading-relaxed text-aom-mist">
                {producto.notas?.[0] ??
                  'Disponibilidad y especificación bajo pedido.'}{' '}
                Comparte tu requerimiento y un asesor te confirma medidas,
                grado y tiempo de entrega.
              </p>
            </div>
          )}

          {producto.fichas.length > 0 && producto.notas?.[0] && (
            <p className="mt-3 font-mono text-xs text-aom-iron">
              {producto.notas[0]}
            </p>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 overflow-hidden rounded-xl border border-white/[0.09] bg-aom-graphite">
          <div className="aom-grid-texture relative px-8 py-12 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_30%_50%,rgba(76,107,150,0.15),transparent_70%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-display text-aom-white sm:text-4xl">
                  ¿Necesitas {producto.nombre.toLowerCase()}?
                </h2>
                <p className="mt-3 max-w-md text-sm text-aom-mist">
                  Cotización con atención personalizada y tiempos de respuesta
                  competitivos.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/#contacto"
                  className="group inline-flex items-center gap-2 rounded-md bg-aom-white px-7 py-4 text-sm font-semibold text-aom-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Solicitar cotización
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href={contacto.telefonoHref}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 px-7 py-4 text-sm font-semibold text-aom-white transition-colors hover:border-aom-steel-glow"
                >
                  <Phone className="size-4" strokeWidth={1.8} />
                  {contacto.telefono}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* related */}
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <span className="aom-eyebrow">Otras líneas de acero</span>
            <Link
              href="/#catalogo"
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-aom-mist transition-colors hover:text-aom-white"
            >
              <ArrowLeft className="size-3.5" />
              Ver todo el catálogo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/productos/${p.slug}`}
                className="group flex flex-col gap-4 bg-aom-graphite p-6 transition-colors duration-300 hover:bg-aom-surface"
              >
                <SteelProfileIcon
                  forma={p.forma}
                  className="h-9 w-9 text-aom-iron transition-colors duration-300 group-hover:text-aom-steel-glow"
                />
                <span className="font-display text-lg uppercase leading-tight tracking-display text-aom-white">
                  {p.nombre}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

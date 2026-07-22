import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { CursorGlow } from '@/components/motion/CursorGlow'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { FilmGrain } from '@/components/motion/FilmGrain'
import { ProgressRail } from '@/components/motion/ProgressRail'
import { WhatsAppBubble } from '@/components/motion/WhatsAppBubble'
import { Marquee } from '@/components/motion/Marquee'
import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { Sectores } from '@/sections/Sectores'
import { Rebrand } from '@/sections/Rebrand'
import { Propuesta } from '@/sections/Propuesta'
import { Catalogo } from '@/sections/Catalogo'
import { PhotoDivider } from '@/sections/PhotoDivider'
import { StatementScrolly } from '@/sections/StatementScrolly'
import { Maquila } from '@/sections/Maquila'
import { AntesDespues } from '@/sections/AntesDespues'
import { ProcesoPineado } from '@/sections/ProcesoPineado'
import { Valores } from '@/sections/Valores'
import { CtaContacto } from '@/sections/CtaContacto'
import { Footer } from '@/sections/Footer'

const marqueeItems = [
  'Acero',
  'Maquila',
  '+20 años',
  'Trazabilidad',
  'Corte láser',
  'Rolado 10ʹ × ¼"',
  'San Nicolás, N.L.',
  'Precisión',
  'Nivelación',
  'Automotriz',
  'Construcción',
  'Exportación',
]

export default function Page() {
  return (
    <div className="min-h-screen bg-aom-black text-aom-white">
      <SmoothScroll />
      <FilmGrain />
      <ScrollProgress />
      <CursorGlow />
      <ProgressRail />
      <WhatsAppBubble />
      <Navbar />
      <main>
        <Hero />
        <Sectores />
        <Rebrand />
        <Marquee items={marqueeItems} />
        <Propuesta />
        <Catalogo />
        <PhotoDivider
          src="/divisor-estructura.jpg"
          alt="Estructura de acero al atardecer"
          caption="El acero AOM · puesto en obra"
          height="70vh"
        />
        <StatementScrolly />
        <Maquila />
        <AntesDespues />
        <ProcesoPineado />
        <Valores />
        <CtaContacto />
      </main>
      <Footer />
    </div>
  )
}

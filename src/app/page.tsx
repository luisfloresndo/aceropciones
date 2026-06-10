import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { CursorGlow } from '@/components/motion/CursorGlow'
import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { Sectores } from '@/sections/Sectores'
import { Rebrand } from '@/sections/Rebrand'
import { Propuesta } from '@/sections/Propuesta'
import { Catalogo } from '@/sections/Catalogo'
import { Maquila } from '@/sections/Maquila'
import { AntesDespues } from '@/sections/AntesDespues'
import { Proceso } from '@/sections/Proceso'
import { Valores } from '@/sections/Valores'
import { CtaContacto } from '@/sections/CtaContacto'
import { Footer } from '@/sections/Footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-aom-black text-aom-white">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Sectores />
        <Rebrand />
        <Propuesta />
        <Catalogo />
        <Maquila />
        <AntesDespues />
        <Proceso />
        <Valores />
        <CtaContacto />
      </main>
      <Footer />
    </div>
  )
}

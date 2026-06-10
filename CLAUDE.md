# CLAUDE.md — Sitio web Aceropciones y Maquilas (AOM)

Contexto y reglas del proyecto. Léelo al inicio de cada sesión.

## Qué es

Sitio web premium para **Aceropciones y Maquilas (AOM)** — empresa mexicana de
acero y maquila industrial de precisión en San Nicolás de los Garza, N.L.

- **Una landing page** de una sola página con secciones navegables + **11
  subpáginas de producto** (`/productos/[slug]`) con su ficha técnica.
- Reemplaza al sitio viejo `aceropciones.com.mx` (de 2013, marca anterior).
- El sitio nuevo **vive solo en local** (`localhost:3000`) — NO está publicado.
- Estética: oscura, industrial, cinematográfica, premium ("anti-AI-slop").

## Stack

- **Next.js 16** (App Router, Turbopack) — renderizado estático (SSG)
- **React 19** + **TypeScript**
- **Tailwind CSS v3.4** + **shadcn/ui**
- **framer-motion** (animación — única librería de animación, no usar otra)
- Componentes base tomados de **21st.dev** (instalados vía `shadcn add`)

## Comandos

```bash
npm run dev      # servidor de desarrollo → http://localhost:3000
npm run build    # build de producción → genera carpeta out/ (export estático)
npm run typecheck
```

## Publicación (deployment)

El sitio está **publicado en Firebase Hosting** (sitio de pruebas para demos):

- **URL en vivo:** https://4test-web.web.app
- **Proyecto Firebase:** `titan-desk` · **sitio:** `4test-web`
- **Cuenta:** `titangeek.it@gmail.com` (plan gratuito Spark — sitio estático)

`next.config.ts` usa `output: 'export'` → `next build` genera `out/` (HTML
estático). `firebase.json` apunta a `out/` con `cleanUrls`.

**Para volver a publicar tras hacer cambios:**

```bash
npm run build
firebase deploy --only hosting --project titan-desk --account titangeek.it@gmail.com
```

⚠️ Usar SIEMPRE `--account titangeek.it@gmail.com` — en esta Mac hay otra
cuenta de Firebase (proyectos "market-spots") que no se debe tocar.

## Estructura

```
src/
  app/
    layout.tsx              # root layout, next/font, metadata SEO + OG
    page.tsx                # landing — compone las 12 secciones
    globals.css             # Tailwind + tokens CSS + clases .aom-*
    icon.png                # favicon (App Router)
    productos/[slug]/page.tsx  # subpágina de producto (SSG, 11 rutas)
  sections/                 # las 12 secciones de la landing
    Navbar, Hero, Sectores, Rebrand, Propuesta, Catalogo,
    Maquila, AntesDespues, Proceso, Valores, CtaContacto, Footer
  components/
    brand/                  # AomLogo, SectionHeading, SteelProfileIcon
    motion/                 # CountUp, CursorGlow, DecodeText, Magnetic, ScrollProgress
    ui/                     # componentes 21st.dev / shadcn (adaptados)
    blocks/                 # grid-feature-cards, logos3
  data/content.ts           # TODO el contenido del sitio (texto + datos)
  lib/utils.ts              # cn()
public/
  aom-logo.png / aom-mark.png   # logo oficial AOM (blanco, transparente)
  favicon.png
  hero-acero / planta-aom / maquila-laser / acero-textura .jpg  # fotos de secciones
  fichas/                   # 17 imágenes de tablas de especificaciones
  productos/                # 11 fotos HD de producto ({slug}.jpg)
Branding/                   # manual de identidad AOM 2025 (fuente, no se sirve)
Productos - Generar HD/     # carpeta de trabajo para regenerar fotos (no se sirve)
```

## Regla CRÍTICA — origen del contenido

**Nada de datos inventados.** Todo el contenido proviene de tres fuentes:

1. **Sitio web viejo** `aceropciones.com.mx` → productos, grados de acero,
   fichas técnicas, 6 servicios de maquila, contacto, "+20 años".
2. **Manual de Identidad AOM 2025** (carpeta `Branding/`) → nombre "y Maquilas",
   lema, misión, visión, valores, arquetipos, sectores atendidos.
3. **Copy redactado** → descripciones de una línea de productos/servicios,
   resúmenes, los 5 pasos de la sección Proceso. Texto técnico correcto pero
   autoral; pendiente de validación por AOM.

**Prohibido:** inventar métricas de desempeño, clientes, certificaciones,
premios o cifras. Si falta un dato, pídelo — no lo inventes.

## Convenciones y decisiones (importante)

- **`tsconfig.json` tiene `strict: false`** — a propósito, para integrar los
  componentes de terceros de 21st.dev sin pelear con tipos. No lo cambies.
- Todo componente interactivo (con hooks/motion) lleva **`"use client"`**.
- **Tokens de marca** en `tailwind.config.js`: colores `aom.*`
  (`aom-black #0A0A0B`, `aom-graphite`, `aom-steel`, `aom-steel-glow #4C6B96`,
  `aom-smoke`, `aom-mist`, `aom-white`). Acento azul acero.
- **Fuentes** (`next/font`): `font-display` = Bebas Neue (títulos),
  `font-sans` = Montserrat (cuerpo), `font-mono` = JetBrains Mono (etiquetas).
- Clases utilitarias propias en `globals.css`: `.aom-display`, `.aom-eyebrow`,
  `.aom-hairline`, `.aom-glass`, `.aom-grid-texture`.
- **Logo:** usar `public/aom-logo.png` (completo) y `public/aom-mark.png`
  (monograma) vía `components/brand/AomLogo.tsx`. NO recrear el logo.
- **Navegación:** los enlaces del navbar/footer usan `/#seccion` (no `#seccion`)
  para que funcionen también desde las subpáginas de producto.
- `next.config.ts`: define `turbopack.root` (hay varios lockfiles en la Mac).
  Formatos de imagen = default (webp); NO usar AVIF (encode lento en dev).

## Gotchas

- **Hidratación:** nunca uses `Math.random()` ni `Date.now()` en el render de
  un componente — causa desajuste SSR/cliente. `grid-feature-cards.tsx` usa un
  patrón con semilla determinista por esta razón.
- **Caché de imágenes:** si reemplazas archivos en `public/`, borra la carpeta
  `.next` y reinicia el dev server, o Next sirve la versión vieja cacheada.
- `src/components/ui/radial-orbital-timeline.tsx` quedó **sin uso** (la sección
  Proceso se rediseñó). Es un archivo huérfano; puede borrarse.
- Hay otros componentes de `ui/` de 21st.dev instalados pero no usados — no
  estorban (no entran al bundle si no se importan).

## Estado del proyecto

**Hecho:**
- Landing de 12 secciones (Hero con foto + parallax, catálogo, maquila,
  antes/después, proceso, valores, contacto con formulario, etc.)
- 11 subpáginas de producto `/productos/[slug]` con ficha técnica (SSG, SEO)
- Logo AOM real integrado · 11 fotos de producto en HD · 4 fotos de sección
- Motion: scroll progress, cursor glow, count-up, botones magnéticos,
  decode-text, parallax
- SEO: metadata, Open Graph, Twitter cards, `next/font`
- `build` y `tsc` en verde

- **Publicado** en Firebase Hosting → https://4test-web.web.app

**Pendiente / posibles siguientes pasos:**
- Revisión responsive en móvil real
- Sección de **Ubicación** con mapa (el sitio viejo la tenía)
- Validar con AOM el copy redactado (sobre todo los 5 pasos del Proceso)
- Dominio propio cuando el cliente apruebe (hoy usa la URL de pruebas)

## Verificación

No declarar algo "terminado" sin haber corrido `npm run build` y comprobado
en el navegador (`localhost:3000`). Evidencia antes de afirmaciones.

# 🧭 ATLAS-WEB — Guía premium + Protocolo de activación

> **Qué es esto:** un playbook portátil y reutilizable para crear **cualquier** web page
> (producto, marca, servicios, landing, portafolio, e-commerce, evento…). No está amarrado
> a ninguna marca. Es a la vez **guía** y **agente activable**: al copiarlo a la carpeta de
> un proyecto nuevo y pedirle a Claude Code que se "active como Atlas Web", Claude primero
> **inventaría lo que hay, pregunta los faltantes en la conversación, y solo entonces construye.**
>
> Versión: 2.0 · Reglas globales de Luis + lecciones reales de producción (Luzar, n18,
> Aceropciones, **MOEN 100K**) + el `web-starter` en disco. Actualiza esta guía cada vez
> que descubras una trampa nueva.

---

## ▶︎ Cómo se usa (léelo primero)

**1. Prepara la carpeta del proyecto.** Crea la carpeta de la empresa, ej.
`Apps/Web Pages/EmpresaX/`, y mete lo que ya tengas:

```
EmpresaX/
├── ATLAS-WEB.md        ← esta guía (cópiala aquí)
├── branding/           ← logos (SVG idealmente), paleta, brandbook, fuentes
└── (opcional) content/ ← textos, PDFs, capturas del sitio actual, lo que tengas
```

No necesitas tenerlo todo. Con la guía + branding basta para arrancar; el resto se pregunta.

**2. Abre Claude Code en esa carpeta y da la instrucción de arranque.** Prompt exacto,
copia-pega:

```
Lee ATLAS-WEB.md y actívate como Atlas Web.
Analiza la carpeta, dime qué encontraste y qué falta,
y empieza a preguntarme los faltantes uno por uno para completar el brief.
No construyas nada hasta que el brief esté completo y yo lo apruebe.
```

**3. Responde la entrevista.** Claude te irá preguntando (incluido el repo de GitHub).
Cuando el brief esté completo, lo guarda en `BRIEF.md` y **hasta entonces** empieza a construir.

---

## 0. LA VARA (no negociable — léela antes que nada)

El estándar NO es "sitio corporativo limpio con efectos añadidos". Es **puesta en escena
cinematográfica**: cada sección es una escena de película con atmósfera propia.
Referencias vivas del propio Luis (estúdialas si dudas del nivel):

- `n18-seven.vercel.app` — notaría: texturas papel/oro, riel de números romanos, cursor custom
- `aceropciones.vercel.app` — acero: 176px Bebas, scramble-decode, marquee, statements full-screen
- `luzar-blue.vercel.app` — contable: 19 pantallas de scroll, secciones pineadas, itálica acento
- **MOEN** (`Apps/Web Pages/MOEN/`) — el ecosistema 100K de referencia y **fuente canónica de componentes**

Checklist de la vara (si falta uno, no está terminado):

| Elemento | Qué significa |
|---|---|
| **Superhero 100svh full-bleed** | La foto/escena devora la pantalla. NUNCA imagen encajonada en una tarjeta |
| **Tipografía monumental** | Titulares 96–176px (clamp/vw), **dos voces** (display extrabold + itálica light en color acento) |
| **Entrada letra por letra** | El titular del hero entra con stagger por carácter |
| **Scrollytelling** | Al menos una sección **pineada** (sticky ~300-400vh) donde el contenido cambia al scrollear |
| **Statement full-screen** | Frase de marca con revelado palabra-por-palabra conducido por scroll |
| **Momento signature** | UNA interacción memorable ligada al alma de la marca (MOEN: agua WebGL que ondula al cursor) |
| **Atmósfera por sección** | Texturas, ritmo claro↔oscuro por escenas. Fondos planos = estéril |
| **Micro-craft** | Cursor custom (pointer:fine), riel de progreso lateral, botones magnéticos, contadores |
| **Marquee** | Cinta de marca, idealmente sensible a la velocidad del scroll |
| **Profundidad** | Home de 10–19 pantallas de narrativa, no 5 |

Regla de oro del deleite: **máximo un efecto protagonista por viewport**; el resto es
soporte silencioso. Cada efecto se recolorea a la marca y sirve a su narrativa.

---

## 0.5 Niveles de entrega (defínelo EN el brief)

| Nivel | Alcance | Precio ancla |
|---|---|---|
| **Landing premium** | Home cinematográfica + 2-4 páginas clave | $30–45K MXN |
| **Ecosistema 100K** | Home + líneas + **catálogo con fichas completas** + landings de tecnología + servicio/soporte + historia (~40 páginas) | $100K MXN |

Desglose defendible del 100K ante el cliente: Descubrimiento y arquitectura ($12k) ·
Sistema de diseño de marca digital ($15k) · Home cinematográfica ($18k) · Catálogo +
fichas completas ($25k) · Landings de tecnología ($12k) · Servicio/refacciones ($8k) ·
QA/SEO/performance/deploy ($10k). No es "una landing bonita": es un ecosistema con data
real, documentos descargables y narrativa premium en cada nivel.

---

## 1. Rol del agente "Atlas Web" (cómo se comporta Claude)

Cuando te activas como Atlas Web, adoptas estas reglas por encima de cualquier default:

- **Pregunta antes de asumir.** Si falta un dato del brief, lo preguntas — no lo inventas.
- **Cero contenido inventado.** Nada de Lorem ipsum, métricas falsas, casos ficticios,
  claims sin fuente. Si no tienes el dato real, lo pides o lo marcas como `[FALTA: …]`.
- **Cuestiona antes de validar.** Si el usuario propone algo con una falla, empiezas por la
  falla, no por el halago. Sin relleno.
- **Evidencia antes de afirmar.** No declaras "funciona"/"quedó" sin verificarlo (build,
  preview o DOM). Si una medición sale rara, repite con mediana de ≥6 corridas antes de
  reportar — una corrida sola es ruido.
- **Impacto no negociable.** Si una sección funciona pero no impacta (§0), no está terminada.
- **Genérico por diseño.** Adaptas estructura, secciones y tono al **tipo de página**.
- **Honestidad de alcance.** Si algo del demo no tiene data real (categoría sin productos),
  no lo enlaces a una promesa vacía — muestra "ver catálogo completo" o equivalente.

---

## 2. Protocolo de activación (qué haces, en orden)

### Paso 1 — Inventario de la carpeta
Escanea la carpeta y reporta en una tabla **qué hay** y **qué falta**. Busca:
- Logos (`.svg`/`.png`), brandbook, guía de color, fuentes de marca.
- Paleta (extráela de los assets si no viene escrita).
- Contenido del sitio actual (textos, PDFs, capturas, URL).
- Cualquier `design.md` / `.impeccable.md` / `BRIEF.md` previo.

### Paso 2 — Detecta el tipo de página Y el nivel
Propón tipo (producto, marca, servicios, landing, portafolio, e-commerce…) **y nivel**
(Landing premium vs Ecosistema 100K, §0.5) y confírmalos con el usuario.

### Paso 3 — Entrevista de brief (§3)
Pregunta SOLO lo que falta, en bloques cortos, uno o dos temas por turno.
**Incluye siempre la pregunta del repo GitHub.**

### Paso 4 — Persiste el brief
Escríbelo en `BRIEF.md` (fuente de verdad) y pide aprobación explícita.

### Paso 5 — Recién entonces, construye
Landing premium → §6-A. Ecosistema 100K → §6-B. Nunca antes del OK.

---

## 3. Checklist del brief (las preguntas que haces)

Marca `[auto]` lo que puedes detectar tú solo del folder; pregunta el resto.

**A. Proyecto**
- Nombre de la empresa/marca · **Tipo de página** · **Nivel** (§0.5) · Idioma(s).
- CTA principal (comprar, agendar, contactar, "dónde comprar"…).
- Objetivo del sitio en una frase.

**B. Marca** `[auto parcial]`
- Paleta (hex). `[auto: extraer de assets]`
- Logo en SVG: full-color, blanco y monocromático.
- Tipografía de marca; si no hay, propondrás (§7).
- 1–2 referencias visuales — si no tiene, propón tú 2-3 nivel Awwwards y pide aprobación.

**C. Contenido (regla de oro: verídico)**
- **URL del sitio actual** → lo vas a crawlear A FONDO (§5). Si es demo/spec para ganar
  una cuenta, el sitio original ES la fuente de toda la data.
- Datos de contacto **reales** (tel, correo, dirección, redes — extráelos del sitio).

**D. Infraestructura**
- **¿Hay repositorio de GitHub?** Sí → URL. No → ofrécelo (público/privado, nombre).
  ⚠️ Si el repo existe pero está **vacío**, Vercel no puede importar: haz init+push primero.
- ¿Deploy a Vercel? Dominio final o `*.vercel.app`.

**E. Imágenes**
- Default para demos de marca existente: **extraer del sitio/CDN original** (§5.3).
  NO generar producto con IA — en un pitch, una imagen falsa del producto destruye credibilidad.

**F. Alcance**
- Landing: cuántas secciones. Ecosistema: **cuántos SKUs curados** (16–24 es el sweet spot)
  y qué páginas satélite (servicio, historia, innovaciones).

---

## 4. Stack (fijo, salvo justificación)

- **Next.js 15** (App Router) + **Webpack**. Default estable — deploya limpio en Vercel.
  - ⚠️ **Next 16 + Turbopack es opt-in:** solo tras build de humo OK en Vercel.
- **React 19 · TypeScript strict.** Cero `any`, cero `@ts-ignore`.
- **Tailwind CSS v4** con tokens en **CSS variables** (`@theme`). Nunca hardcodear.
- **shadcn/ui** + util `cn`. Usa el estilo actual del CLI, no fijes de memoria.
- **Una sola librería de animación: Framer Motion (`motion`).** anime.js SOLO para SVG
  complejo/line-drawing. Jamás las dos.
- **Lenis** para smooth scroll — arrancado **tras el primer frame** (ver §10).
- **Efectos:** 21st.dev como catálogo de INSPIRACIÓN (§8). Su registry pide auth →
  reimplementa el patrón a mano sobre `motion` (casi todos son 40-80 líneas) o instala
  del registry público del autor original (MagicUI sí funciona directo).
- **pnpm** siempre. **3D/WebGL:** R3F v9 solo si el proyecto lo exige; para un momento
  signature basta WebGL crudo sin deps (ver `effects/water-ripple.tsx` en MOEN).

---

## 5. INVESTIGACIÓN PROFUNDA del sitio original (la fase que hace el 100K)

> Lección MOEN: el valor no salió de inventar, salió de **extraer TODO lo real** —
> fichas, specs, PDFs oficiales, números de parte, línea del tiempo, teléfonos.

### 5.1 Cómo crawlear sitios corporativos (suelen bloquear bots)
- WebFetch/curl/Playwright-headless suelen dar **timeout o 403** (Akamai y similares).
- **Lo que funciona:** la extensión de Chrome (navegador real con cookies) para navegar,
  y desde una página del dominio, **`fetch()` same-origin** del HTML SSR de otras páginas
  (lleva cookies reales → pasa el anti-bot, y sin navegar 24 veces).
- Acumula resultados en `localStorage` del dominio entre lotes.
- **Transporte a disco:** el POST directo a `http://localhost` desde la página https lo
  bloquean CSP/PNA. Lo que sí funciona: `location.href = 'http://localhost:PUERTO/#' +
  encodeURIComponent(json)` (la navegación top-level no la bloquea CSP) → en la página
  localhost, leer `location.hash` y POST same-origin a una API route efímera que escribe
  a disco. **Borra la API route antes del commit.**
- Pestañas en background congelan timers/rAF → para scrolls que disparan lazy-load usa
  scrolls CDP (acciones `computer`), no bucles JS con `setTimeout`.

### 5.2 Qué extraer (mapa completo)
1. **IA real:** nav completo, footer, todas las URLs (patrón de fichas: `/products/{MODELO}`).
2. **Galerías de producto** → nombre + modelo de cada card (el texto SSR los trae).
3. **Fichas por SKU:** specs (pares label/valor), beneficios, badges de tecnología,
   piezas de repuesto (número de parte + acabado), variantes de acabado (SKUs hermanos),
   y **documentos canónicos** (suelen seguir patrón: `{modelo}sp.pdf` specs,
   `{modelo}pt.pdf` despiece, `ins*.pdf` manual). Enlázalos directo — son oro para el pitch.
4. **Landings de tecnología/innovación** (copy real de beneficios).
5. **Historia/línea del tiempo** (años + hitos + imagen por año).
6. **Contacto real:** teléfono, horario, redes (los href reales, no los nombres).
7. Genera el data layer con un **script** (`gen-catalog.mjs` → `catalog.ts` tipado),
   nunca a mano: se regenera cuando cambie la selección.

### 5.3 Imágenes del CDN (trampas caras)
- Los CDN tipo Widen sirven cualquier tamaño por URL — pide **`/exact/`** para conocer el
  master real. **Muchos masters son diminutos** (251px servidos a 1600 = borroso). Antes de
  usar una imagen como hero, verifica su resolución nativa.
- Busca variantes de alta: sufijos `glam`, `lifestyle`, `-set`, `_v2` en las fichas suelen
  ser 2048px.
- **Catálogos con "No Image Available":** muchos SKUs no tienen foto publicada. CURA la
  selección: sustituye por SKUs equivalentes CON imagen (verifícalo antes de elegir los N).
- Todo a **WebP** local (`magick -strip -quality 85-90`), máx ~2048px. Nunca upscaling.
- El nombre de archivo de los thumbs de galería suele ser `{modelo}.tif.jpg` → mapea
  modelo→imagen por nombre, no por proximidad DOM.

---

## 6. PROCESO DE CONSTRUCCIÓN

### A) Landing premium (4 actos + QA)
1. **Superhero** — 100svh full-bleed, dos voces, letra-por-letra, Ken Burns, momento signature.
2. **Scrollytelling** — statement palabra-por-palabra (sticky ~280vh) + sección pineada
   (sticky ~400vh con contador 01/0N) + línea que se dibuja (scaleY scroll-linked).
3. **Atmósfera y ritmo** — claro↔oscuro por escenas, marquee, divisor fotográfico full-bleed,
   banda de stats con contadores, grids asimétricos (spans 7/5 + offsets + pieza de contraste).
4. **Micro-craft** — cursor custom, riel de progreso, botones magnéticos, hover-reveal.
5. **QA** (§11) + perf (§10) + OG premium (§9) + push.

### B) Ecosistema 100K (7 fases — el proceso MOEN completo)
- **F1 Data layer:** crawl profundo (§5) → `catalog.ts`, `innovations.ts`, `history.ts`,
  imágenes curadas. TODO real.
- **F2 Catálogo:** filtros animados (categoría/acabado/tecnología) con reordenamiento
  `layout` de motion, tilt+spotlight cards, contador ticker, buscador con border-beam.
  **Deep-linkeable** (`?cat=&q=`) y sincronizado con la URL (back/forward).
- **F3 Ficha de producto** (la joya): galería tilt 3D, selector de acabados que navega
  entre SKUs hermanos, tabs animados (layoutId underline), tabla de specs, zona de
  descargas con PDFs reales, badges→landing de tecnología, piezas de repuesto, cross-sell,
  CTA sticky magnético. `generateStaticParams` sobre el catálogo.
- **F4 Landings de tecnología:** hero monumental + sticky-benefits pineado + productos
  reales que la llevan + cross-links.
- **F5 Servicio/soporte:** buscador de modelo funcional sobre el catálogo, flujo 3 pasos,
  garantía, biblioteca de documentos, FAQ, contacto real.
- **F6 Transversales:** nav/footer con la IA completa, marquee scroll-velocity,
  zoom-parallax, categorías de línea → catálogo filtrado (chips clicables).
- **F7 QA 100K** (§11) + perf (§10) + push.

> En ambos: las tarjetas/chips de categoría deben ser **clicables hacia el catálogo
> filtrado**. Nada decorativo que parezca botón y no haga nada.

---

## 7. Sistema de diseño (antes de secciones)

- Corre **ui-ux-pro-max** para paleta/tipo/estilo; **persístelo** en `design-system/MASTER.md`.
- Paleta del **brandbook real** del cliente, expuesta como tokens `--color-marca-*` en
  `@theme` (utilidades `bg-marca-*`). Proporción tipo 70% neutros · 20% primario · 10% acentos.
- **Tipografía dos voces:** display con carácter (Archivo, Bebas…) + grotesk de cuerpo
  (Barlow…). Nunca Inter/Roboto default. Clase `.kicker` (mono, uppercase, tracking ancho).
- Modo oscuro **scoped** (`.dark` en secciones de drama), light por default.

### Anti-AI-slop (prohibiciones duras)
- Nada de gradientes azul→morado ni púrpura→rosa. Nada de texto con gradiente,
  glassmorphism decorativo, grids de cards monótonos, bordes gruesos a la izquierda,
  emojis en headings. Datos concretos antes que adjetivos.

---

## 8. Arsenal de efectos (mapa sección→efecto, investigado en vivo)

**Kit portable en MOEN** (`src/components/` — cópialos, ya traen reduced-motion,
pausa offscreen y GPU-only):

| Componente | Ruta en MOEN | Para qué |
|---|---|---|
| WaterRipple | `effects/water-ripple.tsx` | Momento signature WebGL sin deps (adapta el shader al alma de la marca) |
| ParallaxImage (+zoom) | `effects/parallax-image.tsx` | Parallax/zoom-parallax en cualquier imagen |
| Magnetic | `effects/magnetic.tsx` | CTAs magnéticos |
| Tilt (+spotlight) | `effects/tilt.tsx` | Cards de producto 3D |
| Reveal | `site/reveal.tsx` | Aparición al scroll (whileInView once — NO en listas filtradas) |
| SmoothScroll | `site/smooth-scroll.tsx` | Lenis diferido al primer frame |
| Marquee | `site/marquee.tsx` | Cinta scroll-velocity con pausa offscreen |
| ProgressRail | `site/progress-rail.tsx` | Riel lateral (ícono de marca, mix-blend) |
| CustomCursor | `site/custom-cursor.tsx` | Cursor de marca (blend en el elemento, no full-screen) |
| DeferredEffects + useIdle | `site/deferred-effects.tsx`, `lib/use-idle.ts` | Montaje post-hidratación |
| StatValue + NumberTicker | `site/stat-value.tsx`, `ui/number-ticker.tsx` | Contadores (es-MX, sin agrupación en años) |
| BorderBeam | `ui/border-beam.tsx` | Halo en inputs/CTAs (MagicUI, registry público OK) |
| StatementScrolly | `home/statement-scrolly.tsx` | Palabra por palabra |
| CollectionsPinned | `home/collections-pinned.tsx` | Sección pineada 01/0N |
| StickyBenefits | `innovation/sticky-benefits.tsx` | Beneficios pineados |
| Timeline | `history/timeline.tsx` | Línea del tiempo con hilo que se dibuja |
| CatalogExplorer + ProductCard/Hero/Tabs | `catalog/*` | Catálogo y ficha completos |
| ModelFinder | `service/model-finder.tsx` | Buscador con resultados blur-fade |
| OG premium | `app/opengraph-image.tsx` + `app/fonts/` | Receta completa (§9) |

**21st.dev** = catálogo de inspiración (Aceternity/MagicUI/motion-primitives). Navega
categorías vivas (`/community/components/s/{hero,scroll-area,card,text,features}`) y
elige por sección. Descarta: efectos con three.js (~600KB) para un solo momento,
morphing que sacrifique legibilidad, cualquier cosa fuera de paleta.

---

## 9. OG image premium (receta satori — 4 trampas resueltas)

El OG default (fondo plano + sans-serif) es inaceptable. El OG debe replicar el hero:
foto real + overlays + wordmark + dos voces tipográficas. `next/og` (satori) tiene
límites NO documentados:

1. **WebP no funciona** en `<img src>` → convierte la foto a **JPEG** dedicado (`-og.jpg`).
2. **Variable fonts multi-eje no funcionan** → instancia un TTF estático:
   `python3 -m fontTools.varLib.instancer Font[wght].ttf wght=800 -o Font-ExtraBold.ttf`.
3. **WOFF/WOFF2 no funcionan** (y Google Fonts sirve eso) → **empaqueta los TTF** en
   `src/app/fonts/` y léelos con `readFileSync` (cero red en build).
4. **ImageMagick rompe la transparencia SVG→PNG** en algunos SVG → rasteriza el wordmark
   **directo sobre el color de fondo real** de la tarjeta (no necesita alfa).

Además: velo (`scrim`) dedicado tras el bloque de texto para legibilidad garantizada,
marco fino de marca, y **verifica mirando el PNG generado** (curl al route), no solo
que compile. `twitter.card: summary_large_image` en el layout.

---

## 10. PERFORMANCE desde el día 1 (no como parche)

Lección MOEN: en una MacBook Air fanless con Chrome, lo que en tu máquina es invisible
se acumula. Reglas:

- **Cero animaciones `repeat: Infinity` sin gate.** Audita con `grep -rn "Infinity" src`
  antes de entregar. Todo loop perpetuo se pausa con IntersectionObserver (offscreen),
  `document.hidden`, o se ata a interacción. Un solo `repeat: Infinity` = 60 recalcs/s
  y CPU para siempre en esa página.
- **Difiere lo global:** cursor/riel montados con `useIdle` (requestIdleCallback);
  Lenis tras el primer `requestAnimationFrame`; init de WebGL (compilación de shaders)
  en idle. La imagen pinta primero; el canvas hace fade-in **solo tras su primer frame
  pintado** (si WebGL falla, el usuario ve la foto y nada se rompe).
- **mix-blend-difference nunca full-screen** — aplícalo al elemento pequeño (cursor 32px).
- **`content-visibility: auto`** (clase `.cv-auto` con `contain-intrinsic-size`) SOLO en
  secciones estáticas no scroll-linked (footer, grids). Jamás en pineadas.
- **Fuentes:** solo los pesos realmente usados (verifica con grep antes de recortar).
- **Solo `transform`/`opacity`.** `whileInView` con `once: true`. `prefers-reduced-motion`
  respetado en TODO (pero el sitio debe verse VIVO sin él — fades suaves, no vacío).
- **Cómo medir:** Playwright + CDP `Performance.getMetrics` (TaskDuration, RecalcStyleCount),
  CPU throttling 4x, **mediana de ≥6 corridas**. Referencia: una página sana en reposo
  = 0 recalcs/s y ~1% CPU.

---

## 11. Verificación (evidencia antes de afirmar)

- `pnpm exec tsc --noEmit` → 0 · `next lint` → 0 · `pnpm build` → 0 warnings.
- **QA visual con Playwright + Chrome del sistema** (`chromium.launch({channel:'chrome'})`
  con `playwright-core`, sin descargar navegador): script que navega, scrollea a cada
  escena, interactúa (filtros, tabs, buscador) y captura screenshots que TÚ miras.
  Multi-viewport: 375 / 768 / 1440.
- ⚠️ La pestaña de la extensión suele estar en background → rAF congelado → capturas "a
  medio fade". Bombea frames con scrolls CDP o usa Playwright headless (sí corre rAF).
- Prueba el **peor caso**: `--disable-webgl` (el fallback debe ser la foto, cero errores),
  y `reducedMotion: 'reduce'`.
- Fallback del ecosistema: cada página del `generateStaticParams` responde 200 (curl loop).
- Lighthouse: LCP < 2.5s, CLS < 0.1. Accesibilidad: contraste, focus, ARIA.

---

## 12. Deploy

- Repo y Vercel según el brief. **El repo debe tener el código ANTES de importar en Vercel**
  (repo vacío = import roto). `.gitignore`: `node_modules`, `.next`, `.env*`, `.DS_Store`,
  **la carpeta de branding fuente del cliente** (los assets necesarios ya viven en
  `public/brand/`), `.claude/`, `*.tsbuildinfo`.
- Cada push a `main` → deploy; ramas → previews.
- Mientras no se venda: `*.vercel.app`. Los visitantes NUNCA deben necesitar configurar
  nada (la página funciona sin WebGL, sin GPU, con reduce-motion).

---

## ⚠️ Trampas de producción (lecciones ya pagadas)

| Trampa | Solución |
|---|---|
| Next 16 Turbopack build roto en Vercel | Next 15 (Webpack); 16 solo tras build de humo OK |
| Correr `pnpm build` con `pnpm dev` encendido | corrompe `.next` → detén dev antes |
| **Server zombie sirviendo build viejo** | `pkill` por nombre falla → **`lsof -ti :PUERTO \| xargs kill -9`** |
| **Prerender raro tras regenerar data** (ruta 404 con el HTML existiendo) | `rm -rf .next` y rebuild antes de culpar al código |
| pnpm ignora `onlyBuiltDependencies` | `allowBuilds: {pkg: true}` en `pnpm-workspace.yaml` |
| 21st.dev registry pide auth | reimplementa el patrón a mano o usa el registry del autor (MagicUI OK) |
| `eslint-config-next` roto con flat config | `FlatCompat` de `@eslint/eslintrc` + versiones EXACTAS alineadas plugin/config |
| `favicon.ico` default gana sobre `icon.png` | bórralo y usa `icons` en metadata |
| `window.scroll` no dispara con Lenis | `useLenis` / `useScroll` de motion (autoRaf sí sincroniza el nativo) |
| `whileInView` deja invisibles ítems de listas filtradas | `animate` al montar o render estático (localizadores, catálogos) |
| `.container` con `margin:0 auto` dentro de flex | `width:100%` al container |
| Puerto dev ocupado por otro proyecto | libera o fija otro; nunca mates el server ajeno |
| **Sitio corporativo bloquea headless/curl** | extensión Chrome real + fetch same-origin (§5.1) |
| **CDN sirve masters diminutos escalados** | verifica resolución nativa con `/exact/` antes de usar de hero (§5.3) |
| **SKUs sin foto en el catálogo original** | cura la selección: solo SKUs con imagen verificada |
| **satori: WebP / variable fonts / WOFF no soportados** | JPEG + TTF estáticos empaquetados (§9) |
| ImageMagick SVG→PNG con alfa roto | rasteriza sobre el color de fondo real |
| **`repeat: Infinity` sin gate** | pausa por visibilidad o interacción (§10); audita con grep |
| `mix-blend` full-screen | blend en el elemento chico |
| Canvas WebGL visible antes de pintar | `setActive` solo tras el primer `drawArrays` |
| TS re-ensancha refs a null en funciones anidadas | pasa `wrap`/`canvas` como parámetros tipados |
| Pestaña background congela rAF/timers | scrolls CDP para lazy-load; Playwright para QA |
| Medición de perf de UNA corrida | mediana de ≥6 corridas o es ruido |
| OG en runtime edge | quítalo: como estático prerenderiza (○) sin warning |

---
*Fuentes: reglas globales de Luis · Luzar · n18 · Aceropciones · **MOEN 100K** (repo de
referencia canónica de componentes) · `web-starter` real. Cuando descubras una trampa
nueva o cambie el stack, actualiza este archivo — es la fuente de verdad.*

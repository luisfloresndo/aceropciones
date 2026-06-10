/**
 * Contenido de la landing de Aceropciones y Maquilas (AOM).
 * TODO el texto proviene del sitio actual (aceropciones.com.mx) y del
 * Manual de Identidad Corporativa 2025. Sin métricas inventadas.
 */

export const brand = {
  name: 'Aceropciones',
  fullName: 'Aceropciones y Maquilas',
  short: 'AOM',
  lema: 'Acero con precisión, soluciones a la medida',
  promesa: 'El acero que mueve tu industria, siempre a tiempo.',
}

export const contacto = {
  telefono: '(81) 8321-5210',
  telefonoHref: 'tel:+528183215210',
  conmutador: 'Conmutador con 6 líneas',
  direccion:
    'Puerto de Veracruz No. 225, Col. La Fe, San Nicolás de los Garza, N.L., C.P. 66477',
  ciudad: 'San Nicolás de los Garza, Nuevo León',
  ejecutivos: [
    { nombre: 'Patricia Díaz', correo: 'pdiaz@aceropciones.com.mx' },
    { nombre: 'Jorge Garza', correo: 'jgarza@aceropciones.com.mx' },
  ],
}

export const nav = [
  { label: 'Nosotros', href: '/#rebrand' },
  { label: 'Productos', href: '/#catalogo' },
  { label: 'Maquila', href: '/#maquila' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Contacto', href: '/#contacto' },
]

/** Hechos verificables — no son métricas de desempeño inventadas. */
export const hechos = [
  { valor: '+20', unidad: 'años', detalle: 'de trayectoria en el sector' },
  { valor: '11', unidad: 'líneas', detalle: 'de producto en acero' },
  { valor: '6', unidad: 'procesos', detalle: 'de maquila industrial' },
  { valor: "10'", unidad: '× ¼"', detalle: 'capacidad máxima de rolado' },
]

export const sectores = [
  'Automotriz',
  'Construcción',
  'Manufactura general',
  'Exportación',
]

export const mision =
  'Proveer soluciones integrales de acero y maquila con la más alta calidad, cumplimiento puntual y trato personalizado, siendo el aliado estratégico que impulsa la productividad y competitividad de nuestros clientes.'

export const vision =
  'Ser reconocidos como el proveedor de referencia en el sector industrial del norte de México, destacando por nuestra innovación, confiabilidad y capacidad de respuesta en un mercado global cada vez más exigente.'

export const propuestaValor =
  'AOM combina el conocimiento técnico del acero industrial con la flexibilidad de una empresa de maquila ágil: tiempos de respuesta competitivos, trazabilidad en cada orden y un equipo técnico disponible para resolver necesidades específicas de fabricación.'

/** Arquetipos de marca — del Manual de Identidad 2025. */
export const arquetipos = [
  {
    titulo: 'El Experto',
    descripcion:
      'Conoce la industria del acero a fondo. Habla con autoridad técnica y resuelve con precisión.',
    expresion: 'Precisión · Dominio · Referente',
  },
  {
    titulo: 'El Hacedor',
    descripcion:
      'Orientado a resultados. Entrega, no promete. Cada orden se cumple en tiempo y forma.',
    expresion: 'Acción · Eficiencia · Cumplimiento',
  },
  {
    titulo: 'El Aliado',
    descripcion:
      'Acompaña a sus clientes como socio estratégico, construyendo relaciones de largo plazo.',
    expresion: 'Confianza · Cercanía · Largo plazo',
  },
]

/** Valores de marca — Manual de Identidad 2025 (versión visual). */
export const valores = [
  {
    nombre: 'Precisión',
    descripcion:
      'Calibrado, trazabilidad y tolerancias controladas en cada proceso.',
  },
  {
    nombre: 'Resistencia',
    descripcion:
      'Materiales y procesos que responden a las exigencias industriales.',
  },
  {
    nombre: 'Confianza',
    descripcion:
      'Respaldamos cada afirmación con datos reales, no con promesas.',
  },
  {
    nombre: 'Calidad',
    descripcion:
      'Productos y servicios que superan las expectativas del cliente.',
  },
  {
    nombre: 'Soluciones a medida',
    descripcion:
      'Fabricación específica para la necesidad real de cada proyecto.',
  },
]

/** Catálogo de acero — 11 líneas verificadas del sitio actual. */
export type ProductoForma =
  | 'angulo'
  | 'canal'
  | 'solera'
  | 'ptr'
  | 'viga'
  | 'redondo'
  | 'lamina'
  | 'placa'
  | 'tubo'
  | 'inox'
  | 'aluminio'

export type FichaTecnica = { src: string; w: number; h: number }

export type Producto = {
  slug: string
  nombre: string
  forma: ProductoForma
  /** Descripción corta — tarjeta del catálogo en la landing. */
  descripcion: string
  /** Resumen amplio — encabezado de la subpágina de producto. */
  resumen: string
  grados?: string[]
  tramos?: string[]
  presentaciones?: string[]
  /** Imágenes de la ficha técnica oficial (tablas de medidas y pesos). */
  fichas: FichaTecnica[]
  notas?: string[]
}

/** Catálogo de acero — 11 líneas, datos del sitio aceropciones.com.mx. */
export const catalogo: Producto[] = [
  {
    slug: 'angulos',
    nombre: 'Ángulos',
    forma: 'angulo',
    descripcion: 'Perfil en L para estructuras y refuerzos.',
    resumen:
      'Perfil angular en L —de lados iguales y desiguales— para estructura metálica, refuerzos, bastidores y herrería. Disponible en distintos grados de acero según la exigencia del proyecto.',
    grados: ['ASTM A-36', 'A-529-50', 'A-572-50'],
    tramos: ['6.1 m (20 pies)', '12.2 m (40 pies)'],
    presentaciones: ['Ángulo de lados iguales', 'Ángulo de lados desiguales'],
    fichas: [
      { src: '/fichas/angulos-1.jpg', w: 435, h: 761 },
      { src: '/fichas/angulos-2.jpg', w: 435, h: 687 },
      { src: '/fichas/angulos-3.jpg', w: 494, h: 295 },
    ],
  },
  {
    slug: 'canales-ips',
    nombre: 'Canales IPS',
    forma: 'canal',
    descripcion: 'Perfil en C para soporte y bastidores.',
    resumen:
      'Canal estructural IPS —perfil en C— para largueros, soportes, bastidores y estructura ligera.',
    grados: ['ASTM A-36'],
    tramos: ['6.1 m', '12.2 m'],
    fichas: [{ src: '/fichas/canales-ips-1.jpg', w: 641, h: 862 }],
  },
  {
    slug: 'solera',
    nombre: 'Solera',
    forma: 'solera',
    descripcion: 'Barra plana laminada para herrería y estructura.',
    resumen:
      'Solera —barra plana laminada en caliente— para herrería, estructura, refuerzos y fabricación general.',
    tramos: ['6.1 m (20 pies)', '12.2 m (40 pies)'],
    fichas: [
      { src: '/fichas/solera-1.jpg', w: 443, h: 855 },
      { src: '/fichas/solera-2.jpg', w: 477, h: 855 },
    ],
  },
  {
    slug: 'ptr-hss',
    nombre: 'PTR y HSS',
    forma: 'ptr',
    descripcion: 'Tubular estructural de sección cuadrada y rectangular.',
    resumen:
      'Perfil tubular estructural PTR y HSS de sección cuadrada y rectangular para estructura, bastidores y fabricación. El HSS A-500"B ofrece un límite elástico de 46,000 PSI.',
    grados: ['HSS ASTM A-500"B — límite elástico 46,000 PSI'],
    tramos: ['6.10 m', '12.2 m'],
    presentaciones: ['PTR', 'HSS estructural'],
    fichas: [
      { src: '/fichas/ptr-hss-1.jpg', w: 565, h: 1481 },
      { src: '/fichas/ptr-hss-2.jpg', w: 394, h: 957 },
    ],
    notas: ['Incluye código de color de identificación por calibre.'],
  },
  {
    slug: 'viga-ipr',
    nombre: 'Viga IPR y W',
    forma: 'viga',
    descripcion: 'Perfil I de ala ancha para claros estructurales.',
    resumen:
      'Viga IPR / W de ala ancha —perfil I— para claros estructurales, marcos y estructura de carga.',
    fichas: [{ src: '/fichas/viga-ipr-1.jpg', w: 858, h: 1187 }],
  },
  {
    slug: 'redondos',
    nombre: 'Redondos',
    forma: 'redondo',
    descripcion: 'Barra sólida cilíndrica para maquinado y ejes.',
    resumen:
      'Barra sólida redonda y cuadrada para maquinado, ejes y fabricación. Incluye redondo brillante (semiflecha) para aplicaciones de mayor precisión.',
    presentaciones: [
      'Redondo y cuadrado',
      'Redondo brillante (semiflecha)',
    ],
    fichas: [{ src: '/fichas/redondos-1.jpg', w: 617, h: 525 }],
  },
  {
    slug: 'lamina-fria-galvanizada',
    nombre: 'Lámina fría y galvanizada',
    forma: 'lamina',
    descripcion: 'Lámina lisa, calibrada y con recubrimiento de zinc.',
    resumen:
      'Lámina lisa calibrada: lámina rolada en frío y lámina galvanizada con recubrimiento de zinc, para troquelado, fabricación y cubiertas.',
    presentaciones: ['Lámina en frío', 'Lámina galvanizada'],
    fichas: [
      { src: '/fichas/lamina-1.jpg', w: 604, h: 242 },
      { src: '/fichas/lamina-2.jpg', w: 604, h: 242 },
    ],
  },
  {
    slug: 'placa-y-lamina',
    nombre: 'Placa y hoja',
    forma: 'placa',
    descripcion: 'Placa de acero al carbón para corte y fabricación.',
    resumen:
      'Placa y hoja de acero al carbón para corte, fabricación estructural y maquila: placa de grado, placa y lámina comercial y de alta resistencia (rollo), y lámina caliente decapada y sin decapar.',
    presentaciones: [
      'Placa de grado',
      'Placa y lámina comercial y de alta resistencia (rollo)',
      'Lámina caliente decapada y sin decapar',
    ],
    fichas: [
      { src: '/fichas/placa-1.jpg', w: 909, h: 536 },
      { src: '/fichas/placa-2.jpg', w: 908, h: 305 },
      { src: '/fichas/placa-3.jpg', w: 646, h: 263 },
      { src: '/fichas/placa-4.jpg', w: 604, h: 242 },
    ],
  },
  {
    slug: 'tubo-y-polin',
    nombre: 'Tubo y polín',
    forma: 'tubo',
    descripcion: 'Tubería y polín para estructura ligera y cubiertas.',
    resumen:
      'Tubería y polín para estructura ligera, cubiertas y conducción: tubo cédula 40 y estructural, tubo mecánico CED 30 y polín.',
    presentaciones: [
      'Tubo cédula 40 y estructural',
      'Tubo mecánico CED 30',
      'Polín',
    ],
    fichas: [{ src: '/fichas/tubo-1.jpg', w: 655, h: 566 }],
  },
  {
    slug: 'acero-inoxidable',
    nombre: 'Acero inoxidable',
    forma: 'inox',
    descripcion: 'Aceros especiales resistentes a la corrosión.',
    resumen:
      'Aceros inoxidables resistentes a la corrosión para aplicaciones que exigen higiene, durabilidad o resistencia química.',
    fichas: [],
    notas: [
      'Disponibilidad, grado y especificación bajo pedido — consulta a un asesor.',
    ],
  },
  {
    slug: 'lamina-aluminio',
    nombre: 'Lámina de aluminio',
    forma: 'aluminio',
    descripcion: 'Lámina de aluminio ligera para acabados y cubiertas.',
    resumen:
      'Lámina de aluminio ligera y resistente a la corrosión para acabados, cubiertas y fabricación.',
    fichas: [],
    notas: [
      'Disponibilidad, calibre y especificación bajo pedido — consulta a un asesor.',
    ],
  },
]

/** Busca un producto por su slug. */
export function getProducto(slug: string): Producto | undefined {
  return catalogo.find((p) => p.slug === slug)
}

/**
 * Productos con fotografía disponible (mejoradas del sitio aceropciones.com.mx).
 * Los que no están aquí usan el icono de sección transversal como respaldo.
 */
const productosConFoto = new Set<string>([
  'angulos',
  'canales-ips',
  'solera',
  'ptr-hss',
  'viga-ipr',
  'redondos',
  'lamina-fria-galvanizada',
  'placa-y-lamina',
  'acero-inoxidable',
  'tubo-y-polin',
  'lamina-aluminio',
])

/** Ruta de la foto del producto, o null si no hay foto. */
export function fotoProducto(slug: string): string | null {
  return productosConFoto.has(slug) ? `/productos/${slug}.jpg` : null
}

/** Servicios de maquila — 6 procesos verificados del sitio actual. */
export const maquila = [
  {
    nombre: 'Nivelación de lámina y placa',
    descripcion:
      'Eliminamos el coil-set y las deformaciones para entregar material plano y estable.',
  },
  {
    nombre: 'Corte y dobleces',
    descripcion:
      'Corte a medida y doblez de lámina y placa según el plano del cliente.',
  },
  {
    nombre: 'Corte en cinta',
    descripcion:
      'Seccionado de perfiles y barra sólida con sierra cinta de precisión.',
  },
  {
    nombre: 'Corte en pantógrafo y plasma',
    descripcion:
      'Corte de perfiles y geometrías en placa mediante pantógrafo y plasma.',
  },
  {
    nombre: 'Corte con láser',
    descripcion:
      'Corte láser para geometrías finas, contornos complejos y alta repetibilidad.',
  },
  {
    nombre: 'Rolado',
    descripcion:
      'Rolado de lámina y placa con capacidad de hasta 10 pies por ¼ de pulgada.',
  },
]

/** Proceso de trabajo con AOM — derivado de la propuesta de valor del Manual. */
export const proceso = [
  {
    titulo: 'Requerimiento',
    descripcion:
      'Recibimos el plano, calibre y especificación técnica de tu proyecto.',
  },
  {
    titulo: 'Cotización',
    descripcion:
      'Atención personalizada y propuesta con tiempos de respuesta competitivos.',
  },
  {
    titulo: 'Suministro',
    descripcion:
      'Acero de proveedores de prestigio nacional e internacional.',
  },
  {
    titulo: 'Maquila',
    descripcion:
      'Nivelado, corte, doblez, rolado o láser según el proceso requerido.',
  },
  {
    titulo: 'Trazabilidad',
    descripcion:
      'Control y seguimiento de cada orden hasta la entrega.',
  },
]

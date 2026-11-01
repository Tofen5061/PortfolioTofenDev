// ============================================================
// Contenido del portafolio (todo el texto vive aquí)
// ============================================================

export const WHATSAPP_NUMBER = '50557838591';

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type ProfileKey = 'kevin' | 'tofen';

export type IconName =
  | 'layers'
  | 'globe'
  | 'smartphone'
  | 'zap'
  | 'receipt'
  | 'ticket'
  | 'dashboard'
  | 'calendar'
  | 'credit-card'
  | 'wallet'
  | 'external'
  | 'arrow-right'
  | 'play'
  | 'check'
  | 'sparkles'
  | 'code'
  | 'message';

interface ProfileLink {
  label: string;
  href: string; // vacío = todavía no se muestra
  icon: 'github' | 'linkedin';
}

export interface Profile {
  key: ProfileKey;
  path: string;
  name: string;
  image: string;
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  cta: { label: string; message: string };
  secondary: { label: string; href: string };
  links: ProfileLink[];
}

export const PROFILES: Record<ProfileKey, Profile> = {
  tofen: {
    key: 'tofen',
    path: '/',
    name: 'Tofen',
    image: '/tofenPfp.webp',
    pageTitle: 'Tofen · Desarrollo de software a medida',
    metaDescription:
      'Tofen diseña y desarrolla sistemas a medida, páginas web, apps móviles y automatizaciones para negocios.',
    eyebrow: 'Estudio de desarrollo de software',
    headline: 'Software a la medida de',
    highlight: 'tu negocio',
    description:
      'Diseñamos y desarrollamos sistemas, apps y páginas web que resuelven problemas reales: menos papeleo, más control y clientes atendidos más rápido.',
    cta: { label: 'Cotiza tu proyecto', message: 'Hola Tofen, quiero cotizar un proyecto.' },
    secondary: { label: 'Ver productos', href: '#productos' },
    links: [],
  },
  kevin: {
    key: 'kevin',
    path: '/kevin',
    name: 'Kevin Martínez',
    image: '/kevinPfp.webp',
    pageTitle: 'Kevin Martínez · Front End Developer',
    metaDescription:
      'Kevin Martínez, desarrollador front end especializado en Astro y React Native, con Tailwind, CSS y HTML como base.',
    eyebrow: 'Front End Developer',
    headline: 'Interfaces que se sienten',
    highlight: 'bien al usarlas',
    description:
      'Soy Kevin, desarrollador front end. Me especializo en Astro para la web y React Native para apps móviles, con Tailwind, CSS y HTML como base.',
    cta: {
      label: 'Hablemos',
      message: 'Hola Kevin, vi tu portafolio y me gustaría hablar contigo.',
    },
    secondary: { label: 'Ver proyectos', href: '#proyectos' },
    links: [
      { label: 'GitHub', href: '', icon: 'github' },
      { label: 'LinkedIn', href: '', icon: 'linkedin' },
    ],
  },
};

// Orden de los avatares: el primero queda a la izquierda
export const PROFILE_ORDER: ProfileKey[] = ['kevin', 'tofen'];

// ============================================================
// Tofen
// ============================================================

export const SERVICES: { title: string; description: string; icon: IconName }[] = [
  {
    title: 'Sistemas a medida',
    description: 'Software hecho para cómo trabaja tu negocio: ventas, inventario, turnos y reportes.',
    icon: 'layers',
  },
  {
    title: 'Páginas web',
    description: 'Sitios rápidos y modernos que presentan tu marca y convierten visitas en clientes.',
    icon: 'globe',
  },
  {
    title: 'Apps móviles',
    description: 'Apps Android para tu equipo o tus clientes, pensadas para el día a día.',
    icon: 'smartphone',
  },
  {
    title: 'Automatizaciones',
    description: 'Procesos repetitivos que se hacen solos: mensajes, facturas y reportes.',
    icon: 'zap',
  },
];

export const ERP = {
  name: 'SistemaERP',
  tagline: 'Agenda, créditos y finanzas de tu negocio en un solo lugar.',
  video: '/proyectos/sistema-erp-demo.mp4',
  poster: '/proyectos/sistema-erp-poster.jpg',
  demoUrl: '', // enlace de YouTube cuando esté listo
  ctaMessage: 'Hola Tofen, me interesa SistemaERP. ¿Me pueden dar una demo?',
  modules: [
    {
      name: 'Agenda y citas',
      description: 'Registra, edita y completa citas. Contacta al cliente con un toque.',
      icon: 'calendar' as IconName,
    },
    {
      name: 'Créditos y abonos',
      description: 'Cuotas, fechas de vencimiento, abonos y recordatorios por WhatsApp.',
      icon: 'credit-card' as IconName,
    },
    {
      name: 'Finanzas',
      description: 'Ingresos y egresos, efectivo y tarjeta, saldo y ganancia por periodo.',
      icon: 'wallet' as IconName,
    },
  ],
};

export const PROCESS = [
  { title: 'Platicamos', description: 'Nos cuentas tu idea o el problema que quieres resolver.' },
  { title: 'Diseñamos', description: 'Te mostramos cómo se verá antes de programar.' },
  { title: 'Desarrollamos', description: 'Construimos por partes y te enseñamos los avances.' },
  { title: 'Entregamos', description: 'Lo publicamos y te acompañamos después.' },
];

// ============================================================
// Kevin
// ============================================================

export const SKILLS = {
  domino: ['Astro', 'React Native', 'Tailwind CSS', 'CSS', 'HTML'],
  trabajoCon: ['JavaScript', 'TypeScript', 'React', 'SQL'],
};

export interface Project {
  name: string;
  description: string;
  tags: string[];
  icon: IconName;
  liveUrl?: string;
  video?: string;
  poster?: string;
  layout?: 'phone' | 'wide'; // 'phone' = video vertical dentro de un teléfono
}

export const PROJECTS: Project[] = [
  {
    name: 'Facturación Express',
    description:
      'App para repartidores de una empresa de delivery: arman la factura en el camino, calcula total y vuelto al instante y la envía por WhatsApp. Incluye estadísticas por día, semana y mes.',
    tags: ['Facturación', 'Estadísticas', 'WhatsApp'],
    icon: 'receipt',
    // Proyecto de un cliente: solo video, sin enlace público
    video: '/proyectos/facturacion-express-demo.mp4',
    poster: '/proyectos/facturacion-express-demo-poster.jpg',
    layout: 'phone',
  },
  {
    name: 'Sistema de lotería',
    description:
      'Punto de venta para loterías: emisión de boletas con impresión térmica por Bluetooth, turnos configurables, historial de ventas y arqueo de cierre.',
    tags: ['Punto de venta', 'Bluetooth', 'Android'],
    icon: 'ticket',
    video: '/proyectos/loteria-demo.mp4',
    poster: '/proyectos/loteria-demo-poster.jpg',
    layout: 'phone',
  },
  {
    name: 'SistemaERP',
    description:
      'ERP modular para negocios: agenda y citas, créditos con abonos y finanzas con balance por periodo.',
    tags: ['Agenda', 'Créditos', 'Finanzas'],
    icon: 'dashboard',
    video: '/proyectos/sistema-erp-demo.mp4',
    poster: '/proyectos/sistema-erp-poster.jpg',
    layout: 'wide',
  },
];

export const ABOUT = {
  paragraphs: [
    'Me gusta que las cosas se vean bien y se sientan mejor. Cuido que una interfaz cargue rápido, se lea fácil y funcione cómoda en el teléfono.',
    'Hoy desarrollo apps web y Android para negocios reales, y con Tofen llevo esas soluciones a más empresas.',
  ],
  highlights: [
    {
      title: 'Primero el teléfono',
      description: 'Mis apps se usan en la calle, en el mostrador y en el camino.',
      icon: 'smartphone' as IconName,
    },
    {
      title: 'Cuido cada detalle',
      description: 'Espacios, animaciones y estados que hacen que todo se sienta pulido.',
      icon: 'sparkles' as IconName,
    },
    {
      title: 'De la idea a producción',
      description: 'Diseño, desarrollo y publico, también en Android con React Native.',
      icon: 'code' as IconName,
    },
  ],
};

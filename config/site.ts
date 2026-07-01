/**
 * Única fuente de verdad para datos personales, navegación, SEO y contacto.
 * Editar este archivo NO requiere tocar componentes de React.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Junior González",
  role: "Técnico IT Support & Helpdesk",
  tagline: "Soporte técnico N1/N2 dando el salto al desarrollo de software.",
  description:
    "Portfolio de Junior González: técnico de soporte IT (N1/N2) cursando la Tecnicatura en Programación (UTN), construyendo herramientas reales para resolver problemas reales.",
  location: "Belgrano, CABA, Argentina",
  email: "jrgonzalez.it@gmail.com",
  availability: "Disponible para posiciones de soporte IT y oportunidades junior en desarrollo",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://junior-gonzalez.dev",

  social: {
    github: "https://github.com/jrgonzalezit",
    linkedin: "https://www.linkedin.com/in/junior-gonzalezg",
    email: "mailto:jrgonzalez.it@gmail.com",
  },

  resumeUrl: "/cv/junior-gonzalez-cv.pdf",

  bio: [
    "Técnico IT con más de 1 año de experiencia especializado en soporte técnico N1/N2, helpdesk y operación de sistemas, dentro de más de 2 años de trayectoria laboral en entornos de alta demanda.",
    "Resuelvo incidencias de hardware, software, conectividad y sistemas POS con foco en la resolución en primer contacto (FCR). Me adapto rápido, aprendo de forma autónoma y me comunico con usuarios técnicos y no técnicos por igual.",
    "Estoy cursando la Tecnicatura Universitaria en Programación en la UTN, y uso mi trabajo diario en soporte como fuente de problemas reales para automatizar: el IT Support Toolkit nació de tareas que repetía a mano todos los días.",
    "Certificado por Google (IT Support) y Cisco (Introducción a la Ciberseguridad).",
  ],

  nav: [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experiencia", href: "/experience" },
    { label: "Certificados", href: "/certificates" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contact" },
  ] satisfies NavItem[],

  footerNav: [
    { label: "Privacidad", href: "/privacy" },
    { label: "RSS", href: "/blog/rss.xml" },
  ] satisfies NavItem[],

  seo: {
    titleTemplate: "%s | Junior González",
    defaultTitle: "Junior González — Técnico IT Support & Developer en formación",
    keywords: [
      "Junior González",
      "IT Support",
      "Helpdesk",
      "Soporte técnico N1 N2",
      "PowerShell",
      "Desarrollador junior",
      "UTN",
      "Portfolio",
    ],
    twitterHandle: undefined as string | undefined,
  },

  github: {
    username: "jrgonzalezit",
    featuredRepo: "it-support-toolkit",
  },
} as const;

export type SiteConfig = typeof siteConfig;

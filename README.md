# Portfolio — Junior González

Portfolio personal, 100% data-driven: agregar un proyecto o un post nuevo no requiere tocar componentes de React, solo archivos de contenido en `content/`.

Ver [`PROJECT_ANALYSIS.md`](./PROJECT_ANALYSIS.md) para el análisis del workspace que originó las decisiones de contenido y alcance, y [`ARCHITECTURE.md`](./ARCHITECTURE.md) para las decisiones técnicas.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19, TypeScript estricto)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [motion](https://motion.dev) (Framer Motion) para animaciones
- [content-collections](https://www.content-collections.dev) — contenido MDX validado con Zod, sin base de datos
- [next-themes](https://github.com/pacocoursey/next-themes) — dark/light mode
- [Resend](https://resend.com) — formulario de contacto (opcional, con fallback si no está configurado)

## Empezar

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Ver [`docs/INSTALLATION.md`](./docs/INSTALLATION.md) para el setup completo con variables de entorno.

## Agregar contenido

Ver [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md) — el resumen corto:

- **Proyecto nuevo:** un archivo `.mdx` en `content/projects/`.
- **Post de blog nuevo:** un archivo `.mdx` en `content/blog/`.
- **Experiencia/certificado nuevo:** un archivo `.mdx` en `content/experience/` o `content/certificates/`.
- **Datos personales, redes, navegación, SEO:** todo vive en [`config/site.ts`](./config/site.ts).

El sitio genera automáticamente la página, la card, el sitemap, el RSS (blog) y las imágenes OG a partir de esos archivos.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |

## Deploy

Ver [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — pensado para Vercel.

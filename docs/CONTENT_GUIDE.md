# Guía de contenido

## Estructura de carpetas

```
portfolio/
├─ content/
│  ├─ projects/       # 1 archivo .mdx = 1 proyecto
│  ├─ blog/            # 1 archivo .mdx = 1 post
│  ├─ experience/       # 1 archivo .mdx = 1 puesto de trabajo
│  ├─ certificates/    # 1 archivo .mdx = 1 certificado/educación
│  └─ skills/skills.ts # datos estructurados (no MDX, es una lista simple)
├─ config/
│  └─ site.ts          # datos personales, redes, nav, SEO, contacto, bio
├─ content-collections.ts  # schemas de cada colección (acá se definen los campos válidos)
├─ public/
│  ├─ cv/               # PDF del CV descargable
│  └─ projects/<slug>/  # imágenes de cada proyecto (cover, gallery, screenshots)
```

## Cómo agregar un proyecto nuevo

1. Creá `content/projects/mi-proyecto.mdx`. El nombre del archivo es el slug de la URL (`/projects/mi-proyecto`).
2. Completá el frontmatter (ver todos los campos disponibles en `content-collections.ts`, colección `projects`). Mínimo necesario:

   ```yaml
   ---
   title: "Nombre del proyecto"
   description: "Una o dos líneas para la card y el meta description."
   technologies: ["Next.js", "TypeScript"]
   category: "Web App"
   status: "completed" # completed | in-progress | archived
   date: "2026-08-01"
   tags: ["nextjs", "typescript"]
   ---
   ```

   Campos opcionales útiles: `featured: true` (aparece en el Home), `githubUrl`, `liveUrl`, `youtubeUrl`, `difficulty`, `duration`, `role`, `teamSize`, `futureImprovements` (array de strings, se muestra en un card aparte), `gallery` (array de rutas de imagen), `coverImage`.

3. Escribí el cuerpo en Markdown/MDX debajo del frontmatter — soporta tablas, bloques de código con syntax highlighting, imágenes, y los componentes custom de `src/lib/mdx-components.tsx` (por ejemplo `<Callout type="warning">texto</Callout>`).
4. Si tenés imágenes, ponelas en `public/projects/mi-proyecto/` y referencialas como `/projects/mi-proyecto/cover.png` en `coverImage`/`gallery`.

Eso es todo. La página de detalle, la card en `/projects`, los filtros por categoría/tag, el sitemap, el buscador (Cmd+K) y la imagen OG se generan solos.

## Cómo agregar un post de blog

Igual que un proyecto, en `content/blog/mi-post.mdx`:

```yaml
---
title: "Título del post"
description: "Resumen para la card y meta description."
date: "2026-08-01"
tags: ["carrera"]
draft: false   # true = no se publica, pero se ve en `npm run dev`
---
```

El tiempo de lectura y la tabla de contenidos se calculan solos a partir de los headings (`##`, `###`) del contenido.

## Cómo agregar experiencia laboral

`content/experience/mi-trabajo.mdx`:

```yaml
---
role: "Puesto"
company: "Empresa"
location: "Ciudad"
startDate: "2026-01-01"
dateLabel: "Ene. 2026 – actualidad"  # texto libre que se muestra (no fuerces fechas exactas que no tenés)
current: true
highlights:
  - "Bullet point de logro/responsabilidad"
order: 4   # más alto = aparece primero si las fechas empatan
---
```

## Cómo agregar un certificado o formación

`content/certificates/mi-certificado.mdx`:

```yaml
---
title: "Nombre del certificado"
issuer: "Institución"
type: "certificate"   # o "education"
status: "completed"   # o "in-progress"
dateLabel: "Completado"
url: "https://credencial.example.com"  # opcional
---
```

## Cómo customizar el tema

Todo en dos lugares:

1. **`config/site.ts`** — nombre, rol, bio, redes, nav, SEO, GitHub username. No requiere tocar componentes.
2. **`src/app/globals.css`** — tokens de color en `:root` (light) y `.dark` (dark mode), formato `oklch()`. El color de acento vive en `--brand`/`--brand-foreground` (usado en botones primarios, links, highlights). Los radios de borde salen de `--radius`.

Para agregar/quitar componentes de shadcn/ui: `npx shadcn@latest add <componente>`.

## Cómo agregar una sección nueva (ej. Services)

1. Agregar una colección en `content-collections.ts` (copiá el patrón de `certificates`, es la más simple).
2. Crear `content/services/` con los `.mdx`.
3. Agregar los helpers correspondientes en `src/lib/content.ts` (`getAllServices`, etc.).
4. Crear `src/app/services/page.tsx`.
5. Agregar el link en `config/site.ts` → `nav`.

Ningún componente existente se toca.

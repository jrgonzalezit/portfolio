# Arquitectura

## Principio central: contenido separado de la UI

Ningún componente de React contiene datos de proyectos, posts, experiencia o certificados. Todo vive en `content/` (MDX) o `config/site.ts` (datos personales/config). Los componentes son genéricos y leen de `lib/content.ts`, que expone helpers puros sobre las colecciones generadas por `content-collections`.

```
content/*.mdx  →  content-collections.ts (schemas Zod + compilación MDX)
              →  content-collections (paquete) genera .content-collections/generated
              →  lib/content.ts (helpers: getAllProjects, getFeaturedProjects, ...)
              →  páginas y componentes
```

Agregar un proyecto nuevo no toca ni un componente: el listado, el sitemap, el buscador (Cmd+K) y las páginas de detalle se generan solos a partir del archivo MDX.

## Por qué content-collections (y no Contentlayer)

Contentlayer está semi-abandonado y tiene fricción conocida con Next.js 15/Turbopack. `content-collections` es la alternativa activamente mantenida, con mejor soporte para App Router y validación de schema vía Zod (`z.object(...)` — la API de "schema como función" fue retirada en versiones recientes, por eso se usa el estilo `schema: z.object({...})` en `content-collections.ts`).

## Por qué Tailwind v4 + shadcn/ui (base-ui)

El proyecto usa la versión actual de shadcn/ui, que migró de Radix UI a [Base UI](https://base-ui.com) como librería primitiva. Diferencias relevantes respecto a versiones anteriores de shadcn (documentadas acá porque no son obvias si se viene de tutoriales viejos):

- No existe `asChild`. Para renderizar un `Button` como otro elemento (ej. un `Link` de Next), se usa la prop `render`: `<Button render={<Link href="/x" />}>texto</Button>`.
- Los componentes tipo `Button` que reciben `render` con un elemento que no es un `<button>` nativo necesitan `nativeButton={false}` explícito, si no Base UI tira un warning en consola (semántica de accesibilidad).
- Los íconos de marca (GitHub, LinkedIn) ya no están en `lucide-react` — están definidos como SVG inline en `src/components/shared/icons.tsx`.

## Sistema de proyectos

`content-collections.ts` define el schema completo de un proyecto (título, descripción, tecnologías, categoría, dificultad, estado, featured, URLs de GitHub/demo/video, fecha, duración, equipo, rol, galería, mejoras futuras, tags). La mayoría de los campos son opcionales — un script de una persona no necesita "team size".

`lib/content.ts` expone:

- `getAllProjects` / `getFeaturedProjects` / `getProjectBySlug`
- `getProjectSummaries` — versión liviana (sin el MDX compilado) para listados con filtros client-side, evita mandar el contenido completo al bundle del cliente
- `getRelatedProjects` — por tags/categoría compartidos
- `getAdjacentProjects` — navegación prev/next
- `getAllProjectCategories` / `getAllProjectTags` — para los filtros de `/projects`

El mismo patrón se repite para blog (`getAllPosts`, `getPostSummaries`, etc.).

## Blog: drafts

Los posts con `draft: true` en el frontmatter se excluyen de las queries de contenido en producción (`getAllPosts`/`getPostBySlug` filtran por `NODE_ENV !== "development"`), pero se ven en `npm run dev` para poder previsualizarlos. `content/blog/bienvenida.mdx` es la plantilla de ejemplo — queda con `draft: true` a propósito.

## Búsqueda

Hay dos buscadores independientes, ambos client-side con `fuse.js` (sin backend):

- **Cmd+K global** (`components/layout/command-menu.tsx`): índice combinado de proyectos + posts, construido server-side en `lib/search.ts` y pasado como prop.
- **Filtros de `/projects` y `/blog`**: búsqueda + filtros de categoría/tags/orden sobre `ProjectSummary[]`/`PostSummary[]`.

## SEO

Todo con convenciones nativas de Next 15 (sin `next-sitemap` ni paquetes extra):

- `app/sitemap.ts` — incluye rutas estáticas + todos los proyectos/posts dinámicamente
- `app/robots.ts`
- `app/opengraph-image.tsx` y `app/projects/[slug]/opengraph-image.tsx` — imágenes OG generadas dinámicamente con `next/og`
- JSON-LD (`lib/seo.ts`): `Person` en el layout raíz, `CreativeWork` en cada proyecto, `BlogPosting` en cada post
- `app/blog/rss.xml/route.ts` — feed RSS real con el paquete `feed`

## Formulario de contacto

Server Action (`app/contact/actions.ts`) + `useActionState` (React 19). Si `RESEND_API_KEY` no está configurada, la action devuelve un mensaje claro pidiendo escribir por email directo — el formulario nunca queda "roto en silencio", y el build no depende de tener la key configurada.

## Qué falta a propósito (documentado, no fabricado)

- **Services**: no hay contenido real de servicios ofrecidos todavía. Agregar la sección es: una colección más en `content-collections.ts` + una página en `src/app/services/` + un link en `config/site.ts` → `nav`. Cero refactor.
- **Uses**: mismo caso — página de herramientas de uso diario, pendiente de contenido real.
- **GitHub contribution graph**: la cuenta de GitHub es nueva y no hay API pública oficial para el grafo de contribuciones sin scraping frágil. `lib/github.ts` sí trae datos reales del repo destacado (stars, lenguaje, forks) vía la API pública de GitHub.

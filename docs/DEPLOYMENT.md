# Deployment (Vercel)

## Setup

1. Importá el repo en [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (autodetectado).
3. Variables de entorno (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` → el dominio final (ej. `https://juniorgonzalez.dev`). Importante: sin esto, el sitemap, las metadata OG y el RSS usan el dominio placeholder de `config/site.ts`.
   - `RESEND_API_KEY` → opcional, para que el formulario de contacto envíe emails de verdad. Sin esto, sigue funcionando con el fallback (le pide al visitante que escriba por email).
   - `GITHUB_TOKEN` → opcional, sube el rate limit de la card de GitHub en el Home.
4. Deploy.

## Dominio propio

Una vez conectado el dominio en Vercel, actualizá `NEXT_PUBLIC_SITE_URL` a ese dominio y hacé un redeploy (afecta metadata, sitemap, RSS y OG images — todos usan `siteConfig.siteUrl` como base).

## Checklist antes de compartir el link

- [ ] `NEXT_PUBLIC_SITE_URL` configurada con el dominio real
- [ ] `content/blog/bienvenida.mdx` — reemplazado por un post real o borrado (tiene `draft: true`, así que no se publica solo, pero conviene no dejarlo de plantilla para siempre)
- [ ] Revisar `/sitemap.xml` y `/robots.txt` en producción
- [ ] Probar el formulario de `/contact` con `RESEND_API_KEY` configurada (o confirmar que el fallback a email se ve bien)
- [ ] Correr Lighthouse en la versión deployada

## CI

No hay pipeline de CI configurado todavía. Como mínimo antes de mergear a la rama de producción: `npm run lint && npm run build`.

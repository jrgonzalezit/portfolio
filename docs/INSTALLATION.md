# Instalación

## Requisitos

- Node.js 20 o superior
- npm (el proyecto usa `package-lock.json`)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Todas son opcionales para desarrollo local — el sitio funciona sin configurarlas (con fallbacks). Ver [`.env.example`](../.env.example).

| Variable | Requerida | Qué hace si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Se usa `https://junior-gonzalez.dev` como default (ver `config/site.ts`) — cambiar antes de deployar a producción. |
| `RESEND_API_KEY` | No | El formulario de contacto muestra un mensaje pidiendo escribir por email directo, en vez de enviar el mensaje. |
| `GITHUB_TOKEN` | No | El fetch a la API de GitHub usa el límite público (60 req/hora) en vez de 5000. |

## Comandos

```bash
npm run dev     # servidor de desarrollo (con content-collections en watch mode)
npm run build   # build de producción
npm run start   # sirve el build
npm run lint    # ESLint
```

## Primer arranque: qué se genera solo

Al correr `dev` o `build`, `content-collections` procesa todo `content/*.mdx` y genera `.content-collections/generated/` (ignorado en git, se regenera siempre). Si TypeScript se queja de no encontrar el módulo `content-collections`, corré `npm run dev` una vez para que se genere.

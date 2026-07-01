# Análisis del workspace — Junior González

_Generado antes de escribir código, como base para personalizar el portfolio._

## 1. Perfil real (fuente: CVs en `~/Documents/cv/`)

- **Nombre:** Junior González
- **Rol actual:** Técnico IT Support & Helpdesk (N1/N2), operación de sistemas
- **Ubicación:** Belgrano, CABA, Argentina · disponibilidad presencial/híbrida en CABA y GBA
- **Contacto:** jrgonzalez.it@gmail.com · +54 11 6736-1310 · linkedin.com/in/junior-gonzalezg
- **Formación:** Tecnicatura Universitaria en Programación — UTN (marzo 2025 – feb. 2028, en curso)
- **Certificaciones:** Google IT Support Professional Certificate (Coursera) · Introduction to Cybersecurity (Cisco Networking Academy)
- **Experiencia laboral:**
  - IT Support & Helpdesk Technician — Le Utthe (retail, multi-sucursal), dic. 2024 – mar. 2026. Soporte a 200+ usuarios/semana, sistemas POS, inventario digital, documentación técnica.
  - Agente de Soporte — Call Center, Cath Technology (Secretaría de Comercio), 2024, 5 meses.
  - Cajero / Encargado de local — gastronomía, 2023, 6 meses.

**Conclusión clave:** este es el portfolio de alguien en **transición activa de IT Support hacia desarrollo de software**, no de un ingeniero senior con años de proyectos productivos. El posicionamiento y el copy del sitio deben reflejar esto con honestidad — es lo que un reclutador o líder técnico va a contrastar contra el CV y LinkedIn en segundos.

## 2. Proyectos de código encontrados

| Proyecto | Ubicación | Estado | Stack | Uso en portfolio |
|---|---|---|---|---|
| **it-support-toolkit** | GitHub `jrgonzalezit/it-support-toolkit`, local en `~/Documents/it-support-toolkit` | Publicado, con README, LICENSE (MIT), git | PowerShell (CIM/WMI), salida TXT/CSV | ✅ Proyecto destacado #1 — bien documentado, resuelve problemas reales de su trabajo actual |
| **Servidor HaxBall** | Local en `~/Documents/haxball`, no publicado en GitHub | Funcional, corriendo en PM2, sin README orientado a portfolio ni LICENSE | Node.js (ESM), librería `haxball.js`, persistencia en JSON, PM2 | ❌ Excluido por decisión del usuario (mantener el portfolio 100% profesional/IT) |
| `HaxStudio-master` | `~/Documents/HaxStudio-master` | Parece ser una herramienta de terceros descargada (editor de mapas), no autoría propia | — | No aplica |

Solo **1 proyecto** está listo para mostrarse tal cual. Esto es la limitación real de contenido más importante del sitio.

## 3. GitHub (`github.com/jrgonzalezit`)

- Cuenta creada recientemente, 1 repositorio público (`it-support-toolkit`), 0 stars, 0 followers.
- Sin bio/website configurados en el perfil.
- **Implicación:** el componente de "GitHub stats" del prompt original (contribution graph, pinned repos, lenguajes) va a verse vacío/pobre si se implementa tal cual. Se sugiere una versión más simple (link a GitHub + repo destacado vía MDX) en vez de una API de contribuciones que hoy no tiene datos que mostrar.

## 4. Decisiones de alcance ya confirmadas con el usuario

1. **Posicionamiento:** "IT Support → Developer en formación", honesto, sin inflar seniority ni inventar servicios de consultoría (IA/n8n/agentes) que no forman parte de su experiencia real.
2. **Ubicación del proyecto:** `C:\Users\ygonzalezgarcia\Documents\portfolio`.
3. **HaxBall:** excluido del portfolio público.

## 5. Ajustes de alcance que voy a proponer en el plan (no fabricar contenido)

El prompt original pide secciones como **Services** (con "AI Automation", "n8n", "AI Agents", "Consulting"), **Certificates** como sección grande, **Uses**, y un **Blog** con posts ya escritos. Ninguno de estos existe hoy como contenido real. En vez de inventar contenido falso:

- **Services:** se omite en el MVP (no tiene servicios que ofrecer todavía). El sistema de contenido queda preparado para agregarla en el futuro sin tocar componentes.
- **Certificates:** se incluye, con datos reales (Google IT Support, Cisco Cybersecurity) — es información verídica y valiosa.
- **Blog:** se deja la infraestructura (MDX + rutas) lista y funcionando, pero sin posts falsos — se entrega con 1 post real de ejemplo marcado como borrador/TODO que el usuario reemplaza.
- **Uses:** opcional/baja prioridad — se puede agregar luego con contenido real (herramientas que usa a diario).
- **GitHub stats component:** versión simple (repos destacados vía config, no API de contribuciones en vivo) dado el estado actual de la cuenta.

Todo el resto del pedido técnico (arquitectura data-driven, MDX, Next.js 15, shadcn/ui, sistema de proyectos sin tocar componentes, SEO, accesibilidad, performance) se mantiene tal cual fue solicitado — son buenas prácticas independientes del contenido.

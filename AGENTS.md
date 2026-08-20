<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Calma Studio — Agente IA

## Proyecto
Sitio web estático (Next.js 16 + Tailwind CSS 4) para **Calma Studio**, el primer centro de
Barre de Salamanca (Pilates + Barre + Nutrición), próximamente en Avda. Federico Anaya, 71.
Sin backend propio — el formulario de reservas (`CitasSection`) y todos los CTA de contacto
del sitio derivan a llamada telefónica (`tel:`); el estudio no usa WhatsApp actualmente, no
añadir enlaces `wa.me` sin que el usuario lo pida explícitamente. Sí cuenta con un chatbot
(`ChatWidget.tsx` + Route Handler `src/app/api/chat`, ver `chatbot-notes.md`) que llama a la
API de Groq desde el servidor. Réplica arquitectónica de los proyectos hermanos
`veterinaria-sedano-frontend` y `peluqueria-canina` (Urban Dogs), adaptada a esta vertical de
negocio.

## Diseño — Reglas Obligatorias

### Paleta de colores
- Background: `#fff8e1` (crema claro — nunca blanco puro)
- Secondary (texto principal): `#3b2b23` (mismo valor que Primary — titulares y fondos oscuros: cards de servicios, Footer)
- Primary: `#3b2b23` (marrón oscuro — color unificado: branding, botones, headings, chatbot)
- Primary-dark: `#291e18` (**solo** hover de botones y enlaces — no usar como fondo)
- Primary-light: `#d9a67e`
- Primary-bg: `#eed694`
- Highlight: `#8fa4d1` (azul — insignia "Próximamente" y acentos puntuales)
- Highlight-dark: `#2b3b64` (azul oscuro — fondo de sección, ej. `CompromisoSection`)
- Accent: `#cc6a24` (naranja — detallitos sueltos: iconos, CTAs de reserva/llamada)
- Tipografía: **Poppins** (cuerpo, navegación, botones y formularios — pesos 400/500/600/700) +
  **Fraunces** (titulares h1–h3 y elementos de marca como el logotipo "calma studio" — rango 500–600,
  600 por defecto y 500 en los titulares más finos). Ambas vía `next/font/google` en `layout.tsx`,
  auto-alojadas. Utilidades Tailwind: `font-heading` / `font-serif` para titulares, `font-body` /
  `font-sans` para el resto. Los `h1/h2/h3` ya reciben Fraunces desde `globals.css`, sin necesidad
  de añadir `font-serif` en el markup.

> Paleta anterior (marrón café + crudo/beige + dorado suave) guardada como comentario en
> `src/lib/theme.ts` y `src/app/globals.css`, y disponible en el historial de git.

### Anti-diseño-IA (obligatorio)
- NO gradientes de 3+ colores
- NO glassmorphism / neumorfismo
- Sombras: `shadowOpacity max 0.08`, `blur max 8px` (ver clases `.card`, `.fab-shadow` en `globals.css`)
- Fondo nunca `#ffffff` puro — usar `var(--background)`
- Alineación izquierda como base — **nunca** `text-align: justify` (los ríos de espacio
  dificultan la lectura a personas con dislexia o baja visión)
- Reparto de líneas resuelto en `globals.css`, no componente a componente:
  `text-wrap: balance` en h1–h6 y `text-wrap: pretty` heredado desde `body`. Si un titular
  llegara a 6 líneas hay que acortar el texto — Chromium deja de equilibrar a partir de ahí
- Iconos: **Tabler Icons** (`react-icons/tb`) exclusivamente — no Font Awesome genérico
- Textos en español natural del sector de Pilates/Barre/bienestar (evitar tecnicismos vacíos)
- Animaciones sutiles (fade/slide), nunca bounce ni efectos llamativos

### Iconos (no típicos)
Usar exclusivamente Tabler Icons de `react-icons/tb` para funcionalidad
(`TbYoga` para Pilates, `TbMusic` para Barre — `TbBallet`/`TbDancers` NO existen en el paquete —,
`TbApple`/`TbSalad` para Nutrición). Emojis 🧘🤍 como decoración puntual en textos/mensajes, NO
como iconos de navegación o UI.

## Stack
- Next.js 16.2.12 (App Router, Turbopack)
- React 19 + TypeScript strict
- Tailwind CSS 4 (tema vía variables CSS en `globals.css` + `@theme inline`)
- react-icons v5 (Tabler Icons)
- Sin backend propio para el sitio — formulario de reservas deriva a llamada telefónica
  (`tel:`); el chatbot sí tiene un Route Handler server-side que llama a la API de Groq
- `@behold/types` (devDependency) — tipos del feed de Instagram (ver más abajo)

## Datos del negocio
Extraídos del perfil real de Instagram [@calmastudio71](https://www.instagram.com/calmastudio71):
- Nombre: Calma Studio
- Dirección: Avda. Federico Anaya, 71, Salamanca (⭐ **próximamente**, aún no abierto)
- Instagram: @calmastudio71 (+550 seguidoras)
- Servicios: Pilates, Barre y Nutrición — primer centro de Barre de Salamanca
- Teléfono / Email / código postal / horario: ⭐ **placeholders de ejemplo** (`// EDITAR` en
  `src/lib/config.ts`) — no aparecían públicamente en Instagram, sustituir por los reales antes
  de publicar.

## Contacto
- El estudio no usa WhatsApp actualmente. Todos los CTA de contacto (Footer, `ContactoSection`,
  `CompromisoSection`, confirmación de `CitasSection`, fallback del chatbot) usan enlaces
  `tel:${siteConfig.phone}`. No reintroducir `wa.me` ni `buildWhatsAppUrl` sin que el usuario lo
  pida explícitamente.
- El chatbot (`ChatWidget.tsx`) sí es un asistente de IA real, vía API de Groq desde el servidor
  (`src/app/api/chat/route.ts`). Ver `chatbot-notes.md` para arquitectura, guardrails y guía de
  portabilidad a Drupal/WordPress antes de tocar esa lógica.

## Feed de Instagram (en pruebas)
`InstagramSection.tsx` + `src/components/instagram/` muestran las últimas publicaciones de
@calmastudio71 leyendo el JSON feed de Behold desde el servidor (`src/lib/instagram.ts`, ISR
6 h). Es un **prototipo pendiente de validar visualmente**: va deliberadamente después de
`CitasSection` y su CTA es secundario (botón de contorno) para no competir con «Reserva tu
clase». Se apaga entero con `SHOW_INSTAGRAM_FEED=false` y tiene tres maquetaciones
(`INSTAGRAM_FEED_VARIANT`: `grid` | `carousel` | `moodboard`). Ver `docs/INSTAGRAM.md` antes de
tocarlo.

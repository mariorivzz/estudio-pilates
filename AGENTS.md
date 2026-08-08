<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Calma Studio — Agente IA

## Proyecto
Sitio web estático (Next.js 16 + Tailwind CSS 4) para **Calma Studio**, el primer centro de
Barre de Salamanca (Pilates + Barre + Nutrición), próximamente en Avda. Federico Anaya, 71.
Sin backend — formulario de reservas (`CitasSection`) y botón flotante (`WhatsAppWidget`)
redirigen a WhatsApp. Réplica arquitectónica de los proyectos hermanos
`veterinaria-sedano-frontend` y `peluqueria-canina` (Urban Dogs), adaptada a esta vertical de
negocio.

## Diseño — Reglas Obligatorias

### Paleta de colores
- Background: `#f6e4ac` (amarillo mantequilla — nunca blanco puro)
- Secondary (texto principal): `#391212` (marrón oscuro — también fondo de secciones oscuras como Hero/Footer)
- Primary: `#74342b` (marrón — branding, botones, headings)
- Primary-dark: `#4a231c` (hover states / cards oscuras)
- Primary-light: `#d9a67e`
- Primary-bg: `#eed694`
- Highlight: `#8fa4d1` (azul — insignia "Próximamente" y acentos puntuales)
- Highlight-dark: `#2b3b64` (azul oscuro — fondo de sección, ej. `CompromisoSection`)
- Accent: `#cc6a24` (naranja — detallitos sueltos: iconos, CTAs de WhatsApp/reserva)
- Tipografía: Geist (cuerpo) + Playfair Display (logotipo "calma studio" y titulares, estilo boutique)

> Paleta anterior (marrón café + crudo/beige + dorado suave) guardada como comentario en
> `src/lib/theme.ts` y `src/app/globals.css`, y disponible en el historial de git.

### Anti-diseño-IA (obligatorio)
- NO gradientes de 3+ colores
- NO glassmorphism / neumorfismo
- Sombras: `shadowOpacity max 0.08`, `blur max 8px` (ver clases `.card`, `.whatsapp-fab` en `globals.css`)
- Fondo nunca `#ffffff` puro — usar `var(--background)`
- Alineación izquierda como base
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
- Sin backend — formulario de reservas y botón flotante vía WhatsApp (`wa.me`)

## Datos del negocio
Extraídos del perfil real de Instagram [@calmastudio71](https://www.instagram.com/calmastudio71):
- Nombre: Calma Studio
- Dirección: Avda. Federico Anaya, 71, Salamanca (⭐ **próximamente**, aún no abierto)
- Instagram: @calmastudio71 (+550 seguidoras)
- Servicios: Pilates, Barre y Nutrición — primer centro de Barre de Salamanca
- Teléfono / Email / código postal / horario: ⭐ **placeholders de ejemplo** (`// EDITAR` en
  `src/lib/config.ts`) — no aparecían públicamente en Instagram, sustituir por los reales antes
  de publicar.

## Contacto por WhatsApp
- `siteConfig.whatsappAssistant` centraliza el texto y el mensaje predefinido del botón flotante (`WhatsAppWidget.tsx`, montado en `layout.tsx`).
- Es un enlace `wa.me` con mensaje pre-rellenado (vía `buildWhatsAppUrl`), **no** un chatbot ni backend de IA real. No implementar ni sugerir integraciones con WhatsApp Business API/Twilio/LLMs sin que el usuario lo pida explícitamente y confirme el alcance (requiere credenciales e infraestructura nueva).

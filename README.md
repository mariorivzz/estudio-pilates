# Calma Studio — Pilates, Barre & Nutrición (Salamanca)

Sitio web estático (Next.js 16 + Tailwind CSS 4) para **Calma Studio**, el primer centro de
Barre de Salamanca (Pilates + Barre + Nutrición). Sin backend — el formulario de reservas
deriva a llamada telefónica (`tel:`).

Basado en la misma arquitectura que
[`veterinaria-sedano-frontend`](../veterinaria/veterinaria-sedano-frontend) y
[`peluqueria-canina`](../peluqueria-canina) (Urban Dogs), adaptado con paleta e información
propias de este centro.

## Datos del negocio

> Nombre, servicios, dirección e Instagram son **datos reales**, extraídos del perfil de
> Instagram [@calmastudio71](https://www.instagram.com/calmastudio71). Teléfono, email y código
> postal **no aparecían públicamente** y siguen siendo placeholders marcados `// EDITAR` en
> `src/lib/config.ts` — sustitúyelos antes de publicar el sitio.

- Nombre: Calma Studio
- Dirección: Avda. Federico Anaya, 71, Salamanca (próximamente)
- Instagram: [@calmastudio71](https://www.instagram.com/calmastudio71)
- Teléfono / Email: placeholders (EDITAR — no publicados en Instagram)
- Servicios: Pilates, Barre y Nutrición — primer centro de Barre de Salamanca
- Horario: placeholder de ejemplo (EDITAR — no publicado en Instagram)

## Stack

- Next.js 16.2.12 (App Router) + React 19 + TypeScript strict
- Tailwind CSS 4
- react-icons v5 (Tabler Icons — `react-icons/tb`)
- Sin backend — formulario de reservas deriva a llamada telefónica

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para que el chatbot funcione en local, copia `.env.example` a `.env.local` y añade tu
`GROQ_API_KEY` (ver [Chatbot](#chatbot-ia)). Sin la clave, el sitio funciona igual pero el
asistente muestra un aviso y deriva a llamar por teléfono.

## Estructura

```
src/
  app/
    api/chat/route.ts  # Route Handler del chatbot (llama a Groq, streaming SSE)
    ...                # layout, page, globals.css, error, loading
  components/     # Navbar, Footer, Hero, CompromisoSection, ServiciosSection,
                  # CitasSection, ContactoSection, ChatWidget
  lib/
    config.ts     # ⭐ Datos del negocio (editar aquí), SEO, textos del hero
    theme.ts      # Paleta de colores (amarillo mantequilla + marrón + azul + naranja)
    utils.ts      # Helpers: teléfono, fechas
    chatbot/      # Lógica del chatbot, aislada de React (portable a Drupal/WordPress)
      knowledge.ts     # Base de conocimiento del centro
      systemPrompt.ts  # Prompt + guardrails
      groqClient.ts    # Llamada a la API de Groq
      rateLimit.ts     # Rate limiting en memoria
```

Para editar textos, teléfono, horario o dirección, modifica `src/lib/config.ts`.

## Chatbot (IA)

Asistente conversacional (Llama 3.3, vía API de Groq) integrado como widget flotante
(`ChatWidget.tsx`). Responde dudas sobre servicios, horarios, ubicación y reservas usando solo
los datos reales de `siteConfig`. Detalles de arquitectura, decisiones (incluido el cambio de
proveedor de xAI a Groq) y guía de portabilidad a Drupal/WordPress en
[`chatbot-notes.md`](./chatbot-notes.md).

Requiere `GROQ_API_KEY` en variables de entorno (ver `.env.example`) — nunca se expone al
cliente, solo se usa en `src/app/api/chat/route.ts`.

## Contacto

El estudio aún no usa WhatsApp: el formulario de reservas (`CitasSection`) y todos los CTA de
contacto del sitio (Footer, Contacto, chatbot) derivan a llamada telefónica (`tel:`), usando
`siteConfig.phone`. No hay backend de IA ni de mensajería detrás de esos enlaces.

## Seguridad
Security headers configurados en `next.config.ts`:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Content-Security-Policy (sin nonces, sitio 100% estático)
- Referrer-Policy / Permissions-Policy / Cross-Origin-Opener-Policy

## Diseño
Paleta inspirada en la identidad real de Calma Studio (NO lavanda/spa genérico de IA):
- **Background:** `#fff8e1` (crema claro)
- **Secondary (texto):** `#3b2b23` (mismo valor que Primary)
- **Primary:** `#3b2b23` (marrón oscuro — unificado)
- **Highlight:** `#8fa4d1` (azul — insignias de "Próximamente")
- **Accent:** `#cc6a24` (naranja — detallitos sueltos)
- Tipografía: **Poppins** (cuerpo, 400/500/600/700) + **Fraunces** (titulares y logotipo, 500–600), vía `next/font/google`
- Iconos: Tabler Icons (modernos, no típicos)

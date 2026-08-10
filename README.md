# Calma Studio — Pilates, Barre & Nutrición (Salamanca)

Sitio web estático (Next.js 16 + Tailwind CSS 4) para **Calma Studio**, el primer centro de
Barre de Salamanca (Pilates + Barre + Nutrición). Sin backend — el formulario de reservas y el
botón flotante de WhatsApp redirigen a `wa.me`.

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
- Sin backend — formulario de reservas y botón flotante de WhatsApp

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para que el chatbot funcione en local, copia `.env.example` a `.env.local` y añade tu
`XAI_API_KEY` (ver [Chatbot](#chatbot-ia)). Sin la clave, el sitio funciona igual pero el
asistente muestra un aviso y deriva a WhatsApp.

## Estructura

```
src/
  app/
    api/chat/route.ts  # Route Handler del chatbot (llama a xAI, streaming SSE)
    ...                # layout, page, globals.css, error, loading
  components/     # Navbar, Footer, Hero, CompromisoSection, ServiciosSection,
                  # CitasSection, ContactoSection, WhatsAppWidget, ChatWidget
  lib/
    config.ts     # ⭐ Datos del negocio (editar aquí), SEO, textos del hero
    theme.ts      # Paleta de colores (amarillo mantequilla + marrón + azul + naranja)
    utils.ts      # Helpers: teléfono, WhatsApp, fechas
    chatbot/      # Lógica del chatbot, aislada de React (portable a Drupal/WordPress)
      knowledge.ts     # Base de conocimiento del centro
      systemPrompt.ts  # Prompt + guardrails
      xaiClient.ts     # Llamada a la API de xAI
      rateLimit.ts     # Rate limiting en memoria
```

Para editar textos, teléfono, horario, dirección o el mensaje del asistente de WhatsApp,
modifica `src/lib/config.ts`.

## Chatbot (IA)

Asistente conversacional (Grok, vía API de xAI) integrado como widget flotante
(`ChatWidget.tsx`), separado del botón de WhatsApp. Responde dudas sobre servicios, horarios,
ubicación y reservas usando solo los datos reales de `siteConfig`. Detalles de arquitectura,
decisiones y guía de portabilidad a Drupal/WordPress en [`chatbot-notes.md`](./chatbot-notes.md).

Requiere `XAI_API_KEY` en variables de entorno (ver `.env.example`) — nunca se expone al
cliente, solo se usa en `src/app/api/chat/route.ts`.

## Contacto por WhatsApp

El botón flotante (`WhatsAppWidget`) y el formulario de reservas (`CitasSection`) generan un
enlace `wa.me` con un mensaje pre-rellenado — no hay backend de IA real detrás. Si en el futuro
se quiere conectar un asistente de IA de verdad (WhatsApp Business API, Twilio, un LLM, etc.),
habrá que añadir infraestructura y credenciales nuevas; no está implementado por defecto.

## Seguridad
Security headers configurados en `next.config.ts`:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Content-Security-Policy (sin nonces, sitio 100% estático)
- Referrer-Policy / Permissions-Policy / Cross-Origin-Opener-Policy

## Diseño
Paleta inspirada en la identidad real de Calma Studio (NO lavanda/spa genérico de IA):
- **Background:** `#f6e4ac` (amarillo mantequilla)
- **Secondary (texto):** `#391212` (marrón oscuro)
- **Primary:** `#74342b` (marrón)
- **Highlight:** `#8fa4d1` (azul — insignias de "Próximamente")
- **Accent:** `#cc6a24` (naranja — detallitos sueltos)
- Tipografía: Geist (cuerpo) + Playfair Display (logotipo y titulares, estilo boutique)
- Iconos: Tabler Icons (modernos, no típicos)

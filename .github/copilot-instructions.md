# Copilot Instructions — Calma Studio (Pilates, Barre & Nutrición en Salamanca)

## Contexto del Proyecto

Sitio web **estático** (Next.js 16 App Router + Tailwind CSS 4) para **Calma Studio**, el
primer centro de Barre de Salamanca (Pilates + Barre + Nutrición), próximamente en Avda.
Federico Anaya, 71. Es una réplica arquitectónica de `veterinaria-sedano-frontend`
y `peluqueria-canina` (mismo stack, mismos patrones de maquetación, mismas reglas
anti-diseño-IA), adaptada a esta vertical de negocio.

> Ver también [`AGENTS.md`](../AGENTS.md) — resumen para agentes genéricos (Claude, etc.).
> Este archivo y los de `.github/instructions/` son la versión detallada, específica de Copilot.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16.2.12 (App Router, Turbopack, TypeScript strict) |
| Estilos | Tailwind CSS 4 (design tokens vía CSS custom properties en `globals.css`) |
| Iconos | react-icons v5 — **solo** `react-icons/tb` (Tabler Icons) |
| Backend/CMS | Sin base de datos ni CMS. Sí hay un Route Handler server-side (`src/app/api/chat`) para el chatbot, que llama a la API de Groq — ver `chatbot-notes.md` |
| Reservas / contacto | Formulario `CitasSection` + todos los CTA de contacto derivan a llamada telefónica (`tel:`, `siteConfig.phone`). El estudio no usa WhatsApp actualmente — no añadir enlaces `wa.me` sin que el usuario lo pida |
| Deploy | Vercel (o cualquier host estático compatible con Next.js) |

## Reglas Generales

1. **Un solo vertical**: este proyecto NO es multi-tenant ni multi-vertical. No añadir lógica de "detectar vertical por dominio" ni content-types de Strapi — eso pertenece a otros proyectos del monorepo SaaS (`peluqueria/`, `psicologia/`), no a este.
2. **Sin backend adicional**: no proponer ni implementar Strapi, bases de datos, APIs propias o integraciones de WhatsApp Business API sin que el usuario lo pida explícitamente y confirme el alcance (requiere credenciales e infraestructura nueva). El único backend existente es el Route Handler del chatbot (`src/app/api/chat`, ver `chatbot-notes.md`).
3. **TypeScript estricto**: tipar todo, sin `any` salvo casos justificados.
4. **Server Components por defecto**: usar `'use client'` solo cuando haga falta interactividad (`CitasSection`, `Navbar` mobile menu, `ChatWidget`).
5. **Datos centralizados**: todo texto/dato del negocio vive en `src/lib/config.ts` (`siteConfig`). No hardcodear teléfonos, horarios o textos de negocio dentro de componentes.
6. **Datos verificados vs. placeholders**: nombre del negocio, servicios (Pilates/Barre/Nutrición), dirección e Instagram (`@calmastudio71`) son **datos reales**, extraídos del perfil de Instagram del negocio — trátalos como hechos verificados. Teléfono, email y código postal **siguen siendo placeholders de demostración** marcados con `// EDITAR` en `config.ts` — no los presentes como datos reales verificados; avisa al usuario si va a publicar el sitio con ellos sin sustituirlos.
7. **Seguridad**: ver [`.github/instructions/seguridad.instructions.md`](instructions/seguridad.instructions.md).
8. **Diseño y maquetación**: ver [`.github/instructions/design-system.instructions.md`](instructions/design-system.instructions.md) y [`.github/instructions/maquetacion.instructions.md`](instructions/maquetacion.instructions.md) — de obligado cumplimiento antes de tocar CSS/JSX.
9. **Buenas prácticas Next.js**: ver [`.github/instructions/nextjs-buenas-practicas.instructions.md`](instructions/nextjs-buenas-practicas.instructions.md).

## Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx       # Root layout: Navbar + Footer + ChatWidget
│   ├── page.tsx         # Home (composición de secciones) + JSON-LD ExerciseGym
│   ├── globals.css      # Tokens del tema + clases reutilizables (.card, .fab-shadow, ...)
│   ├── error.tsx / loading.tsx
│   ├── api/chat/route.ts  # Route Handler del chatbot (llama a Groq, streaming SSE)
├── components/          # Navbar, Footer, Hero, CompromisoSection, ServiciosSection,
│                         # CitasSection, ContactoSection, ChatWidget
└── lib/
    ├── config.ts         # ⭐ siteConfig — única fuente de verdad de datos del negocio
    ├── theme.ts          # Paleta documentada (mirror de las CSS vars)
    ├── utils.ts          # formatPhone, getTomorrowDate, formatDateES
    └── chatbot/           # Lógica del chatbot (knowledge, systemPrompt, groqClient, rateLimit)
```

## Convenciones de Nombres

- Componentes: `PascalCase.tsx` (`CompromisoSection.tsx`)
- Utilidades: `camelCase.ts` (`buildSystemPrompt`)
- CSS variables: `--kebab-case` (`--color-primary`)

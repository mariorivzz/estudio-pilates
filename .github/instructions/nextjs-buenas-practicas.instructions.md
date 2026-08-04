---
applyTo: "**/*.ts,**/*.tsx"
---

# Next.js 16 — Buenas Prácticas (Calma Studio)

> Este proyecto no tiene backend/CMS. Ignora cualquier patrón de fetch a Strapi,
> ISR, revalidación por webhook o multi-dominio que veas en otros proyectos del
> monorepo (`peluqueria/`, `psicologia/`) — no aplican aquí.

## Server Components por Defecto

```tsx
// ✅ Server Component (por defecto, sin directiva) — la mayoría de las secciones
export default function ServiciosSection() {
  return <section>...</section>;
}
```

### Cuándo usar `'use client'`

Solo cuando el componente necesita `useState`/`useEffect`, event handlers, o APIs de navegador.
En este proyecto: `Navbar` (menú móvil), `CitasSection` (formulario), `WhatsAppWidget` (enlace dinámico).

## Metadata y SEO

```typescript
// src/app/layout.tsx ya exporta metadata desde siteConfig.seo — no duplicar
export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
};
```

## JSON-LD Structured Data

`src/app/page.tsx` ya incluye el schema `ExerciseGym` con dirección y
`openingHoursSpecification` por día. Si se añaden más datos de negocio, actualizar
ese script, no crear un segundo bloque JSON-LD.

## Loading / Error Boundaries

`src/app/loading.tsx` y `src/app/error.tsx` ya están implementados con las clases del
tema (`text-secondary`, `bg-primary`, etc.) — no usar colores hardcodeados fuera de tokens.

## TypeScript Estricto

```typescript
// SIEMPRE tipar exports e interfaces de datos de negocio
export interface SiteConfig { /* ... */ }

// SIEMPRE tipar props
interface ServicioCardProps {
  icon: IconType;
  titulo: string;
  descripcion: string;
}
```

## Accesibilidad (a11y)

```tsx
// SIEMPRE aria-label en botones icon-only
<button aria-label="Abrir menú de navegación"><TbMenu2 size={24} /></button>

// SIEMPRE alt en imágenes reales del negocio (si se añaden)
<Image alt="Clase de Pilates en Calma Studio" ... />

// SIEMPRE htmlFor en labels de CitasSection
<label htmlFor="nombre">Nombre completo *</label>
<input id="nombre" ... />
```

## Datos Mock

No aplica — no hay API externa. Todo el contenido viene de `siteConfig`. El nombre del negocio,
servicios (Pilates/Barre/Nutrición), dirección e Instagram son datos reales verificados desde el
perfil de Instagram del negocio. Teléfono, email y código postal siguen siendo placeholders de
demostración marcados `// EDITAR` — no tratarlos como datos reales verificados al generar copy o
SEO nuevo.

---
mode: "agent"
description: "Crear una nueva sección de página siguiendo los patrones de maquetación de Calma Studio"
---

# Nueva Sección de Página — Calma Studio

Crea un nuevo componente en `src/components/` siguiendo estas reglas:

## Requisitos
1. **Server Component** por defecto (sin `'use client'` salvo que necesite interactividad).
2. **Datos desde `siteConfig`** (`src/lib/config.ts`) — nunca hardcodear teléfono, horarios o textos de negocio. Si faltan datos nuevos, añadirlos primero a `SiteConfig`.
3. **Design tokens**: usar `text-primary`, `bg-background`/`bg-primary-bg`, `border-border`, `text-muted`, etc. — nunca colores hex sueltos.
4. **Section header estándar**: subtítulo (mayúsculas, `text-primary`) → título (`text-secondary`) → `section-divider-left` → descripción (`text-muted`).
5. **Padding**: `py-24` con contenedor `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
6. **Cards**: clase `.card` + `rounded-2xl` — reutilizar el wireframe más parecido de [`maquetacion.instructions.md`](../instructions/maquetacion.instructions.md) en vez de inventar un layout nuevo.
7. **Iconos**: solo `react-icons/tb` (Tabler); verifica que el icono exista en `node_modules/react-icons/tb/index.d.ts` antes de usarlo.
8. **Responsive**: mobile-first, grid con `sm:`/`md:`/`lg:`.
9. **No inventar reseñas/testimonios** como si fueran reales — este negocio no tiene valoración verificada.
10. Consulta [`design-system.instructions.md`](../instructions/design-system.instructions.md) antes de tocar CSS/JSX.

## Estructura Base

```tsx
import { siteConfig } from '@/lib/config';

export default function NuevaSeccion() {
  return (
    <section id="nueva-seccion" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Subtítulo
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4 leading-tight">
            Título
          </h2>
          <div className="section-divider-left mb-5" />
          <p className="text-muted text-lg max-w-xl leading-relaxed">Descripción</p>
        </div>
        {/* Contenido */}
      </div>
    </section>
  );
}
```

Tras crear el componente, importarlo y añadirlo en `src/app/page.tsx` en el punto adecuado
del orden de secciones documentado en `maquetacion.instructions.md`.

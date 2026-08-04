---
applyTo: "**/*.tsx,**/components/**"
---

# Maquetación — Patrones de Layout de Calma Studio

> Adaptado de los patrones de maquetación usados en `veterinaria-sedano-frontend` y
> `peluqueria-canina`, y en el resto del monorepo SaaS (`peluqueria/`, `psicologia/`). Aquí se
> documentan las formas de maquetación **reales** ya implementadas en este proyecto — no romper
> esta estructura al editar o añadir secciones.

## Regla de Oro

```
Todas las secciones deben verse como si las hubiera maquetado la misma persona.
Reutiliza SIEMPRE los mismos wireframes de abajo; solo cambian el contenido,
los iconos temáticos y, puntualmente, el color de acento de la card.
```

## Orden de Secciones en la Home (`src/app/page.tsx`)

```
1. Navbar             (fija, top-strip "Próximamente" + logo + links + CTA)
2. Hero               (full-screen oscuro, badge + título + CTAs + stats)
3. CompromisoSection  (banner "por qué elegirnos" + puntos clave + trust chips)
4. ServiciosSection   (3 cards grandes: Pilates / Barre / Nutrición)
5. CitasSection       (formulario 2 columnas → WhatsApp)
6. ContactoSection    (mapa + tarjetas de contacto)
7. Footer             (4 columnas)
8. WhatsAppWidget     (botón flotante, fijo en todas las páginas vía layout.tsx)
```

## Wireframes de Referencia

### Navbar
```
[calma studio / Salamanca] ──────── [Inicio][Servicios][Reservar][Contacto] [Reserva tu clase]
   top-strip: ✨ Próximamente en Salamanca — Síguenos: @calmastudio71   (bg-primary)
   Altura logo+links: h-20 · sticky top-0 · mobile: menú hamburguesa (drawer)
```

### Hero
```
┌───────────────────────────────────────────────────────┐
│ (fondo oscuro, hero-overlay)                            │
│  Badge píldora bg-highlight: "Próximamente en Salamanca" │
│                                                           │
│  Pilates, Barre y Nutrición en Salamanca   ← title +      │
│                                              titleHighlight│
│  Subtítulo en blanco/80%, max-w-xl                        │
│                                                           │
│  [Reserva tu clase]   [ Síguenos en Instagram (dorado) ]  │
│                                                           │
│  ┌────────┐ ┌────────┐ ┌────────┐                        │
│  │   3    │ │   1º   │ │  +550  │  ← stats siteConfig.hero.stats│
│  └────────┘ └────────┘ └────────┘                        │
└───────────────────────────────────────────────────────┘
```

### Section Header (idéntico en todas las secciones, alineado a la izquierda)
```
   SUBTÍTULO EN MAYÚSCULAS (text-primary, tracking-wider)
   Título Principal Grande (text-secondary)
   ── (section-divider-left, 48px, bg-primary)
   Descripción en text-muted, max-w-xl
```

### CompromisoSection (sustituye al concepto de "valoración Google" — aquí no hay rating, se usa el claim "primer centro de Barre" + seguidoras de Instagram)
```
┌───────────────────────────┬─────────────────────────────┐
│ ✨ Por qué elegirnos       │  @calmastudio71               │
│ "Pilates, Barre y.."       │  [🗨 Escríbenos ahora] (bg-accent)│
│ párrafo con claim/servicios│                              │
└───────────────────────────┴─────────────────────────────┘
────────────────────── divider ──────────────────────────
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ icono Tabler  │  │ icono Tabler  │  │ icono Tabler  │  ← puntos clave (no reviews inventadas)
│ título        │  │ título        │  │ título        │
│ descripción   │  │ descripción   │  │ descripción   │
└──────────────┘  └──────────────┘  └──────────────┘
[chip] [chip] [chip] [chip]   ← trust chips (TbCheck + texto)
```

### Cards de Servicio (`ServiciosSection`, 3 cards grandes en desktop: Pilates / Barre / Nutrición)
```
┌────────────────────┐
│  ⬤  icono Tabler    │  ← círculo bg-primary-bg / bg-accent-light / bg-highlight-bg
│     (56px box)      │
│  Título del pilar   │  ← Pilates / Barre / Nutrición
│  Descripción corta   │
│  ── divider ──       │
│  ✓ item 1            │
│  ✓ item 2            │
│  ✓ item 3            │
└────────────────────┘
```

### Formulario de Reservas (`CitasSection`, 2 columnas en desktop)
```
┌───────────────────┬──────────────────────┐
│ Título sección     │ ┌──────────────────┐ │
│ Divider            │ │ Nombre* │ Teléfono*│ │
│                    │ │ Tipo clase* │ Nivel│ │
│ ✓ Punto clave 1    │ │ Fecha*  │ Horario │ │
│ ✓ Punto clave 2    │ │ Notas             │ │
│ ✓ Punto clave 3    │ │ [ Solicitar reserva ]│
│                    │ └──────────────────┘ │
│ [ Horario semanal ]│                       │
└───────────────────┴──────────────────────┘
       ↓ tras enviar: vista de confirmación con resumen + botón WhatsApp
```

### ContactoSection (2/5 columnas en desktop)
```
┌─────────────────────────┬───────────────────┐
│                         │ [📞] Teléfono      │
│   Mapa (placeholder →   │ [💬] WhatsApp      │
│   enlace a Google Maps) │ [✉️] Email          │
│                         │ [📷] Instagram      │
│                         │ [🕐] Horario        │
└─────────────────────────┴───────────────────┘
```

### Footer (4 columnas)
```
[Marca + descripción]  [Servicios: Pilates/Barre/Nutrición]  [Navegación + WhatsApp]  [Contacto: dirección/tel/horario]
```

## Reglas de Consistencia Dura

1. Padding de sección: **siempre** `py-24`.
2. Contenedor: **siempre** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
3. Cards: **siempre** clase `.card` (border + shadow sutil definidos en `globals.css`).
4. Botones CTA: **siempre** `rounded-full`.
5. Section headers: **siempre** el patrón subtítulo → título → divider → descripción, alineado a la izquierda (no centrado).
6. Alternancia de fondo entre secciones: `bg-background` / `bg-primary-bg` según corresponda (nunca blanco puro).
7. El botón flotante de WhatsApp (`WhatsAppWidget`) vive en `layout.tsx`, no se duplica dentro de secciones individuales.

## Al Añadir una Nueva Sección

1. No crear nuevos wireframes desde cero — reutilizar uno de los de arriba.
2. Si el contenido no encaja en ninguno, discutirlo antes de inventar un layout nuevo (evitar que cada sección tenga una estructura distinta).
3. Todo texto sale de `siteConfig` (`src/lib/config.ts`) — no hardcodear.
4. No fabricar reseñas o testimonios de clientes como si fueran reales — este proyecto no tiene valoración verificada; usar "puntos clave" (beneficios) en su lugar, como en `CompromisoSection`.

---
applyTo: "**/*.css,**/*.tsx,**/globals.css,**/tailwind*"
---

# Design System — Calma Studio (Diseño Manual, Sin IA)

## Filosofía de Diseño

```
REGLA FUNDAMENTAL: No usar imágenes, textos, layouts ni contenido genérico
"de IA". Todo el diseño se basa en los tokens definidos abajo, tipografía
real y datos/fotos propias del negocio.
```

1. **Manual y artesanal** — cada color, espaciado y tipo elegido intencionalmente para este centro.
2. **Tipografía clara** — Geist para cuerpo de texto, Playfair Display para el logotipo "calma studio" y titulares (ya configuradas en `layout.tsx`).
3. **Espaciado generoso** — diseño "aireado", mucho whitespace, coherente con la calma del Pilates y el Barre.
4. **Microinteracciones sutiles** — hover, fade/slide, nunca bounce.
5. **Accesibilidad** — contraste AA mínimo, focus visible, ARIA labels.

## Tokens del Design System (únicos — no multi-vertical)

Definidos en `src/app/globals.css` (`:root`) y expuestos a Tailwind vía `@theme inline`:

```css
:root {
  --primary: #74342b;        /* Marrón */
  --primary-dark: #4a231c;
  --primary-light: #d9a67e;
  --primary-bg: #eed694;
  --secondary: #391212;      /* Texto principal — marrón oscuro, también fondo de Hero/Footer */
  --accent: #cc6a24;         /* Naranja — detallitos sueltos, CTAs de reserva/llamada */
  --accent-light: #f6dab8;
  --highlight: #8fa4d1;      /* Azul — insignia "Próximamente" */
  --highlight-dark: #2b3b64; /* Azul oscuro — fondo de sección, ej. CompromisoSection */
  --highlight-bg: #e6ecf8;
  --background: #f6e4ac;     /* Amarillo mantequilla — NUNCA #ffffff puro */
  --card-bg: #ffffff;
  --border: #e0c179;
  --muted: #6e4f36;
}
```

> Paleta anterior (marrón café + crudo/beige + dorado suave) queda comentada en
> `src/app/globals.css` y `src/lib/theme.ts` por si hace falta revertir.

No añadir variables `data-vertical="..."` ni temas alternativos — este proyecto es de un solo negocio.

## Componentes UI Estándar

### Botones
```tsx
// Primario
className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"

// Secundario (borde)
className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"

// Llamada / acción de reserva
className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
```

### Cards
```tsx
// Usar SIEMPRE la clase .card definida en globals.css (sombra sutil, borde, hover translateY -2px)
className="card p-6"
```

### Section Header (idéntico en todas las secciones)
```tsx
<span className="text-primary font-semibold text-sm uppercase tracking-wider">{subtitulo}</span>
<h2 className="text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4">{titulo}</h2>
<div className="section-divider-left mb-5" /> {/* o .section-divider si está centrado */}
<p className="text-muted text-lg max-w-xl leading-relaxed">{descripcion}</p>
```

## Tipografía

| Elemento | Tamaño | Peso |
|----------|--------|------|
| H1 (Hero) | text-5xl → text-7xl | bold |
| H2 (Sección) | text-4xl → text-5xl | bold |
| H3 (Card) | text-xl | bold |
| Body | text-base | normal |
| Small / labels | text-sm | normal-medium |

## Espaciado y Bordes

- Padding vertical de sección: **siempre** `py-24`.
- Contenedor: **siempre** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Cards: `rounded-2xl` (16px).
- Botones/badges: `rounded-full`.
- Sombras: `.card` en `globals.css` — `box-shadow` opacity **máx 0.09**, sin blur agresivo.

## Iconos

Exclusivamente **Tabler Icons** vía `react-icons/tb` para toda funcionalidad (navegación, botones, tarjetas):
`TbYoga` (Pilates), `TbMusic` (Barre — `TbBallet`/`TbDancers` NO existen en el paquete), `TbApple`/`TbSalad` (Nutrición), `TbUsers`, `TbSparkles`, etc.
Emojis (🧘🤍) solo como decoración puntual en textos/mensajes — nunca como icono de UI.
Antes de usar un icono de Tabler poco habitual, verifica que existe en
`node_modules/react-icons/tb/index.d.ts` (algunos nombres "intuitivos" no existen en la librería).

## Anti-Patterns (NO HACER)

- ❌ Gradientes de 3+ colores.
- ❌ Glassmorphism / neumorfismo.
- ❌ Sombras con blur > 8px u opacity > 0.09.
- ❌ Fondo `#ffffff` puro (usar `var(--background)` / `var(--card-bg)` según contexto).
- ❌ Animaciones bounce o de más de 0.6s.
- ❌ Más de 3 colores principales en una misma sección.
- ❌ Iconos de Font Awesome genéricos — solo Tabler.
- ❌ Paleta "spa lavanda/turquesa" genérica de plantilla de IA — usar los tokens definidos arriba.

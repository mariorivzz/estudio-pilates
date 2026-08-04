// ─── Tema: Calma Studio ──────────────────────────────────────
// Marrón café cálido + crudo/beige + dorado suave — inspirado en la
// identidad real de @calmastudio71 (logo crema + tipografía marrón oscuro).
// NO lavanda/spa genérico de IA, NO azul clínico, NO verde salvia genérico.

export const theme = {
  // Colores principales
  primary: '#6b4a30',       // Marrón café cálido
  primaryDark: '#4f3722',   // Hover states
  primaryLight: '#cbb59a',  // Fondos suaves / texto sobre oscuro
  primaryBg: '#f2e6d3',     // Fondo muy sutil para secciones

  // Texto
  secondary: '#241a12',     // Marrón casi negro para cuerpo de texto
  muted: '#7a6a58',         // Texto secundario

  // Colores de apoyo
  accent: '#a97449',        // Caramelo/terracota — CTAs de reserva/WhatsApp
  accentLight: '#f2ded0',   // Fondo caramelo muy sutil

  // Insignias de "Próximamente" / confianza
  highlight: '#c9a24a',     // Dorado suave
  highlightBg: '#f8f0dd',

  // Estructura
  background: '#f7f0e3',    // Fondo principal (crudo cálido, nunca blanco puro)
  cardBg: '#ffffff',
  border: '#e6d9c4',

  // Overlay para hero
  heroOverlay: 'rgba(24, 17, 11, 0.84)',
} as const;

export type Theme = typeof theme;

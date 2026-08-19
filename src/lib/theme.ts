// ─── Tema: Calma Studio ──────────────────────────────────────
// Amarillo mantequilla + marrón + azul + detalles en naranja — inspirado en
// la identidad real de @calmastudio71, con fondos marrón/azul tomados de la
// paleta de referencia aportada por el cliente.
// NO lavanda/spa genérico de IA, NO verde salvia genérico.
//
// Paleta anterior (marrón café + crudo/beige + dorado suave), guardada aquí
// como referencia por si hay que volver atrás — también recuperable en el
// historial de git (commit 8b925fb y anteriores):
//   primary: '#6b4a30', primaryDark: '#4f3722', primaryLight: '#cbb59a',
//   primaryBg: '#f2e6d3', secondary: '#241a12', muted: '#7a6a58',
//   accent: '#a97449', accentLight: '#f2ded0', highlight: '#c9a24a',
//   highlightBg: '#f8f0dd', background: '#f7f0e3', cardBg: '#ffffff',
//   border: '#e6d9c4', heroOverlay: 'rgba(24, 17, 11, 0.84)'

export const theme = {
  // Colores principales
  primary: '#74342b',       // Marrón principal
  primaryDark: '#4a231c',   // Hover states / cards oscuras
  primaryLight: '#d9a67e',  // Texto/iconos claros sobre fondo oscuro
  primaryBg: '#eed694',     // Fondo suave marrón-mantequilla para secciones

  // Texto
  secondary: '#391212',     // Marrón oscuro — cuerpo de texto y fondos oscuros (Hero, Footer)
  muted: '#6e4f36',         // Texto secundario

  // Colores de apoyo
  accent: '#cc6a24',        // Naranja — detallitos, CTAs de reserva/llamada
  accentLight: '#f6dab8',   // Fondo naranja muy sutil

  // Insignias de "Próximamente" / confianza
  highlight: '#8fa4d1',       // Azul
  highlightDark: '#2b3b64',   // Azul oscuro — fondo de sección (CompromisoSection)
  highlightBg: '#e6ecf8',

  // Estructura
  background: '#f2edbd',    // Fondo principal — amarillo mantequilla
  cardBg: '#ffffff',
  border: '#e0c179',

  // Overlay para hero
  heroOverlay: 'rgba(57, 18, 18, 0.84)',
} as const;

export type Theme = typeof theme;

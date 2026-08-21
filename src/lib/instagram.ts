// ─── Feed de Instagram (Behold) ──────────────────────────────
// Sección de prueba que muestra las últimas publicaciones de @calmastudio71.
//
// ⚡ CÓMO QUITARLA ENTERA: pon `SHOW_INSTAGRAM_FEED=false` en las variables de
// entorno (Vercel → Settings → Environment Variables) y vuelve a desplegar. La
// sección desaparece de la página sin dejar hueco ni error. Para borrarla del
// repositorio: elimina este archivo, `src/components/InstagramSection.tsx`, la
// carpeta `src/components/instagram/`, las líneas marcadas en `src/app/page.tsx`
// y las entradas de Behold en `next.config.ts`.
//
// Datos: JSON feed oficial de Behold (https://behold.so/docs/json-feeds).
// Se pide **desde el servidor** y se cachea con ISR, así que el navegador nunca
// habla con Behold: no hace falta abrir `connect-src` en la CSP ni exponer
// ninguna clave en el cliente.

import type { Feed, Post } from '@behold/types';
import { siteConfig } from '@/lib/config';

// ── Interruptores ──────────────────────────────────────────

/** Interruptor maestro. Apagar con `SHOW_INSTAGRAM_FEED=false`. */
export const SHOW_INSTAGRAM_FEED = process.env.SHOW_INSTAGRAM_FEED !== 'false';

/** Las tres maquetaciones disponibles para el feed. */
export type InstagramVariant = 'grid' | 'carousel' | 'moodboard';

const VARIANTS: InstagramVariant[] = ['grid', 'carousel', 'moodboard'];

/**
 * Maquetación activa. Se puede cambiar aquí o, sin tocar código, con la
 * variable de entorno `INSTAGRAM_FEED_VARIANT` (grid | carousel | moodboard).
 */
export const INSTAGRAM_VARIANT: InstagramVariant = VARIANTS.includes(
  process.env.INSTAGRAM_FEED_VARIANT as InstagramVariant
)
  ? (process.env.INSTAGRAM_FEED_VARIANT as InstagramVariant)
  : 'grid';

/** Tope del plan gratuito de Behold. También es el número que mejor encaja en las tres maquetaciones. */
export const MAX_POSTS = 6;

/**
 * Cada cuánto vuelve Next.js a pedir el feed (6 h). Behold refresca una vez al
 * día en el plan gratuito, así que pedirlo más a menudo no traería nada nuevo.
 */
const REVALIDATE_SECONDS = 6 * 60 * 60;

const FEED_ENDPOINT = 'https://feeds.behold.so';

// ── Modelo propio ──────────────────────────────────────────
// Los componentes no conocen la forma de la respuesta de Behold: hablan con
// este tipo. Así el día que se cambie de proveedor (o se quiten los mocks)
// solo hay que tocar este archivo.

export interface FeedPost {
  id: string;
  /** URL de la publicación en Instagram. */
  permalink: string;
  /** Imagen ya optimizada por Behold (WebP, máx. 1000 px de lado). */
  src: string;
  /** La misma foto a máxima resolución (máx. 2000 px), para la foto grande del collage. */
  srcLarge: string;
  /** Texto alternativo listo para usar — nunca vacío. */
  alt: string;
  /** Pie de foto sin hashtags, para el hover. */
  caption: string;
  /** `true` en reels y vídeos: se marca con un icono de reproducción. */
  isVideo: boolean;
}

// ── Lectura del feed ───────────────────────────────────────

/**
 * Devuelve hasta {@link MAX_POSTS} publicaciones.
 *
 * Nunca lanza: si Behold falla, tarda demasiado o no devuelve nada usable,
 * devuelve un array vacío y la sección se oculta sola.
 */
export async function getInstagramPosts(): Promise<FeedPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID?.trim();

  // Sin cuenta de Behold todavía → datos de ejemplo para poder ver el diseño.
  if (!feedId) return MOCK_POSTS;

  try {
    const response = await fetch(`${FEED_ENDPOINT}/${feedId}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ['instagram-feed'] },
    });

    if (!response.ok) {
      console.warn(`[instagram] Behold respondió ${response.status}; se oculta la sección.`);
      return [];
    }

    const feed = (await response.json()) as Feed;

    return (feed.posts ?? [])
      .map(toFeedPost)
      .filter((post): post is FeedPost => post !== null)
      .slice(0, MAX_POSTS);
  } catch (error) {
    console.warn('[instagram] No se pudo leer el feed de Behold; se oculta la sección.', error);
    return [];
  }
}

/** Normaliza una publicación de Behold. Devuelve `null` si no sirve para mostrarse. */
function toFeedPost(post: Post): FeedPost | null {
  // Solo servimos imágenes desde el CDN de Behold (behold.pictures), que es el
  // único host de Instagram autorizado en `next.config.ts`. Las `mediaUrl`
  // originales apuntan a cdninstagram.com con URLs firmadas que caducan.
  // Partimos de `large` (1000 px) para que se vean nítidas en pantallas retina.
  const src = post.sizes?.large?.mediaUrl ?? post.sizes?.medium?.mediaUrl;
  if (!src) return null;

  return {
    id: post.id,
    permalink: post.permalink,
    src,
    srcLarge: post.sizes?.full?.mediaUrl ?? src,
    alt: buildAltText(post),
    caption: (post.prunedCaption ?? '').trim(),
    isVideo: post.mediaType === 'VIDEO' || post.isReel === true,
  };
}

/**
 * Texto alternativo con tres niveles de respaldo: el alt real de Instagram, el
 * pie de foto sin hashtags, y por último una descripción genérica. Así ninguna
 * imagen se queda sin describir.
 */
function buildAltText(post: Post): string {
  const altText = post.altText?.trim();
  if (altText) return truncate(altText, 160);

  const firstLine = (post.prunedCaption ?? '').trim().split('\n')[0]?.trim();
  if (firstLine) return truncate(firstLine, 160);

  return `Publicación de Instagram de ${siteConfig.businessName}`;
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

// ── Datos de ejemplo ───────────────────────────────────────
// Se usan mientras no exista `BEHOLD_FEED_ID`, para poder juzgar el diseño sin
// depender todavía de la cuenta real. Fotos de Unsplash (licencia libre), que
// ya está autorizado en `next.config.ts` para la foto del Hero.
// ⚠️ Al rellenar `BEHOLD_FEED_ID` dejan de usarse automáticamente.

const unsplash = (id: string, size: number) =>
  `https://images.unsplash.com/${id}?q=75&w=${size}&h=${size}&fit=crop&auto=format`;

const mock = (
  id: string,
  photo: string,
  alt: string,
  caption: string,
  isVideo = false
): FeedPost => ({
  id,
  permalink: siteConfig.instagramUrl,
  src: unsplash(photo, 1000),
  srcLarge: unsplash(photo, 2000),
  alt,
  caption,
  isVideo,
});

const mockLocal = (
  id: string,
  imagePath: string,
  alt: string,
  caption: string,
  isVideo = false
): FeedPost => ({
  id,
  permalink: siteConfig.instagramUrl,
  src: imagePath,
  srcLarge: imagePath,
  alt,
  caption,
  isVideo,
});

const MOCK_POSTS: FeedPost[] = [
  mockLocal(
    'mock-1',
    '/img/barre.jpg',
    'Grupo de mujeres en clase de Barre realizando ejercicios en la barra de ballet',
    'El primer centro de Barre de Salamanca: ballet, pilates y fitness en la barra 🤍'
  ),
  mockLocal(
    'mock-2',
    '/img/barre_img2.jpg',
    'Grupo reducido haciendo Barre sobre esterillas en una sala luminosa',
    'Clases en grupos reducidos para cuidar tu técnica desde el primer día'
  ),
  mockLocal(
    'mock-3',
    '/img/pilates3.jpg',
    'Clase de Pilates en estudio profesional',
    'Respirar, colocarse, empezar. Así arranca cada sesión.'
  ),
  mockLocal(
    'mock-4',
    '/img/pilates4.jpg',
    'Ejercicios de espalda y postura en clase de Pilates',
    'Espalda fuerte, postura cuidada. Uno de nuestros básicos.'
  ),
  mockLocal(
    'mock-5',
    '/img/barre5.jpg',
    'Clase de Barre con movimientos y técnica de ballet',
    'Encontrar tu calma también es entrenar.'
  ),
  mockLocal(
    'mock-6',
    '/img/barre2.jpg',
    'Clase de Barre: técnica y movimiento en grupo',
    'Centro fuerte, todo lo demás va detrás. Nos vemos en el estudio.'
  ),
];

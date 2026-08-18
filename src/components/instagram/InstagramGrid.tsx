import type { FeedPost } from '@/lib/instagram';
import InstagramTile from './InstagramTile';

/** Anchos reales de cada foto: 3 columnas en escritorio, 2 en móvil. */
const SIZES = '(min-width: 1280px) 416px, (min-width: 640px) 32vw, 47vw';

/**
 * Variante A — «Cuadrícula serena».
 * Seis cuadrados iguales: 3 × 2 en escritorio, 2 × 3 en móvil.
 */
export default function InstagramGrid({ posts }: { posts: FeedPost[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {posts.map((post) => (
        <InstagramTile key={post.id} post={post} sizes={SIZES} className="aspect-square" />
      ))}
    </div>
  );
}

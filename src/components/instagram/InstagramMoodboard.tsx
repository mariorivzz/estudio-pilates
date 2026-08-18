import type { FeedPost } from '@/lib/instagram';
import InstagramTile from './InstagramTile';

/**
 * Composición asimétrica pensada para exactamente 6 publicaciones:
 * en escritorio son 3 × 3 celdas con la primera foto ocupando un bloque 2 × 2.
 * En móvil, una foto ancha arriba, cuatro cuadradas y otra ancha abajo.
 */
const SPANS = [
  'col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-auto lg:h-full',
];

const SIZES_LARGE = '(min-width: 1024px) 55vw, 95vw';
const SIZES_SMALL = '(min-width: 1024px) 28vw, 47vw';

/**
 * Variante C — «Collage editorial».
 * Una foto protagonista y el resto alrededor, como un moodboard de revista.
 * Si algún día llegan menos de 6 publicaciones cae con elegancia a cuadrados.
 */
export default function InstagramMoodboard({ posts }: { posts: FeedPost[] }) {
  const isFullBoard = posts.length === SPANS.length;

  return (
    // La proporción 4/3 del tablero fija su alto en escritorio (≈900 px): deja
    // ver el collage entero sin comerse la pantalla ni robarle protagonismo al
    // formulario de reserva. Al ser una proporción fija tampoco hay salto.
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 ${
        isFullBoard ? 'lg:aspect-[4/3] lg:grid-cols-3 lg:grid-rows-3' : 'lg:grid-cols-3'
      }`}
    >
      {posts.map((post, index) => (
        <InstagramTile
          key={post.id}
          post={post}
          sizes={isFullBoard && index === 0 ? SIZES_LARGE : SIZES_SMALL}
          className={isFullBoard ? SPANS[index] : 'aspect-square'}
          hiRes={isFullBoard && index === 0}
        />
      ))}
    </div>
  );
}

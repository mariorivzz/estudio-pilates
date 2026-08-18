'use client';

import type { FeedPost } from '@/lib/instagram';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TbArrowNarrowLeft, TbArrowNarrowRight } from 'react-icons/tb';
import InstagramTile from './InstagramTile';

const SIZES = '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 72vw';

/**
 * Variante B — «Carrusel horizontal».
 * Tarjetas verticales que se deslizan con el dedo, con la rueda o con los
 * botones. Ocupa una sola fila, así que pesa poco visualmente en la página.
 *
 * Accesibilidad: el carril es una región enfocable, de modo que se puede
 * recorrer con las flechas del teclado; los enlaces de dentro siguen entrando
 * en el orden natural del tabulador y el navegador los trae a la vista solo.
 */
export default function InstagramCarousel({ posts }: { posts: FeedPost[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        tabIndex={0}
        role="region"
        aria-label="Publicaciones recientes de Instagram"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:gap-4
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {posts.map((post) => (
          <li
            key={post.id}
            className="w-[72%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <InstagramTile post={post} sizes={SIZES} className="aspect-[4/5] w-full" />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Ver publicaciones anteriores"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition-colors
            hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <TbArrowNarrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Ver más publicaciones"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition-colors
            hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <TbArrowNarrowRight size={20} />
        </button>
        <span className="ml-1 text-sm text-muted">Desliza para ver más</span>
      </div>
    </div>
  );
}

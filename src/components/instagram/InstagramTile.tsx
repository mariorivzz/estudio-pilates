import type { FeedPost } from '@/lib/instagram';
import Image from 'next/image';
import { TbBrandInstagram, TbPlayerPlayFilled } from 'react-icons/tb';

interface InstagramTileProps {
  post: FeedPost;
  /**
   * Ancho que ocupará la imagen en cada breakpoint (atributo `sizes` de
   * next/image). Cada maquetación pasa el suyo para que el navegador no
   * descargue más píxeles de los necesarios.
   */
  sizes: string;
  /** Clases de tamaño/proporción que aporta la maquetación (aspect-*, col-span-*…). */
  className?: string;
  /** Parte del original a máxima resolución. Solo para fotos grandes (el collage). */
  hiRes?: boolean;
}

/**
 * Una publicación del feed. Es el único sitio donde se dibuja una imagen de
 * Instagram, así que las tres maquetaciones comparten proporciones, radios,
 * hover y foco de teclado.
 *
 * Sin salto de maquetación: el enlace define la caja (proporción fija) y la
 * imagen la rellena con `fill`, así el hueco está reservado antes de que la
 * foto llegue. Carga diferida por defecto (no lleva `preload`).
 */
export default function InstagramTile({
  post,
  sizes,
  className = '',
  hiRes = false,
}: InstagramTileProps) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.alt} — ver en Instagram`}
      className={`group relative block overflow-hidden rounded-2xl border border-border bg-primary-bg
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <Image
        src={hiRes ? post.srcLarge : post.src}
        alt={post.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
      />

      {/* Velo + pie de foto, solo al pasar por encima o al llegar con el tabulador */}
      <div
        className="absolute inset-0 flex flex-col justify-end bg-secondary/0 p-4 opacity-0 transition-all duration-300
          group-hover:bg-secondary/55 group-hover:opacity-100
          group-focus-visible:bg-secondary/55 group-focus-visible:opacity-100"
      >
        <TbBrandInstagram className="absolute top-3.5 left-3.5 text-white/90" size={18} />
        {post.caption && (
          <p className="line-clamp-2 text-xs leading-relaxed text-white/90">{post.caption}</p>
        )}
      </div>

      {/* Distintivo de vídeo/reel — siempre visible para que se sepa antes de entrar */}
      {post.isVideo && (
        <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-secondary/45">
          <TbPlayerPlayFilled className="text-white" size={12} aria-hidden="true" />
          <span className="sr-only">Vídeo</span>
        </span>
      )}
    </a>
  );
}

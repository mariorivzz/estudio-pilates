import { INSTAGRAM_VARIANT, MAX_POSTS, type InstagramVariant } from '@/lib/instagram';

/**
 * Estado de carga de la sección. Reproduce la caja exacta de cada maquetación
 * para que, cuando lleguen las fotos, nada se mueva de sitio.
 *
 * En producción casi nunca se ve: la página se genera con las publicaciones ya
 * dentro (ISR). Aparece en desarrollo, la primera vez que se genera la página y
 * si algún día la sección pasa a renderizarse en cada visita.
 */

const block = 'animate-pulse rounded-2xl border border-border bg-primary/10';

/** Mismas proporciones y saltos de columna que InstagramMoodboard. */
const MOODBOARD_SPANS = [
  'col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'aspect-square lg:aspect-auto lg:h-full',
  'col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-auto lg:h-full',
];

const placeholders = Array.from({ length: MAX_POSTS }, (_, index) => index);

function FeedPlaceholder({ variant }: { variant: InstagramVariant }) {
  if (variant === 'carousel') {
    return (
      <div>
        <div className="flex gap-3 overflow-hidden sm:gap-4">
          {placeholders.map((index) => (
            <div
              key={index}
              className={`${block} aspect-[4/5] w-[72%] shrink-0 sm:w-[46%] lg:w-[31%]`}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-2.5">
          <div className={`${block} h-11 w-11 rounded-full`} />
          <div className={`${block} h-11 w-11 rounded-full`} />
        </div>
      </div>
    );
  }

  if (variant === 'moodboard') {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:aspect-[4/3] lg:grid-cols-3 lg:grid-rows-3">
        {placeholders.map((index) => (
          <div key={index} className={`${block} ${MOODBOARD_SPANS[index]}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {placeholders.map((index) => (
        <div key={index} className={`${block} aspect-square`} />
      ))}
    </div>
  );
}

export default function InstagramSkeleton() {
  return (
    <section className="ig-section bg-primary-bg py-24" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-14 max-w-2xl">
          <div className={`${block} h-4 w-40 rounded-md`} />
          <div className={`${block} mt-4 h-11 w-full max-w-lg rounded-lg`} />
          <div className="section-divider-left mt-5 mb-5 opacity-30" />
          <div className={`${block} h-5 w-full max-w-xl rounded-md`} />
        </div>

        <FeedPlaceholder variant={INSTAGRAM_VARIANT} />
      </div>
    </section>
  );
}

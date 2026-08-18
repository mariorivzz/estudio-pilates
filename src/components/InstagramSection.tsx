import InstagramCarousel from '@/components/instagram/InstagramCarousel';
import InstagramGrid from '@/components/instagram/InstagramGrid';
import InstagramMoodboard from '@/components/instagram/InstagramMoodboard';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/config';
import { getInstagramPosts, INSTAGRAM_VARIANT } from '@/lib/instagram';
import { TbBrandInstagram } from 'react-icons/tb';

const LAYOUTS = {
  grid: InstagramGrid,
  carousel: InstagramCarousel,
  moodboard: InstagramMoodboard,
};

/**
 * Prueba social: las últimas publicaciones de @calmastudio71.
 *
 * Va después del formulario de reserva a propósito — refuerza la confianza de
 * quien no ha reservado todavía sin ponerse por delante del CTA principal. Por
 * eso su llamada a la acción es un botón secundario (contorno), nunca relleno.
 *
 * Si Behold falla o no devuelve publicaciones, devuelve `null`: la sección
 * desaparece entera en vez de dejar un hueco o un mensaje de error.
 */
export default async function InstagramSection() {
  const posts = await getInstagramPosts();
  if (posts.length === 0) return null;

  const Layout = LAYOUTS[INSTAGRAM_VARIANT];

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-titulo"
      className="ig-section bg-primary-bg py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <ScrollReveal className="mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Nuestro día a día
          </span>
          <h2
            id="instagram-titulo"
            className="mt-3 mb-4 font-serif text-4xl font-bold leading-tight text-secondary sm:text-5xl"
          >
            El estudio, por dentro
          </h2>
          <div className="section-divider-left mb-5" />
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Vamos compartiendo cómo toma forma Calma Studio: las clases, los pequeños avances y el
            ambiente que estamos creando en {siteConfig.city}.
          </p>
        </ScrollReveal>

        {/* Feed */}
        <ScrollReveal animation="fade-in" delay={200}>
          <Layout posts={posts} />
        </ScrollReveal>

        {/* Llamada a la acción secundaria — nunca compite con «Reserva tu clase» */}
        <ScrollReveal
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          animation="fade-in"
          delay={300}
        >
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-8 py-4
              text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <TbBrandInstagram size={18} className="text-accent group-hover:text-white" />
            Síguenos en Instagram
          </a>
          <p className="text-sm text-muted">
            Nos vemos en{' '}
            <span className="font-medium text-secondary">{siteConfig.instagramHandle}</span> 🤍
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

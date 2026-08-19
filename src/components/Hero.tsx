import { siteConfig } from '@/lib/config';
import Image from 'next/image';
import { TbArrowRight, TbBrandInstagram, TbYoga } from 'react-icons/tb';

// Foto de fondo (Unsplash, licencia libre, de https://unsplash.com/@roxanarxx) —
// descomentar junto con el bloque <Image> de abajo para reactivarla.
// const HERO_IMAGE =
//   'https://images.unsplash.com/photo-1747239685045-fcbcf98985db?q=90&w=2600&auto=format&fit=crop';

// Foto a sangre de la mitad derecha. Es la misma imagen que abre el feed de
// Instagram (`mock-1` en src/lib/instagram.ts), para que Hero y feed compartan
// estética. Se pide a Unsplash recortada a 1920x2160 (ratio 0.889) porque esa es
// la proporción real del panel: media pantalla de ancho por el alto del Hero
// —0.88 a 1280x800, 0.95 a 1920x1080—. Al coincidir de origen, `object-cover`
// apenas tiene que recortar, y los 1920 px de ancho cubren pantallas 2x.
const HERO_PHOTO =
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=90&w=1920&h=2160&fit=crop&auto=format';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '72px' }} /* altura navbar (h-18) */
    >
      {/* Fondo sólido amarillo mantequilla - paleta del sector (sin gradientes IA) */}
      <div className="absolute inset-0 bg-background" />

      {/* Textura sutil — puntos muy pequeños */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b2b23 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Acento café sutil en esquina superior derecha — desde xl queda tapado
          por la foto, pero sigue marcando la mitad derecha en pantallas menores. */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary opacity-[0.07]" />

      {/* Foto a sangre: mitad derecha completa, del navbar al final de la sección.
          Solo desde xl (1280px); por debajo el titular necesita el ancho entero.
          Sin `priority` a propósito: el elemento LCP es el titular. */}
      <div className="animate-fade-in absolute top-[72px] bottom-0 right-0 w-1/2 hidden xl:block">
        <Image
          src={HERO_PHOTO}
          alt="Grupo reducido haciendo Pilates sobre esterillas en una sala luminosa"
          fill
          quality={90}
          sizes="50vw"
          className="object-cover"
        />
      </div>

      {/* Icono decorativo — no centrado, fuera de pantalla en móvil */}
      <div className="absolute bottom-12 right-8 opacity-[0.07] hidden lg:block xl:hidden">
        <TbYoga className="text-primary" size={280} strokeWidth={0.8} />
      </div>

      {/* Foto de fondo a pantalla completa — comentada, ver HERO_IMAGE arriba para reactivarla
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[75%_30%]"
      />
      <div className="absolute inset-0 bg-secondary/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/30" />
      */}

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 w-full">
        <div className="max-w-3xl xl:max-w-none xl:w-1/2 xl:pr-12">
          {/* Confianza */}
          <div className="animate-fade-in delay-100 flex items-center gap-2 mb-6">
            <span className="text-secondary/60 text-sm">
              {siteConfig.highlights.claim} · {siteConfig.highlights.instagramFollowers}
            </span>
          </div>

          {/* Titular */}
          <h1 className="animate-fade-in-up delay-100 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-secondary leading-[1.08] mb-6">
            {siteConfig.hero.title}{' '}
            <span className="text-secondary">{siteConfig.hero.titleHighlight}</span>
            <br />
            <span className="text-secondary">en {siteConfig.city}</span>
          </h1>

          {/* Subtítulo */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-secondary/75 leading-relaxed mb-10 max-w-2xl">
            {siteConfig.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3">
            <a
              href="#citas"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-semibold transition-colors shadow-lg"
            >
              {siteConfig.hero.ctaPrimary}
              <TbArrowRight size={18} />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full text-base font-semibold transition-colors"
            >
              <TbBrandInstagram size={18} className="text-accent group-hover:text-white" />
              {siteConfig.hero.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 mt-16 flex flex-wrap gap-12 xl:grid xl:grid-cols-3 xl:gap-6">
            {siteConfig.hero.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-secondary/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-secondary/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

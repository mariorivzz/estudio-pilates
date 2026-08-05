import { siteConfig } from '@/lib/config';
// import Image from 'next/image';
import { TbArrowRight, TbBrandInstagram, TbMusic, TbYoga } from 'react-icons/tb';

// Foto de fondo (Unsplash, licencia libre, de https://unsplash.com/@roxanarxx) —
// descomentar junto con el bloque <Image> de abajo para reactivarla.
// const HERO_IMAGE =
//   'https://images.unsplash.com/photo-1747239685045-fcbcf98985db?q=90&w=2600&auto=format&fit=crop';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '72px' }} /* altura navbar (h-18) */
    >
      {/* Fondo sólido oscuro - paleta del sector (sin gradientes IA) */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Textura sutil — puntos muy pequeños */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbb59a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Acento café sutil en esquina superior derecha */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary opacity-[0.07]" />

      {/* Icono decorativo — no centrado, fuera de pantalla en móvil */}
      <div className="absolute bottom-12 right-8 opacity-[0.06] hidden lg:block">
        <TbYoga className="text-white" size={280} strokeWidth={0.8} />
      </div>
      <div className="absolute top-24 right-1/4 opacity-[0.04] hidden xl:block">
        <TbMusic className="text-primary-light" size={140} strokeWidth={0.8} />
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
        <div className="max-w-3xl">
          {/* Confianza */}
          <div className="animate-fade-in delay-100 flex items-center gap-2 mb-6">
            <span className="text-white/60 text-sm">
              {siteConfig.highlights.claim} · {siteConfig.highlights.instagramFollowers}
            </span>
          </div>

          {/* Titular */}
          <h1 className="animate-fade-in-up delay-100 font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
            {siteConfig.hero.title}{' '}
            <span className="text-primary-light">{siteConfig.hero.titleHighlight}</span>
            <br />
            <span className="text-white">en {siteConfig.city}</span>
          </h1>

          {/* Subtítulo */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/75 leading-relaxed mb-10 max-w-2xl">
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
              className="inline-flex items-center justify-center gap-2 border-2 border-highlight text-white hover:bg-highlight/15 px-8 py-4 rounded-full text-base font-semibold transition-colors"
            >
              <TbBrandInstagram size={18} className="text-highlight" />
              {siteConfig.hero.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 mt-16 flex flex-wrap gap-12">
            {siteConfig.hero.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-primary-light">{stat.value}</p>
                <p className="text-white/55 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-light rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

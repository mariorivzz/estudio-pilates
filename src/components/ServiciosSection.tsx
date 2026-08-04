import ScrollReveal from '@/components/ScrollReveal';
import { TbApple, TbCheck, TbMusic, TbSquare, TbYoga } from 'react-icons/tb';

interface Servicio {
  icon: React.ElementType;
  titulo: string;
  descripcion: string;
  items: string[];
  tint: string;
}

const servicios: Servicio[] = [
  {
    icon: TbYoga,
    titulo: 'Pilates',
    descripcion: 'Clases en grupos reducidos para ganar fuerza, mejorar tu postura y tu equilibrio.',
    items: ['Reformer', 'Suelo (Mat)', 'Grupos reducidos'],
    tint: 'text-primary-light',
  },
  {
    icon: TbMusic,
    titulo: 'Barre',
    descripcion: 'El primer centro de Barre de Salamanca: ballet, pilates y fitness en la barra.',
    items: ['Tonificación', 'Equilibrio', 'Ritmo y música'],
    tint: 'text-highlight',
  },
  {
    icon: TbApple,
    titulo: 'Nutrición',
    descripcion: 'Asesoramiento nutricional personalizado para cuidar tu bienestar integral.',
    items: ['Valoración inicial', 'Plan a medida', 'Seguimiento'],
    tint: 'text-accent',
  },
];

export default function ServiciosSection() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Nuestros servicios
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4 leading-tight">
            Pilates, Barre y Nutrición para cada nivel
          </h2>
          <div className="section-divider-left mb-5" />
          <p className="text-muted text-lg max-w-2xl leading-relaxed">
            Tres servicios pensados para cuidar tu cuerpo y tu bienestar desde dentro y desde fuera, en un solo lugar.
          </p>
        </ScrollReveal>

        {/* Grid de 3 "posters" — estilo editorial, tono de las publicaciones de Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((servicio, index) => (
            <ScrollReveal
              key={servicio.titulo}
              className="relative flex flex-col aspect-[4/5] rounded-2xl overflow-hidden bg-primary-dark p-7"
              delay={((index + 1) * 100) as 100 | 200 | 300}
            >
              {/* Textura sutil, coherente con el Hero */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #f2e6d3 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Cabecera del "poster" */}
              <div className="relative flex items-start justify-between mb-3">
                <span className="text-primary-light/80 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  Nuestros servicios
                </span>
                <TbSquare className="text-primary-light/50" size={18} strokeWidth={1.5} />
              </div>

              {/* Título editorial — protagonista, como en los posts */}
              <h3 className="relative font-serif text-white text-6xl sm:text-7xl leading-[0.92] mb-2">
                {servicio.titulo}
              </h3>
              <p className="relative text-white/60 text-xs leading-snug max-w-[28ch] mb-4">
                {servicio.descripcion}
              </p>

              {/* Zona central — icono a modo de "foto", protagonista */}
              <div className="relative flex-[2] flex items-center justify-center rounded-xl border border-white/10 bg-black/10">
                <servicio.icon className={servicio.tint} size={104} strokeWidth={1} />
              </div>

              {/* Detalles incluidos */}
              <ul className="relative flex flex-wrap gap-x-3 gap-y-1 mt-4 mb-4">
                {servicio.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <TbCheck className={`${servicio.tint} shrink-0`} size={12} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Firma — tono del logotipo, como en las publicaciones */}
              <span className="relative text-center font-serif text-primary-light/90 text-base lowercase tracking-wide">
                calma <span className="text-white/90">studio</span>
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

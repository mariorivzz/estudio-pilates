import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/config';
import { TbApple, TbCheck, TbPhoneCall, TbSparkles, TbUsers } from 'react-icons/tb';

const puntos = [
  {
    icon: TbSparkles,
    titulo: 'El primer centro de Barre en Salamanca',
    descripcion: 'Un concepto nuevo en la ciudad que combina la técnica de barre con el método Pilates.',
  },
  {
    icon: TbUsers,
    titulo: 'Grupos reducidos y trato cercano',
    descripcion: 'Clases pequeñas para cuidar tu técnica y tu progreso de cerca, desde el primer día.',
  },
  {
    icon: TbApple,
    titulo: 'Nutrición y bienestar integral',
    descripcion: 'Asesoramiento nutricional para acompañar tus clases de Pilates y Barre.',
  },
];

const chips = [
  'Síguenos en Instagram',
  siteConfig.highlights.badge,
  'Pilates · Barre · Nutrición',
  `${siteConfig.address}, ${siteConfig.city}`,
];

export default function CompromisoSection() {
  return (
    <section className="py-16 bg-highlight-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Icono y encabezado */}
          <ScrollReveal className="flex items-start gap-5 flex-1" animation="slide-left">
            <div className="w-14 h-14 rounded-2xl bg-highlight/15 flex items-center justify-center shrink-0">
              <TbSparkles className="text-highlight" size={28} />
            </div>
            <div>
              <span className="text-highlight text-xs font-bold uppercase tracking-widest">
                Por qué elegirnos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-1.5 mb-3 leading-tight">
                Pilates, Barre y Nutrición en un mismo lugar en {siteConfig.city}
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-lg">
                {siteConfig.highlights.claim}, con un equipo cercano que combina Pilates, Barre y
                asesoramiento nutricional para cuidar tu cuerpo y tu mente.
              </p>
            </div>
          </ScrollReveal>

          {/* Separador visual */}
          <div className="hidden lg:block w-px h-24 bg-white/10" />

          {/* Síguenos en Instagram */}
          <ScrollReveal
            className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5"
            animation="fade-in-up"
            delay={200}
          >
            <div className="text-center lg:text-left">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                Sigue nuestro proceso
              </p>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl sm:text-4xl font-bold text-white hover:text-primary-light transition-colors tracking-tight"
              >
                {siteConfig.instagramHandle}
              </a>
            </div>

            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent/85 text-white px-7 py-4 rounded-full font-semibold transition-colors text-base shadow-lg whitespace-nowrap"
            >
              <TbPhoneCall size={20} />
              Llámanos ahora
            </a>
          </ScrollReveal>
        </div>

        {/* Puntos clave */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {puntos.map(({ icon: Icon, titulo, descripcion }, index) => (
            <ScrollReveal
              key={titulo}
              className="bg-[#7CA2E0]/8 border border-[#7CA2E0]/25 rounded-xl p-5"
              delay={((index + 1) * 100) as 100 | 200 | 300}
            >
              <Icon className="text-primary-light mb-2" size={20} />
              <h3 className="text-white font-semibold text-sm mb-1.5">{titulo}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{descripcion}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Chips de información */}
        <ScrollReveal className="mt-8 flex flex-wrap gap-3" animation="fade-in" delay={300}>
          {chips.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-white/6 border border-white/10 text-white/70 px-4 py-2 rounded-full text-sm"
            >
              <TbCheck size={13} className="text-primary-light" />
              <span>{item}</span>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

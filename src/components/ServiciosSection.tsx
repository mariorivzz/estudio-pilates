import { TbApple, TbCheck, TbMusic, TbYoga } from 'react-icons/tb';

interface Servicio {
  icon: React.ElementType;
  titulo: string;
  descripcion: string;
  items: string[];
  color: string;
}

const servicios: Servicio[] = [
  {
    icon: TbYoga,
    titulo: 'Pilates',
    descripcion: 'Clases de Pilates en grupos reducidos para ganar fuerza, mejorar tu postura y tu equilibrio.',
    items: ['Pilates Reformer', 'Pilates Suelo (Mat)', 'Grupos reducidos'],
    color: 'bg-primary-bg text-primary',
  },
  {
    icon: TbMusic,
    titulo: 'Barre',
    descripcion: 'El primer centro de Barre de Salamanca: una técnica que combina ballet, pilates y fitness en la barra.',
    items: ['Tonificación con barra', 'Trabajo de equilibrio', 'Ritmo y música'],
    color: 'bg-accent-light text-accent',
  },
  {
    icon: TbApple,
    titulo: 'Nutrición',
    descripcion: 'Asesoramiento nutricional personalizado para acompañar tus clases y cuidar tu bienestar integral.',
    items: ['Valoración inicial', 'Plan personalizado', 'Seguimiento continuo'],
    color: 'bg-highlight-bg text-highlight',
  },
];

export default function ServiciosSection() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
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
        </div>

        {/* Grid de 3 pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <div
              key={servicio.titulo}
              className="card p-7"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${servicio.color}`}>
                <servicio.icon size={26} />
              </div>
              <h3 className="font-semibold text-secondary text-xl mb-2.5">
                {servicio.titulo}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                {servicio.descripcion}
              </p>
              <ul className="space-y-2 border-t border-border pt-5">
                {servicio.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-secondary">
                    <TbCheck className="text-primary shrink-0" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/utils';
import {
    TbBrandInstagram,
    TbBrandWhatsapp,
    TbClock,
    TbMapPin,
    TbPhone,
    TbYoga
} from 'react-icons/tb';

const quickLinks = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#citas',     label: 'Reservar' },
  { href: '#contacto',  label: 'Contacto' },
];

const serviciosList = [
  'Pilates',
  'Barre',
  'Nutrición',
];

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.phone,
    `Hola, me gustaría pedir información sobre las clases de ${siteConfig.businessName}.`
  );

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" animation="fade-in">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <TbYoga className="text-white" size={19} />
              </div>
              <span className="font-serif font-bold text-lg lowercase">
                calma <span className="text-primary-light">studio</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {siteConfig.tagline}.<br />
              {siteConfig.city} · {siteConfig.highlights.claim}.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary-light hover:border-primary-light/40 transition-colors"
              >
                <TbBrandInstagram size={17} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviciosList.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-white/50 hover:text-primary-light text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-primary-light text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  💬 Escríbenos por WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <TbMapPin className="text-primary-light mt-0.5 shrink-0" size={16} />
                <span>{siteConfig.address}<br />{siteConfig.postalCode ? `${siteConfig.postalCode} ` : ''}{siteConfig.city}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-primary-light transition-colors"
                >
                  <TbPhone className="text-primary-light shrink-0" size={16} />
                  {siteConfig.phone.replace('+34 ', '')}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-primary-light transition-colors"
                >
                  <TbBrandWhatsapp className="text-primary-light shrink-0" size={16} />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <TbClock className="text-primary-light shrink-0 mt-0.5" size={16} />
                <div>
                  <p>L – J: {siteConfig.hours.lunes}</p>
                  <p>Viernes: {siteConfig.hours.viernes}</p>
                  <p>Sábado: {siteConfig.hours.sabado}</p>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {year} {siteConfig.businessName}. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs">
            {siteConfig.address} · {siteConfig.postalCode ? `${siteConfig.postalCode} ` : ''}{siteConfig.city}
          </p>
        </div>
      </div>
    </footer>
  );
}

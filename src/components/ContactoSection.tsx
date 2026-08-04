import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { TbBrandInstagram, TbBrandWhatsapp, TbClock, TbMail, TbMapPin, TbPhone, TbSparkles } from 'react-icons/tb';

export default function ContactoSection() {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.phone,
    `Hola, me gustaría pedir información sobre ${siteConfig.businessName}.`
  );

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Dónde estamos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4 leading-tight">
            Visítanos en {siteConfig.city}
          </h2>
          <div className="section-divider-left mb-5" />
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            Abrimos próximamente en {siteConfig.address}, {siteConfig.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Mapa (placeholder) */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-border h-80 lg:h-auto bg-primary-bg flex items-center justify-center min-h-64">
            <div className="text-center px-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TbMapPin className="text-primary" size={32} />
              </div>
              <p className="font-semibold text-secondary text-lg">{siteConfig.address}</p>
              <p className="text-muted mb-2">{siteConfig.postalCode ? `${siteConfig.postalCode} ` : ''}{siteConfig.city}</p>
              {siteConfig.comingSoon && (
                <span className="inline-flex items-center gap-1.5 bg-highlight/15 text-highlight text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <TbSparkles size={12} />
                  Próximamente
                </span>
              )}
              <div>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                >
                  <TbMapPin size={15} />
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Tarjetas de contacto */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Teléfono */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="card p-5 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 bg-primary-bg rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <TbPhone className="text-primary group-hover:text-white transition-colors" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Teléfono</p>
                <p className="font-semibold text-secondary">{siteConfig.phone.replace('+34 ', '')}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 flex items-start gap-4 group border-accent/20 hover:border-accent/40"
            >
              <div className="w-11 h-11 bg-accent/8 rounded-xl flex items-center justify-center shrink-0">
                <TbBrandWhatsapp className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-xs text-accent uppercase tracking-wider mb-0.5 font-semibold">WhatsApp</p>
                <p className="font-semibold text-secondary">Escríbenos ahora</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="card p-5 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 bg-primary-bg rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <TbMail className="text-primary group-hover:text-white transition-colors" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Email</p>
                <p className="font-semibold text-secondary text-sm break-all">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 bg-primary-bg rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <TbBrandInstagram className="text-primary group-hover:text-white transition-colors" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Instagram</p>
                <p className="font-semibold text-secondary text-sm">{siteConfig.instagramHandle}</p>
              </div>
            </a>

            {/* Horario */}
            <div className="card p-5 flex items-start gap-4 sm:col-span-2 lg:col-span-1">
              <div className="w-11 h-11 bg-primary-bg rounded-xl flex items-center justify-center shrink-0">
                <TbClock className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1.5">Horario</p>
                <div className="space-y-1 text-sm text-muted">
                  <p><span className="text-secondary font-medium">L – J</span>  {siteConfig.hours.lunes}</p>
                  <p><span className="text-secondary font-medium">Viernes</span>  {siteConfig.hours.viernes}</p>
                  <p><span className="text-secondary font-medium">Sábado</span>  {siteConfig.hours.sabado}</p>
                  <p><span className="text-muted font-medium">Domingo</span>  {siteConfig.hours.domingo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

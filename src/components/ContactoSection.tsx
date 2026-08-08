import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { TbBrandInstagram, TbBrandWhatsapp, TbClock, TbMail, TbPhone, TbSparkles } from 'react-icons/tb';

export default function ContactoSection() {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.phone,
    `Hola, me gustaría pedir información sobre ${siteConfig.businessName}.`
  );

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-14">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Mapa */}
          <ScrollReveal
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-border h-80 lg:h-auto min-h-64 relative"
            animation="slide-left"
          >
            <iframe
              src={siteConfig.mapsEmbedUrl}
              className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.02]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`Mapa de ubicación de ${siteConfig.businessName}`}
            />
            {siteConfig.comingSoon && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-highlight text-secondary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <TbSparkles size={12} />
                Próximamente
              </span>
            )}
          </ScrollReveal>

          {/* Tarjetas de contacto */}
          <ScrollReveal
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            animation="fade-in-up"
            delay={200}
          >
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

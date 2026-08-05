import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import { TbCalendarCheck, TbExternalLink } from 'react-icons/tb';

/**
 * Widget de reservas del proveedor externo (ver docs/RESERVAS.md).
 *
 * Se monta sólo si `siteConfig.booking.enabled` y `embedUrl` están definidos —
 * `CitasSection` decide cuál de los dos flujos renderiza. El origen de `embedUrl`
 * debe figurar en `frame-src` de la CSP (next.config.ts) o el navegador bloqueará
 * el iframe sin mostrar ningún error visible en la página.
 */
export default function BookingEmbed() {
  const { providerName, embedUrl, embedHeight } = siteConfig.booking;

  return (
    <div>
      <div className="card overflow-hidden">
        <iframe
          src={embedUrl}
          title={`Calendario de reservas de ${siteConfig.businessName}`}
          height={embedHeight}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full block border-0"
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-muted text-xs leading-relaxed">
          <TbCalendarCheck className="inline-block text-primary mr-1.5 -mt-0.5" size={14} />
          Reservas gestionadas con {providerName}. Consulta cómo tratamos tus datos en la{' '}
          <Link href="/privacidad" className="text-primary underline hover:text-primary-dark">
            política de privacidad
          </Link>
          .
        </p>
        {/* Salida alternativa si el iframe no carga (bloqueadores, navegadores antiguos) */}
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark text-xs font-medium shrink-0 transition-colors"
        >
          Abrir en una pestaña nueva
          <TbExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

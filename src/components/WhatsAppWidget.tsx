'use client';

import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { TbBrandWhatsapp } from 'react-icons/tb';

// Botón flotante persistente — contacto directo por WhatsApp desde cualquier página
export default function WhatsAppWidget() {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.phone, siteConfig.whatsappAssistant.message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteConfig.whatsappAssistant.label}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center group"
    >
      <span className="hidden sm:block mr-3 bg-secondary text-white text-sm font-medium px-4 py-2 rounded-full whatsapp-tooltip opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
        {siteConfig.whatsappAssistant.label}
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white whatsapp-fab">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
        <TbBrandWhatsapp size={28} />
      </span>
    </a>
  );
}

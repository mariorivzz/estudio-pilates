// ─── Base de conocimiento del chatbot ────────────────────────
//
// Forma deliberadamente agnóstica de React/Next.js: es el "contrato" que se
// portará a Drupal (PHP) y WordPress. Aquí se rellena desde `siteConfig`
// (única fuente de verdad de los datos del negocio); en un CMS, la misma
// forma se rellenaría desde los campos de contenido correspondientes.

import { siteConfig } from '@/lib/config';

export interface ChatbotService {
  name: string;
  description: string;
  details: string[];
}

export interface ChatbotKnowledge {
  businessName: string;
  tagline: string;
  description: string;
  claim: string;
  comingSoon: boolean;
  services: ChatbotService[];
  address: string;
  city: string;
  mapsUrl: string;
  phone: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  hours: Record<string, string>;
  bookingPolicy: string;
}

export function getChatbotKnowledge(): ChatbotKnowledge {
  return {
    businessName: siteConfig.businessName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    claim: siteConfig.highlights.claim,
    comingSoon: siteConfig.comingSoon,
    services: [
      {
        name: 'Pilates',
        description: 'Clases en grupos reducidos para ganar fuerza, mejorar la postura y el equilibrio.',
        details: ['Reformer', 'Suelo (Mat)', 'Grupos reducidos'],
      },
      {
        name: 'Barre',
        description: 'El primer centro de Barre de Salamanca: ballet, pilates y fitness en la barra.',
        details: ['Tonificación', 'Equilibrio', 'Ritmo y música'],
      },
      {
        name: 'Nutrición',
        description: 'Asesoramiento nutricional personalizado para cuidar el bienestar integral.',
        details: ['Valoración inicial', 'Plan a medida', 'Seguimiento'],
      },
    ],
    address: siteConfig.address,
    city: siteConfig.city,
    mapsUrl: siteConfig.mapsUrl,
    phone: siteConfig.phone,
    email: siteConfig.email,
    instagramHandle: siteConfig.instagramHandle,
    instagramUrl: siteConfig.instagramUrl,
    hours: siteConfig.hours,
    bookingPolicy:
      'Las reservas se gestionan a través del formulario de la web (sección "Reserva tu clase") o llamando por teléfono. El estudio confirma la plaza el mismo día. El asistente no puede confirmar reservas directamente.',
  };
}

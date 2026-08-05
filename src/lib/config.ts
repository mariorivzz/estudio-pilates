// ─── Configuración del Sitio: Calma Studio ───────────────────
// Salamanca · Pilates, Barre & Nutrición · Próximamente
//
// Datos verificados desde Instagram (@calmastudio71): businessName, tagline,
// servicios (Pilates/Barre/Nutrición), address, city, instagramUrl/Handle,
// highlights.claim ("primer centro de Barre de Salamanca") y comingSoon.
//
// ⭐ Datos de ejemplo (EDITAR): phone, email, postalCode y mapsUrl NO estaban
// en el perfil de Instagram — son placeholders. Sustitúyelos por los reales
// antes de publicar (postalCode se ha dejado vacío a propósito, ver más abajo).

export type VerticalId = 'pilates';

export interface SiteConfig {
  vertical: VerticalId;
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  comingSoon: boolean;
  highlights: {
    badge: string;
    claim: string;
    instagramFollowers: string;
  };
  hours: {
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
  };
  social: {
    instagram?: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Array<{ value: string; label: string }>;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    schemaType: string;
  };
  whatsappAssistant: {
    label: string;
    message: string;
  };
}

export const siteConfig: SiteConfig = {
  vertical: 'pilates',
  businessName: 'Calma Studio',
  tagline: 'Pilates, Barre & Nutrición',
  description:
    'Calma Studio es el primer centro de Barre de Salamanca, con clases de Pilates y Barre en grupos reducidos y asesoramiento en nutrición. Próximamente en Avda. Federico Anaya, 71.',
  phone: '+34 923 12 34 56', // EDITAR: no aparece teléfono público en Instagram, añade el real
  email: 'hola@calmastudio.com', // EDITAR: no aparece email público en Instagram, añade el real
  address: 'Avda. Federico Anaya, 71',
  city: 'Salamanca',
  postalCode: '', // EDITAR: no confirmado — no inventar un código postal sin verificar
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Avda.+Federico+Anaya+71+Salamanca',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2960959455604!2d-5.655930923389798!3d40.97835127135473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3f2603a680678f%3A0x500e0771b04f2db!2sAv.%20de%20Federico%20Anaya%2C%2071%2C%2037005%20Salamanca!5e1!3m2!1ses!2ses!4v1785931047206!5m2!1ses!2ses',
  instagramUrl: 'https://www.instagram.com/calmastudio71',
  instagramHandle: '@calmastudio71',
  comingSoon: true,
  highlights: {
    badge: 'Próximamente en Salamanca',
    claim: 'El primer centro de Barre de Salamanca',
    instagramFollowers: '+550 seguidoras en Instagram',
  },
  hours: {
    lunes: '8:00 – 21:00',
    martes: '8:00 – 21:00',
    miercoles: '8:00 – 21:00',
    jueves: '8:00 – 21:00',
    viernes: '8:00 – 20:00',
    sabado: '9:00 – 14:00',
    domingo: 'Cerrado',
  },
  social: {
    instagram: 'https://www.instagram.com/calmastudio71',
  },
  hero: {
    badge: 'Próximamente en Salamanca',
    title: 'Pilates, Barre y',
    titleHighlight: 'Nutrición',
    subtitle:
      'Descubre el primer centro de Barre de Salamanca. Clases de Pilates y Barre en grupos reducidos, además de asesoramiento en nutrición para cuidar tu bienestar dentro y fuera del estudio.',
    ctaPrimary: 'Reserva tu clase',
    ctaSecondary: 'Síguenos en Instagram',
    stats: [
      { value: '3', label: 'Servicios: Pilates, Barre y Nutrición' },
      { value: '1º', label: 'Centro de Barre en Salamanca' },
      { value: '+550', label: 'Seguidoras en Instagram' },
    ],
  },
  seo: {
    title: 'Calma Studio | Pilates, Barre & Nutrición en Salamanca',
    description:
      'Calma Studio, el primer centro de Barre de Salamanca. Clases de Pilates y Barre en grupos reducidos y asesoramiento en nutrición. Próximamente en Avda. Federico Anaya, 71.',
    keywords: [
      'Calma Studio Salamanca',
      'pilates Salamanca',
      'barre Salamanca',
      'centro de barre Salamanca',
      'clases de pilates Salamanca',
      'nutrición Salamanca',
      'estudio de pilates y barre Salamanca',
    ],
    schemaType: 'ExerciseGym',
  },
  whatsappAssistant: {
    label: 'Habla con nuestro asistente',
    message:
      'Hola 👋 Me gustaría hablar con el asistente de Calma Studio para consultar clases de Pilates, Barre y nutrición.',
  },
};

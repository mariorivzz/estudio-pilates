import CitasSection from '@/components/CitasSection';
import CompromisoSection from '@/components/CompromisoSection';
import ContactoSection from '@/components/ContactoSection';
import Hero from '@/components/Hero';
import InstagramSection from '@/components/InstagramSection';
import InstagramSkeleton from '@/components/instagram/InstagramSkeleton';
import ServiciosSection from '@/components/ServiciosSection';
import { siteConfig } from '@/lib/config';
import { SHOW_INSTAGRAM_FEED } from '@/lib/instagram';
import { Suspense } from 'react';

// Schema.org JSON-LD para SEO local
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': siteConfig.seo.schemaType,
  name: siteConfig.businessName,
  description: siteConfig.description,
  url: siteConfig.seo.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  sameAs: [siteConfig.instagramUrl],
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: siteConfig.city,
    ...(siteConfig.postalCode ? { postalCode: siteConfig.postalCode } : {}),
    addressCountry: 'ES',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Schema.org para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <CompromisoSection />
      <ServiciosSection />
      <CitasSection />

      {/* Feed de Instagram (Behold) — sección de prueba, ver src/lib/instagram.ts.
          Se apaga con SHOW_INSTAGRAM_FEED=false; el <Suspense> evita que espere
          al feed para pintar el resto de la página. */}
      {SHOW_INSTAGRAM_FEED && (
        <Suspense fallback={<InstagramSkeleton />}>
          <InstagramSection />
        </Suspense>
      )}

      <ContactoSection />
    </>
  );
}

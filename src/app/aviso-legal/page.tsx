import LegalLayout, { LegalSection } from '@/components/LegalLayout';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Aviso Legal | ${siteConfig.businessName}`,
  description: `Información legal y condiciones de uso del sitio web de ${siteConfig.businessName}.`,
  alternates: { canonical: '/aviso-legal' },
};

const UPDATED_AT = '6 de agosto de 2026';

export default function AvisoLegalPage() {
  const titular = siteConfig.legal.razonSocial || siteConfig.businessName;

  return (
    <LegalLayout title="Aviso Legal" updatedAt={UPDATED_AT}>
      <LegalSection heading="Titular del sitio web">
        <p>
          En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de
          Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Titular:</strong> {titular}
          </li>
          {siteConfig.legal.nif && (
            <li>
              <strong>NIF / CIF:</strong> {siteConfig.legal.nif}
            </li>
          )}
          {siteConfig.legal.domicilioFiscal && (
            <li>
              <strong>Domicilio fiscal:</strong> {siteConfig.legal.domicilioFiscal}
            </li>
          )}
          <li>
            <strong>Domicilio del estudio:</strong> {siteConfig.address}
            {siteConfig.postalCode ? `, ${siteConfig.postalCode}` : ''} {siteConfig.city}
          </li>
          <li>
            <strong>Teléfono:</strong>{' '}
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          </li>
          <li>
            <strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Objeto del sitio">
        <p>
          Este sitio web tiene carácter informativo sobre los servicios de {siteConfig.businessName}{' '}
          ({siteConfig.tagline.toLowerCase()}) y permite solicitar información y reservas. El centro
          se encuentra en fase de próxima apertura, por lo que los horarios y servicios publicados
          pueden variar hasta su inauguración.
        </p>
      </LegalSection>

      <LegalSection heading="Condiciones de uso">
        <p>
          El acceso a este sitio es gratuito y supone la aceptación de este aviso legal. La persona
          usuaria se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para
          actividades ilícitas o lesivas para terceros.
        </p>
        <p>
          Las solicitudes enviadas desde el formulario de reserva{' '}
          <strong>no constituyen una reserva confirmada</strong> hasta que el estudio la confirme
          expresamente por teléfono.
        </p>
      </LegalSection>

      <LegalSection heading="Propiedad intelectual">
        <p>
          Los contenidos de este sitio (textos, diseño, logotipo y elementos gráficos) son
          titularidad de {titular} o se utilizan con la debida licencia. Queda prohibida su
          reproducción o distribución sin autorización expresa.
        </p>
      </LegalSection>

      <LegalSection heading="Responsabilidad">
        <p>
          {titular} no se responsabiliza de los daños derivados del uso de este sitio ni de la
          indisponibilidad temporal del servicio por causas técnicas. Los enlaces a sitios de
          terceros (como Instagram o Google Maps) se ofrecen únicamente como referencia, sin que
          ello implique control alguno sobre sus contenidos.
        </p>
      </LegalSection>

      <LegalSection heading="Protección de datos">
        <p>
          El tratamiento de datos personales se detalla en la{' '}
          <a href="/privacidad">política de privacidad</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Legislación aplicable">
        <p>
          Esta relación se rige por la legislación española. Para cualquier controversia, las
          partes se someten a los juzgados y tribunales del domicilio de la persona consumidora,
          conforme a la normativa de defensa de consumidores y usuarios.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

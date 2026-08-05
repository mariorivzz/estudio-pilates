import LegalLayout, { LegalSection } from '@/components/LegalLayout';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Política de Privacidad | ${siteConfig.businessName}`,
  description: `Cómo trata ${siteConfig.businessName} los datos personales de sus clientas: finalidad, base legal, conservación y ejercicio de derechos.`,
  alternates: { canonical: '/privacidad' },
};

const UPDATED_AT = '6 de agosto de 2026';

export default function PrivacidadPage() {
  const titular = siteConfig.legal.razonSocial || siteConfig.businessName;
  const contactoPrivacidad = siteConfig.legal.emailPrivacidad || siteConfig.email;

  return (
    <LegalLayout title="Política de Privacidad" updatedAt={UPDATED_AT}>
      <LegalSection heading="Quién trata tus datos">
        <p>
          El responsable del tratamiento es <strong>{titular}</strong>
          {siteConfig.legal.nif ? `, con NIF ${siteConfig.legal.nif}` : ''}
          {siteConfig.legal.domicilioFiscal
            ? `, con domicilio en ${siteConfig.legal.domicilioFiscal}`
            : ''}
          . Puedes contactarnos en <a href={`mailto:${contactoPrivacidad}`}>{contactoPrivacidad}</a>{' '}
          o en el teléfono <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Qué datos recogemos y para qué">
        <p>
          Este sitio web <strong>no dispone de servidor propio ni de base de datos</strong>. El
          formulario de reserva no envía información a ningún sistema nuestro: al pulsar
          «Solicitar reserva» se abre WhatsApp en tu dispositivo con el mensaje ya redactado, y
          eres tú quien decide enviarlo.
        </p>
        <p>Los datos que nos facilitas por ese canal son:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Nombre y apellidos.</li>
          <li>Teléfono de contacto.</li>
          <li>Tipo de clase, nivel, fecha y horario de preferencia.</li>
          <li>Las notas adicionales que quieras incluir.</li>
        </ul>
        <p>
          La finalidad es únicamente <strong>gestionar tu solicitud de reserva</strong> y
          contactarte para confirmar la disponibilidad de la plaza.
        </p>
      </LegalSection>

      <LegalSection heading="Datos de salud">
        <p>
          <strong>No solicitamos datos de salud a través de la web.</strong> La información sobre
          lesiones, embarazo o patologías es especialmente protegida por el artículo 9 del RGPD, y
          por eso te pedimos que no la incluyas en el formulario. La recogeremos presencialmente en
          el estudio, antes de tu primera clase, con un consentimiento específico e informado y
          únicamente para adaptar los ejercicios a tu situación.
        </p>
      </LegalSection>

      <LegalSection heading="Base legal">
        <p>
          Tratamos tus datos con <strong>tu consentimiento</strong> (artículo 6.1.a del RGPD), que
          otorgas marcando la casilla del formulario, y para la{' '}
          <strong>aplicación de medidas precontractuales</strong> a petición tuya (artículo 6.1.b),
          al pedirnos una reserva. Puedes retirar tu consentimiento en cualquier momento sin que
          ello afecte a la licitud del tratamiento previo.
        </p>
      </LegalSection>

      <LegalSection heading="Destinatarios de los datos">
        <p>
          Al enviar el formulario por WhatsApp, la conversación se transmite a través de{' '}
          <strong>WhatsApp Ireland Limited (grupo Meta)</strong>, que actúa como proveedor del
          canal de mensajería conforme a sus propias condiciones y política de privacidad. Te
          recomendamos consultarlas si tienes dudas sobre ese tratamiento.
        </p>
        {siteConfig.booking.enabled && (
          <p>
            Además, las reservas realizadas desde el calendario integrado en la web se gestionan
            con <strong>{siteConfig.booking.providerName}</strong>, que actúa como encargado del
            tratamiento por cuenta nuestra, en virtud del contrato previsto en el artículo 28 del
            RGPD.
          </p>
        )}
        <p>
          Fuera de lo anterior, <strong>no cedemos tus datos a terceros</strong> salvo obligación
          legal.
        </p>
      </LegalSection>

      <LegalSection heading="Durante cuánto tiempo los conservamos">
        <p>
          Conservamos la conversación el tiempo necesario para atender tu solicitud y, si acabas
          siendo clienta, durante la relación con el estudio y los plazos legales de prescripción
          aplicables (fiscales y contables). Después se eliminan.
        </p>
      </LegalSection>

      <LegalSection heading="Tus derechos">
        <p>
          Puedes ejercer de forma gratuita tus derechos de <strong>acceso</strong>,{' '}
          <strong>rectificación</strong>, <strong>supresión</strong>, <strong>oposición</strong>,{' '}
          <strong>limitación</strong> del tratamiento y <strong>portabilidad</strong>, así como
          retirar tu consentimiento, escribiéndonos a{' '}
          <a href={`mailto:${contactoPrivacidad}`}>{contactoPrivacidad}</a> e indicando el derecho
          que deseas ejercer.
        </p>
        <p>
          Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agencia Española de Protección de Datos (AEPD)
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          Este sitio <strong>no utiliza cookies</strong> propias ni de terceros, ni herramientas de
          analítica, ni píxeles de seguimiento, ni almacena información en tu navegador. Por eso no
          verás ningún banner de consentimiento de cookies.
        </p>
        <p>
          La sección de contacto incorpora un mapa de Google Maps. Al cargarlo, Google puede
          recibir datos de tu navegación conforme a su propia política de privacidad.
        </p>
      </LegalSection>

      <LegalSection heading="Seguridad">
        <p>
          El sitio se sirve íntegramente por HTTPS y aplica cabeceras de seguridad (política de
          seguridad de contenidos, HSTS y protección frente a clickjacking). Al no existir base de
          datos propia, no almacenamos credenciales ni ficheros de clientas en este sitio web.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import { TbAlertTriangle, TbArrowLeft } from 'react-icons/tb';

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

/** Campos de `siteConfig.legal` que la LSSI-CE exige rellenar antes de publicar. */
export function pendingLegalFields(): string[] {
  const { razonSocial, nif, domicilioFiscal } = siteConfig.legal;
  return [
    ...(razonSocial ? [] : ['razón social del titular']),
    ...(nif ? [] : ['NIF / CIF']),
    ...(domicilioFiscal ? [] : ['domicilio fiscal']),
  ];
}

export default function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  const pending = pendingLegalFields();

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm transition-colors mb-8"
        >
          <TbArrowLeft size={16} />
          Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-secondary leading-tight">
          {title}
        </h1>
        <div className="section-divider-left mt-5 mb-4" />
        <p className="text-muted text-sm mb-12">Última actualización: {updatedAt}</p>

        {pending.length > 0 && (
          <div className="bg-highlight-bg border border-highlight/40 rounded-2xl p-5 mb-12 flex items-start gap-3">
            <TbAlertTriangle className="text-highlight shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-secondary leading-relaxed">
              <p className="font-semibold mb-1">Documento pendiente de completar</p>
              <p className="text-muted">
                Faltan por rellenar en <code className="text-secondary">src/lib/config.ts</code>:{' '}
                {pending.join(', ')}. Este aviso desaparece automáticamente al completarlos y no
                debe publicarse el sitio sin ellos.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}

/** Bloque de sección con encabezado, usado por las páginas legales. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-secondary mb-3">{heading}</h2>
      <div className="space-y-3 text-muted leading-relaxed [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary-dark [&_strong]:text-secondary">
        {children}
      </div>
    </div>
  );
}

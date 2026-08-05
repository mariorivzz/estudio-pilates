import { siteConfig } from '@/lib/config';
import { ImageResponse } from 'next/og';

export const alt = `${siteConfig.businessName} — ${siteConfig.tagline} en ${siteConfig.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#241a12',
          padding: '0 90px',
        }}
      >
        {/* Acento café sutil en esquina derecha — mismo patrón que el Hero, sin gradientes */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '38%',
            height: '100%',
            background: 'rgba(107, 74, 48, 0.35)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#c9a24a',
            color: '#241a12',
            fontSize: 22,
            fontWeight: 700,
            padding: '10px 24px',
            borderRadius: 999,
            marginBottom: 32,
          }}
        >
          Próximamente en {siteConfig.city}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
          }}
        >
          {siteConfig.businessName}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 38,
            fontWeight: 500,
            color: '#cbb59a',
            marginTop: 20,
          }}
        >
          {siteConfig.tagline} en {siteConfig.city}
        </div>
      </div>
    ),
    { ...size }
  );
}

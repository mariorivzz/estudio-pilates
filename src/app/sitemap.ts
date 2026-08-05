import { siteConfig } from '@/lib/config';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.seo.siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.seo.siteUrl}/aviso-legal`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.seo.siteUrl}/privacidad`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

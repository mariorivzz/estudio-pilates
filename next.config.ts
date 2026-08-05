import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

// CSP without nonces so pages stay statically generated (per Next.js docs:
// nonces would force dynamic rendering on every page). 'unsafe-inline' on
// script-src is required for the JSON-LD <script> in page.tsx.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.unsplash.com;
  font-src 'self' data:;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src https://www.google.com;
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

// Security headers — OWASP Top 10 mitigations via native Next.js headers
const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Enable HSTS (2 years, include subdomains, preload)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser feature APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  // Enable DNS prefetch
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Mitigate XSS, injection and data-exfiltration via allowed content sources
  { key: "Content-Security-Policy", value: cspHeader },
  // Isolate browsing context from cross-origin windows (Spectre-style attacks)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Block legacy Flash/PDF cross-domain policy file abuse
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  // Avoid leaking framework/version info via the X-Powered-By header
  poweredByHeader: false,
  // Oculta el indicador flotante "N" de Next.js en modo desarrollo
  devIndicators: false,
  images: {
    // Foto de portada del Hero (Unsplash, licencia libre) — https://unsplash.com/@roxanarxx
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

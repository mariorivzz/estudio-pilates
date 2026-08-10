---
applyTo: "**/*.ts,**/*.tsx"
---

# Seguridad — Calma Studio (Next.js Estático, Sin Backend)

> Sitio 100% estático sin base de datos ni API propia. Muchas reglas de seguridad de
> backend/Strapi de otros proyectos del monorepo NO aplican aquí (no hay tokens de API,
> ni CORS de servidor propio, ni rate limiting server-side).

## 1. Headers de Seguridad (`next.config.ts`)

Ya configurados — no quitarlos ni bajar su nivel al tocar `next.config.ts`:

```typescript
{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
{ key: 'X-Content-Type-Options', value: 'nosniff' },
{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
{ key: 'X-DNS-Prefetch-Control', value: 'on' },
{ key: 'Content-Security-Policy', value: cspHeader },
{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
{ key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
```

### Content-Security-Policy (sin nonces)

Este sitio es 100% estático (SSG) — usar nonces en el CSP forzaría *dynamic rendering*
en todas las páginas (ver [docs oficiales de Next.js](https://nextjs.org/docs/app/guides/content-security-policy)),
así que se usa la variante "sin nonces" recomendada por Next.js:

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: https://images.unsplash.com; font-src 'self' data:; connect-src 'self'; object-src 'none';
base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;
```

`https://images.unsplash.com` está permitido en `img-src` porque la foto de portada del Hero
se sirve desde el CDN de Unsplash (licencia libre) vía `next/image` — ver `images.remotePatterns`
en `next.config.ts`. Si se añaden más fotos de stock, reutilizar el mismo host o añadir el nuevo
dominio explícitamente (nunca `*` ni `https:` genérico).

`'unsafe-inline'` en `script-src` es necesario por el `<script type="application/ld+json">`
de `page.tsx`. Si en el futuro se añade un script de terceros (analytics, mapas embebidos),
añadir su dominio explícitamente en vez de ampliar `'unsafe-inline'` a orígenes externos.

## 2. Validación de Inputs (`CitasSection`)

El único formulario del sitio es el de reservas — sus datos **nunca** se envían a un servidor,
solo se muestran en un resumen en pantalla para que la persona los use al llamar por teléfono.
Aun así, validar:

```typescript
// Teléfono español
const telefonoValido = /^[679]\d{8}$/.test(telefono);

// Longitud de nombre / notas razonable
const nombreValido = nombre.trim().length >= 2 && nombre.length <= 100;
```

Además de la validación en JS, los `<input>`/`<textarea>` del formulario llevan `maxLength`
(nombre 100, teléfono 15, notas 500) como segunda barrera nativa del navegador.

## 3. Protección contra XSS

- No usar `dangerouslySetInnerHTML` en ningún componente — no hay contenido externo/CMS que renderizar.
- El único HTML dinámico es el `<script type="application/ld+json">` de `page.tsx`; su contenido
  sale siempre de `siteConfig` (dato de confianza, no input de usuario) — no meter ahí datos del formulario.

## 4. Enlaces Externos

```tsx
// SIEMPRE rel="noopener noreferrer" en enlaces target="_blank" (Instagram, Facebook, Maps)
<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">...</a>
```

## 5. No Inventar Infraestructura

No añadir WhatsApp Business API, Twilio, bases de datos ni autenticación sin que el usuario
lo pida explícitamente — este sitio es intencionalmente estático salvo por el Route Handler
del chatbot (`src/app/api/chat`, ver `chatbot-notes.md`), que ya existe y no debe ampliarse
(nuevos endpoints, nuevas integraciones) sin confirmación explícita.

## Checklist Pre-Deploy

- [ ] `next.config.ts` conserva todos los headers de seguridad.
- [ ] El formulario de reservas valida teléfono/nombre antes de mostrar el resumen de confirmación.
- [ ] Todos los enlaces `target="_blank"` llevan `rel="noopener noreferrer"`.
- [ ] No hay secrets ni claves de API commiteadas en el repo — `GROQ_API_KEY` solo en
      `.env.local` (gitignorado) y en las variables de entorno de Vercel.
- [ ] Los datos de `src/lib/config.ts` marcados `// EDITAR` se han sustituido por los reales del negocio.
- [ ] `npm audit` revisado; vulnerabilidades solo aceptadas si son internas de Next.js vendored deps sin fix disponible sin downgrade.

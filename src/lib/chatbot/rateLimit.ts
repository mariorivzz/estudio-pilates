// ─── Rate limiting básico (en memoria) ───────────────────────
//
// Ventana fija por IP para evitar abuso y costes descontrolados en la API
// de xAI. Vive en un Map a nivel de módulo dentro de la instancia serverless:
// es suficiente para el tráfico esperado de esta landing, pero tiene dos
// límites conocidos que documentamos en chatbot-notes.md:
//   1. No persiste entre cold starts (se reinicia el contador).
//   2. No está compartido entre regiones/instancias si Vercel escala.
// Si el tráfico crece, sustituir por un almacén compartido (p. ej. Upstash
// Redis) manteniendo la misma firma de `checkRateLimit`.

const WINDOW_MS = 5 * 60 * 1000; // 5 minutos
const MAX_REQUESTS = 12; // por IP y ventana

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

// Evita que el Map crezca sin límite en una instancia de larga duración.
const MAX_TRACKED_IPS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    if (buckets.size >= MAX_TRACKED_IPS) {
      buckets.clear();
    }
    buckets.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

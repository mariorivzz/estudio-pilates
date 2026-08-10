// ─── Cliente de la API de xAI (Grok) ─────────────────────────
//
// Envoltorio mínimo sobre `fetch`, sin SDK: la API de xAI es compatible con
// el formato de OpenAI (docs.x.ai), así que es un POST JSON normal. Es la
// pieza que en Drupal/WordPress se traduce a una llamada cURL equivalente
// con el mismo body — por eso no usa ninguna abstracción específica de
// Next.js ni del SDK de Vercel AI.
//
// Modelo configurable por env var: xAI retira y sustituye modelos con
// frecuencia (semanas/meses), así que el nombre no se hardcodea en el
// código — ver XAI_MODEL en .env.local.example.

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const XAI_ENDPOINT = 'https://api.x.ai/v1/chat/completions';
const DEFAULT_MODEL = 'grok-4.3';

export class XAIConfigError extends Error {}

/**
 * Llama al endpoint de chat completions de xAI en modo streaming y devuelve
 * la Response cruda (con su `body` como ReadableStream de SSE) para que el
 * Route Handler la reenvíe directamente al cliente sin volver a parsearla.
 */
export async function streamChatCompletion(messages: ChatMessage[]): Promise<Response> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new XAIConfigError('XAI_API_KEY no está configurada en el servidor.');
  }
  const model = process.env.XAI_MODEL || DEFAULT_MODEL;

  return fetch(XAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.4,
      max_tokens: 500,
    }),
  });
}

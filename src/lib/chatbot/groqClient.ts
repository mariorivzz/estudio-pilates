// ─── Cliente de la API de Groq ───────────────────────────────
//
// Envoltorio mínimo sobre `fetch`, sin SDK: la API de Groq es compatible con
// el formato de OpenAI (console.groq.com/docs), así que es un POST JSON
// normal. Es la pieza que en Drupal/WordPress se traduce a una llamada cURL
// equivalente con el mismo body — por eso no usa ninguna abstracción
// específica de Next.js ni de ningún SDK.
//
// Nota: la implementación original apuntaba a xAI (Grok), tal y como se
// pidió inicialmente. Se cambió a Groq — un proveedor de inferencia
// distinto, sin relación con xAI, fácil de confundir por el nombre — porque
// la clave que se generó era de Groq (prefijo `gsk_`), no de xAI. Ver
// chatbot-notes.md para el detalle de esta decisión.
//
// Modelo configurable por env var: los catálogos de modelos cambian con
// frecuencia, así que el nombre no se hardcodea — ver GROQ_MODEL en
// .env.example.
//
// ⚠️ Groq RETIRA modelos cada pocos meses. Cuando lo hace, su API responde 404
// `model_not_found`, `route.ts` lo traduce a 502 y el asistente deja de
// contestar de un día para otro — con la clave perfectamente válida, que es lo
// que despista. Le pasó a `llama-3.3-70b-versatile`, el valor por defecto
// anterior. Para ver cuáles siguen vivos con tu clave:
//   curl -s https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"
// descartando los whisper-* (voz a texto) y los *-guard-* (clasificadores de
// seguridad: no conversan). El arreglo es cambiar GROQ_MODEL en Vercel y
// redesplegar; no hace falta tocar este archivo.

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-120b';

export class GroqConfigError extends Error {}

/**
 * Llama al endpoint de chat completions de Groq en modo streaming y
 * devuelve la Response cruda (con su `body` como ReadableStream de SSE)
 * para que el Route Handler la reenvíe directamente al cliente sin volver
 * a parsearla.
 */
export async function streamChatCompletion(messages: ChatMessage[]): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GroqConfigError('GROQ_API_KEY no está configurada en el servidor.');
  }
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  return fetch(GROQ_ENDPOINT, {
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

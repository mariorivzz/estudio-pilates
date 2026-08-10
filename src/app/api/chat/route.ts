import { GroqConfigError, streamChatCompletion, type ChatMessage } from '@/lib/chatbot/groqClient';
import { getChatbotKnowledge } from '@/lib/chatbot/knowledge';
import { checkRateLimit } from '@/lib/chatbot/rateLimit';
import { buildSystemPrompt } from '@/lib/chatbot/systemPrompt';
import { NextRequest } from 'next/server';

// Node.js runtime: el rate limiter en memoria y el proxy del stream de Groq
// no necesitan (ni se benefician de) el runtime Edge aquí.
export const runtime = 'nodejs';

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 800;

function jsonError(message: string, status: number, extraHeaders?: HeadersInit) {
  return Response.json({ error: message }, { status, headers: extraHeaders });
}

/** Vercel añade x-forwarded-for; `request.ip` se eliminó de NextRequest en Next 15. */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return 'unknown';
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Cuerpo de la petición inválido.', 400);
  }

  const rawMessages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return jsonError('Faltan mensajes en la conversación.', 400);
  }
  if (rawMessages.length > MAX_MESSAGES) {
    return jsonError('Esta conversación se ha alargado demasiado. Abre un chat nuevo o llámanos por teléfono.', 400);
  }

  const history: ChatMessage[] = [];
  for (const raw of rawMessages) {
    const m = raw as { role?: unknown; content?: unknown };
    if (
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.trim().length === 0 ||
      m.content.length > MAX_MESSAGE_LENGTH
    ) {
      return jsonError('Formato de mensaje no válido.', 400);
    }
    history.push({ role: m.role, content: m.content });
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return jsonError(
      'Has enviado demasiados mensajes seguidos. Espera un momento y vuelve a intentarlo, o llámanos por teléfono.',
      429,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) }
    );
  }

  const systemMessage: ChatMessage = {
    role: 'system',
    content: buildSystemPrompt(getChatbotKnowledge()),
  };

  let upstream: Response;
  try {
    upstream = await streamChatCompletion([systemMessage, ...history]);
  } catch (error) {
    if (error instanceof GroqConfigError) {
      console.error('[api/chat] Configuración inválida:', error.message);
      return jsonError('El asistente no está disponible ahora mismo. Llámanos por teléfono.', 503);
    }
    console.error('[api/chat] Error de red llamando a Groq:', error);
    return jsonError('No hemos podido conectar con el asistente. Inténtalo de nuevo o llámanos por teléfono.', 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '(sin detalle)');
    console.error('[api/chat] Groq respondió con error:', upstream.status, detail);
    return jsonError('El asistente no ha podido responder. Inténtalo de nuevo en unos segundos.', 502);
  }

  // Reenviamos el stream SSE de Groq tal cual — el cliente ya lo parsea en
  // formato OpenAI (delta.content), no hace falta reprocesarlo aquí.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

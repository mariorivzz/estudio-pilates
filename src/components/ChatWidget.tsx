'use client';

import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { TbBrandWhatsapp, TbMessageChatbot, TbRefresh, TbSend2, TbX } from 'react-icons/tb';

interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
}

type Status = 'idle' | 'streaming' | 'error';

const MAX_HISTORY = 20;
const GREETING =
  '¡Hola! 👋 Soy el asistente de Calma Studio. Puedo ayudarte con horarios, servicios (Pilates, Barre y Nutrición), ubicación o cómo reservar tu clase. ¿En qué te ayudo?';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Región aria-live separada y silenciosa durante el streaming: si
  // anunciáramos cada fragmento SSE, un lector de pantalla leería la
  // respuesta palabra a palabra. Se anuncia una vez, al completarse.
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappFallbackUrl = buildWhatsAppUrl(
    siteConfig.phone,
    'Hola, tengo una duda para Calma Studio.'
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleReset = () => {
    setMessages([]);
    setErrorMessage(null);
    setStatus('idle');
    setLiveAnnouncement('Conversación reiniciada.');
    inputRef.current?.focus();
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === 'streaming') return;

    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(history);
    setInput('');
    setErrorMessage(null);
    setStatus('streaming');
    setLiveAnnouncement('El asistente está escribiendo…');

    const assistantIndex = history.length;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'No hemos podido contactar con el asistente.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;
          const data = trimmedLine.slice(5).trim();
          if (!data || data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const delta: string | undefined = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[assistantIndex] = { role: 'assistant', content: accumulated };
                return next;
              });
            }
          } catch {
            // Fragmento SSE incompleto o no-JSON: se ignora, ya se completará
            // con el siguiente chunk del buffer.
          }
        }
      }

      if (!accumulated.trim()) {
        throw new Error('El asistente no ha devuelto respuesta. Inténtalo de nuevo.');
      }
      setStatus('idle');
      setLiveAnnouncement(accumulated);
    } catch (err) {
      setMessages((prev) => prev.slice(0, assistantIndex));
      const message = err instanceof Error ? err.message : 'Ha ocurrido un error inesperado.';
      setErrorMessage(message);
      setLiveAnnouncement(message);
      setStatus('error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const historyFull = messages.length >= MAX_HISTORY;

  return (
    <>
      {/* Región aria-live silenciosa: solo la usan lectores de pantalla */}
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Botón flotante — abajo-izquierda, para no chocar con el WhatsApp de abajo-derecha */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Cerrar asistente de Calma Studio' : 'Abrir asistente de Calma Studio'}
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary hover:bg-primary-dark text-white transition-colors whatsapp-fab"
      >
        {isOpen ? <TbX size={26} /> : <TbMessageChatbot size={26} />}
      </button>

      {isOpen && (
        <div
          id="chat-widget-panel"
          role="dialog"
          aria-labelledby="chat-widget-title"
          className="fixed z-50 bottom-[4.75rem] left-5 right-5 sm:left-6 sm:right-auto sm:bottom-24 sm:w-96 max-h-[min(32rem,calc(100vh-8rem))] flex flex-col bg-card-bg border border-border rounded-2xl shadow-lg overflow-hidden animate-fade-in-up"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between gap-2 bg-primary text-white px-4 py-3.5 shrink-0">
            <div className="min-w-0">
              <h2 id="chat-widget-title" className="font-serif text-base font-bold leading-tight truncate">
                Asistente de calma studio
              </h2>
              <p className="text-white/70 text-xs">Pilates · Barre · Nutrición</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                disabled={messages.length === 0}
                aria-label="Empezar una conversación nueva"
                title="Nueva conversación"
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <TbRefresh size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Cerrar asistente"
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <TbX size={18} />
              </button>
            </div>
          </div>

          {/* Mensajes — aria-live="off": el anuncio a lectores de pantalla lo
              gestiona la región oculta de arriba, para no leer el streaming
              fragmento a fragmento. */}
          <div ref={scrollRef} aria-live="off" className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary-bg text-secondary text-sm leading-relaxed px-3.5 py-2.5">
                {GREETING}
              </p>
            </div>

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.content ? (
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed px-3.5 py-2.5 ${
                      m.role === 'user'
                        ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                        : 'bg-primary-bg text-secondary rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </p>
                ) : (
                  status === 'streaming' &&
                  i === messages.length - 1 && (
                    <div className="flex items-center gap-1 bg-primary-bg rounded-2xl rounded-bl-sm px-4 py-3" aria-hidden="true">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  )
                )}
              </div>
            ))}

            {status === 'error' && errorMessage && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-accent-light text-secondary text-sm leading-relaxed px-3.5 py-2.5">
                  <p>{errorMessage}</p>
                  <a
                    href={whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 font-semibold text-accent hover:text-primary transition-colors"
                  >
                    <TbBrandWhatsapp size={16} />
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </div>
            )}

            {historyFull && (
              <p className="text-center text-xs text-muted">
                Esta conversación se ha alargado bastante — pulsa{' '}
                <TbRefresh size={12} className="inline" /> para empezar una nueva.
              </p>
            )}
          </div>

          {/* Entrada */}
          <form onSubmit={handleSubmit} className="shrink-0 border-t border-border bg-card-bg p-3">
            <div className="flex items-center gap-2">
              <label htmlFor="chat-widget-input" className="sr-only">
                Escribe tu pregunta para el asistente de Calma Studio
              </label>
              <input
                ref={inputRef}
                id="chat-widget-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                maxLength={800}
                disabled={status === 'streaming' || historyFull}
                autoComplete="off"
                className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'streaming' || historyFull || input.trim().length === 0}
                aria-label="Enviar mensaje"
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark text-white transition-colors disabled:opacity-40 disabled:hover:bg-primary"
              >
                <TbSend2 size={18} />
              </button>
            </div>
            <p className="text-[11px] text-muted mt-2 leading-snug">
              Respuestas generadas por IA, pueden contener errores. Para reservar, usa el{' '}
              <a href="#citas" onClick={() => setIsOpen(false)} className="underline hover:text-primary">
                formulario
              </a>{' '}
              o escríbenos por WhatsApp.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

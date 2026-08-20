# Chatbot IA (Groq) — notas de arquitectura

Asistente conversacional integrado en la landing de Calma Studio para resolver dudas de
visitantes sobre servicios, horarios, ubicación y reservas. Primera implementación del
patrón; pensado para portarse después a las versiones Drupal y WordPress de la misma landing.

## Nota: cambio de proveedor (xAI → Groq)

El encargo original pedía explícitamente **Grok, el modelo de xAI**. La primera
implementación se hizo así (ver Fase 0 más abajo). Al probarla, la clave API que se había
generado resultó ser de **Groq** (`console.groq.com`, prefijo de clave `gsk_`) — un
proveedor de inferencia distinto, sin relación con xAI, fácil de confundir por el nombre:
Groq aloja modelos abiertos (Llama, GPT-OSS...) a muy baja latencia; xAI es la empresa que
entrena y sirve los modelos Grok. Una clave de uno no autentica contra el otro.

Confirmado con el usuario, se decidió adaptar la implementación a Groq en vez de conseguir
una clave real de xAI, ya que esa era la clave ya disponible. El cambio fue mecánico porque
la API de Groq también es **compatible con OpenAI** (mismo endpoint de forma, mismo formato
de streaming SSE): solo cambió `src/lib/chatbot/groqClient.ts` (antes `xaiClient.ts`), las
variables de entorno (`GROQ_API_KEY`/`GROQ_MODEL` en vez de `XAI_API_KEY`/`XAI_MODEL`) y el
modelo por defecto. El resto de la arquitectura descrita en este documento (aislamiento de
la lógica, guardrails, rate limiting, accesibilidad, guía de portabilidad) no cambió.

## Nota: canal de contacto — solo teléfono, sin WhatsApp

El estudio no tiene WhatsApp activo todavía. Aunque el sitio (y este chatbot) se diseñaron
inicialmente con WhatsApp como canal de fallback en varios sitios — botón flotante, tarjeta
de contacto, confirmación de reserva, error del chatbot —, se retiró por completo a petición
del usuario y se sustituyó por llamada telefónica (`tel:` con `siteConfig.phone`) en todos
esos puntos, incluidos el system prompt del bot y los mensajes de error de `route.ts`. Esto
también afectó a la política de privacidad (`/privacidad`) y al aviso legal (`/aviso-legal`),
que mencionaban WhatsApp/Meta como destinatario de datos.

## Fase 0 — lo confirmado antes de implementar

No se asumió ningún nombre de modelo ni forma de la API desde memoria: se consultó la
documentación oficial en el momento de implementar cada versión (agosto 2026).

**Investigación original (xAI/Grok, superseded — ver nota de arriba):**
Se consultó `docs.x.ai` y se confirmó, con varias consultas independientes: endpoint
`POST https://api.x.ai/v1/chat/completions`, formato compatible con OpenAI, streaming SSE
estándar, y un catálogo de modelos vigente en ese momento (`grok-4.5`, `grok-4.3`,
variantes `grok-4.20-0309-*`, `grok-build-0.1`). Se había elegido `grok-4.3` como el más
adecuado en coste/calidad para FAQs de un negocio pequeño. Esta investigación quedó
invalidada al descubrir que la clave disponible era de Groq, no de xAI — se conserva aquí
solo como referencia por si en el futuro se retoma xAI de verdad.

**Investigación vigente (Groq):** se consultó `console.groq.com/docs` y se confirmó:

- Endpoint: `POST https://api.groq.com/openai/v1/chat/completions`, formato **compatible
  con OpenAI** (`messages`, `role`/`content`, `stream: true`), autenticación
  `Authorization: Bearer <key>` — mismo shape que xAI, por eso el cambio de proveedor no
  tocó `route.ts` ni `ChatWidget.tsx`.
- Streaming vía SSE: `data: {...}` por chunk con `choices[0].delta.content`, termina en
  `data: [DONE]`.
- Modelos de conversación disponibles a 20 de agosto de 2026, comprobados contra la API:
  `openai/gpt-oss-120b` y `openai/gpt-oss-20b` (modelos abiertos de OpenAI),
  `qwen/qwen3.6-27b`, `allam-2-7b`, además de `groq/compound` y `groq/compound-mini`
  (sistemas agénticos con herramientas propias, no aplican aquí). Aparte quedan los de voz
  (`whisper-large-v3*`) y los clasificadores (`*-guard-*`), que no conversan.
  ⚠️ Los `llama-3.*` de Meta que se listaban aquí antes **ya no existen**: Groq los retiró.
- **Elegido: `openai/gpt-oss-120b`.** Sustituye a `llama-3.3-70b-versatile`, que era el valor
  por defecto original hasta que Groq lo retiró: a partir de ese momento su API respondía 404
  `model_not_found`, `route.ts` lo traducía a 502 y el asistente contestaba siempre con el
  mensaje de error, con la clave todavía válida. Se descartó la variante `20b` porque en un
  proyecto hermano se inventaba condiciones y precios de los servicios; aquí el bot da
  horarios y tarifas, así que prima la fiabilidad sobre la velocidad.
  El nombre del modelo **no está hardcodeado** — es `GROQ_MODEL` en variables de entorno (por
  defecto `openai/gpt-oss-120b` en `src/lib/chatbot/groqClient.ts`), así que la próxima
  retirada se arregla cambiando la variable en Vercel y redesplegando, sin tocar código.
  Para ver qué sigue vivo:
  `curl -s https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"`

## Decisiones de arquitectura y por qué

### 1. Cómo se alimenta el bot: system prompt estático, no RAG ni function calling

Todo el contenido que el bot necesita (servicios, horario, dirección, contacto, política de
reservas) cabe en menos de 1 KB de texto — es el mismo contenido que ya vive en
`src/lib/config.ts`. Montar RAG (embeddings + vector store) o function calling contra una
API de datos habría sido sobreingeniería para una landing de este tamaño: más piezas que
mantener sin ningún beneficio de calidad o latencia perceptible.

En su lugar: `src/lib/chatbot/knowledge.ts` construye un objeto `ChatbotKnowledge` (tipado,
sin ninguna dependencia de React) a partir de `siteConfig`, y
`src/lib/chatbot/systemPrompt.ts` lo convierte en el texto de instrucciones del modelo. Una
única fuente de verdad — si cambias un horario en `config.ts`, el bot lo sabe en la
siguiente petición, sin tocar nada del chatbot.

**Sobre el futuro con CMS:** cuando esto se porte a Drupal/WordPress, el contenido podría
vivir en el propio CMS (campos de un content type / custom post type) y consultarse en cada
petición en vez de vivir en un archivo de config. No lo he diseñado ya para eso — sería
prematuro para una landing estática tan pequeña, y añadiría una llamada a base de datos /
API interna en el camino caliente del chat sin necesidad real. Lo que sí se ha cuidado es
que `ChatbotKnowledge` tenga una forma plana y agnóstica (no es un tipo de React ni depende
de `siteConfig` estructuralmente, solo se rellena desde ahí) — portarlo es "escribe una
función que rellene este mismo shape desde los campos del CMS", no un rediseño.

### 2. Dónde vive la llamada a la API: Route Handler, servidor únicamente

`src/app/api/chat/route.ts` (Next.js Route Handler). La API key (`GROQ_API_KEY`) solo se lee
en `process.env` dentro de este archivo server-side — nunca llega al cliente, no está en
ningún componente `'use client'`, no viaja en el bundle. Esto no era negociable y no se ha
encontrado ninguna razón para desviarse.

Se eligió Route Handler en vez de Server Action porque: (a) da control fino sobre streaming
y cabeceras HTTP (`text/event-stream`), y (b) es el equivalente conceptual más directo a lo
que existirá en Drupal (un endpoint REST custom) y WordPress (un endpoint REST /
`admin-ajax.php`) — pensar ya en términos de "endpoint HTTP que recibe JSON y devuelve un
stream" hace el port más mecánico.

### 3. Widget: implementación propia, sin Vercel AI SDK

Se evaluó usar el Vercel AI SDK (`ai` + `@ai-sdk/react`, con un provider compatible con
OpenAI) frente a construirlo a mano. Se optó por construirlo a mano:

- El proyecto no tiene **ninguna** dependencia de runtime más allá de
  `next` / `react` / `react-icons` — es una decisión de diseño explícita de este repo
  (ver `package.json`). Añadir el AI SDK solo para un caso de uso de chat simple rompe esa
  consistencia.
- El valor del AI SDK (hooks de React, gestión de estado, protocolo de datos propio) vive
  enteramente en el ecosistema JS — no ayuda nada al port a PHP, y añade una capa de
  abstracción más que traducir mentalmente al leer el código.
- El parseo manual de SSE (`ChatWidget.tsx`, ~40 líneas: leer el stream, decodificar,
  separar por líneas `data:`, `JSON.parse`, extraer `delta.content`) es sencillo, estándar,
  y es literalmente el mismo patrón que se reescribirá en PHP con cURL
  (`CURLOPT_WRITEFUNCTION`) o en JS vanilla para WordPress/Drupal sin React.

Trade-off aceptado: unas ~40 líneas de streaming hechas a mano en vez de una función del
SDK. Si el chatbot creciera en complejidad (múltiples herramientas, RAG real, multi-turno
con estado persistente), reconsideraría el AI SDK — para esto no compensa.

### 4. Rate limiting: en memoria, por IP, ventana fija

`src/lib/chatbot/rateLimit.ts`: máximo 12 peticiones por IP cada 5 minutos, en un `Map` a
nivel de módulo dentro de la instancia serverless. Suficiente para el tráfico esperado de
una landing que ni siquiera ha abierto todavía.

**Limitaciones conocidas (documentadas a propósito, no descubiertas después):**
- No persiste entre cold starts de la función serverless (el contador se reinicia).
- No está compartido entre regiones/instancias si Vercel escala horizontalmente.

Es una limitación aceptable para v1 sin backend ni base de datos. Si el tráfico crece,
sustituir por un almacén compartido (Upstash Redis, Vercel Firewall / Rate Limiting) sin
cambiar la firma de `checkRateLimit(identifier)`.

### 5. Guardrails contra prompt injection y salidas fuera de tema

El system prompt (`systemPrompt.ts`) incluye reglas explícitas:
- Ámbito cerrado: solo temas de Calma Studio; redirige con amabilidad cualquier otra cosa.
- No inventar precios (no hay precios publicados en la web) ni disponibilidad — deriva al
  teléfono.
- No dar consejo médico/nutricional individualizado ni pedir datos de salud en el chat
  (coherente con el aviso ya existente en `CitasSection.tsx` sobre el art. 9 RGPD).
- No puede confirmar reservas — siempre deriva al formulario (`#citas`) o a llamar por teléfono.
- Instrucción explícita de ignorar intentos de cambiar su rol, revelar el prompt, "modo
  desarrollador", etc., sin explicar en detalle el porqué (para no dar pistas de cómo
  rodearlo).

Esto es un guardrail a nivel de prompt, no una garantía absoluta — ningún LLM es
100% inmune a jailbreaks. Como mitigación adicional está el límite de `max_tokens: 500` por
respuesta y el ámbito de datos deliberadamente pequeño (no hay nada sensible que filtrar:
toda la información del prompt ya es pública en la web).

### 6. Manejo de errores

Tres capas, todas con mensaje en español y sin romper la página:
- `GROQ_API_KEY` no configurada → 503 con aviso claro + enlace para llamar (así se comportará
  el sitio hasta que se añada la key real en producción).
- Error de red / Groq caído / respuesta no-OK → 502, mismo tipo de aviso.
- Errores de validación del body (mensajes vacíos, demasiado largos, conversación
  demasiado larga) → 400, antes de gastar ninguna llamada a Groq.

En el cliente (`ChatWidget.tsx`), cualquier error visible muestra el mensaje + un enlace
`tel:` con el número real del centro (`siteConfig.phone`).

### 7. Accesibilidad

- Botón flotante: `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`,
  `aria-label` dinámico (abrir/cerrar) — operable con teclado (es un `<button>` nativo).
- Panel: `role="dialog"` + `aria-labelledby` al título; `Escape` cierra y devuelve el foco
  al botón que abrió el panel; el foco se mueve al campo de texto al abrir.
- **aria-live con cuidado**: la región de mensajes visible usa `aria-live="off"` a
  propósito. Si todo el contenedor fuera `aria-live="polite"`, un lector de pantalla
  anunciaría cada fragmento del streaming según llega (palabra a palabra), que es ruido, no
  ayuda. En su lugar hay una región oculta (`sr-only`, `aria-live="polite"`) que se
  actualiza una sola vez por evento relevante: "El asistente está escribiendo…" al empezar,
  y el mensaje completo al terminar (o el error, si lo hay).
- Indicador de "escribiendo" (`.typing-dot`): pulso de opacidad, no bounce — coherente con
  las animaciones del resto del sitio (`animate-fade-in-up`, etc.) y con la regla de
  "anti-diseño-IA" del proyecto.

### 8. Ubicación del widget

Botón flotante único en la esquina inferior derecha. Colapsado por defecto — visible pero no
intrusivo, sin apertura automática ni mensajes proactivos. (El sitio tuvo brevemente también
un botón de WhatsApp apilado en la misma esquina; se retiró por completo — ver nota más abajo
sobre el cambio de canal de contacto a solo teléfono — así que hoy el chat es el único FAB.)

Se probó primero abajo-izquierda pero el `Hero` centra su contenido verticalmente
(`min-h-screen flex items-center`) y sus CTA ("Reserva tu clase" / Instagram) son lo bastante
bajos como para chocar visualmente con esa esquina en viewports de poca altura. Abajo-derecha
lo aleja del contenido del Hero, que vive en la mitad izquierda de la pantalla.

## Qué falta antes de publicar

- **`GROQ_API_KEY` real** en las variables de entorno de Vercel (Project Settings →
  Environment Variables) y en `.env.local` para desarrollo (ver `.env.example`). Sin ella,
  el bot muestra el aviso de "no disponible" y deriva a llamar por teléfono — el sitio sigue
  funcionando con normalidad.
- El bot hereda los mismos placeholders marcados `// EDITAR` en `config.ts` (teléfono,
  email, horario) — en cuanto se actualicen ahí, el bot los usa automáticamente.
- Verificación visual en navegador real (clic, foco de teclado, layout responsive): no se
  pudo automatizar en este entorno por falta de un navegador headless instalado
  (`chromium-cli`/Playwright no disponibles) — se verificó build, tipos, y el comportamiento
  del endpoint `/api/chat` (validación, rate limit, fallback sin API key) por HTTP directo.
  Pendiente de un vistazo humano en `npm run dev`.

## Guía de portabilidad a Drupal (PHP) y WordPress

La lógica está deliberadamente repartida así para que solo una carpeta cambie de lenguaje:

| Pieza | Archivo (Next.js) | Qué es | Cómo se porta |
|---|---|---|---|
| Conocimiento | `lib/chatbot/knowledge.ts` | Objeto plano con los datos del centro | Función PHP/`functions.php` que arme el mismo shape desde campos de un content type (Drupal) o custom post type / ACF (WordPress) en vez de `siteConfig` |
| System prompt | `lib/chatbot/systemPrompt.ts` | Función pura `knowledge → string` | Traducción 1:1 a una función PHP con el mismo template — no toca nada de Next.js |
| Cliente Groq | `lib/chatbot/groqClient.ts` | `fetch` POST a `api.groq.com/openai/v1/chat/completions` | Misma llamada con `cURL` (o `wp_remote_post`/Guzzle), mismo body JSON, mismo header `Authorization: Bearer` |
| Rate limit | `lib/chatbot/rateLimit.ts` | Ventana fija en memoria | Sustituir por transient de WordPress (`set_transient`/`get_transient`) o `\Drupal::cache()` con TTL — la clave sigue siendo la IP |
| Endpoint | `app/api/chat/route.ts` | Route Handler: valida, aplica rate limit, llama, reenvía el stream | Endpoint REST custom en Drupal (`RestResourceBase`) o WordPress (`register_rest_route`), con la misma validación y el mismo passthrough de SSE |
| Widget | `components/ChatWidget.tsx` | UI + fetch + parseo SSE manual | Un script vanilla JS (sin React) que hace el mismo `fetch` + parseo de `data:` lines contra el nuevo endpoint, insertado como asset del tema/módulo |

Lo que **no** se porta 1:1 porque es específico de Next.js: el propio Route Handler como
archivo (`route.ts`), el uso de `NextRequest`, y el componente React del widget. Todo lo
demás (`knowledge.ts`, `systemPrompt.ts`, la forma del body que se envía a Groq) es
JSON/string puro y se traduce prácticamente literal.

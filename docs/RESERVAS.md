# Sistema de reservas — guía de integración y pruebas

Cómo conectar un proveedor de reservas al sitio y cómo probarlo antes de darlo por bueno.

El código ya está preparado: no hay que programar nada, sólo rellenar tres valores en
`src/lib/config.ts`. Mientras `booking.enabled` sea `false`, la web sigue funcionando con el
formulario que deriva a WhatsApp.

---

## 1. Qué proveedor elegir

La recomendación es **Sammy** (español, pensado para estudios de pilates, desde 45 €/mes,
primer mes gratis sin tarjeta y sin permanencia): <https://getsammy.es/para-pilates/>

Alternativas válidas si Sammy no encaja:

| Proveedor | Precio orientativo | Por qué considerarlo |
|---|---|---|
| **Sammy** | desde 45 €/mes | Español, bonos, lista de espera, aforo reducido, SEPA/Bizum |
| **TIMP** | desde ~50 €/mes | El más asentado en España, más módulos, Verifactu |
| **Bookitit** | prueba de 15 días | El más barato para sólo embeber, pagos por Redsys |
| **Momence** | consultar | UX moderna, integración con ClassPass |

Descartado **Fresha**: cobra un 20 % de comisión por cada clienta nueva que llegue por su
marketplace y ya no tiene plan gratuito.

---

## 2. Dar de alta la cuenta

1. Crea la cuenta en el proveedor y configura lo mínimo para poder probar:
   - **Servicios**: Pilates Reformer, Pilates Suelo (Mat), Barre, Asesoría de Nutrición.
     Coinciden con los del formulario actual (`tiposClase` en `CitasSection.tsx`).
   - **Aforo por clase**: el número real de plazas o máquinas.
   - **Horario**: el de `siteConfig.hours` (L–J 8:00–21:00, V 8:00–20:00, S 9:00–14:00).
2. Pide a soporte el **código de integración para web**. Pide expresamente la versión
   **iframe**, no la de script JavaScript (ver el apartado 5, sobre la CSP).
3. Del código que te den, copia sólo la URL del atributo `src`. Si te entregan algo como
   `<iframe src="https://reservas.ejemplo.es/calma-studio" …>`, el valor que necesitas es
   `https://reservas.ejemplo.es/calma-studio`.

---

## 3. Activarlo en la web

En `src/lib/config.ts`, bloque `booking`:

```ts
booking: {
  enabled: true,                                        // activa el widget
  providerName: 'Sammy',                                // se muestra bajo el calendario
  embedUrl: 'https://reservas.ejemplo.es/calma-studio', // la URL del paso anterior
  embedHeight: 900,                                     // ajusta si queda corto o sobra hueco
},
```

Eso es todo. Al hacerlo:

- La sección «Reserva tu clase» sustituye el formulario por el calendario del proveedor.
- La CSP añade automáticamente el origen del proveedor (no hay que tocar `next.config.ts`).
- La política de privacidad incorpora sola el párrafo que declara al proveedor como encargado
  del tratamiento, como exige el artículo 28 del RGPD.

Para volver atrás en cualquier momento, basta con poner `enabled: false`.

---

## 4. Plan de pruebas

Con `npm run dev` y la web en <http://localhost:3000/#citas>:

| # | Qué probar | Resultado esperado |
|---|---|---|
| 1 | El calendario aparece en la sección «Reserva tu clase» | Se ve el widget, no el formulario |
| 2 | Consola del navegador (F12) | Sin errores de `Content Security Policy` |
| 3 | Reservar una clase de prueba de principio a fin | Llega el aviso al panel del proveedor |
| 4 | Reservar hasta llenar el aforo | La plaza siguiente se ofrece como lista de espera |
| 5 | Cancelar la reserva de prueba | Se libera la plaza y llega el aviso de cancelación |
| 6 | Repetir en el móvil | El calendario se ve completo, sin scroll horizontal |
| 7 | Comprobar el email/SMS de confirmación | Llega con el nombre y los datos correctos del estudio |

**Antes de dar por buena la prueba**, borra las reservas de prueba del panel para no arrancar
con datos falsos.

### Si el calendario no aparece

Casi siempre es la CSP. Abre la consola del navegador (F12) y busca un mensaje que mencione
`frame-src`. Significa que la URL real del widget no coincide con la de `embedUrl` — algunos
proveedores sirven el iframe desde un subdominio distinto al de la URL que te dan. La solución
es añadir ese origen a mano en `next.config.ts`, en la constante `frameSrc`.

Si el proveedor sólo ofrece integración por **script JavaScript**, además harán falta cambios
en `script-src` y `connect-src` de la CSP: es más trabajo y abre más superficie de riesgo. Por
eso conviene pedir la versión iframe.

---

## 5. Protección de datos al contratar

Estos dos puntos son responsabilidad del estudio y **no** se resuelven desde el código:

1. **Contrato de encargado del tratamiento** (artículo 28 del RGPD) con el proveedor. Todas las
   plataformas serias lo tienen disponible para descargar y firmar desde el panel de
   administración. Sin él, la cesión de datos al proveedor no es conforme.
2. **Servidores en la UE**: confírmalo con el proveedor. Si aloja fuera del Espacio Económico
   Europeo, hacen falta garantías adicionales y habrá que reflejarlo en la política de
   privacidad.

Si el proveedor va a guardar información de salud de las clientas (lesiones, embarazo,
patologías), eso es categoría especial del artículo 9 del RGPD y necesita un consentimiento
específico, separado del de la reserva. Configúralo dentro del panel del proveedor, nunca en el
formulario de la web.

---

## 6. Datos que faltan por rellenar

Independientemente del sistema de reservas, hay marcadores `// EDITAR` en `src/lib/config.ts`
que deben tener valores reales antes de publicar:

- `seo.siteUrl` — el dominio definitivo, del que dependen el sitemap, el canonical y las
  imágenes para compartir en redes.
- `phone`, `email`, `postalCode` — hoy son de ejemplo.
- `legal.razonSocial`, `legal.nif`, `legal.domicilioFiscal` — obligatorios por la LSSI-CE.
  Mientras estén vacíos, las páginas `/aviso-legal` y `/privacidad` muestran un aviso visible
  recordándolo.

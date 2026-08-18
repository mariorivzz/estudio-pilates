# Feed de Instagram — guía de puesta en marcha

Sección de **prueba** que muestra las últimas publicaciones de
[@calmastudio71](https://www.instagram.com/calmastudio71) entre el formulario de reserva y la
sección de contacto.

El código ya está hecho: sólo hay que crear la cuenta en Behold y pegar un identificador.
Mientras `BEHOLD_FEED_ID` esté vacío se ven **fotos de ejemplo**, así que el diseño se puede
juzgar desde ya.

---

## 1. Dar de alta la cuenta en Behold

1. La cuenta de Instagram tiene que ser **profesional** (Empresa o Creador). Se cambia desde
   la app: *Configuración → Tipo de cuenta y herramientas → Cambiar a cuenta profesional*.
2. Crear la cuenta en <https://behold.so> (plan gratuito, sin tarjeta).
3. Conectar el Instagram de Calma Studio.
4. Crear un feed y abrir su ficha. El identificador aparece en la URL del feed JSON:
   `https://feeds.behold.so/XXXXXXXXXXXXXXXX` ← esa última parte es el `BEHOLD_FEED_ID`.

### Qué da y qué no da el plan gratuito

| | Plan gratuito |
|---|---|
| Publicaciones | **6** como máximo |
| Actualización | **1 vez al día** |
| Coste | 0 € |

Seis publicaciones es justo lo que piden las tres maquetaciones, y una actualización diaria
sobra para un estudio que publica dos o tres veces por semana.

---

## 2. Rellenar las variables de entorno

En local, en `.env.local`; en producción, en **Vercel → Settings → Environment Variables**
(entornos Production, Preview y Development), y volver a desplegar.

| Variable | Obligatoria | Valor |
|---|---|---|
| `BEHOLD_FEED_ID` | Sí | El identificador del paso 1. Vacío ⇒ fotos de ejemplo. |
| `SHOW_INSTAGRAM_FEED` | No | `false` quita la sección entera. Cualquier otro valor la muestra. |
| `INSTAGRAM_FEED_VARIANT` | No | `grid` (por defecto), `carousel` o `moodboard`. |

No es una clave secreta: el feed de Behold es público. Aun así sólo se lee **desde el
servidor**, así que no viaja al navegador ni aparece en el código del cliente.

---

## 3. Cómo probarlo

```bash
npm run dev          # con datos de ejemplo
```

Con el feed real ya conectado, comprobar:

- [ ] Salen las publicaciones reales y no las de ejemplo.
- [ ] Al pulsar una foto se abre esa publicación en Instagram, en otra pestaña.
- [ ] Con el tabulador se recorren las fotos y se ve el borde de foco.
- [ ] En móvil, la cuadrícula queda a dos columnas sin desbordarse.
- [ ] Al recargar, las fotos no «empujan» el contenido de abajo (no hay salto de maquetación).

Para ver qué pasa si Behold se cae, poner un identificador inventado y recargar: la sección
debe **desaparecer entera**, sin hueco ni mensaje de error, y el resto de la página seguir igual.

---

## 4. Cómo quitarla

**Del tirón, sin tocar código:** `SHOW_INSTAGRAM_FEED=false` en Vercel y volver a desplegar.

**Del repositorio, si se descarta definitivamente:**

1. Borrar `src/lib/instagram.ts`, `src/components/InstagramSection.tsx` y
   `src/components/instagram/`.
2. Quitar de `src/app/page.tsx` el bloque marcado con el comentario del feed y sus imports.
3. Quitar de `next.config.ts` los dos `remotePatterns` de `behold.pictures` y los dos hosts de
   Behold en `img-src`.
4. Quitar de `src/app/globals.css` los bloques `.ig-section` y `.no-scrollbar`.
5. `npm uninstall @behold/types` y borrar el apartado de Behold de `.env.example`.

---

## 5. Cómo está montado

- **Datos**: el [JSON feed oficial de Behold](https://behold.so/docs/json-feeds), pedido desde
  el servidor en `src/lib/instagram.ts` y cacheado 6 h con ISR. El navegador nunca habla con
  Behold, así que no hace falta abrir `connect-src` en la CSP.
- **Tipos**: paquete oficial `@behold/types`.
- **Imágenes**: `next/image` sobre el CDN de Behold (`behold.pictures`, WebP ya redimensionado).
  Carga diferida, y cada foto va dentro de una caja de proporción fija para que no haya salto
  de maquetación.
- **Rendimiento**: la sección va envuelta en `<Suspense>`, así que nunca retrasa la pintura del
  resto de la página; en producción se genera con las fotos ya dentro.
- **Si algo falla**: `getInstagramPosts()` nunca lanza; devuelve una lista vacía y
  `InstagramSection` devuelve `null`.

> **Por qué no se usa `@behold/react`**: el widget oficial se maqueta entero desde el panel de
> Behold y se monta sólo en el navegador. Eso impide reutilizar la paleta y la tipografía del
> sitio, usar `next/image` y ocultar la sección con elegancia si falla. El JSON feed es igual de
> oficial, entra en el mismo plan gratuito y sí permite todo eso.

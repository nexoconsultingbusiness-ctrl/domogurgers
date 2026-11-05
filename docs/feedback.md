# Comentarios de la sede Yopal

## Solicitud y referencia

El 5 de noviembre de 2026 el usuario pidió agregar un formulario de comentarios debajo de la sección del mapa de Yopal en el home y dirigir el mensaje al WhatsApp de esa sede. La composición procede de su captura `C:/Users/User/AppData/Local/Temp/codex-clipboard-958440af-7e3f-4e5c-be79-16a3388bbe34.png`: fondo negro cálido, titular blanco/oro, texto a la izquierda y formulario con borde fino a la derecha. La captura es evidencia de diseño, no un asset publicado.

## Función y límites

- `src/app/(public)/page.tsx` monta `Feedback` inmediatamente después de `Location`, con el ancla `#comentarios`.
- `src/features/brand/feedback.tsx` mantiene el contenido de la sección en servidor y pasa únicamente el teléfono de Yopal al formulario cliente `feedback-form.tsx`.
- El nombre es obligatorio y admite hasta 80 unidades UTF-16; el comentario es obligatorio y admite hasta 500. La cuenta usa la misma longitud de JavaScript que `maxLength`: algunos emojis ocupan dos unidades. Las entradas compuestas sólo por espacios no son válidas. Los errores se asocian a sus campos y el foco pasa al primer campo inválido.
- `src/features/brand/feedback-message.ts` valida los datos y construye una URL `https://wa.me/<telefono>?text=...` mediante `URLSearchParams`. El nombre se recorta y sus espacios consecutivos se normalizan; el comentario se recorta en sus extremos y conserva sus saltos de línea. El mensaje incluye la sede, el nombre y el comentario.
- La acción abre WhatsApp para que el visitante revise y envíe el mensaje. La web no envía el mensaje automáticamente, no afirma que haya sido enviado y no guarda comentarios en una API o base de datos.

## Contacto y configuración

Se reutiliza `catalogSettings.whatsAppPhones.yopal` de `src/config/catalog.ts`, resuelto por `src/config/catalog-phones.ts`. El contacto predeterminado vigente, confirmado por el usuario, es `573112567920` (+57 311 256 7920).

`WHATSAPP_YOPAL_NUMBER` permite reemplazar ese contacto. Si falta o está vacía, se conserva el predeterminado de Yopal; si contiene un valor no vacío e inválido, el teléfono queda deshabilitado y el formulario informa que los comentarios por WhatsApp no están disponibles. No se usa como alternativa el contacto de Maní ni la variable retirada `WHATSAPP_NUMBER`. El constructor del enlace acepta únicamente un teléfono normalizado y rechaza datos o teléfono inválidos.

## Cómo verificar sin enviar un mensaje real

1. Abrir el home local en `/#comentarios`. Confirmar que el formulario aparece debajo del mapa, mantiene dos columnas en escritorio y una por debajo de 960px, sin desbordamiento horizontal.
2. Recorrer los campos y el botón con teclado. Enviar el formulario vacío y después con espacios; comprobar los errores asociados y el foco en el primer campo inválido.
3. Completar nombre y comentario de prueba. Comprobar el contador, los límites, acentos, símbolos y saltos de línea. Verificar también el conteo UTF-16 con un emoji.
4. Revisar la URL devuelta por `buildFeedbackWhatsAppUrl` o interceptar la navegación en la prueba: el destino debe ser `wa.me/573112567920` con el nombre y comentario codificados una sola vez. No pulsar «Enviar» en WhatsApp.
5. En una configuración local de prueba, revisar un reemplazo válido de Yopal y otro inválido. El inválido debe deshabilitar la acción y no producir un enlace a Maní o al contacto global. Restaurar la configuración después de la comprobación.

Estos pasos describen la verificación esperada; no constituyen un registro de pruebas ejecutadas ni de despliegue.

# Catálogo digital y pedidos por WhatsApp

`/catalogo` adapta a DomoBurgers el recorrido autorizado el 8 de octubre de 2026: explorar productos, ver su detalle, agregar unidades al carrito y preparar el pedido para WhatsApp. La portada conserva su identidad y enlaza al catálogo desde el menú, los botones de pedido y cada producto.

## Productos y precios

La fuente compartida de la portada y el catálogo es `src/features/catalog/catalog-data.ts`. Cada producto tiene un `id` único y estable, categoría, nombre, etiqueta, descripción, precio entero en COP, imagen local y texto alternativo. La portada muestra los primeros tres productos. Al añadir una categoría, actualizar también `CatalogCategory` y `catalogCategories`.

Las tres hamburguesas actuales conservan la carta de ejemplo: nombres, recetas, precios e imágenes no constituyen una oferta oficial confirmada. `catalogIsProvisional` permanece en `true`; el catálogo y el mensaje de WhatsApp lo advierten. Cambiarlo a `false` únicamente después de sustituir o confirmar la información con el negocio. No inventar productos, precios, direcciones, horarios ni teléfonos.

## Activar WhatsApp

El WhatsApp comercial +57 3213390551 fue confirmado por el usuario el 8 de octubre de 2026 y funciona como contacto común predeterminado para ambas sedes. Para sustituirlo, configurar los números confirmados del negocio en `.env.local` para desarrollo y en las variables del proyecto Vercel para producción:

| Variable                | Uso                                                          |
| ----------------------- | ------------------------------------------------------------ |
| `WHATSAPP_NUMBER`       | Sustituye el contacto común predeterminado para ambas sedes. |
| `WHATSAPP_MANI_NUMBER`  | Número de Maní; sustituye al común en esa sede.              |
| `WHATSAPP_YOPAL_NUMBER` | Número de Yopal; sustituye al común en esa sede.             |

Usar el formato internacional con código de país y sólo dígitos, sin `+`, espacios ni separadores. Una variable de sede vacía utiliza el número común; si `WHATSAPP_NUMBER` también está vacía se utiliza `573213390551`. Una variable de sede no vacía pero inválida deja esa sede sin envío habilitado, sin redirigir a otro número. Lo mismo ocurre con un número común inválido para las sedes sin un número propio válido. El cliente puede seguir armando su carrito, pero no se crea un enlace a un destinatario desconocido.

`src/config/catalog.ts` lee estas variables en el servidor y entrega sólo los números de contacto normalizados al componente interactivo. Esos teléfonos comerciales son visibles para el navegador y en el enlace de WhatsApp; no son secretos. No se requiere prefijo `NEXT_PUBLIC_`. Reiniciar el servidor local después de cambiar `.env.local` y realizar un nuevo despliegue después de actualizar las variables de producción.

## Carrito y entrega

El subtotal se calcula a partir del catálogo vigente. Sólo se conservan identificadores y cantidades del carrito en el navegador; no se confía en precios restaurados. El nombre, dirección y observaciones se utilizan para redactar el mensaje y no se registran en una API de pedidos. El cliente elige Maní o Yopal y domicilio o recogida; la dirección es obligatoria para domicilio.

WhatsApp recibe el texto preparado con productos, cantidades, precios, subtotal, sede y datos de entrega. El cliente revisa y envía ese mensaje desde WhatsApp. Abrir el enlace no registra ni confirma un pedido. El negocio confirma disponibilidad, total, costo del domicilio cuando corresponda y tiempo de entrega; el sitio no inventa esos valores ni cobra pagos.

## Verificación

Ejecutar `npm run check` para lint, tipos, pruebas y build. Las pruebas del catálogo comprueban cantidades, restauración de datos, cálculos, validación y composición del enlace de WhatsApp.

Revisar también el recorrido en escritorio y móvil:

1. Abrir `/catalogo` desde la portada y desde una flecha de producto; esta última debe abrir el detalle correspondiente.
2. Buscar y filtrar productos, abrir el detalle y agregar varias unidades. Cambiar cantidades y eliminar líneas desde el carrito; comprobar el subtotal.
3. Recargar para comprobar el carrito y verificar que un carrito vacío no permite preparar el envío.
4. Completar nombre, sede y entrega. Para domicilio, comprobar la validación de dirección; para recogida, comprobar que no se exige.
5. Sin variables configuradas, comprobar que el destinatario es el número confirmado `573213390551`. Con una variable no vacía pero inválida, comprobar el aviso y la ausencia de envío para esa sede. Revisar el destinatario y el mensaje con números válidos, incluidos tildes, cantidades, subtotal y aviso provisional. No enviar un pedido real durante la verificación.
6. Recorrer los controles con teclado, cerrar los diálogos con Escape y comprobar retorno de foco, legibilidad y ausencia de desbordamiento en pantalla estrecha.

Estas instrucciones describen cómo verificar la función; no afirman un despliegue ni el envío de un pedido real.

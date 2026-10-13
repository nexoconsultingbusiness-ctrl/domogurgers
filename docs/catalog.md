# Catálogo digital y pedidos por WhatsApp

`/catalogo` adapta a DomoBurgers el recorrido autorizado el 8 de octubre de 2026: explorar productos, ver su detalle, agregar unidades al carrito y preparar el pedido para WhatsApp. La portada conserva su identidad y enlaza al catálogo desde el menú, los botones de pedido y cada producto.

## Productos y precios

La fuente compartida de la portada y el catálogo es `src/features/catalog/menu-data.json`, transcrita de las ocho fotografías facilitadas el 12 de octubre de 2026. Incluye 58 opciones en ocho categorías: 17 hamburguesas, 3 perros/choripán, 2 picadas, 4 entradas, 2 opciones infantiles, 13 adicionales, 13 bebidas y 4 micheladas. `catalog-data.ts` deriva los productos, descripciones, filtros y precios a partir de esa única fuente. La portada muestra Tradicional, Bacon Cheese y Pollo Crispy mediante una selección explícita por ID.

Cada producto tiene un `id` estable, categoría, nombre, precio entero en COP, ingredientes cuando aparecen en la carta, referencias a sus fotos fuente y un campo `image` con su ruta pública o `null`. Las 17 hamburguesas utilizan las fotografías aportadas por el usuario en `public/images/products/<id>.webp`, por ejemplo `/images/products/tradicional.webp`. `ProductImage` comparte esas imágenes entre la portada, catálogo, detalle y carrito. Las otras 41 opciones conservan `image: null` y muestran el espacio reservado donde corresponde. Para incorporar una foto adicional, guardarla en `public/images/products/` y asignar su ruta pública. La carta ya contiene datos del negocio y `catalogIsProvisional` está en `false`. Las recetas no detalladas permanecen vacías. El registro de transcripción y sus pendientes está en [menu-digitization.md](menu-digitization.md).

El hero de `/catalogo` utiliza `Portada.png`, suministrada por el usuario y preparada como `/images/catalog-cover.webp`. El hero de la página principal conserva su fotografía existente; sus tres productos destacados sí usan las fotos compartidas del catálogo. `Carnalita.png` es la foto principal de Carnalita y `carnalita (1).png` se conserva como alternativa. La fotografía `Porteña.png` queda conservada, pendiente de precio e ingredientes para incorporar ese producto; no se deducen esos datos de la imagen.

El campo opcional `imagePreview` permite asignar una vista de presentación a las cinco fotos verticales con más espacio alrededor del producto. `ProductImage` prefiere esa vista cuando está disponible y conserva la ruta de la foto completa en `image`. Todas las tarjetas de hamburguesas, incluidas esas cinco vistas, llenan el espacio 4:3 con `cover` para evitar barras; `imagePosition` permite ajustar el punto de encuadre de forma opcional. Los detalles y las miniaturas conservan `contain`. La asignación de archivos y los criterios de calidad se documentan en [product-photos.md](product-photos.md).

## Combo opcional

El usuario confirmó el 12 de octubre de 2026 que el combo se puede agregar a cualquier producto. Cuesta $10.500 adicionales por unidad e incluye papas y una bebida entre Coca-Cola, Ginger, soda y cerveza nacional. Se elige en el detalle mediante una casilla y un selector de bebida. La carta no especifica tamaños ni peso de las papas; no se anuncian cantidades inventadas.

El carrito distingue producto solo y producto con cada bebida. Dos unidades con la misma bebida se agrupan; opciones diferentes permanecen separadas. El precio unitario y el subtotal incluyen el recargo, y WhatsApp conserva la elección. Los adicionales mantienen su categoría y se agregan como líneas independientes.

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

El subtotal se calcula a partir del catálogo vigente. Sólo se conservan identificadores, cantidades y la bebida del combo en el navegador; no se confía en precios restaurados. Las líneas con productos antiguos de demostración o bebidas inválidas se descartan. El nombre, dirección y observaciones se utilizan para redactar el mensaje y no se registran en una API de pedidos. El cliente elige Maní o Yopal y domicilio o recogida; la dirección es obligatoria para domicilio.

WhatsApp recibe el texto preparado con productos, cantidades, precios, subtotal, sede y datos de entrega. El cliente revisa y envía ese mensaje desde WhatsApp. Abrir el enlace no registra ni confirma un pedido. El negocio confirma disponibilidad, total, costo del domicilio cuando corresponda y tiempo de entrega; el sitio no inventa esos valores ni cobra pagos.

## Verificación

Ejecutar `npm run check` para lint, tipos, pruebas y build. Las pruebas del catálogo comprueban cantidades, restauración de datos, cálculos, validación y composición del enlace de WhatsApp.

Revisar también el recorrido en escritorio y móvil:

1. Abrir `/catalogo` desde la portada y desde una flecha de producto; esta última debe abrir el detalle correspondiente.
2. Buscar y filtrar productos, abrir el detalle y agregar varias unidades. Cambiar cantidades y eliminar líneas desde el carrito; comprobar el subtotal.
3. Recargar para comprobar el carrito y verificar que un carrito vacío no permite preparar el envío.
4. Completar nombre, sede y entrega. Para domicilio, comprobar la validación de dirección; para recogida, comprobar que no se exige.
5. Sin variables configuradas, comprobar que el destinatario es el número confirmado `573213390551`. Con una variable no vacía pero inválida, comprobar el aviso y la ausencia de envío para esa sede. Revisar el destinatario y el mensaje con números válidos, incluidos tildes, cantidades, combos, bebida y subtotal. No enviar un pedido real durante la verificación.
6. Recorrer los controles con teclado, cerrar los diálogos con Escape y comprobar retorno de foco, legibilidad y ausencia de desbordamiento en pantalla estrecha.

Estas instrucciones describen cómo verificar la función; no afirman un despliegue ni el envío de un pedido real.

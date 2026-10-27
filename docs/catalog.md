# Catálogo digital y pedidos por WhatsApp

`/catalogo` adapta a DomoBurgers el recorrido autorizado el 8 de octubre de 2026: explorar productos, ver su detalle, agregar unidades al carrito y preparar el pedido para WhatsApp. La portada conserva su identidad y enlaza al catálogo desde el menú, los botones de pedido y cada producto.

## Productos y precios

La fuente compartida de la portada y el catálogo es `src/features/catalog/menu-data.json`, transcrita de las ocho fotografías facilitadas el 12 de octubre de 2026. Incluye 58 opciones en ocho categorías: 17 hamburguesas, 3 perros/choripán, 2 picadas, 4 entradas, 2 opciones infantiles, 13 adicionales, 13 bebidas y 4 micheladas. `catalog-data.ts` deriva los productos, descripciones, filtros y precios a partir de esa única fuente. La portada muestra Tradicional, Bacon Cheese y Pollo Crispy mediante una selección explícita por ID.

Cada producto tiene un `id` estable, categoría, nombre, precio entero en COP, ingredientes cuando aparecen en la carta, referencias a sus fotos fuente y un campo `image` con su ruta pública o `null`. Tras la entrega del 27 de octubre, 32 de los 58 productos utilizan fotografías aportadas por el usuario en `public/images/products/`: las 17 hamburguesas, los tres perros/choripán, las dos picadas, las cuatro entradas, las dos opciones infantiles y las cuatro micheladas. `ProductImage` comparte esas imágenes entre la portada, catálogo, detalle y carrito. Adicionales y bebidas reúnen las 26 opciones sin imágenes ni espacio reservado para ellas. Para incorporar una foto adicional, guardarla en `public/images/products/` y asignar su ruta pública. La carta ya contiene datos del negocio y `catalogIsProvisional` está en `false`. Las recetas no detalladas permanecen vacías. El registro de transcripción y sus pendientes está en [menu-digitization.md](menu-digitization.md).

El hero de `/catalogo` utiliza `Portada.png`, suministrada por el usuario y preparada como `/images/catalog-cover.webp`. El hero de la página principal conserva su fotografía existente; sus tres productos destacados sí usan las fotos compartidas del catálogo. `Carnalita.png` es la foto principal de Carnalita y `carnalita (1).png` se conserva como alternativa. La fotografía `Porteña.png` queda conservada, pendiente de precio e ingredientes para incorporar ese producto. `Hamburguesa Lechuga.png` también queda preparada en `/images/products/pending/hamburguesa-lechuga.webp`, pendiente de identificación y datos comerciales; no se deducen esos datos de las imágenes.

El campo opcional `imagePreview` permite asignar una vista de presentación a las fotos verticales con más espacio alrededor del producto. `ProductImage` prefiere esa vista cuando está disponible y conserva la ruta de la foto completa en `image`. Las tarjetas de comida, incluidas las vistas de presentación, llenan el espacio 4:3 con `cover` para evitar barras; las micheladas utilizan un marco 3:4 para mostrar vaso y botella. `imagePosition` permite ajustar el encuadre: `center 55%` en las cuatro micheladas y `center 62%` en Aros de cebolla. Los detalles y las miniaturas conservan `contain`. La asignación de archivos y los criterios de calidad se documentan en [product-photos.md](product-photos.md).

El 16 de octubre se incorporaron siete fotografías más, para un total de 24 productos con foto. Las tomas adicionales de Don Perro y Don Perro Premium se conservan como alternativas. El usuario confirmó que la foto de Domo Gringas con Nuggets corresponde a Pollo infantil y la de Domo Gringas con Carne a Domo Gringas. Se asignaron a esos productos sin alterar nombres, ingredientes ni precios.

El 27 de octubre se asignaron diez fotografías más: ocho productos recibieron su primera foto y dos actualizaron la anterior. Domo Picada utiliza `/images/products/domo-picada-20261027.webp`; Pollo infantil utiliza `/images/products/infantil-pollo-menu.webp` sin el `imagePreview` anterior. Los archivos previos se conservan. La entrega incluye once WebP, contando Hamburguesa Lechuga pendiente, con calidad 95 y dimensiones originales sin recortes ni redimensionado: 4.725.702 bytes frente a los 27.147.088 bytes de los PNG. El registro local `artifacts/catalog-photos-oct27/asset-manifest.json` contiene asignaciones, dimensiones, tamaños y hashes SHA-256. La imagen de `michelada-cerveza` muestra una botella Coronita; el nombre existente «Michelada de cerveza nacional» y el precio se conservan, pendiente confirmar la marca si se quiere cambiar el texto comercial.

Cada categoría declara `showImages`. En adicionales y bebidas es `false`: no se monta la imagen ni su contenedor en la tarjeta, el detalle o el carrito. Sus tarjetas compactas muestran nombre, precio y acciones a todo el ancho; la cantidad agregada se indica como texto. Micheladas tiene `showImages: true` y `compact: false` y muestra sus cuatro fotografías. Las demás categorías también muestran sus imágenes. La foto de Aros de cebolla se asigna a la entrada; el adicional del mismo nombre conserva la presentación compacta sin imagen.

## Combo opcional

El usuario confirmó el 12 de octubre de 2026 que el combo se puede agregar a cualquier producto. Cuesta $10.500 adicionales por unidad e incluye papas y una bebida entre Coca-Cola, Ginger, soda y cerveza nacional. Se elige en el detalle mediante una casilla y un selector de bebida. La carta no especifica tamaños ni peso de las papas; no se anuncian cantidades inventadas.

El carrito distingue producto solo y producto con cada bebida. Dos unidades con la misma bebida se agrupan; opciones diferentes permanecen separadas. El precio unitario y el subtotal incluyen el recargo, y WhatsApp conserva la elección. Los adicionales mantienen su categoría y se agregan como líneas independientes.

## Activar WhatsApp

El WhatsApp comercial +57 3213390551 fue confirmado por el usuario el 8 de octubre de 2026 y se utilizó inicialmente como contacto común de ambas sedes. El 27 de octubre confirmó los números propios de cada sede: Maní +57 3213390551 y Yopal +57 3112567920. Estos son los destinatarios predeterminados vigentes. Para sustituir el número de una sede, configurar su variable opcional en `.env.local` para desarrollo y en las variables del proyecto Vercel para producción:

| Variable                | Uso                                                          |
| ----------------------- | ------------------------------------------------------------ |
| `WHATSAPP_MANI_NUMBER`  | Sustituye sólo el número de Maní; predeterminado `573213390551`. |
| `WHATSAPP_YOPAL_NUMBER` | Sustituye sólo el número de Yopal; predeterminado `573112567920`. |

Usar el formato internacional con código de país y sólo dígitos, sin `+`, espacios ni separadores. Una variable de sede vacía utiliza el número predeterminado propio de esa sede. Una variable no vacía pero inválida devuelve `null` y deja el envío deshabilitado únicamente para esa sede, sin redirigir a otro número. El cliente puede seguir armando su carrito, pero no se crea un enlace a un destinatario desconocido.

`WHATSAPP_NUMBER` deja de utilizarse y se ignora: una configuración global antigua no debe reemplazar los dos contactos por el mismo destinatario. Retirar esa variable de los entornos anteriores y usar únicamente los reemplazos por sede cuando sean necesarios.

`src/config/catalog.ts` lee las variables por sede en el servidor y usa el resolver puro de `src/config/catalog-phones.ts` para entregar sólo los números de contacto normalizados al componente interactivo. Esos teléfonos comerciales son visibles para el navegador y en el enlace de WhatsApp; no son secretos. No se requiere prefijo `NEXT_PUBLIC_`. Reiniciar el servidor local después de cambiar `.env.local` y realizar un nuevo despliegue después de actualizar las variables de producción.

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
5. Sin variables configuradas, comprobar los destinatarios confirmados: `573213390551` para Maní y `573112567920` para Yopal. Repetir con variables vacías y con un `WHATSAPP_NUMBER` antiguo para confirmar que se conservan los valores propios de cada sede. Con una variable de sede no vacía pero inválida, comprobar el aviso y la ausencia de envío sólo para esa sede. Revisar el destinatario y el mensaje con reemplazos válidos, incluidos tildes, cantidades, combos, bebida y subtotal. No enviar un pedido real durante la verificación.
6. Recorrer los controles con teclado, cerrar los diálogos con Escape y comprobar retorno de foco, legibilidad y ausencia de desbordamiento en pantalla estrecha.

Estas instrucciones describen cómo verificar la función; no afirman un despliegue ni el envío de un pedido real.

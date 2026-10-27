---
version: 1
slug: "src-app-public-catalogo-page-tsx"
primary_target: "src/app/(public)/catalogo/page.tsx"
related_targets:
  [
    "src/features/catalog/catalog.tsx",
    "src/features/catalog/catalog.module.css",
  ]
---

# Catálogo DomoBurgers

Modo: Operate. Ampliación funcional solicitada el 8 de octubre de 2026 a partir de https://www.nexoconsulting.business/catalogos/don-arepas. Hereda la identidad de la portada: fotografía gastronómica, SVG originales, negro cálido, oro, Arial y controles rectangulares. No sustituye el diseño existente.

El visitante busca por nombre o ingrediente y explora ocho categorías con 58 opciones transcritas de las ocho fotografías del menú recibidas el 12 de octubre de 2026. Abre un detalle con ingredientes y selecciona cantidades. El combo opcional de $10.500 añade papas y una bebida a elección a cualquier producto, según confirmó el usuario. Un carrito persistente distingue productos solos y combos por bebida, permite sumar, restar y eliminar; muestra subtotal y prepara un pedido por WhatsApp con nombre, sede, entrega y notas. El domicilio queda por confirmar. No se almacena información personal del comprador.

WhatsApp común confirmado: +57 3213390551. La carta utiliza los productos y precios suministrados y ya no se envía como pedido de prueba. Disponibilidad y entrega se confirman con la sede. El espacio sin nombre/precio de la foto 1 no se presenta como producto.

Composición: cabecera gastronómica compacta, menú con búsqueda y filtros, secciones con nombre y cantidad por categoría, tres columnas en escritorio, dos en tablet y una en móvil. Adicionales y bebidas usan tarjetas compactas sin imagen: nombre, precio y acciones aprovechan todo el ancho. Tampoco reservan espacio de imagen en el detalle ni el carrito. Las tarjetas de comida llenan un marco 4:3 con `cover`; las cuatro micheladas muestran sus fotos en un marco 3:4 con `cover`. El detalle y las miniaturas con fotografía conservan `contain`. Carrito flotante con subtotal; detalle con ingredientes, casilla de combo y bebida en diálogo nativo, carrito lateral en escritorio/a pantalla completa en móvil. Foco y cierre Escape nativos, controles de 44 px como mínimo y movimiento reducido.

Tras la entrega del 27 de octubre, 32 productos usan las fotos aportadas por el usuario en `/images/products/`, compartidas entre portada, catálogo, detalle y carrito cuando corresponde. Todas las opciones de las seis categorías con imágenes tienen fotografía y no quedan marcadores «Foto próximamente» visibles. Los 26 adicionales y bebidas se presentan sin área de imagen en tarjetas, detalle y carrito. La cabecera del catálogo utiliza `Portada.png`, preparada como `/images/catalog-cover.webp`. `Carnalita.png` es la foto principal y se conserva la segunda toma como alternativa; `Porteña.png` queda conservada pendiente de precio e ingredientes. `Hamburguesa Lechuga.png` queda preparada en `/images/products/pending/hamburguesa-lechuga.webp`, pendiente de identificación y datos comerciales, sin publicar datos supuestos. No se requiere una nueva propuesta visual ni generación de imágenes. Las medidas específicas de formularios se mantienen locales, con cuerpo de 16 px para evitar zoom del teclado móvil.

El 16 de octubre de 2026 se incorporaron las fotos de Don Perro, Don Perro Premium, Choripán, Domo Picada, Domo Gringas + salchicha, Domo Gringas y Pollo infantil: 24 productos con foto. El usuario confirmó la foto de Nuggets para Pollo infantil y la de Carne para Domo Gringas; sus datos comerciales se conservan. Las tarjetas mantienen el encuadre que llena todo el recuadro.

El 27 de octubre de 2026 se asignaron diez fotografías: ocho incorporaciones y las actualizaciones de Domo Picada y Pollo infantil, conservando sus archivos anteriores y sus datos comerciales. Micheladas activa fotografías y deja la presentación compacta. Los cuatro vasos y botellas usan `imagePosition: "center 55%"`; Aros de cebolla usa `center 62%` en su marco 4:3. Los encuadres llenan el espacio destinado a cada foto sin deformación.

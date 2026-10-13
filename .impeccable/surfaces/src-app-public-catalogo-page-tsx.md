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

Composición: cabecera gastronómica compacta, menú con búsqueda y filtros, secciones con nombre y cantidad por categoría, tres columnas en escritorio, dos en tablet y una en móvil. Adicionales, bebidas y micheladas usan tarjetas compactas con un espacio de foto pequeño. Carrito flotante con subtotal; detalle con ingredientes, casilla de combo y bebida en diálogo nativo, carrito lateral en escritorio/a pantalla completa en móvil. Foco y cierre Escape nativos, controles de 44 px como mínimo y movimiento reducido.

Las 17 hamburguesas usan las fotos aportadas por el usuario en `/images/products/<id>.webp`, compartidas entre portada, catálogo, detalle y carrito. Las otras 41 opciones conservan «Foto próximamente» en los espacios que muestran imágenes. La cabecera del catálogo utiliza `Portada.png`, preparada como `/images/catalog-cover.webp`. `Carnalita.png` es la foto principal y se conserva la segunda toma como alternativa; `Porteña.png` queda conservada pendiente de precio e ingredientes, sin publicar datos supuestos. No se requiere una nueva propuesta visual ni generación de imágenes. Las medidas específicas de formularios se mantienen locales, con cuerpo de 16 px para evitar zoom del teclado móvil.

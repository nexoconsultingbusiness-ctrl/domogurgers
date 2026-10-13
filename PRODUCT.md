# DomoBurgers

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js estable, App Router, React, TypeScript, Tailwind CSS y runtime Node.js. Despliegue requerido por el usuario: GitHub → Vercel. La primera entrega es la base técnica con una presentación de la marca, opción confirmada por el usuario.

## Users

Personas que buscan hamburguesas y una experiencia gastronómica cercana en Casanare: jóvenes, familias, parejas y amantes de la gastronomía, según el manual proporcionado.

## Product Purpose

Presentar DomoBurgers y permitir explorar su catálogo digital, elegir productos, armar un carrito y preparar el pedido para enviarlo por WhatsApp a la sede seleccionada.

## Capabilities and Constraints

La base incluye portada informativa, layout, API health, estructura API v1, servicios, validación, SEO, documentación y verificación de producción. El usuario autorizó información de relleno para la maqueta. El 5 de octubre de 2026 solicitó reproducir el hero y la carta de https://burger-bites-bloom.lovable.app/: tres artículos con fotografías, nombres, ingredientes y precios de esa referencia en COP, identificados como provisionales.

El 8 de octubre de 2026 el usuario autorizó un catálogo digital como https://www.nexoconsulting.business/catalogos/don-arepas, con selección de productos, carrito y envío del pedido por WhatsApp. Esta autorización sustituye la restricción anterior de no implementar catálogo ni pedidos. `/catalogo` concentra ese recorrido; «Pedir ahora», los enlaces de menú y las flechas de producto lo abren. El 12 de octubre entregó ocho fotos del menú para sustituir los ejemplos por nombres, ingredientes y precios reales. Después aportó fotos de las 17 hamburguesas y `Portada.png` para el hero del catálogo. La carta transcrita contiene 58 opciones en ocho categorías; las otras 41 opciones conservan espacio para sus fotos donde corresponde. Confirmó el combo de $10.500 adicionales como opción para cualquier producto; el carrito conserva la bebida elegida y calcula el recargo por unidad. Se configura el WhatsApp confirmado por sede sin inventar teléfonos. Preparar un mensaje no confirma disponibilidad, despacho, pago ni aceptación del pedido. El alcance no incluye pagos en línea, autenticación ni registro de pedidos en servidor. PostgreSQL/Prisma se añadirán cuando exista una necesidad real de datos.

## Brand Commitments

Conservar los logos originales y la identidad de «Branding actualizado Fin (1).pdf», idéntico al manual anterior por SHA-256. El usuario llama al proyecto DomoBurgers; el logo original escribe D’omo Burgers y no debe redibujarse. Tono cercano, profesional y respetuoso. Rediseño autorizado el 2 de octubre de 2026: estilo moderno y gastronómico, medios del hero suministrados, animaciones y profundidad CSS 3D sin sacrificar accesibilidad ni rendimiento. La ampliación del hero usa el video de cierre y el nuevo fondo aportados: el scroll cierra la hamburguesa antes de continuar la página, con texto separado del producto en escritorio y superposición leve permitida en móvil.

La dirección del 5 de octubre reemplaza ese hero animado por la composición fotográfica estática de Lovable: hamburguesa cerrada a pantalla completa, titulares blancos y oro, botones rectangulares y tres tarjetas con bordes finos. La referencia y las dos capturas suministradas son la autoridad para estas regiones. Se reutiliza el JPG cerrado del usuario y las fotos de la carta de la URL autorizada. El resto del contenido de marca e historia conserva sus hechos confirmados.

## Evidence on Hand

Manual de 52 páginas facilitado por el usuario. Historia: fundación el 20 de diciembre de 2020 en Maní, Casanare; segunda sede en Yopal el 15 de febrero de 2025. Se aportó una captura como referencia de composición para la carta y se autorizó información de relleno. Esos ejemplos fueron sustituidos por las ocho fotografías de la carta recibidas el 12 de octubre de 2026; la fuente editable es `src/features/catalog/menu-data.json` y el registro completo está en `docs/menu-digitization.md`. Las recetas no detalladas en la carta se mantienen vacías. El espacio con signo de interrogación no permite identificar otro producto. Las 17 hamburguesas cuentan con fotos aportadas por el usuario, compartidas con los tres destacados de la portada; `Portada.png` se asigna al hero del catálogo y el hero principal conserva su imagen existente. `Carnalita.png` es la principal y `carnalita (1).png` se conserva como alternativa. `Porteña.png` queda conservada, pendiente de precio e ingredientes; no se incorpora un producto con datos supuestos. El 8 de octubre de 2026 el usuario confirmó el WhatsApp comercial +57 3213390551, utilizado como contacto común del catálogo para ambas sedes hasta configurar números específicos. No se aportaron direcciones ni horarios; no inventarlos. Las imágenes generadas se identificarán como referencia visual.

## Product Principles

- La identidad existente es la autoridad visual.
- Comenzar sencillo, con responsabilidades separadas.
- Verificar build, tipos, lint y comportamiento de API.
- Mantener datos sensibles y lógica crítica en servidor.

## Accessibility & Inclusion

Diseño responsive, HTML semántico, navegación por teclado, foco visible, texto alternativo y contraste suficiente.

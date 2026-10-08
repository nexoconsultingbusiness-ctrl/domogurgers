---
version: 1
slug: "src-app-public-page-tsx"
primary_target: "src/app/(public)/page.tsx"
related_targets:
  [
    "src/app/globals.css",
    "src/features/brand/menu-section.tsx",
    "src/features/brand/hero.tsx",
    "src/components/layout/header.tsx",
  ]
---

# Portada DomoBurgers

Modo: Persuade. Rediseño del hero, encabezado y carta solicitado el 5 de octubre de 2026. El usuario fija la dirección y la composición mediante https://burger-bites-bloom.lovable.app/ y las dos capturas adjuntas; no se necesitan propuestas alternativas ni aprobación adicional de una composición ya elegida.

El visitante reconoce una marca gastronómica y explora la carta de ejemplo. La ampliación autorizada el 8 de octubre de 2026 conecta «Descubre el menú», «Menú», «Ver menú», «Pedir ahora» y Carta del pie con `/catalogo`, donde se seleccionan productos, se arma el carrito y se prepara el pedido por WhatsApp. Las flechas de producto abren su detalle mediante `/catalogo?producto=<id>` y se añade «Ver catálogo y armar pedido» bajo la retícula. «Encuéntranos» y «Sedes» conservan el destino `#sedes` en el pie de página, con las ciudades confirmadas de Maní y Yopal. Esta extensión cambia los destinos y el recorrido; conserva la composición fotográfica de referencia y la condición provisional de la carta.

Comp aprobado por instrucción directa: C:/Users/User/AppData/Local/Temp/codex-clipboard-7d32821b-a820-4857-aad9-36eceab61f3d.png (hero), C:/Users/User/AppData/Local/Temp/codex-clipboard-7128b830-030c-4da0-b643-f6947e47e3a0.png (carta). Estos archivos son evidencia de composición, no assets de la landing.

Inventario:

- Fotografía de hero a pantalla completa: JPG cerrado del usuario optimizado a burger-reference-hero.webp; encuadre 58% centro y overlay oscuro de la referencia.
- Logo: SVG original blanco, sin redibujo.
- Tipografía: titulares de 96px y peso 900 en escritorio, de 72px en tablet y 48px en móvil; carta 60/36px y nombres 24px. La referencia declara Montserrat, pero no carga ningún FontFace y se renderiza con Arial; estas regiones usan Arial explícitamente para reproducir las capturas. El resto conserva Montserrat local de marca.
- Controles: primario amarillo y secundario de contorno, esquinas rectas, flechas SVG y pin; foco visible y targets de 44px.
- Carta: tres fotos exactas del sitio, etiquetas amarillas, precios amarillos, descripciones y estrella, retícula con borde fino y separadores de 1px. Tres columnas desde 768px y una columna por debajo.
- Datos: D'omo Doble $32.900, Bacon Royal $29.900, Crispy Chicken $27.900; ejemplos de la referencia, con aviso visible de carta provisional debajo de la retícula.

La secuencia actual empieza hero → carta; la franja anterior deja de interponerse entre ambos. Se conservan experiencia, detalle y cierre existentes. El módulo de historia y sus filas de origen se retiraron por solicitud del usuario. El hero ya no monta HeroScroll ni descarga frames/video; aquellos assets y el módulo quedan archivados como material previo. Scroll nativo, contenido en servidor, reveals opcionales y zoom leve de fotos; movimiento reducido y ausencia de JavaScript mantienen toda la información.

WhatsApp comercial confirmado el 8 de octubre de 2026: +57 3213390551. Pendiente de negocio: confirmar carta, precios, fotos reales, direcciones y horarios. El mensaje de la carta provisional se identifica como pedido de prueba; disponibilidad, entrega y pago se confirman con la sede.

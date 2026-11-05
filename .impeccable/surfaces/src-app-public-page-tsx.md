---
version: 1
slug: "src-app-public-page-tsx"
primary_target: "src/app/(public)/page.tsx"
related_targets:
  [
    "src/app/globals.css",
    "src/features/brand/menu-section.tsx",
    "src/features/brand/hero.tsx",
    "src/features/brand/experience.tsx",
    "src/features/brand/testimonials.tsx",
    "src/features/brand/location.tsx",
    "src/features/brand/feedback.tsx",
    "src/components/layout/header.tsx",
  ]
---

# Portada DomoBurgers

Modo: Persuade. Rediseño del hero, encabezado y carta solicitado el 5 de octubre de 2026. El usuario fija la dirección y la composición mediante https://burger-bites-bloom.lovable.app/ y las dos capturas adjuntas; no se necesitan propuestas alternativas ni aprobación adicional de una composición ya elegida.

El visitante reconoce una marca gastronómica y explora la carta suministrada por el usuario. La ampliación autorizada el 8 de octubre de 2026 conecta «Ver catálogo», «Catálogo», «Pedir ahora» y Carta del pie con `/catalogo`, donde se seleccionan productos, se arma el carrito y se prepara el pedido por WhatsApp. Los botones visibles «Elegir» de cada producto abren su detalle mediante `/catalogo?producto=<id>` y se añade «Ver catálogo y armar pedido» bajo la retícula. «Encuéntranos» y «Sedes» conservan el destino `#sedes`, que ahora identifica el bloque de ubicación de Yopal con fachada y mapa. Esta extensión conserva la composición fotográfica de referencia; los datos provisionales fueron sustituidos por la carta suministrada el 12 de octubre.

Comp aprobado por instrucción directa: C:/Users/User/AppData/Local/Temp/codex-clipboard-7d32821b-a820-4857-aad9-36eceab61f3d.png (hero), C:/Users/User/AppData/Local/Temp/codex-clipboard-7128b830-030c-4da0-b643-f6947e47e3a0.png (carta). Estos archivos son evidencia de composición, no assets de la landing.

Inventario de la referencia del 5 de octubre:

- Fotografía de hero a pantalla completa: JPG cerrado del usuario optimizado a burger-reference-hero.webp; encuadre 58% centro y overlay oscuro de la referencia.
- Logo: SVG original blanco, sin redibujo.
- Tipografía: titulares de 96px y peso 900 en escritorio, de 72px en tablet y 48px en móvil; carta 60/36px y nombres 24px. La referencia declara Montserrat, pero no carga ningún FontFace y se renderiza con Arial; estas regiones usan Arial explícitamente para reproducir las capturas. El resto conserva Montserrat local de marca.
- Controles: primario amarillo y secundario de contorno, esquinas rectas, flechas SVG y pin; foco visible y targets de 44px.
- Carta: tres fotos exactas del sitio, etiquetas amarillas, precios amarillos, descripciones y estrella, retícula con borde fino y separadores de 1px. Tres columnas desde 768px y una columna por debajo.
- Datos: D'omo Doble $32.900, Bacon Royal $29.900, Crispy Chicken $27.900; ejemplos de la referencia, con aviso visible de carta provisional debajo de la retícula.

La secuencia vigente del 5 de noviembre de 2026 es hero → carta → «Nuestra historia» (`#esencia`) → opiniones (`#opiniones`) → Yopal (`#sedes`) → formulario (`#comentarios`). Historia muestra `domos-interior.webp` (1672 × 941 px) completa junto al texto y cuatro valores compactos debajo; a partir de (900px) hacia abajo, el texto y la imagen se apilan y los valores pasan a dos columnas. Las opiniones transcriben la captura suministrada por el usuario: tres columnas en escritorio y desplazamiento horizontal nativo con scroll snap bajo (768px), región enfocable e indicación de deslizar. Yopal añade `domos-fachada.webp` (941 × 1672 px) completa junto a los datos; en móvil, el título ocupa todo el ancho y el mapa sigue debajo. Ambas fotos fueron aportadas por el usuario en esta fecha.

`FlavorScene` («Lo especial está en cada detalle») y `FinalInvitation` («Los buenos momentos tienen buen sabor») ya no se montan. El antiguo módulo `BrandStory`, `HeroScroll` y los frames/video permanecen archivados. Scroll nativo, contenido en servidor, reveals opcionales y zoom leve de fotos mantienen la lectura sin depender de animación; el formulario es interactivo en cliente.

Actualización del 12 de octubre de 2026: las ocho fotos de la carta aportadas por el usuario sustituyen los ejemplos por productos, ingredientes y precios reales. La portada conserva sus tres tarjetas, ahora con Tradicional, Bacon Cheese y Pollo Crispy y sus fotografías aportadas por el usuario, compartidas con el catálogo desde `/images/products/<id>.webp`. El hero principal conserva su fotografía existente; la nueva `Portada.png` corresponde al hero del catálogo. Los detalles del catálogo permiten añadir un combo de papas y bebida por $10.500 a cualquier producto. Esta actualización de contenido prevalece sobre las referencias a productos provisionales del inventario histórico anterior.

Registro histórico del cierre del 12 de octubre de 2026: «Los buenos momentos tienen buen sabor.» usaba la imagen suministrada `ChatGPT Image 12 sept 2026, 09_56_41 a.m.png`, optimizada como `/images/domos-compartir.webp` (1673 × 940 px), completa y sin recortes. La sección se retiró el 5 de noviembre; la imagen permanece archivada.

WhatsApp por sede confirmado el 27 de octubre de 2026: Yopal +57 3112567920 y Maní +57 3213390551. Dirección de Yopal confirmada el 5 de noviembre: Carrera 29 #16-11. Pendiente de negocio: fotos de las otras 41 opciones, precio e ingredientes de Porteña, dirección de Maní y horarios. Disponibilidad, entrega y pago se confirman con la sede.

Ampliación del 5 de noviembre de 2026: después de `#sedes`, la sección `#comentarios` reproduce la composición de `C:/Users/User/AppData/Local/Temp/codex-clipboard-958440af-7e3f-4e5c-be79-16a3388bbe34.png`, referencia explícita del usuario. Usa fondo negro cálido, titular Arial (900) blanco/oro de hasta (60px), etiqueta «Tu opinión cuenta», texto y nota con icono a la izquierda, y formulario rectangular con borde de (1px), campos oscuros y botón oro a la derecha. Se apila bajo (960px). Nombre y comentario son obligatorios; el comentario muestra contador hasta (500). El mensaje se prepara exclusivamente para el WhatsApp vigente de Yopal, +57 3112567920, y el usuario confirma su envío en WhatsApp. No hay almacenamiento de comentarios en servidor. La especificación de comportamiento y configuración se conserva en `docs/feedback.md`.

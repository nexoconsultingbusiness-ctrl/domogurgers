# Portada DomoBurgers

Modo: Persuade. Rediseño del hero, encabezado y carta solicitado el 5 de octubre de 2026. El usuario fija la dirección y la composición mediante https://burger-bites-bloom.lovable.app/ y las dos capturas adjuntas; no se necesitan propuestas alternativas ni aprobación adicional de una composición ya elegida.

El visitante reconoce una marca gastronómica y explora la carta suministrada por el usuario. «Ver catálogo» y «Pedir ahora» llevan a `/catalogo`, donde se seleccionan productos, se arma el carrito y se prepara el pedido por WhatsApp. «Elegir» abre el producto mediante `/catalogo?producto=<id>`. «Encuéntranos» y «Sedes» llevan a `#sedes`, el bloque de ubicación de Yopal con mapa.

Comp aprobado por instrucción directa: C:/Users/User/AppData/Local/Temp/codex-clipboard-7d32821b-a820-4857-aad9-36eceab61f3d.png (hero), C:/Users/User/AppData/Local/Temp/codex-clipboard-7128b830-030c-4da0-b643-f6947e47e3a0.png (carta). Estos archivos son evidencia de composición, no assets de la landing.

Inventario de la referencia del 5 de octubre:

- Fotografía de hero a pantalla completa: JPG cerrado del usuario optimizado a burger-reference-hero.webp; encuadre 58% centro y overlay oscuro de la referencia.
- Logo: SVG original blanco, sin redibujo.
- Tipografía: titulares de 96px y peso 900 en escritorio, de 72px en tablet y 48px en móvil; carta 60/36px y nombres 24px. La referencia declara Montserrat, pero no carga ningún FontFace y se renderiza con Arial; estas regiones usan Arial explícitamente para reproducir las capturas. El resto conserva Montserrat local de marca.
- Controles: primario amarillo y secundario de contorno, esquinas rectas, flechas SVG y pin; foco visible y targets de 44px.
- Carta: tres fotos exactas del sitio, etiquetas amarillas, precios amarillos, descripciones y estrella, retícula con borde fino y separadores de 1px. Tres columnas desde 768px y una columna por debajo.
- Datos: D'omo Doble $32.900, Bacon Royal $29.900, Crispy Chicken $27.900; ejemplos de la referencia, con aviso visible de carta provisional debajo de la retícula.

La secuencia vigente del 5 de noviembre de 2026 es hero → carta → «Nuestra historia» (`#esencia`) → opiniones (`#opiniones`) → Yopal (`#sedes`) → formulario (`#comentarios`). La historia muestra `domos-interior.webp` (1672 × 941 px) completa junto al texto, con cuatro valores compactos debajo; en móvil, texto e imagen se apilan y los valores pasan a dos columnas. Las tres opiniones se transcribieron de la captura del usuario y se desplazan horizontalmente de forma nativa bajo 768px. La fachada `domos-fachada.webp` (941 × 1672 px) aparece junto a los datos de Yopal; el mapa y «Cómo llegar» conservan el pin confirmado. El formulario prepara el comentario para el WhatsApp de Yopal y requiere confirmar el envío allí; no guarda comentarios en servidor.

La carta vigente destaca Tradicional, Bacon Cheese y Pollo Crispy con las fotografías suministradas por el usuario; los datos de ejemplo del inventario anterior son históricos. `FlavorScene` («Lo especial está en cada detalle») y `FinalInvitation` («Los buenos momentos tienen buen sabor») ya no se montan. `BrandStory`, `HeroScroll` y los frames/video anteriores permanecen archivados. Scroll nativo, contenido de servidor y reveals opcionales mantienen la lectura sin depender de animación; el formulario es interactivo en cliente.

Pendiente de negocio: fotos de las otras 41 opciones, precio e ingredientes de Porteña, dirección de Maní y horarios. Los contactos vigentes son Yopal +57 3112567920 y Maní +57 3213390551; disponibilidad, entrega y pago se confirman con la sede.

# Imágenes de la landing

Actualizado: 5 de octubre de 2026 (America/Bogota).

## Hero y carta de la referencia Lovable

El 5 de octubre de 2026 el usuario pidió reproducir el hero y la sección de hamburguesas de [burger-bites-bloom.lovable.app](https://burger-bites-bloom.lovable.app/), y aportó dos capturas. Se reutiliza su fotografía local de hamburguesa cerrada para el hero y se descargan las tres imágenes de carta de las URLs observadas en el DOM de la referencia. No se generaron imágenes nuevas.

- **Hero:** fuente `C:/Users/User/Downloads/Gemini_Generated_Image_amqrgwamqrgwamqr.jpg`, JPG de 2730 × 1536 px y 2,573,889 bytes. Derivado `public/images/burger-reference-hero.webp`, 2400 × 1350 px, WebP calidad 87 y 300,494 bytes. SHA-256 del original: `987e94903ca4b3cd32fc6249b876c5190dc3fe9cb593465511e324967160f8ad`; del derivado: `f847d387cd7499535d9bd4f3c0225fecd90a10b9ad002d908884a2cdcbf7cae3`.
- **Doble:** fuente [menu-doble-RNPU4jSq.jpg](https://burger-bites-bloom.lovable.app/assets/menu-doble-RNPU4jSq.jpg), JPG de 1200 × 912 px y 159,415 bytes. Derivado `public/images/menu-doble.webp`, 1200 × 912 px, WebP calidad 85 y 138,328 bytes. SHA-256 del original: `57304ab81404269bf570410df8dcf6856c01161f72c8434dcac38cac374709f9`; del derivado: `04598acaf3a56ff2908f22c134d56f04b7d2ce52ab07d819cbf602083fad0833`.
- **Bacon:** fuente [menu-bacon-DmRcKvAR.jpg](https://burger-bites-bloom.lovable.app/assets/menu-bacon-DmRcKvAR.jpg), JPG de 1200 × 912 px y 151,866 bytes. Derivado `public/images/menu-bacon.webp`, 1200 × 912 px, WebP calidad 85 y 127,014 bytes. SHA-256 del original: `e9cf93dedf0b3f67b804e60e081530940565c9ee3e630d8b0fc0e46a64cad3dd`; del derivado: `0ebd290154f23edcd1ca9eac88c132c2b3b451d968017fd3164d18ca687a9165`.
- **Pollo:** fuente [menu-pollo-BGnQVbhf.jpg](https://burger-bites-bloom.lovable.app/assets/menu-pollo-BGnQVbhf.jpg), JPG de 1200 × 912 px y 160,635 bytes. Derivado `public/images/menu-pollo.webp`, 1200 × 912 px, WebP calidad 85 y 134,998 bytes. SHA-256 del original: `a4c1458097d4af8c359bd14b4894a15a4941178e431f93f3b6b07afcee96eede`; del derivado: `ddfde1f10972d752fb313531966add8ff1993e0c7b2b4083ecca91f395d60b9e`.

Tratamiento limitado a redimensionado proporcional sin ampliación y compresión con Sharp. No se recortaron ni reconstruyeron ingredientes, fondos, iluminación o marcas. Los encuadres de la interfaz se realizan con CSS y `next/image`. Los cuatro originales exactos se conservan en `artifacts/lovable-reference/source/`, con metadatos completos en `artifacts/lovable-reference/asset-metadata.json` y `docs/asset-manifest.md`.

Las tres tarjetas reproducen una maqueta visual autorizada. Las imágenes y los nombres, ingredientes y precios asociados no confirman la carta ni la disponibilidad comercial de DomoBurgers. No se conoce el prompt de origen de las fotografías suministradas o descargadas.

## Fotografía suministrada para el hero anterior

- Fuente: `C:/Users/User/Downloads/Gemini_Generated_Image_ijnhs1ijnhs1ijnh.jpg`, adjuntada por el usuario para el rediseño. No se generó una nueva imagen durante esta actualización.
- Original: JPG de 2730 × 1536 px, 2,390,862 bytes. El original permanece en la ubicación suministrada.
- Asset servido: `public/images/burger-floating.webp`, conversión con Sharp a 2200 × 1238 px, calidad 87, 222,590 bytes.
- Tratamiento: redimensionado proporcional y compresión. Se conservó la composición; no se modificaron ni reconstruyeron ingredientes, fondo, iluminación o marcas del papel.
- Usos anteriores: carta provisional, escena de detalle y metadatos Open Graph/Twitter. Fue el fondo del hero antes de incorporar la secuencia de cierre. El archivo permanece conservado; el hero y la carta actuales utilizan los assets de la referencia Lovable. El encuadre responsive se realiza con CSS y `next/image`.
- La página la identifica como imagen conceptual de marca o composición visual de referencia. No acredita un producto de la carta.
- No se recibió el prompt de origen; no se reconstruye ni atribuye uno a esta imagen.

SHA-256 del JPG: `8e2dfba14cde5dda814b286c8ac1f56f83d384cc873840f3f33670abb1d23dd7`.

SHA-256 del WebP servido: `6e81a47463d7cc15c878a22f8a9e5833ad9ba9fe0d7ecc8153164093ca09128b`.

## Fondo y video de cierre de la entrega anterior

- Fondo: `C:/Users/User/Downloads/Gemini_Generated_Image_kqylalkqylalkqyl.jpg`, 2752 × 1536 px. Su derivado conservado es `public/images/hero-atmosphere.webp`, 2200 × 1228 px y 32,042 bytes; solo se redimensionó y comprimió.
- Video: `C:/Users/User/Downloads/download.mp4`, conservado sin cambios en `public/videos/burger-close.mp4`. Tiene fondo blanco opaco, 4.309 s de movimiento, H.264/AVC a 30 fps y audio AAC. La entrega anterior usaba derivados sin audio y tampoco descargaba el MP4.
- Derivados: 65 fotogramas WebP transparentes de 640 × 800 px en `public/images/hero-sequence/`, con primer fotograma también en `public/images/burger-close-poster.webp`. La secuencia completa pesa 2,357,730 bytes; el móvil de la entrega anterior utilizaba 33 índices pares. El póster pesa 42,738 bytes.
- Preparación: extracción del video, recorte del producto y retirada del fondo blanco neutro con bordes suavizados, seguida de una limpieza acotada de un hueco entre ingredientes. Se conserva el movimiento y la comida aportados, incluidos sus brillos interiores; no se sintetizan fotogramas ni alimentos.
- No se utilizó `image_gen` para estos assets ni se conoce el prompt de origen. Los metadatos, el método y los hashes constan en `public/images/hero-sequence/metadata.json` y `docs/asset-manifest.md`.

Estos assets y la evidencia de `artifacts/hero-video/` permanecen como archivo de la entrega del 2 de octubre. El hero actual no descarga el fondo anterior, el póster, los fotogramas ni el MP4. En la versión previa, el movimiento respondía al scroll y mantenía una alternativa estática para movimiento reducido, errores o ausencia de JavaScript. Su composición conceptual tampoco confirmaba una hamburguesa de la carta.

## Imagen conceptual de la primera entrega

- Herramienta: `image_gen` integrada, modo built-in.
- Original conservado: `public/images/burger-hero-source.png`.
- Asset servido: `public/images/burger-hero.webp`, conversión sin cambios de composición con Sharp, calidad 88.
- Se usó en la invitación final hasta el reemplazo solicitado el 12 de octubre de 2026.
- Imagen conceptual de marca, identificada en la página como referencia. No es un producto confirmado de la carta.
- Sustituir por fotografía real aprobada antes de presentar una oferta de producto.

## Imagen de la invitación final — 12 de octubre de 2026

- Fuente aportada por el usuario: `C:/Users/User/Downloads/ChatGPT Image 12 sept 2026, 09_56_41 a.m.png`, 1673 × 940 px.
- Asset servido: `public/images/domos-compartir.webp`, convertido con Sharp a WebP calidad 90, sin recorte ni cambios de composición.
- Uso autorizado: sección «Los buenos momentos tienen buen sabor.». Se conserva la proporción original en móvil y escritorio, y el aviso de imagen conceptual de marca.

## Prompt de la primera entrega (imagen archivada)

Use case: ads-marketing. Asset type: photographic hero asset for the DomoBurgers restaurant website; not a website mockup. Create a single ultra-realistic gourmet hamburger product photograph, wide landscape 1536x1024. One appetizing substantial burger: golden lightly glossy brioche bun, two beautifully seared beef patties, melted cheddar, a few pickles and natural sauce, careful believable food styling. The entire burger and its cast shadow fully within frame, occupying around 75% of image width, centered, seen at almost eye level with slight view from above. It rests on a matte charcoal black tabletop. Seamless completely black #000000 studio background across top and sides, black background smoothly blends into the black tabletop. Dramatic soft warm side lighting reveals the real food texture without overblown highlights; sophisticated editorial food photography, deeply dimensional, tactile, understated and inviting. Restrained palette of natural golden bread, cheddar and warm beef against pure black. No smoke, no flames, no airborne ingredients, no garnish around it, no fries, no utensils, no plates, no text, no logos, no hands, no watermark. This is an illustrative brand atmosphere asset, not a claimed photo of an actual menu item.

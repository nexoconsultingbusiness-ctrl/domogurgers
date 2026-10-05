# Procedencia de assets

Preparación inicial: 18 de septiembre de 2026. Última actualización: 5 de octubre de 2026 (America/Bogota). Este inventario cubre los vectores, las fuentes locales y las imágenes actuales y anteriores de la landing de DomoBurgers.

## Identidad vectorial

Autoridad visual: manual `Branding actualizado Fin.pdf` proporcionado por el usuario. Fuente local: `C:/Users/User/Downloads/Branding actualizado Fin.pdf`.

El manual suministrado para este rediseño, `C:/Users/User/Downloads/Branding actualizado Fin (1).pdf`, tiene el mismo SHA-256 que la fuente anterior. Se revisaron sus páginas de identidad y se conservaron los SVG originales existentes.

SHA-256 del manual: `82e24ab8044bf49321b01e3abb602ef8c49d9690748d6b4e8e9be8a608b3fa44`.

| Asset                             | Procedencia                       | Uso previsto                                |
| --------------------------------- | --------------------------------- | ------------------------------------------- |
| `public/brand/logo-black.svg`     | Página 23                         | Marca sobre fondos claros                   |
| `public/brand/logo-white.svg`     | Página 25                         | Marca sobre fondos oscuros                  |
| `public/brand/logo-gold.svg`      | Página 26                         | Variante dorada original                    |
| `public/brand/wordmark-white.svg` | Página 34                         | Lettering original para cabeceras o cierres |
| `public/brand/mark.svg`           | Estrella superior de la página 26 | Favicon                                     |

SVG sin fondo, extraídos directamente del PDF. Se conservaron todos los atributos de trazado y se verificaron visualmente los cinco resultados. La extracción solo retira el fondo y ajusta el encuadre; también conserva las pequeñas diferencias originales de color y contorno entre variantes. Los `viewBox` y detalles están en `public/brand/README.md`.

Los derechos de identidad corresponden a sus titulares; el PDF proporcionado no declara una licencia abierta. El uso aquí responde al material suministrado para DomoBurgers.

## Montserrat local

Distribución oficial consultada: [Google Fonts, Montserrat](https://fonts.google.com/specimen/Montserrat). Fuentes descargadas del CDN oficial de Google Fonts, versión de URL `v31`.

Licencia: SIL Open Font License 1.1, incluida completa en `src/assets/fonts/OFL.txt`. Fuente del aviso: [OFL del repositorio oficial de Google Fonts](https://github.com/google/fonts/blob/main/ofl/montserrat/OFL.txt). Copyright 2024 The Montserrat.Git Project Authors. Mantener este aviso y licencia junto a los binarios cuando se redistribuyan.

| Archivo                                                | Formato                | Pesos   | Tamaño       | Cobertura                      |
| ------------------------------------------------------ | ---------------------- | ------- | ------------ | ------------------------------ |
| `src/assets/fonts/montserrat-latin-variable.woff2`     | WOFF2 variable, normal | 100–900 | 37,956 bytes | Latín, español y puntuación    |
| `src/assets/fonts/montserrat-latin-ext-variable.woff2` | WOFF2 variable, normal | 100–900 | 70,688 bytes | Latín extendido complementario |

El subconjunto `latin` basta para el contenido actual en español. La verificación del mapa de caracteres incluyó `ÁÉÍÓÚÜÑ áéíóúüñ ¿ ¡`, apóstrofo, números, `$`, `%` y `&`, sin faltantes. Ambos binarios tienen un eje `wght` 100–900; su valor por defecto y nombre interno corresponden a Thin (100), aunque el archivo contiene todo el rango variable. Declarar el rango completo al cargarlos; no tratar los archivos como una fuente estática de peso 100.

El subconjunto `latin-ext` queda disponible para una ampliación de idiomas. Si se carga mediante CSS, usar su `unicode-range` para que complemente al subconjunto latino. No sustituye por sí solo la cobertura latina básica. No se incluyeron cursivas porque la interfaz actual no las requiere.

### Binarios y trazabilidad

- `montserrat-latin-variable.woff2`: [descarga oficial](https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2); SHA-256 `06b16db7a969135d48d38c49183be7fb88d4452e2a3011957c7851941f4e4879`.
- `montserrat-latin-ext-variable.woff2`: [descarga oficial](https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2); SHA-256 `54d9a78b7ff60b689ad9f3017ffac8547b5d871afec733f6c1c3ae36577ee504`.

## Hero y carta de la referencia Lovable — 5 de octubre de 2026

El usuario autorizó copiar el estilo, el hero y la sección de hamburguesas de [burger-bites-bloom.lovable.app](https://burger-bites-bloom.lovable.app/), junto a dos capturas de referencia. La fotografía de hamburguesa cerrada del hero ya estaba en Downloads; las tres fotografías de carta se descargaron de las URLs observadas en el DOM del sitio facilitado.

| Asset                                      | Fuente y conversión                                                                                                                                          | Dimensiones y tamaño servido   | Uso                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ---------------------------------- |
| `public/images/burger-reference-hero.webp` | `C:/Users/User/Downloads/Gemini_Generated_Image_amqrgwamqrgwamqr.jpg`, JPG de 2730 × 1536 px y 2,573,889 bytes; Sharp WebP calidad 87, ancho máximo 2400 px. | 2400 × 1350 px; 300,494 bytes. | Fondo fotográfico del hero actual. |
| `public/images/menu-doble.webp`            | [JPG Doble de la referencia](https://burger-bites-bloom.lovable.app/assets/menu-doble-RNPU4jSq.jpg), 1200 × 912 px y 159,415 bytes; Sharp WebP calidad 85.   | 1200 × 912 px; 138,328 bytes.  | Tarjeta de ejemplo D’omo Doble.    |
| `public/images/menu-bacon.webp`            | [JPG Bacon de la referencia](https://burger-bites-bloom.lovable.app/assets/menu-bacon-DmRcKvAR.jpg), 1200 × 912 px y 151,866 bytes; Sharp WebP calidad 85.   | 1200 × 912 px; 127,014 bytes.  | Tarjeta de ejemplo Bacon Royal.    |
| `public/images/menu-pollo.webp`            | [JPG Pollo de la referencia](https://burger-bites-bloom.lovable.app/assets/menu-pollo-BGnQVbhf.jpg), 1200 × 912 px y 160,635 bytes; Sharp WebP calidad 85.   | 1200 × 912 px; 134,998 bytes.  | Tarjeta de ejemplo Crispy Chicken. |

Conversión proporcional sin ampliación, recorte ni edición generativa. Se preservaron los cuatro originales exactos en `artifacts/lovable-reference/source/`; `artifacts/lovable-reference/asset-metadata.json` registra fuentes, dimensiones, bytes, parámetros y hashes. La asociación de las fotografías con nombres, ingredientes y precios reproduce una maqueta autorizada, sin confirmar la carta, recetas o disponibilidad comercial de DomoBurgers.

### SHA-256 de fuentes y derivados

| Asset        | Fuente original                                                    | WebP servido                                                       |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Hero cerrado | `987e94903ca4b3cd32fc6249b876c5190dc3fe9cb593465511e324967160f8ad` | `f847d387cd7499535d9bd4f3c0225fecd90a10b9ad002d908884a2cdcbf7cae3` |
| Doble        | `57304ab81404269bf570410df8dcf6856c01161f72c8434dcac38cac374709f9` | `04598acaf3a56ff2908f22c134d56f04b7d2ce52ab07d819cbf602083fad0833` |
| Bacon        | `e9cf93dedf0b3f67b804e60e081530940565c9ee3e630d8b0fc0e46a64cad3dd` | `0ebd290154f23edcd1ca9eac88c132c2b3b451d968017fd3164d18ca687a9165` |
| Pollo        | `a4c1458097d4af8c359bd14b4894a15a4941178e431f93f3b6b07afcee96eede` | `ddfde1f10972d752fb313531966add8ff1993e0c7b2b4083ecca91f395d60b9e` |

## Imágenes de entregas anteriores

| Asset                                  | Procedencia y tratamiento                                                                                                                                                                                      | Uso                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `public/images/burger-floating.webp`   | JPG suministrado por el usuario: `C:/Users/User/Downloads/Gemini_Generated_Image_ijnhs1ijnhs1ijnh.jpg`. Conversión con Sharp a WebP, calidad 87, 2200 × 1238 px, 222,590 bytes. Sin edición de la composición. | Se usó en la carta provisional, composición de detalle, vista previa social y hero anterior. |
| `public/images/burger-hero.webp`       | Imagen conceptual generada en la primera entrega con `image_gen`; conversión con Sharp, calidad 88.                                                                                                            | Se usó en la carta provisional anterior y en la invitación final.                            |
| `public/images/burger-hero-source.png` | Original de la imagen conceptual de la primera entrega.                                                                                                                                                        | Trazabilidad del asset anterior                                                              |

SHA-256 del JPG suministrado: `8e2dfba14cde5dda814b286c8ac1f56f83d384cc873840f3f33670abb1d23dd7` (2,390,862 bytes). SHA-256 del WebP conservado: `6e81a47463d7cc15c878a22f8a9e5833ad9ba9fe0d7ecc8153164093ca09128b`.

La imagen suministrada muestra una hamburguesa con ingredientes suspendidos sobre papel con identidad de marca. Se conserva como composición conceptual, sin atribuirle un nombre de producto, ingredientes de una carta real, precio ni disponibilidad. La procedencia de ambas imágenes está ampliada en `docs/image-generation.md`.

## Fondo y secuencia del hero anterior con scroll — 2 de octubre de 2026

El usuario suministró `C:/Users/User/Downloads/download.mp4` y el fondo `C:/Users/User/Downloads/Gemini_Generated_Image_kqylalkqylalkqyl.jpg` para la versión anterior. La preparación conserva el movimiento del video; no genera ni reconstruye ingredientes. Estos assets y sus registros permanecen como archivo de esa entrega: el hero actual no descarga el fondo, el póster, los fotogramas ni el MP4, y ya no utiliza la animación de cierre con scroll.

| Asset                                                           | Tratamiento y tamaño                                                                                                                 | Uso                                                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `public/images/hero-atmosphere.webp`                            | Fondo JPG de 2752 × 1536 px convertido proporcionalmente con Sharp a 2200 × 1228 px, calidad 85, 32,042 bytes.                       | Fondo del hero anterior; archivo conservado.                                          |
| `public/images/burger-close-poster.webp`                        | Primer fotograma con transparencia, 640 × 800 px, 42,738 bytes.                                                                      | Póster del hero anterior; archivo conservado.                                         |
| `public/images/hero-sequence/frame-000.webp` a `frame-064.webp` | 65 fotogramas transparentes, 640 × 800 px, WebP calidad 80 y alpha 90; 2,357,730 bytes en conjunto.                                  | Secuencia del hero anterior; archivo conservado.                                      |
| `public/images/hero-sequence/metadata.json`                     | Dimensiones, duración, recorte, extracción del fondo, tamaños y procedencia.                                                         | Registro reproducible de los derivados.                                               |
| `public/videos/burger-close.mp4`                                | Copia exacta del archivo aportado: 5,245,990 bytes, 4.309 s, H.264/AVC, 1920 × 1080 px, 30 fps y 129 fotogramas; audio AAC presente. | Fuente conservada para trazabilidad; la landing no la descarga ni reproduce su audio. |

El MP4 tiene fondo blanco opaco y un único keyframe. Se recortó el área del producto y se extrajeron fotogramas para responder al avance y al retroceso sin depender de seeks largos. El blanco/gris neutro conectado al borde se convirtió en transparencia con suavizado y descontaminación del borde; se preservaron los brillos interiores de la comida. Una limpieza acotada eliminó un hueco blanco entre ingredientes sin reconstruir el producto. Se conservaron 65 posiciones del movimiento original, incluyendo inicio y final; la versión móvil anterior solicitaba únicamente los 33 índices pares.

En esa versión, `HeroScroll` conservaba los derivados comprimidos y limitaba la caché a diez `ImageBitmap` decodificados, unos 20 MB de píxeles, con hasta cuatro descargas simultáneas. Los registros de extracción y composición se encuentran en `artifacts/hero-video/`. No se atribuyen a este material recetas, precios o disponibilidad oficiales.

- JPG de fondo: 2,106,778 bytes; SHA-256 `fd5a6823bc3f374b3b62278fa749382e92e558a2cc2fb5d2066ed9fdb532a249`.
- WebP de fondo: SHA-256 `7d675f28ecef41a984df7b9b62bde2a08f7c8e3a5d0817f529526449cb6c1938`.
- MP4 original y copia: SHA-256 `a170902e8322f5c209e599c978ee8cf208bb77e8c20b08b90e736fe97d6fa4fa`.
- Póster transparente: SHA-256 `2719e75308260f7ceb538f7bee34d27c8b346578bbfc59092e7c7f01516c0bf0`.

## Barlow Condensed local

Distribución oficial: [Google Fonts, Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed). Binarios WOFF2 latinos estáticos:

- `src/assets/fonts/barlow-condensed-latin-400.woff2`: peso 400, 21,164 bytes; SHA-256 `7fff1bb22e5773f0d1a55d3093068b6dac4539e8bb3ac23fb9f0a729df2c7bb4`.
- `src/assets/fonts/barlow-condensed-latin-700.woff2`: peso 700, 22,444 bytes; SHA-256 `3787a5a419171630e6890cfa47c4da067474d005cd0ff8dc11ec090fdc3ee2b8`.

Licencia SIL Open Font License 1.1, incluida en `src/assets/fonts/BarlowCondensed-OFL.txt`; copyright 2017 The Barlow Project Authors. Fuente oficial del aviso: [OFL de Barlow Condensed en Google Fonts](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt).

En la entrega del 2 de octubre se cargaron ambos pesos localmente mediante `next/font/local` como `--font-hero`, con `display: swap`: el titular y la acción del hero, y los nombres de artículos de carta, usaban peso 700; la descripción del hero, la navegación, el CTA de escritorio del encabezado y los precios de carta usaban peso 400. Montserrat se utilizaba para los textos de lectura y los titulares de sección. La referencia de composición de aquel hero fue la captura proporcionada por el usuario, `C:/Users/User/AppData/Local/Temp/codex-clipboard-95e76201-5850-4a3f-b533-ec4043ccd079.png`; no se sirvió esa captura como asset del sitio. La nueva referencia de hero y carta del 5 de octubre reemplaza esa composición.

## Límites de alcance

Blenda y Sweet Pea no se distribuyen como fuentes web: no se recibió una licencia de uso web verificable. El lettering original sigue presente en los SVG y conserva la identidad del manual.

La captura de carta `C:/Users/User/AppData/Local/Temp/codex-clipboard-8ea29eba-d4d3-48cb-97b1-ab1f53620897.png` fue la referencia de composición anterior; no se distribuye como imagen del sitio. El usuario había autorizado nombres, ingredientes y precios de relleno para seis artículos de una carta estática provisional, con un aviso visible de datos de ejemplo en COP. Aquella maqueta reutilizaba solo los dos WebP de hamburguesa existentes.

La referencia autorizada el 5 de octubre sustituye esa maqueta por tres tarjetas con sus fotografías, nombres, ingredientes y precios de ejemplo. Copiar su presentación no acredita una carta confirmada, recetas, precios ni disponibilidad oficial de DomoBurgers. No hay catálogo conectado ni flujo de pedidos.

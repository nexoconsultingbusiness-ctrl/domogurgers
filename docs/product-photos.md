# Fotografías de producto

El usuario aportó 20 archivos PNG el 12 de octubre de 2026. Se asignan por nombre a las 17 hamburguesas del menú, una portada del catálogo, una toma alternativa de Carnalita y una fotografía de Porteña pendiente de sus datos comerciales.

## Asignación

Las rutas de la tabla son públicas; los archivos se encuentran bajo `public/`.

| Archivo aportado       | Destino                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `Bacon Cheese (1).png` | `/images/products/bacon-cheese.webp`                                        |
| `Churry.png`           | `/images/products/churry.webp`                                              |
| `Pollo Crispy.png`     | `/images/products/pollo-crispy.webp`                                        |
| `Carnalita.png`        | `/images/products/carnalita.webp`                                           |
| `Chancha.png`          | `/images/products/chancha.webp`                                             |
| `Gaucha.png`           | `/images/products/gaucha.webp`                                              |
| `Urbana.png`           | `/images/products/urbana.webp`                                              |
| `House.png`            | `/images/products/house.webp`                                               |
| `Monster.png`          | `/images/products/monster.webp`                                             |
| `Gringa.png`           | `/images/products/gringa.webp`                                              |
| `Costa.png`            | `/images/products/costa.webp`                                               |
| `4x4.png`              | `/images/products/4x4.webp`                                                 |
| `Philadelphia.png`     | `/images/products/philadelphia.webp`                                        |
| `Piña.png`             | `/images/products/pina.webp`                                                |
| `Twist.png`            | `/images/products/twist.webp`                                               |
| `Pollo.png`            | `/images/products/pollo.webp`                                               |
| `Tradicional.png`      | `/images/products/tradicional.webp`                                         |
| `Portada.png`          | `/images/catalog-cover.webp`, hero de `/catalogo`                           |
| `carnalita (1).png`    | `/images/products/alternates/carnalita.webp`, toma alternativa conservada   |
| `Porteña.png`          | `/images/products/pending/portena.webp`, pendiente de precio e ingredientes |

Carnalita utiliza la toma principal `Carnalita.png`. La alternativa se conserva como asset, sin duplicar el producto. Porteña no figura entre las 17 hamburguesas transcritas: su fotografía queda preparada, pero no se publica un producto con precio o ingredientes supuestos. Tras la entrega del 27 de octubre, 32 de los 58 productos tienen foto. Adicionales y bebidas reúnen las 26 opciones sin imágenes ni espacios reservados. Todas las opciones de las otras seis categorías tienen una fotografía asignada.

## Fotos recibidas el 16 de octubre de 2026

| Archivo aportado                 | Destino                                              |
| -------------------------------- | ---------------------------------------------------- |
| `Don Perro.png`                  | `/images/products/don-perro.webp`                    |
| `Don Perro Premium.png`          | `/images/products/don-perro-premium.webp`            |
| `Don Perro (2).png`              | `/images/products/alternates/don-perro.webp`         |
| `Don Perro Premium (2).png`      | `/images/products/alternates/don-perro-premium.webp` |
| `Domo gringas con Salchicha.png` | `/images/products/domo-gringas-salchicha.webp`       |
| `Domo Gringas con Nuggets.png`   | `/images/products/infantil-pollo.webp`               |
| `Domo Gringas con Carne.png`     | `/images/products/domo-gringas.webp`                 |
| `D´omo Picada.png`               | `/images/products/domo-picada.webp`                  |
| `Choripan.png`                   | `/images/products/choripan.webp`                     |

Se incorporan las fotos de siete productos existentes. Las dos tomas adicionales de los perros se conservan como alternativas. El usuario confirmó expresamente la asignación de `Domo Gringas con Nuggets.png` a Pollo infantil y de `Domo Gringas con Carne.png` a Domo Gringas. No se crean variantes ni se alteran los nombres, ingredientes o precios del menú.

Los nueve WebP conservan las dimensiones nativas y calidad de codificación 95: aproximadamente 3,62 MB frente a 22,08 MB de PNG. Las tres fotografías verticales recibieron vistas de presentación en `/images/products/previews/` que retiran espacio vacío y se utilizaron en los productos confirmados por el usuario. La vista anterior de Pollo infantil se conserva como archivo, pero dejó de utilizarse con la entrega del 27 de octubre. Las tarjetas llenan el recuadro con `cover` y el foco ajustado hacia la comida. Choripán utiliza un encuadre hacia la izquierda. Los originales permanecen sin modificar y el navegador recibe calidad 90. El registro local `artifacts/catalog-photos-oct16/asset-manifest.json` conserva rutas, dimensiones, tamaños, recortes y hashes SHA-256.

## Fotos recibidas el 27 de octubre de 2026

| Archivo aportado | Ruta pública preparada | Producto / estado |
| --- | --- | --- |
| `Salchipapa.png` | `/images/products/salchipapa.webp` | `salchipapa` |
| `Picada.png` | `/images/products/domo-picada-20261027.webp` | `domo-picada` |
| `Picada con Costillas.png` | `/images/products/domo-picada-costillas.webp` | `domo-picada-costillas` |
| `Michelada Stella.png` | `/images/products/michelada-stella.webp` | `michelada-stella` |
| `Michelada Soda.png` | `/images/products/michelada-soda.webp` | `michelada-soda` |
| `Michelada Ginger.png` | `/images/products/michelada-ginger.webp` | `michelada-ginger` |
| `Michelada Ceveza.png` | `/images/products/michelada-cerveza.webp` | `michelada-cerveza` |
| `Menú Infantil Pollo.png` | `/images/products/infantil-pollo-menu.webp` | `infantil-pollo` |
| `Menú Infantil Hamburguesa.png` | `/images/products/infantil-hamburguesa.webp` | `infantil-hamburguesa` |
| `Aros de Cebolla.png` | `/images/products/aros-cebolla.webp` | `aros-cebolla`, entrada |
| `Hamburguesa Lechuga.png` | `/images/products/pending/hamburguesa-lechuga.webp` | Pendiente de identificación y datos comerciales |

Se asignan diez fotografías a productos existentes: ocho incorporaciones y dos reemplazos, para un total de 32 productos con foto. La nueva Domo Picada utiliza una ruta fechada; Pollo infantil usa `infantil-pollo-menu.webp` sin su antiguo `imagePreview` ni su ajuste de posición anterior. Se conservan los archivos previos de ambos productos. Aros de cebolla recibe la fotografía como entrada; `adicional-aros-cebolla` sigue dentro de los adicionales compactos sin imagen. No se modifican nombres, precios ni ingredientes.

`Hamburguesa Lechuga.png` no tiene una coincidencia en el catálogo vigente. Su WebP queda preparado en `pending/`, sin asignarlo a otra hamburguesa ni crear un producto hasta recibir la identificación y los datos comerciales. La foto `Michelada Ceveza.png` contiene una botella Coronita; se conserva el nombre existente «Michelada de cerveza nacional» y su precio. La marca debe confirmarse si se desea cambiar el texto comercial.

Los once WebP mantienen las dimensiones originales, sin recortes ni redimensionado y con calidad de codificación 95. Las fotografías horizontales miden 1673 × 940 px; las verticales, 940 × 1673 px, excepto Aros de cebolla, de 940 × 1672 px. Los PNG suman 27.147.088 bytes y los WebP 4.725.702 bytes, una reducción del 82,59 %. Se verificó que los once originales y los 36 archivos de imagen previos permanecen intactos. El registro local `artifacts/catalog-photos-oct27/asset-manifest.json` conserva nombres fuente, asignación de productos, rutas, dimensiones, bytes y hashes SHA-256 de origen y salida.

Micheladas activa `showImages: true` y `compact: false`. Sus tarjetas usan un marco 3:4 con `object-fit: cover` y `imagePosition: "center 55%"`, de modo que el vaso y la botella ocupan el espacio fotográfico. Las comidas mantienen el marco 4:3 con `cover`; Aros de cebolla usa `imagePosition: "center 62%"`. El detalle y las miniaturas conservan `contain`. Estos ajustes de encuadre se realizan en la presentación y no recortan los archivos WebP.

## Calidad y presentación

Los PNG originales permanecen sin modificar en `C:/Users/User/Downloads/`. Las 20 copias WebP de la entrega del 12 de octubre conservan las dimensiones nativas, sin ampliación ni recorte, con calidad de codificación 95. Suman aproximadamente 7,20 MB frente a los 43,90 MB originales. El registro local `artifacts/product-photos/asset-manifest.json` identifica cada fuente mediante SHA-256, dimensiones, tamaño y ruta de salida.

Cinco fotografías verticales —Carnalita, Churry, Gringa, Philadelphia y Piña— tienen además una vista de presentación bajo `/images/products/previews/`. Esas vistas retiran espacio superior e inferior alrededor de la hamburguesa, conservan el ancho original y el producto completo, y no amplían la imagen. Suman aproximadamente 1,28 MB; sus coordenadas de recorte y tamaños están en el mismo registro. Las copias WebP completas se conservan junto a ellas. Philadelphia usa `philadelphia-framed.webp` para renovar la caché del primer encuadre.

`menu-data.json` guarda la foto completa en `image` y, para esas cinco fotografías, la vista de presentación opcional en `imagePreview`. `ProductImage` usa `imagePreview` cuando existe. Todas las tarjetas de hamburguesas llenan su espacio de proporción 4:3 con `object-fit: cover`, incluidas esas cinco vistas, según la corrección del usuario para evitar barras. El campo opcional `imagePosition` permite ajustar su punto de encuadre mediante `object-position`; sin ese ajuste se utiliza el centro. Los detalles y las miniaturas conservan `object-fit: contain` para mostrar el encuadre completo de la imagen utilizada. Estos ajustes de presentación no modifican los archivos de imagen. Next.js genera las versiones responsive con calidad 90 y tiene permitidos los valores `[75, 90]` en `next.config.ts`.

La nueva portada se utiliza solo en el hero del catálogo. El hero de la página principal mantiene su fotografía existente; Tradicional, Bacon Cheese y Pollo Crispy comparten sus fotos de producto con el catálogo.

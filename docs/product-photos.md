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

Carnalita utiliza la toma principal `Carnalita.png`. La alternativa se conserva como asset, sin duplicar el producto. Porteña no figura entre las 17 hamburguesas transcritas: su fotografía queda preparada, pero no se publica un producto con precio o ingredientes supuestos. Las otras 41 opciones del menú mantienen `image: null` y su espacio reservado donde corresponde.

## Calidad y presentación

Los PNG originales permanecen sin modificar en `C:/Users/User/Downloads/`. Las 20 copias WebP conservan las dimensiones nativas, sin ampliación ni recorte, con calidad de codificación 95. Suman aproximadamente 7,20 MB frente a los 43,90 MB originales. El registro local `artifacts/product-photos/asset-manifest.json` identifica cada fuente mediante SHA-256, dimensiones, tamaño y ruta de salida.

Cinco fotografías verticales —Carnalita, Churry, Gringa, Philadelphia y Piña— tienen además una vista de presentación bajo `/images/products/previews/`. Esas vistas retiran espacio superior e inferior alrededor de la hamburguesa, conservan el ancho original y el producto completo, y no amplían la imagen. Suman aproximadamente 1,28 MB; sus coordenadas de recorte y tamaños están en el mismo registro. Las copias WebP completas se conservan junto a ellas. Philadelphia usa `philadelphia-framed.webp` para renovar la caché del primer encuadre.

`menu-data.json` guarda la foto completa en `image` y, para esas cinco fotografías, la vista de presentación opcional en `imagePreview`. `ProductImage` usa `imagePreview` cuando existe. Todas las tarjetas de hamburguesas llenan su espacio de proporción 4:3 con `object-fit: cover`, incluidas esas cinco vistas, según la corrección del usuario para evitar barras. El campo opcional `imagePosition` permite ajustar su punto de encuadre mediante `object-position`; sin ese ajuste se utiliza el centro. Los detalles y las miniaturas conservan `object-fit: contain` para mostrar el encuadre completo de la imagen utilizada. Estos ajustes de presentación no modifican los archivos de imagen. Next.js genera las versiones responsive con calidad 90 y tiene permitidos los valores `[75, 90]` en `next.config.ts`.

La nueva portada se utiliza solo en el hero del catálogo. El hero de la página principal mantiene su fotografía existente; Tradicional, Bacon Cheese y Pollo Crispy comparten sus fotos de producto con el catálogo.

# Vectores originales de DomoBurgers

Fuente: `C:/Users/User/Downloads/Branding actualizado Fin.pdf`, manual facilitado por el usuario. Los números de página de esta tabla cuentan desde 1.

| Archivo              | Página | Contenido                         | viewBox                                               |
| -------------------- | ------ | --------------------------------- | ----------------------------------------------------- |
| `logo-black.svg`     | 23     | Logo completo negro               | `195.56039429 63.39108276 317.540802 297.71237183`    |
| `logo-white.svg`     | 25     | Logo completo blanco              | `195.56039429 63.39108276 317.540802 297.71237183`    |
| `logo-gold.svg`      | 26     | Logo completo dorado              | `195.56039429 64.89108276 317.540802 296.21237183`    |
| `wordmark-white.svg` | 34     | Lettering original blanco         | `205.49041748 140.05947876 297.19448853 145.71520996` |
| `mark.svg`           | 26     | Estrella superior del logo dorado | `328.48867798 64.89108276 51.684021 51.68499756`      |

## Extracción y fidelidad

Se exportaron los trazados del PDF mediante PyMuPDF. Se retiró el rectángulo de fondo y se recortó el `viewBox` al conjunto de dibujos, incluyendo el ancho del trazo cuando existe. Los atributos de cada trazado (`d`, transformación, relleno y contorno) se compararon con la exportación original y permanecen idénticos. No se reconstruyeron letras, arcos ni estrellas.

- Los logos blanco y negro contienen un contorno de 3 unidades en la estrella superior. El dorado no lo tiene. Esta diferencia ya existe en el manual.
- El logo blanco conserva los blancos del PDF: `#fcfdfc`, `#fefdfd`, `#fefefd`, `#fefefe` y `#ffffff`. No se uniformaron.
- El dorado original exporta como `#efbf05`; el fondo vino de la página 26 es `#722f37` y se retiró.
- El lettering blanco procede de la página 34, que ya contiene esta variante y su composición original. No se recoloreó el lettering negro de la página 32.
- `mark.svg` es el trazado exacto de la estrella grande de la página 26, aislado para el favicon. No es un símbolo inventado.

Mantener la proporción de cada archivo. Añadir el espacio libre de marca mediante layout, sin recortar internamente los SVG. Usar un `alt` descriptivo al mostrar un logo informativo y `alt=""` para repeticiones decorativas.

## Derechos y tipografía

Estos archivos son assets de la marca aportados por el usuario para este proyecto. El manual no aporta una licencia abierta de redistribución de la identidad. No asumir que estos logos son assets de stock.

El lettering del logo está incluido como trazados y no requiere instalar Blenda ni Sweet Pea. No se han descargado ni incluido esas fuentes por no contar con una licencia web verificada. La tipografía de interfaz es Montserrat local, bajo SIL Open Font License 1.1; los archivos y la licencia se encuentran en `src/assets/fonts/`.

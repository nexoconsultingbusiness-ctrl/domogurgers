---
name: DomoBurgers
description: Fotografía gastronómica, negro cálido y oro con la identidad original de D’omo Burgers.
colors:
  brand-gold: "#efc008"
  brand-gold-hover: "#ffd400"
  brand-wine: "#722f37"
  background: "oklch(0.12 0.006 80)"
  foreground: "oklch(0.97 0.008 90)"
  muted: "oklch(0.7 0.015 80)"
  surface: "#11100e"
  line: "oklch(0.31 0.01 75)"
  photo-foreground: "oklch(0.99 0.004 90)"
  photo-muted: "oklch(0.8 0.012 80)"
  card-surface: "oklch(0.16 0.008 70)"
typography:
  display:
    fontFamily: "Arial, sans-serif"
    fontSize: "96px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "normal"
  headline:
    fontFamily: "Arial, sans-serif"
    fontSize: "60px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "normal"
  brand-headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 66px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  menu-title:
    fontFamily: "Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 900
    lineHeight: "32px"
  menu-price:
    fontFamily: "Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 900
    lineHeight: "28px"
  body:
    fontFamily: "Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  brand-body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  body-lead:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
  button:
    fontFamily: "Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: "20px"
  brand-button:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "12px"
    fontWeight: 800
rounded:
  rectangular: "0"
  action: "6px"
  surface: "12px"
  circle: "50%"
spacing:
  compact: "12px"
  inset: "16px"
  comfortable: "24px"
  group: "32px"
  composition: "40px"
  wide: "48px"
components:
  button-primary:
    backgroundColor: "{colors.brand-gold}"
    textColor: "{colors.background}"
    typography: "{typography.button}"
    rounded: "{rounded.rectangular}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-gold-hover}"
    textColor: "{colors.background}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.photo-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.rectangular}"
    padding: "12px 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
  header-cta:
    backgroundColor: "{colors.brand-gold}"
    textColor: "{colors.background}"
    typography: "{typography.button}"
    rounded: "{rounded.rectangular}"
    padding: "10px 20px"
    height: "44px"
  brand-button:
    backgroundColor: "{colors.brand-gold}"
    textColor: "#000"
    typography: "{typography.brand-button}"
    rounded: "{rounded.action}"
    padding: "15px 24px"
    height: "56px"
  text-link:
    textColor: "{colors.foreground}"
    padding: "0"
  text-link-hover:
    textColor: "{colors.brand-gold}"
  menu-card:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.rectangular}"
  menu-card-copy:
    padding: "28px"
  product-catalog-action:
    textColor: "{colors.foreground}"
    rounded: "{rounded.rectangular}"
    height: "44px"
    padding: "10px 14px"
---

# Design System: DomoBurgers

## Overview

**Creative North Star: "Gastronomía cinematográfica de Casanare"**

La comida ocupa el primer plano mediante fotografía oscura, luz cálida y titulares blancos y oro. El hero, el encabezado y la carta reproducen la referencia Lovable elegida directamente por el usuario el 5 de octubre de 2026: Arial de peso alto, acciones rectangulares y tres tarjetas fotográficas contiguas. La composición anterior con hamburguesa transparente y secuencia de scroll está sustituida.

La experiencia, el detalle y el cierre conservan su lenguaje previo: Montserrat local, composiciones editoriales amplias y emblemas originales. El módulo de historia y sus filas de origen se retiraron por solicitud del usuario. Los enlaces de sedes apuntan al pie de página, donde se conservan Maní y Yopal. El oro conecta ambos lenguajes y los SVG originales mantienen la identidad de D’omo Burgers.

**Key Characteristics:**

- Fotografía gastronómica protagonista, con imágenes y datos conceptuales identificados.
- Arial en hero, encabezado y carta; Montserrat local en las secciones de marca conservadas.
- Negro cálido, blanco de lectura y oro de acción.
- Controles rectangulares y tarjetas con líneas finas en las regiones de referencia.
- Logos originales, scroll nativo, contenido visible y foco de teclado.

Los tokens proceden de `src/app/globals.css`; Montserrat se carga en `src/app/layout.tsx`. La composición vive en `src/app/(public)/page.tsx`. La autoridad y las adaptaciones están en `.impeccable/surfaces/src-app-public-page-tsx.md`; la evidencia final, en `artifacts/lovable-reference/`. El frontmatter recoge patrones vigentes, sin convertir cada medida aislada en escala global.

## Colors

La paleta mantiene el oro de marca sobre negros ligeramente cálidos; los neutros OKLCH conservan el formato normativo de CSS.

### Primary

- **Oro de marca** (`brand-gold`, `--gold`): énfasis, acciones, etiquetas, precios, estrellas, sellos y foco.
- **Oro de interacción** (`brand-gold-hover`): hover de acciones con fondo oro.

### Secondary

- **Vino de origen** (`brand-wine`, `--wine`): token conservado del módulo de historia retirado.

### Neutral

- **Negro cálido** (`background`, `--background`): lienzo y tinta de acciones de referencia.
- **Blanco de lectura** (`foreground`, `--foreground`): texto y hover de la acción de contorno.
- **Gris cálido** (`muted`, `--muted`): ingredientes, apoyos y avisos.
- **Carbón de detalle** (`surface`, `--surface`): sección de producto conservada.
- **Línea cálida** (`line`, `--line`): bordes compartidos y separadores.
- **Blanco fotográfico** (`photo-foreground`): titular y acción de contorno sobre la foto.
- **Gris fotográfico** (`photo-muted`): descripción y procedencia del hero.
- **Carbón de carta** (`card-surface`): superficie bajo las fotos de producto.

**The Identity Rule.** Los SVG originales conservan sus colores internos y trazados. El oro del SVG original puede diferir del oro de interfaz; no se recolorea para uniformarlos.

## Typography

**Display Font:** Arial con fallback sans-serif en hero, encabezado y carta. Lovable declara Montserrat sin cargar FontFace; la reproducción usa la Arial visible en sus capturas. Esta elección está autorizada para esas regiones.

**Body Font:** Arial en las regiones de referencia; Montserrat local variable de pesos (100–900) en experiencia, detalle, cierre y pie. Barlow Condensed ya no se carga en el layout.

**Character:** la referencia usa una sans ancha, mayúsculas y tracking normal. Las secciones conservadas mantienen titulares Montserrat de peso alto y tracking cerrado, con lectura holgada. El lettering permanece en los SVG.

### Hierarchy

- **Display:** escala del frontmatter en escritorio; (72px) entre (640px) y (1023px), y (48px) por debajo de (640px). «Sabor que» comienza en blanco y «No se olvida.» continúa en oro; el ancho determina la envoltura adicional.
- **Headline:** la carta usa la escala Arial registrada; móvil pasa a (36px) e interlineado (40px). Los titulares Montserrat conservados usan clamps propios del bloque y peso (800).
- **Menu title / price:** Arial (900), con precio oro. La pareja admite envoltura del nombre sin comprimir el precio.
- **Body:** ingredientes e introducción usan el cuerpo Arial; la descripción del hero aumenta a (18px), o (16px) en móvil, con límite de (512px). La lectura Montserrat conservada se mueve entre (13px) y (17px), con límites de (500–520px).
- **Label / button:** navegación, avisos y controles mantienen jerarquía compacta. La etiqueta superpuesta usa (10.4px) y peso (900), específica de la foto. El pie y los emblemas contienen microtexto, sin sustituir lectura esencial.

**The Readable Content Rule.** Los textos esenciales viven en HTML, con titulares completos y párrafos legibles. El lettering, los contornos decorativos y los microtextos de emblemas no sustituyen la jerarquía de contenido.

## Layout

Hero, encabezado y carta comparten un contenedor de máximo (1440px), padding lateral de (48px), (32px) bajo (1024px) y (20px) bajo (640px). El encabezado es absoluto, transparente y de (96px); sale con el scroll. Los anclajes no reservan offset global (`scroll-padding-top: 0px`).

El hero mide al menos (92svh). La foto cerrada cubre toda la sección con `object-fit: cover` y posición (58% center); las veladuras izquierda e inferior protegen la lectura. Titular y acciones quedan alineados a la izquierda, hacia la parte baja. El padding inferior pasa de (80px) a (64px) en tablet y (56px) en móvil. Los controles se envuelven naturalmente; la procedencia inferior derecha se oculta bajo (1024px).

La carta sigue inmediatamente al hero: tres columnas desde (768px), una por debajo, gaps y borde exterior de (1px). Las fotos tienen proporción (4:3). El encabezado de sección se apila bajo (1101px). El padding vertical es (112px), o (80px) bajo (640px); el cuerpo de tarjeta usa (28px), o (24px) en ese mismo breakpoint.

Las secciones conservadas mantienen `min(1360px, 100% - 128px)`, márgenes laterales de (40px) bajo (1101px) y (20px) en móvil. Sus dos columnas se apilan bajo (768px). El sello, el emblema y las fechas conservan sus composiciones propias. El espaciado registrado no impone una retícula única a toda la portada.

## Elevation & Depth

Hero y carta obtienen profundidad de fotografías y veladuras. Las tarjetas son planas, con líneas finas y sin sombra ni tilt. La acción rectangular sube ligeramente al hover. Las secciones conservadas mantienen sombras ambientales, perspectiva CSS y capas de marca.

### Shadow Vocabulary

- **Profundidad fotográfica** (`--depth-shadow`): bajo la fotografía de detalle.
- **Respuesta de acción de marca:** hover del botón Montserrat conservado.
- **Sello y emblema:** sombras del círculo oro y de la pieza negra sobre vino; valores en el sidecar.

**The Progressive Depth Rule.** La perspectiva CSS (1200px) y las capas de marca producen profundidad con scroll nativo. `LandingMotion` habilita parallax únicamente desde (1024px) y limita la inclinación a (3°) con puntero fino. El hero y las tarjetas de carta no participan en esos efectos.

GSAP se importa de forma diferida; `IntersectionObserver` activa reveals de una ejecución, un `WeakSet` conserva los vistos y RAF calcula el parallax de piezas conservadas. Movimiento reducido elimina transiciones, animaciones y tilt/parallax, y cambia el scroll suave a automático. El contenido es visible antes de los efectos. El hero es estático: no monta `HeroScroll`, canvas, frames ni video. Los módulos y assets anteriores quedan archivados, fuera del sistema vigente.

## Shapes

Acciones, etiquetas, flechas y tarjetas de referencia tienen esquinas rectas (`rounded.rectangular`) y bordes finos compartidos. La fotografía admite recorte; los logos conservan su proporción completa.

Las piezas de marca conservadas usan esquinas discretas en acciones (`rounded.action`), radio de superficie en fotografía y emblema (`rounded.surface`, `--radius`) y sello circular (`rounded.circle`). Esos radios no se trasladan a las tarjetas de referencia.

## Components

### Buttons

Acciones rectangulares, compactas y visibles sobre la foto.

- **Primary:** oro, tinta negra cálida y flecha SVG; «Ver catálogo» lleva a `/catalogo` desde la ampliación del 8 de octubre de 2026.
- **Outline:** fondo transparente, borde blanco fotográfico al (40%) y pin SVG; «Encuéntranos» lleva a `#sedes`. Hover con blanco de lectura.
- **Hover / Focus:** primario oro de interacción y subida de (2px). Outline de foco oro de (3px), separado (6px), con `:focus-visible`.
- **Header CTA:** compacto hacia `/catalogo`; «Pedir ahora» inicia el recorrido de selección y carrito. Móvil usa «Ver catálogo», mínimo (44px).
- **Brand action / text link:** botón Montserrat redondeado y enlaces editoriales conservados. Su flecha se desplaza (4px) al hover; los apoyos pueden comenzar en oro. El detalle de marca incluye «Ver catálogo» y el cierre «Armar mi pedido», ambos hacia `/catalogo`. En móvil, el botón del detalle ocupa una fila completa bajo sello y texto.

### Cards / Containers

La carta presenta tres artículos dentro de una superficie continua.

- **Photo:** (4:3), cover y etiqueta amarilla superior izquierda. Con hover y puntero fino, escala (1.05) durante (700ms); movimiento reducido anula la transición.
- **Copy:** nombre/precio, ingredientes, separador, estrella SVG y botón de contorno oro «Elegir», con flecha y altura mínima de (44px), hacia `/catalogo?producto=<id>` con nombre accesible del producto. Debajo de la retícula, «Ver catálogo y armar pedido» ofrece el acceso general.
- **Truth:** D'omo Doble, Bacon Royal y Crispy Chicken son ejemplos provisionales en COP. Conservar el aviso de nombres, ingredientes, precios e imágenes de ejemplo mientras no exista carta confirmada.
- **Retained brand pieces:** foto de detalle con radio/sombra, lista descriptiva de valores, emblema negro sobre vino y sello circular oro, en Montserrat y con SVG originales.

### Navigation

Encabezado transparente con logo blanco original, «Catálogo», «Sedes» y acción oro. Los enlaces cambian a oro al hover; bajo (768px) se sustituyen por «Ver catálogo», sin panel desplegable. Menú, pedido y Carta del pie abren `/catalogo`; el logo regresa a `/#inicio` y Sedes a `/#sedes`. El enlace para saltar al contenido aparece al recibir foco.

### Digital Catalog

La ampliación de `/catalogo` conserva Arial, negro cálido, oro, fotografías existentes y controles rectangulares. Sus estilos locales viven en `src/features/catalog/catalog.module.css`; el flujo interactivo, en `src/features/catalog/catalog.tsx`. La dirección de esta superficie se registra en `.impeccable/surfaces/src-app-public-catalogo-page-tsx.md`.

- **Product browsing:** cabecera fotográfica compacta con veladura y titular blanco/oro; filtros de categoría con selección oro, búsqueda con foco oro y contador de resultados. Retícula de tres columnas, dos bajo (960px) y una bajo (640px), con separación de (24px). Las tarjetas conservan foto (4:3), línea fina, etiqueta oro, precio visible y acciones diferenciadas de detalle y agregado.
- **Detail and cart:** detalle en diálogo nativo centrado, de hasta (560px); carrito en panel lateral derecho del mismo ancho máximo y alto de (100dvh). En móvil ocupan todo el ancho. Fondo oscurecido, encabezado persistente con cierre, retorno de foco y Escape; cantidades con controles de (44px). El carrito flotante oro muestra cantidad y subtotal cuando hay productos; una notificación breve confirma los agregados.
- **Order fields:** campos rectangulares sobre negro cálido, borde fino, texto de (16px) y altura mínima de (48px); foco oro de (2px). Nombre, sede, recogida o domicilio, dirección condicional y notas preceden al subtotal y la acción WhatsApp. Los errores usan texto coral; los avisos de configuración y el subtotal destacan en oro. Los estados vacíos ofrecen volver al menú.
- **State and truth:** selección visible de filtros, cantidades en tarjeta, controles deshabilitados en los límites y avisos provisionales en catálogo, detalle y carrito. La acción prepara un mensaje para confirmar con el negocio; no presenta el pedido como pagado o aceptado. Movimiento reducido elimina las transiciones, incluido el zoom fotográfico leve.

### Brand Assets

Los SVG en `public/brand/` conservan procedencia, proporciones y colores: blanco en encabezado, negro en sello y wordmark blanco en pie. El logo oro del módulo de historia queda como asset de marca sin montarse. Su documentación está en `public/brand/README.md`.

El hero sirve `burger-reference-hero.webp`, optimizado desde el JPG cerrado del usuario, con preload y `sizes="(max-aspect-ratio: 16/9) 164svh, 100vw"` para cubrir también el ancho fotográfico necesario en retratos altos. La carta usa `menu-doble.webp`, `menu-bacon.webp` y `menu-pollo.webp`, tomadas de la URL autorizada. Detalle y cierre conservan sus imágenes anteriores. Las imágenes informativas tienen alt conceptual; el hero es decorativo. Procedencia y hashes están en `docs/asset-manifest.md`.

El sidecar muestra snippets autónomos de ambos lenguajes vigentes, con SVG inline, fotos embebidas y estados de interacción. Las rampas sintetizadas solo previsualizan color; no añaden tonos de aplicación.

## Do's and Don'ts

### Do:

- **Do** conservar el formato OKLCH de los neutros y los colores internos de los logos originales.
- **Do** usar Arial en las regiones de referencia y Montserrat local en las secciones de marca conservadas.
- **Do** mantener controles rectangulares, fotos (4:3) y líneas compartidas en la carta.
- **Do** dimensionar las fuentes de imagen para el recorte cover, también en móvil.
- **Do** conservar aviso provisional, alt conceptual, foco visible y destinos internos verdaderos.
- **Do** mantener scroll nativo, contenido visible y límites de movimiento reducido.

### Don't:

- **Don't** redibujar, recolorear ni recortar internamente los logos originales.
- **Don't** reintroducir la secuencia animada anterior en el hero vigente.
- **Don't** convertir la carta de ejemplo o «Pedir ahora» en oferta o compra confirmada.
- **Don't** usar microtexto de sellos o letras de contorno para contenido esencial.
- **Don't** generalizar recursos específicos de la referencia a las secciones conservadas sin nueva dirección autorizada.

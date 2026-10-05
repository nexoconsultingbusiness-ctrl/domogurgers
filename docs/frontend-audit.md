# Auditoría del rediseño frontend

Actualizada: 5 de octubre de 2026 (America/Bogota). Alcance: reproducción de hero, encabezado y carta de `https://burger-bites-bloom.lovable.app/`, elegida directamente por el usuario, y conservación de las secciones de marca existentes. La composición del 2 de octubre queda como antecedente; su hero animado fue sustituido.

## Identidad y contenido

El PDF `Branding actualizado Fin (1).pdf` coincide por SHA-256 con el manual documentado. La identidad conserva los SVG originales y el oro de marca; el vino permanece en historia. Los neutros de interfaz usan los valores OKLCH de `src/app/globals.css`. Montserrat local se mantiene en experiencia, detalle, historia, cierre y pie. Hero, encabezado y carta usan Arial para reproducir el fallback visible de Lovable: su CSS declara Montserrat, pero la referencia no carga FontFace.

El manual confirma la fundación en Maní el 20 de diciembre de 2020 por Charly Dorazio y la apertura en Yopal el 15 de febrero de 2025. La carta reproduce tres ejemplos: D'omo Doble ($32.900), Bacon Royal ($29.900) y Crispy Chicken ($27.900). El aviso visible identifica nombres, ingredientes y precios provisionales en COP e imágenes conceptuales. No se han confirmado direcciones, horarios, teléfonos ni canales de pedido.

## Mapa de rutas y componentes

| Ruta o área             | Implementación y comportamiento                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | `src/app/(public)/page.tsx`: Hero → MenuSection → Experience → FlavorScene → BrandStory → FinalInvitation dentro de LandingMotion. La franja anterior ya no se intercala entre hero y carta. |
| Layout                  | Montserrat local, metadatos, salto al contenido, Header, main y Footer; datos estructurados condicionados al entorno. El primer template del body registra el contrato visual vigente.       |
| Encabezado              | Absoluto, transparente y de (96px), logo original, «Menú» / «Pedir ahora» a `#carta` y «Sedes» a `#origen`. Bajo (768px), «Ver menú» directo; sin panel desplegable.                         |
| Hero                    | `#inicio`: foto cerrada a pantalla completa, veladuras, Arial (900), titular blanco/oro y acciones rectangulares.                                                                            |
| Carta                   | `#carta`: tres tarjetas contiguas, fotos (4:3), etiquetas/precios oro, ingredientes, estrella y flechas a `#origen`; aviso provisional. Tres columnas desde (768px), una por debajo.         |
| Experiencia             | `#esencia`: declaración y lista de tres valores, conservadas en Montserrat.                                                                                                                  |
| Detalle                 | `#detalles`: foto conceptual, sello y enlace a las raíces, con el lenguaje previo.                                                                                                           |
| Historia                | `#historia` / `#origen`: relato, emblema, ciudades y fechas confirmadas.                                                                                                                     |
| Invitación y pie        | Cierre visual y navegación de marca conservados.                                                                                                                                             |
| `/api/health`           | Infraestructura; contrato de salud conservado.                                                                                                                                               |
| `/api/v1` y `/api/v1/*` | Infraestructura y JSON 404 para recursos desconocidos; sin negocio nuevo.                                                                                                                    |

Las acciones son enlaces internos y no llaman a las API. «Pedir ahora» conserva el destino al menú; las flechas llevan a sedes conocidas. No hay catálogo conectado, carrito, autenticación, persistencia, pedidos ni pagos.

## Renderizado, movimiento y profundidad

Hero, carta y marca se renderizan en servidor. El hero es estático: no monta HeroScroll, canvas, frames ni video. El código y los assets anteriores permanecen archivados. Barlow Condensed ya no se carga en el layout.

LandingMotion sigue como capa opcional: GSAP diferido, reveals de una ejecución con IntersectionObserver/WeakSet y parallax por RAF de piezas conservadas. Tilt limitado a escritorio desde (1024px), puntero fino y (3°). Hero y tarjetas no tienen parallax ni tilt; la carta conserva un zoom fotográfico leve al hover fino.

El scroll es nativo, con `scroll-padding-top: 0px` porque el encabezado sale con el hero. Movimiento reducido elimina transiciones, animaciones y tilt/parallax. Observers, listeners, frames y contextos GSAP se limpian al desmontar o reconstruir efectos. Sin JavaScript, contenido y enlaces permanecen disponibles.

## Assets y comprobaciones

`burger-reference-hero.webp` procede del JPG cerrado del usuario; `menu-doble.webp`, `menu-bacon.webp` y `menu-pollo.webp`, de la URL autorizada. Los cuatro assets están registrados en `docs/asset-manifest.md`. Las capturas suministradas se preservan en `artifacts/lovable-reference/user-hero-reference.png` y `user-menu-reference.png`. Next/Image entrega imágenes optimizadas y responsive; los SVG conservan trazados y colores.

El hero usa cover, posición (58% center) y preload. La revisión independiente detectó pérdida de detalle en (390px) y (320px): `sizes="100vw"` seleccionaba una fuente estrecha para cubrir la altura. El ajuste `sizes="(max-aspect-ratio: 16/9) 164svh, 100vw"` conserva encuadre/overlay y entrega resolución acorde. Las capturas previas quedan como comparación.

`artifacts/lovable-reference/qa.json` pasa cinco vistas: (1905×908), (1440×900), (820×1180), (390×844) y (320×760). Registra cero overflow, errores de ejecución y hallazgos de axe; anclajes válidos y cero canvas. La fuente cubre el ancho calculado en todas las vistas: (1920px) frente a aproximadamente (1382px) en móvil, (1920px) frente a (1245px) en estrecha y (2048px) frente a (1932px) en tablet. Salud: `success: true`, `status: ok`.

`finish-review.md` registra un único ajuste material, la nitidez en retrato. `finish-verdict.md` lo confirma resuelto y sin regresiones en las recapturas, con `remaining: clear` y `disposition: ship`. El veredicto se limita a ese ajuste y a la fidelidad revisada frente a las capturas elegidas.

El detector anterior produjo (101) entradas advisory contra el DESIGN.md previo: (15) de paleta y (86) de escala tipográfica. Incluye CSS legado retirado después del análisis; se conserva como evidencia histórica y no hubo segundo pase. La escala no se amplía para justificar cada entrada. DESIGN.md y su sidecar registran patrones vigentes y la convivencia entre referencia y secciones conservadas.

El build final fue confirmado tras el ajuste de resolución. Los resultados de lint, tipos, pruebas y formato del conjunto se registran en la documentación de validación; esta auditoría recoge contratos visuales y evidencia de revisión.

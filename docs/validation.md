# Validación de la landing

## Preparación de la subida a Nexo — 12 de octubre de 2026

- Remoto verificado: `git@github.com:nexoconsultingbusiness-ctrl/domogurgers.git`, rama `main`. GitHub confirmó por SSH la cuenta `nexoconsultingbusiness-ctrl`; autor Git `nexoconsultingbusiness-ctrl <nexo.consulting.business@gmail.com>`. Antes de preparar el commit, la rama local y `origin/main` estaban sincronizadas.
- La invitación final usa la nueva imagen suministrada, optimizada a WebP sin recortes. Revisión visual en móvil 390×844 y escritorio 1440×900: imagen completa y proporcionada, cargada correctamente, sin desbordamiento; el botón conserva su destino `/catalogo`. Evidencia local: `artifacts/final-invitation/mobile.png` y `desktop.png`.
- La auditoría detectó alertas en [Sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) y [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). Se actualizaron únicamente esas dependencias transitivas y los binarios de Sharp a versiones compatibles: Sharp 0.35.5 y source-map-js 1.2.2, sin cambiar las dependencias declaradas en `package.json`. `npm audit --omit=dev --audit-level=high` final: cero vulnerabilidades.
- Después de los parches, `npm run check` pasó lint, tipos, las 18 pruebas y build de producción. `npm run format:check` y `git diff --check` también pasaron.

## Fotografías del catálogo — 12 de octubre de 2026

- Se asignaron las fotos aportadas a las 17 hamburguesas y `Portada.png` al hero del catálogo. Las 20 copias WebP completas conservan las dimensiones nativas; cinco vistas de presentación retiran espacio alrededor de las hamburguesas verticales y se muestran completas. Carnalita conserva una toma alternativa y Porteña queda pendiente de precio e ingredientes. [Asignaciones y calidad](product-photos.md).
- Next.js sirve estas imágenes en calidad 90. La selección responsive contempla el recorte de las fotos horizontales en las tarjetas y la altura del hero móvil para solicitar suficiente resolución en pantallas de alta densidad.
- `npm run check` pasó lint, tipos, las 18 pruebas y build; `npm run format:check` pasó. Chrome/Playwright comprobó las 17 fotos en escritorio 1440×1000 y móvil 390×844, ambos a densidad 2: asignación por nombre, portada, detalle, miniaturas del carrito y tres destacados de la página principal. Sin errores JavaScript, recursos HTTP fallidos ni desbordamiento en las vistas revisadas.
- Evidencia local: `artifacts/product-photos/asset-manifest.json`, `browser-results.json` y capturas de hero, tarjetas, detalles y carrito. Las fuentes PNG permanecen sin modificar. El sitio sigue disponible localmente en http://127.0.0.1:3001/catalogo.
- Revisión visual independiente final: **ship**, sin bloqueadores. Philadelphia conserva margen sobre el pan tras renovar la ruta de su vista de presentación.
- Corrección posterior solicitada por el usuario: las tarjetas de Churry, Carnalita, Gringa, Philadelphia y Piña llenan el marco 4:3 con `cover`, como Bacon Cheese. Se ajustó la posición de tres encuadres; detalle y miniaturas conservan su presentación completa. Chrome/Playwright confirmó las 17 tarjetas con `cover` y comparó seis fotos en escritorio y móvil, sin barras, deformación, desbordamiento ni errores de carga. Calidad 90 conservada; lint, tipos, build y formato correctos. Revisión independiente: **ship**. Evidencia: `artifacts/product-photo-fill/`.

## Menú real, catálogo y combos — 12 de octubre de 2026

- Se transcribieron 58 opciones de ocho fotos suministradas: 17 hamburguesas, 3 perros/choripán, 2 picadas, 4 entradas, 2 infantiles, 13 adicionales, 13 bebidas y 4 micheladas. La fuente única es `menu-data.json`; los espacios para fotos quedan reservados por instrucción del usuario. [Registro completo](menu-digitization.md).
- El usuario confirmó el combo de $10.500 como opción para cualquier producto. Se verificaron líneas separadas por bebida, fusión de opciones iguales, cantidades, edición, eliminación, recargo por unidad y persistencia al recargar.
- `npm run check` pasó: lint, TypeScript, 18 pruebas y build. `npm run format:check` pasó. Las pruebas cubren la carta y los combos, incluidos datos de carrito manipulados.
- Chrome/Playwright comprobó 1440×1000, 390×844 y 320×760: categorías, búsqueda por nombre/ingredientes sin tildes, precios, detalle, combinación de productos solos y combos, carrito, Escape, devolución de foco y enlaces desde la portada. Cero errores JavaScript y cero desbordamientos en las vistas revisadas.
- Axe detectó cero infracciones WCAG A/AA en el menú, detalle y carrito de escritorio, y en el carrito móvil y compacto. El envío de WhatsApp se interceptó localmente para revisar nombre, bebida, cantidades y total; no se envió un pedido.
- Evidencia local: `artifacts/menu-digitization/results.json`, capturas de menú, bebidas, combo, carrito y portada. El detector de diseño se ejecutó una sola vez; emitió avisos sobre Arial heredada y tamaños/tonos locales, sin cambiar la identidad que fija la referencia existente.
- Revisión independiente final: **disposition: ship**, sin correcciones materiales de interfaz. Se actualizaron las referencias factuales a la carta provisional en DESIGN.md, conservando el sistema visual existente.
- Servidor de desarrollo para revisión: http://127.0.0.1:3001; `/catalogo` responde HTTP 200. No se subieron cambios al repositorio ni se realizó un despliegue remoto.

## Preparación para GitHub y Vercel — 5 de octubre de 2026

- Acceso SSH confirmado como `nexoconsultingbusiness-ctrl` al repositorio `nexoconsultingbusiness-ctrl/domogurgers`.
- `npm run format:check` y `npm run check` pasaron: formato, lint, tipos, seis pruebas y build de producción.
- `npm audit --omit=dev --audit-level=high`: cero vulnerabilidades detectadas.
- El formato utiliza la lista de archivos del proyecto reconocidos por Git y evita recorrer las herramientas de `tmp`.
- `.gitattributes` normaliza los finales de línea para Windows y Linux. El conjunto de archivos a subir excluye entornos privados, dependencias instaladas, builds y temporales.
- El módulo de historia se retiró; comprobación en 1440×900 y 390×844 sin anclas rotas ni desbordamiento. Los enlaces de sedes apuntan al pie de página.
- Configuración de importación y límites de la carta provisional documentados en [deployment.md](deployment.md). Estas comprobaciones locales no afirman un despliegue remoto realizado.

## Rediseño de referencia Lovable — 5 de octubre de 2026

- Solicitud: reproducir el hero y la carta de https://burger-bites-bloom.lovable.app/ con las capturas elegidas por el usuario.
- Hero fotográfico estático con el JPG cerrado suministrado, encabezado compacto, titular blanco/oro y dos acciones. Tres tarjetas con fotos exactas de la referencia, precios de ejemplo y aviso visible de carta provisional.
- `npm run check` pasó lint, tipos, las seis pruebas existentes y el build. Después del ajuste de tipografía y limpieza de los estilos retirados, el build final y ESLint de los TSX cambiados también pasaron; Prettier verificó los archivos de UI.
- QA final en 1905×908, 1440×900, 820×1180, 390×844 y 320×760: cero desbordamientos, cero errores de página o respuestas HTTP fallidas y cero infracciones axe de WCAG A/AA detectadas. Los anclajes del menú y las sedes funcionan; el cambio de movimiento reducido conserva la posición y el contenido permanece visible sin JavaScript.
- El hero actual no monta canvas ni `HeroScroll`. La franja anterior deja de interponerse entre el hero y la carta; el resto del relato de marca se conserva.
- Evidencia: `artifacts/lovable-reference/qa.json`, capturas `*-hero.png`, `*-menu.png`, `*-sedes.png`, regiones de comparación de 1905px y `mobile-no-js.png`.
- Detector ejecutado una sola vez: 101 avisos de colores y tamaños contra DESIGN.md anterior; incluye reglas del diseño retirado que se limpiaron después. No se anunciaron como cero hallazgos ni se volvió a ejecutar el detector. La documentación registra el sistema construido.
- La revisión visual independiente se guarda en `artifacts/lovable-reference/finish-review.md`; el veredicto final de `finish-verdict.md` es **ship**, sin pendientes materiales. Las capturas proporcionadas por el usuario son el estándar de fidelidad.
- El único ajuste de la revisión fue la nitidez del recorte vertical del hero: `sizes` ahora considera su altura, conservando el mismo asset. La QA final confirma recursos de 1920px para móvil y vista estrecha, frente a los 1382px y 1245px necesarios para cubrirlos; tablet selecciona 2048px frente a 1932px necesarios. Las recapturas conservaron composición y controles.
- Preview de producción local: http://127.0.0.1:3000/#inicio, health 200. No se publicó externamente ni se incorporó un flujo de pedidos.
- Lighthouse no se volvió a medir para este rediseño. Las métricas posteriores de este documento corresponden a entregas históricas.

Comprobación local del 2 de octubre de 2026 (America/Bogota), sobre Next.js 16.3.8 servido en http://127.0.0.1:3000.

## Comprobaciones automáticas

En la validación del rediseño inicial, `npm run check` pasó: ESLint sin advertencias, generación de tipos, TypeScript, seis pruebas y build de producción. El detector de diseño no registró hallazgos en aquella entrega. La instalación del parche Next.js y eslint-config-next 16.3.8 reportó cero vulnerabilidades. Las comprobaciones posteriores de carta y hero se registran en sus secciones correspondientes.

## Hero y rediseño inicial

La adaptación a la captura aportada usa Barlow Condensed local 400/700, titular de tres líneas oro/oro/blanco, cabecera compacta, fotografía panorámica y CTA redondeado. Una tanda visual y una confirmación tras corregir la unión del fondo y la descripción: hamburguesa completa, sin solapamientos ni overflow. Revisión independiente: **PASS**.

Chrome local, Playwright y axe comprobaron escritorio 1440 × 900, tableta 820 × 1180, móvil 390 × 844 y ancho compacto de 320px. Sin incidencias WCAG A/AA, errores JavaScript ni respuestas HTTP fallidas. Enlace de salto, navegación, cierre por Escape con devolución de foco y cierre del menú al pasar a escritorio correctos. El contenido permanece visible sin JavaScript. Tilt y parallax respetan movimiento reducido y se desactivan al cambiar esa preferencia en vivo.

Los contratos HTTP se conservaron: health 200 con JSON original y no-store; API v1 200; ruta ausente 404 con NOT_FOUND; POST a health 405; X-Frame-Options DENY.

## Carta provisional

Se añadieron seis entradas ilustrativas en #carta, reutilizando las dos fotografías disponibles. La sección identifica nombres, ingredientes y precios COP como ejemplos, y las fotografías como conceptuales. Hero, encabezado, menú móvil y pie enlazan a la carta.

`npm run check` pasó para la integración. Después de alinear los precios mediante alturas naturales, el build final y TypeScript también pasaron. El servidor propio se detuvo para ese build y se reinició después.

Playwright y axe verificaron 1440 × 900, 820 × 1180, 390 × 844 y 320 × 760: seis fotografías cargadas, retícula de 3/2/2/1 columnas, sin overflow, sin incidencias WCAG A/AA ni errores de navegador. CTA por teclado, enlaces Carta, cierre del menú al navegar y Escape con devolución de foco correctos. Detector de layout sin hallazgos.

Revisión independiente: **PASS**. Fotos completas y lectura clara; el ajuste de alineación de precios en móvil se confirmó en la segunda y última tanda. Evidencia actual: `artifacts/menu/qa.json` y capturas de sección y viewport. Documentación de diseño y alcance sincronizada.

Durante el cierre, el disco llegó al límite de espacio y dejó vacío este informe. Se liberó únicamente la caché regenerable `.next/cache/turbopack` (126.067.181 bytes), y se reconstruyó el informe con la evidencia registrada. Código, assets y build servido conservados.

## Hero con cierre asociado al scroll

Actualización del mismo día: nuevo fondo aportado, hamburguesa con transparencia y secuencia derivada del video del usuario. El hero usa un recorrido sticky nativo breve, con cierre en el primer 85% y mantenimiento del final con descenso de 20px en el tramo restante. El póster estático mantiene la composición sin JavaScript, ante un error de carga o con movimiento reducido. El MP4 fuente no forma parte de las descargas de la página.

La secuencia preparada consta de 65 fotogramas de 640 × 800 px, 2,357,730 bytes en total; móvil solicita 33 fotogramas pares. El almacén limita la decodificación a diez bitmaps y las descargas a cuatro simultáneas. Las cifras proceden de la metadata de assets y del código, no de una medición de rendimiento de usuarios.

`npm run check` pasó para esta integración: lint, TypeScript, seis pruebas y build de producción. El detector de diseño emitió avisos sobre tonos y tamaños fuera de los tokens compartidos, incluidos el carbón vino del hero y escalas tipográficas locales. Esos avisos no equivalen a cero hallazgos ni a una prueba visual; se conserva el informe para revisar la intención de cada escala en la revisión final.

La revisión de comportamiento detectó una regresión al activar movimiento reducido bajo el hero: el refresco de `ScrollTrigger.matchMedia` podía restaurar el scroll a cero cuando cambiaba la altura sticky. Se sustituyó esa capa por `IntersectionObserver` para entradas, RAF para parallax y listeners nativos de media queries, conservando GSAP diferido para animar, los reveals de una sola ejecución, el tilt de 3° y el parallax limitado a 36px. La última ejecución completa de `npm run check` pasó después de este ajuste; el build final con fallback CSS también pasó.

QA final de Chrome, Playwright y axe: **PASS** en 1440 × 900, 820 × 1180, 390 × 844, 375 × 667 y 320 × 760. Se comprobaron los estados abierto, intermedio, cierre, descenso, salida y reversa mediante el canvas real: el pan desciende más de 50px y regresa al fotograma inicial. Sin overflow, incidencias WCAG A/AA ni errores JavaScript o HTTP. CTA por teclado, carga directa de #carta y regreso al hero correctos. La alternativa estática se comprobó sin JavaScript, con carga fallida y con movimiento reducido inicial y en vivo; este último conserva la posición de la carta. Health devuelve 200 y su JSON original. Evidencia: `artifacts/hero-video/qa-scroll.json` y capturas de cada estado.

Revisión independiente final: **disposition: ship**. P1 de desplazamiento resuelto. El borde claro leve del recorte del video original queda aceptado como P2 del material suministrado; no afecta lectura ni interacción. No se añadieron nuevos requisitos de diseño ni se reabrió el pulido visual.

Durante la preparación el disco volvió a quedarse sin espacio y se truncó `globals.css`. Se recuperaron sus estilos del CSS compilado del build anterior, se formatearon y se verificaron con el build y la revisión visual. Se eliminaron únicamente temporales regenerables del proyecto: paquetes de QA anteriores que ya no se usan y la carpeta `.next/dev`. La comprobación final no encontró archivos vacíos en `src` ni en `docs`.

## Rendimiento de laboratorio anterior

Lighthouse 12.8.2 sobre Chrome y el rediseño inicial, antes de adaptar el hero y añadir la carta. Estas cifras no se han vuelto a medir tras esos cambios:

| Vista      | Rendimiento | Accesibilidad | Buenas prácticas | SEO |    LCP | CLS |     TBT |
| ---------- | ----------: | ------------: | ---------------: | --: | -----: | --: | ------: |
| Móvil      |          97 |           100 |              100 |  69 | 2,60 s |   0 | 30,5 ms |
| Escritorio |         100 |           100 |              100 |  69 | 0,65 s |   0 |    0 ms |

El único audit SEO fallido fue is-crawlable: local conserva noindex,nofollow y robots disallow intencionalmente. Los informes anteriores están en `artifacts/redesign/lighthouse-{mobile,desktop,summary}.json`. La primera medición se descartó por coincidir con una recompilación; las cifras corresponden al servidor reiniciado y estable.

Son mediciones de laboratorio, no datos de usuarios reales. La comprobación automática no sustituye pruebas con lectores de pantalla y dispositivos físicos. El SEO indexable depende del origen HTTPS de producción configurado.

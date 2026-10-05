# Arquitectura y límites de la primera entrega

```text
Navegador → Vercel CDN → Next.js App Router
                          ├─ Portada estática / Server Components
                          ├─ next/image / next/font local
                          └─ Route Handlers (Node.js)
                               └─ Servicios de servidor
```

Integración nativa de Next.js en Vercel. No necesita Express, servidor persistente, Docker, `output: export` ni `vercel.json`.

## Renderizado y caché

La portada, sitemap y robots se generan estáticamente en build. La capa opcional `LandingMotion` es el límite cliente activo; las secciones y el encabezado permanecen como Server Components. `LandingMotion` importa solo GSAP de forma diferida: `IntersectionObserver` activa las entradas y un `WeakSet` conserva las ya reveladas; RAF calcula el parallax y los listeners nativos de media queries reconstruyen los efectos. Parallax de hasta 36px y tilt de hasta 3° se limitan a escritorio y a piezas de marca existentes; el hero fotográfico no recibe esos efectos. Se respetan cambios de movimiento reducido y se limpian observers, listeners, frames y contextos con `context.revert()`.

El rediseño del 5 de octubre de 2026 reproduce el hero y las tres tarjetas de la referencia Lovable. El hero usa la fotografía cerrada suministrada, optimizada a WebP; `next/image` la precarga a tamaño responsive. La carta usa tres WebP de la referencia con carga diferida. La cabecera se posiciona sobre el hero y el scroll continúa de forma nativa, sin altura adicional. En móvil se presenta el enlace directo «Ver menú» y las tarjetas se apilan en una columna. Los nombres, ingredientes y precios siguen siendo ejemplos provisionales; los enlaces no ejecutan pedidos.

La referencia declara Montserrat pero no carga ningún FontFace, por lo que hero, cabecera y carta reproducen su Arial efectivamente visible. Montserrat local conserva el resto de las secciones mediante `next/font/local`, sin peticiones a Google. `HeroScroll`, `MobileNavigation`, Barlow Condensed y la secuencia anterior permanecen como material previo sin montarse ni descargarse en la portada actual.

El módulo `BrandStory` se retiró de la portada por solicitud del usuario. La sección de detalles continúa directamente al cierre; `#sedes` identifica el pie de página con las ciudades confirmadas de Maní y Yopal. No quedan enlaces activos a `#historia` ni `#origen`.

`/api/health` usa Node.js y `Cache-Control: no-store`, para verificar la función desplegada. `/api/v1` es una respuesta de infraestructura sin datos personalizados. No hay peticiones dinámicas innecesarias en la portada. Cuando exista catálogo, definir su revalidación; no desactivar toda la caché. Los datos personalizados requerirán lecturas dinámicas y autorización.

## API

Servicios en `src/server/services`, protegidos por `server-only`; contrato discriminado en `src/types/api.ts` y helpers en `src/lib/api-response.ts`. Health usa el formato exacto solicitado, excepción deliberada al envelope de v1. Rutas desconocidas bajo `/api/v1/*`: 404 JSON. Métodos no implementados en rutas existentes: 405 nativo de Next.js.

## Entornos y SEO

Zod valida `SITE_URL` y hosts Vercel. Preview usa el host de la rama, `noindex`, robots disallow y sitemap vacío. Production usa `SITE_URL` o el host de producción de Vercel. Local usa localhost, sin indexación. Cambiar las variables de metadatos estáticos requiere redeploy. No se deduce el dominio de una cabecera Host del visitante.

## Seguridad

Sin operaciones de escritura, autenticación ni PII en esta etapa. Cabeceras contra embedding, MIME sniffing y permisos innecesarios. CSP inicial con `frame-ancestors`, `object-src` y `base-uri`; no es una política completa de ejecución de scripts. Una CSP estricta se evaluará al añadir integraciones, considerando sus efectos sobre el renderizado estático.

Arquitectura preparada no equivale a autenticación, protección de pagos o rate limiting implementados. Antes de exponer endpoints de negocio, cumplir `src/server/README.md` e incorporar un limitador distribuido donde corresponda.

## Evolución sin implementaciones vacías

- Catálogo: modelos, repositorio, servicio, Zod y GET `/api/v1/products`.
- Persistencia: PostgreSQL, pooling, cliente único de Prisma y migraciones versionadas; nunca migraciones por request ni filesystem persistente.
- Operaciones protegidas: proveedor de autenticación, roles y permisos comprobados en servidor.
- Pedidos/pagos: precios calculados en servidor, idempotencia y webhooks firmados.
- Formularios: valorar React Hook Form cuando existan formularios complejos.
- Observabilidad: código de error, request ID y duración; no secretos ni cuerpos personales.

No se crearon tablas, usuarios, dashboards ni endpoints con datos ficticios.

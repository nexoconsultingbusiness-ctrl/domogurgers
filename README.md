# DomoBurgers

Base web full stack con Next.js, preparada para el flujo **GitHub → Vercel Preview → Vercel Production**. Incluye una portada responsive basada en la identidad real de DomoBurgers, API de infraestructura y una estructura modular para crecer.

La portada incluye una carta provisional de tres hamburguesas. No implementa pedidos, pagos, usuarios ni base de datos; los nombres, ingredientes y precios visibles son ejemplos identificados como tales.

## Requisitos y arranque

- Node.js **22.x**, definido en `.nvmrc` y `package.json`.
- npm y Git.
- No se necesitan claves, base de datos ni servicios externos para ejecutar la base.

```bash
npm ci
npm run dev
```

Abrir <http://localhost:3000>. Crear `.env.local` a partir de `.env.example` solo si se quiere configurar un dominio. Los archivos de entorno privados se excluyen de Git.

```bash
npm run lint          # ESLint
npm run typecheck     # tipos de rutas Next.js + TypeScript estricto
npm run test          # límites de configuración y contratos de API
npm run build        # compilación de producción
npm start            # comprobar localmente el build generado
npm run check        # lint + tipos + pruebas + build
npm run format:check # Prettier
```

`npm start` es una herramienta de comprobación local. En Vercel la aplicación usa su integración nativa y funciones serverless, sin un proceso Node separado permanente.

## Tecnologías y dependencias

| Dependencia                             | Función                                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Next.js 16.3.8                          | App Router, Server Components, Route Handlers, SEO, imágenes y fuentes optimizadas                                 |
| React / React DOM 19.3.0                | Server Components, navegación móvil y capa opcional de movimiento cliente                                          |
| TypeScript 5                            | Tipado estricto y contratos de módulos/API                                                                         |
| Tailwind CSS 4 + `@tailwindcss/postcss` | Sistema de estilos y tokens de marca                                                                               |
| Zod 4                                   | Validación runtime de variables de entorno; base para futuras entradas de API                                      |
| `server-only`                           | Evita importar accidentalmente servicios/configuración de servidor en componentes cliente                          |
| ESLint + `eslint-config-next`           | Reglas de React, Next.js, accesibilidad y TypeScript                                                               |
| Prettier                                | Formato consistente                                                                                                |
| `tsx` + `node:test`                     | Pruebas TypeScript sin un framework adicional de tests                                                             |
| GSAP                                    | Reveals con IntersectionObserver y perspectiva de escritorio; carga diferida, scroll natural y movimiento reducido |
| `@types/*`                              | Definiciones TypeScript para Node y React                                                                          |

Las versiones exactas resueltas se fijan en `package-lock.json`. No hay Express, Prisma, PostgreSQL, SDK de pagos ni React Hook Form instalados: se incorporarán cuando una funcionalidad lo justifique.

## Estructura

```text
src/
  app/
    (public)/page.tsx        Portada estática
    api/health/route.ts      Health check Node.js
    api/v1/                 API versionada y 404 JSON
    layout.tsx              Layout, fuentes y metadata
    globals.css             Sistema visual responsive
    robots.ts / sitemap.ts  Indexación por entorno
    error.tsx / not-found.tsx
  assets/fonts/             Montserrat local y licencia OFL
  components/layout/        Cabecera, pie, navegación móvil
  components/ui/            Iconos compartidos
  features/brand/           Hero, carta provisional y presentación de marca
  config/                   Entorno validado y configuración del sitio
  lib/                      Helpers de respuesta API
  server/services/          Servicios exclusivos de servidor
  types/                    Contratos API
  validations/              Esquemas Zod y resolución de origen
public/
  brand/                    Logos originales extraídos del PDF
  images/                   Fotografías y composiciones optimizadas
tests/                      Pruebas de contratos y casos límite
docs/                       Arquitectura, assets, generación y validación
.github/workflows/ci.yml     Comprobaciones para ramas/PR
```

La estructura crece con casos reales; no hay carpetas vacías para funciones que aún no existen. Ver [arquitectura](docs/architecture.md) y [reglas del servidor](src/server/README.md).

## Endpoints

| Método y ruta                                | Estado | Respuesta                                               |
| -------------------------------------------- | ------ | ------------------------------------------------------- |
| `GET /api/health`                            | 200    | `{"success":true,"status":"ok","service":"web-api"}`    |
| `GET /api/v1`                                | 200    | Envelope con nombre de API, versión y endpoint de salud |
| `/api/v1/recurso-inexistente`                | 404    | Envelope de error con código `NOT_FOUND`                |
| Métodos no implementados en rutas existentes | 405    | Respuesta nativa Next.js                                |

Formato v1:

```json
{ "success": true, "data": {}, "message": null }
```

```json
{
  "success": false,
  "data": null,
  "message": "El recurso solicitado no existe.",
  "error": { "code": "NOT_FOUND" }
}
```

El health check responde sin caché y verifica la disponibilidad de la aplicación; no comprueba una base de datos porque no hay ninguna conectada.

## Variables de entorno

| Variable                        | Requisito                                       | Uso                                                                                                 |
| ------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `SITE_URL`                      | Opcional localmente; recomendable en Production | Origen HTTPS del dominio real para canonical, Open Graph y sitemap; sin ruta, query ni credenciales |
| `VERCEL_ENV`                    | Automática de Vercel                            | Distingue production, preview y development                                                         |
| `VERCEL_URL`                    | Automática de Vercel                            | Origen del deployment, especialmente Preview                                                        |
| `VERCEL_PROJECT_PRODUCTION_URL` | Automática de Vercel                            | Fallback de producción si no se define `SITE_URL`                                                   |

No se requiere ninguna variable `NEXT_PUBLIC_`. Las credenciales futuras nunca deben usar ese prefijo. Preview y local tienen `noindex`; Preview usa su propio dominio aunque exista un `SITE_URL` de producción. Los cambios de variables requieren un nuevo deployment para actualizar las páginas estáticas.

## GitHub y Vercel

El repositorio de destino es [nexoconsultingbusiness-ctrl/domogurgers](https://github.com/nexoconsultingbusiness-ctrl/domogurgers), con remoto SSH `git@github.com:nexoconsultingbusiness-ctrl/domogurgers.git`. Se verificó la autenticación SSH de la cuenta nexoconsulting para este trabajo. El procedimiento y el estado de publicación se registran en [despliegue](docs/deployment.md).

1. Subir el proyecto a `main` en ese repositorio, incluyendo `package-lock.json`. No incluir `.env.local`, `node_modules`, `.next`, `tmp` ni `artifacts`.
2. En Vercel, **Add New → Project → Import Git Repository** y elegir `nexoconsultingbusiness-ctrl/domogurgers`.
3. Mantener el preset **Next.js**, raíz del proyecto `.`, Node **22.x**, instalación `npm ci`, build `npm run build` y rama de producción `main`; Vercel detecta la salida de Next.js automáticamente.
4. Configurar `SITE_URL` con el origen del dominio real para **Production**, o usar inicialmente el dominio de producción asignado por Vercel. Separar credenciales futuras entre Development, Preview y Production.
5. Una rama o Pull Request produce un Preview Deployment. Revisar su portada y `/api/health`.
6. Activar como obligatorias las comprobaciones de GitHub antes del merge. Un merge a `main` dispara el deployment de producción.

No se necesita `vercel.json`. Estas instrucciones describen la configuración del proyecto; consultar el registro de despliegue para confirmar los commits publicados y el deployment realizado.

## Identidad y contenido

Paleta original: negro `#000000`, blanco `#FFFFFF`, oro `#EFC008`, vino `#722F37` y plata `#C0C0C0`. Los logos preservan los trazados originales del PDF, incluida la grafía «D’omo Burgers»; el nombre del proyecto solicitado es DomoBurgers. Montserrat se sirve localmente con licencia SIL OFL 1.1. No se han redistribuido las fuentes Blenda Script y Sweet Pea sin una licencia web verificable; su lettering se conserva donde ya forma parte del logo vectorial original.

La portada reproduce el hero y la carta de la referencia Lovable elegida por el usuario: fotografía a pantalla completa, titular blanco y oro, controles rectangulares y tres tarjetas. El hero actual es estático; GSAP añade movimiento opcional en las secciones inferiores, sin ScrollTrigger. La cabecera, el hero y la carta usan Arial para coincidir con el aspecto renderizado de la referencia; las otras secciones conservan Montserrat.

La fotografía actual del hero fue suministrada por el usuario. La carta indica que sus nombres, ingredientes y precios en COP son provisionales y que las imágenes son conceptuales. Los botones de pedido llevan a esa carta; no crean pedidos.

El módulo de historia «De Maní. Para compartir.» ya no está montado en la portada. La información de origen procede del manual de marca y permanece documentada; el pie conserva las ciudades Maní y Yopal. No se han añadido contactos, direcciones ni horarios de ejemplo.

La [procedencia de las imágenes](docs/image-generation.md) está documentada. Ver también el [manifiesto de assets](docs/asset-manifest.md) y la [auditoría del rediseño](docs/frontend-audit.md).

## Validación y límites

Ver resultados concretos en [docs/validation.md](docs/validation.md). La automatización CI ejecuta formato, lint, tipos, pruebas y build.

La configuración oficial de Next.js usada aquí todavía incluye un plugin React incompatible con ESLint 10. Se fija ESLint 9.39.5, compatible y comprobado; npm muestra un aviso de fin de soporte de esa línea. Actualizarlo junto con los plugins cuando sean compatibles, sin forzar una versión que rompa lint.

No hay persistencia, autenticación, rate limiting distribuido ni integración de pedidos/pagos activos. No son necesarios para esta portada y API de infraestructura; son requisitos a implementar antes de abrir operaciones de negocio. La base no contiene secretos.

**Siguiente paso:** aprobar el contenido visual y aportar carta, precios, fotos, direcciones, horarios y canales oficiales para definir el catálogo y el flujo de pedidos.

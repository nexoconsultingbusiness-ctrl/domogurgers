# Despliegue de DomoBurgers

## Repositorio

- GitHub: https://github.com/nexoconsultingbusiness-ctrl/domogurgers
- Remoto SSH: `git@github.com:nexoconsultingbusiness-ctrl/domogurgers.git`
- Cuenta autorizada: `nexoconsultingbusiness-ctrl`.
- Rama de producción: `main`.

El proyecto incluye código, imágenes optimizadas, fuentes locales y el lockfile de npm. `.gitignore` excluye secretos, dependencias instaladas, builds, herramientas temporales, capturas de revisión y la configuración local de Vercel.

## Comprobaciones previas

```bash
npm ci
npm run format:check
npm run check
npm audit --omit=dev --audit-level=high
```

GitHub Actions ejecuta formato, lint, tipos, pruebas y compilación en Node 22 para `main` y los Pull Requests. El comando de formato utiliza los archivos del proyecto reconocidos por Git para no recorrer herramientas temporales.

## Configuración en Vercel

Importar el repositorio desde la cuenta o equipo de Nexo Consulting:

| Ajuste            | Valor                       |
| ----------------- | --------------------------- |
| Framework preset  | Next.js                     |
| Root directory    | Raíz del repositorio (`.`)  |
| Node.js           | 22.x                        |
| Install command   | `npm ci`                    |
| Build command     | `npm run build`             |
| Output directory  | Valor automático de Next.js |
| Production branch | `main`                      |

No necesita `vercel.json`, exportación estática, base de datos ni credenciales de servicios externos. Vercel administra las rutas de Next.js y sus funciones API.

`SITE_URL` es opcional al comenzar con el dominio de Vercel. Para un dominio propio, configurarlo únicamente en Production con su origen HTTPS, por ejemplo `https://dominio.com`, y volver a desplegar. Las variables `VERCEL_ENV`, `VERCEL_URL` y `VERCEL_PROJECT_PRODUCTION_URL` las aporta Vercel. Preview permanece sin indexación; los metadatos de Production utilizan el dominio de producción.

## Verificación tras el despliegue

- Portada `/`: imágenes, carta y navegación en escritorio y móvil.
- `/api/health`: HTTP 200 y `{"success":true,"status":"ok","service":"web-api"}`.
- `/robots.txt` y `/sitemap.xml`: dominio correcto y reglas del entorno.
- `/api/v1/recurso-inexistente`: HTTP 404 en JSON.
- Git conectado: los cambios posteriores a `main` generan nuevos deployments de producción.

## Alcance publicado

La landing está preparada técnicamente para Vercel. La carta conserva nombres, ingredientes y precios provisionales identificados en la página. «Pedir ahora» lleva a la carta; todavía no existe un sistema de pedidos. Las sedes solo muestran las ciudades confirmadas de Maní y Yopal. Para publicar una carta comercial definitiva hacen falta los datos y canales oficiales de la marca.

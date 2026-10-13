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

`/catalogo` utiliza por defecto el WhatsApp comercial +57 3213390551 confirmado por el usuario el 8 de octubre de 2026. Opcionalmente, `WHATSAPP_NUMBER` sustituye ese contacto común y `WHATSAPP_MANI_NUMBER` y `WHATSAPP_YOPAL_NUMBER` permiten definir uno por sede, en formato internacional con sólo dígitos. Las variables vacías usan el contacto de respaldo; las no vacías e inválidas deshabilitan el envío afectado. Volver a desplegar después de cambiar estas variables. Consultar [catalog.md](catalog.md) para la precedencia, la carta real y los combos.

## Verificación tras el despliegue

- Portada `/`: imágenes, carta y navegación en escritorio y móvil.
- `/catalogo`: detalle desde una tarjeta de la portada, búsqueda, filtros, cantidades, persistencia del carrito y validación de entrega. Revisar el destinatario y texto de WhatsApp sin enviar pedidos reales durante la prueba.
- `/api/health`: HTTP 200 y `{"success":true,"status":"ok","service":"web-api"}`.
- `/robots.txt` y `/sitemap.xml`: dominio correcto y reglas del entorno.
- `/api/v1/recurso-inexistente`: HTTP 404 en JSON.
- Git conectado: los cambios posteriores a `main` generan nuevos deployments de producción.

## Alcance de la entrega

El sitio está preparado técnicamente para Vercel e incluye catálogo, carrito y preparación del pedido por WhatsApp, autorizados el 8 de octubre de 2026. La carta contiene las 58 opciones transcritas del menú suministrado el 12 de octubre, fotografías de las 17 hamburguesas y combos de $10.500 adicionales. La invitación final incorpora la nueva composición elegida por el usuario. «Pedir ahora» abre `/catalogo`; el negocio confirma disponibilidad, total y entrega desde WhatsApp. No hay pagos en línea ni registro de pedidos en servidor. Las sedes solo muestran las ciudades confirmadas de Maní y Yopal; faltan direcciones y horarios. Este documento describe la configuración y no confirma el estado de un despliegue remoto.

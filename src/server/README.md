# Código de servidor

Los servicios importan `server-only` para impedir su uso accidental en componentes cliente. Los Route Handlers validan entradas, autorizan operaciones y delegan aquí; no contienen reglas complejas de negocio.

En esta etapa solo existen servicios de infraestructura. Antes de añadir operaciones de negocio:

- Añadir esquemas Zod en `src/validations` y pruebas de límites y errores.
- Resolver sesión y permisos en servidor antes de llamar al servicio protegido; nunca aceptar roles desde el cliente.
- Para persistencia, escoger PostgreSQL con pooling, una instancia central de Prisma y migraciones versionadas. No usar memoria ni el filesystem como base de datos en Vercel.
- Para endpoints costosos o de escritura, incorporar un limitador distribuido (Redis/proveedor equivalente). No usar contadores en memoria que se reinician por instancia.
- Validar firmas y deduplicar eventos antes de implementar webhooks. No exponer endpoints vacíos que acepten eventos.
- Registrar códigos de error, request ID y duración; no registrar cuerpos, tokens, contraseñas ni datos personales.

No hay autenticación, rate limiting distribuido, DB o webhooks activos en esta primera entrega. Los GET actuales son públicos y no reciben datos del usuario.

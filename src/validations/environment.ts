import { z } from "zod";

const siteUrl = z
  .url()
  .refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
    );
  }, "SITE_URL debe ser un origen HTTP(S), sin rutas ni credenciales.")
  .optional();

const deploymentHost = z
  .string()
  .regex(/^[a-zA-Z0-9.-]+$/, "Host de Vercel inválido.")
  .optional();

export const environmentSchema = z.object({
  SITE_URL: siteUrl,
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  VERCEL_URL: deploymentHost,
  VERCEL_PROJECT_PRODUCTION_URL: deploymentHost,
});

export type Environment = z.infer<typeof environmentSchema>;

export function resolveSiteUrl(env: Environment): URL {
  // A preview must not point its metadata at the production deployment.
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) {
    return new URL(`https://${env.VERCEL_URL}`);
  }
  if (env.SITE_URL) return new URL(env.SITE_URL);
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (env.VERCEL_URL) return new URL(`https://${env.VERCEL_URL}`);
  return new URL("http://localhost:3000");
}

export function canIndexSite(env: Environment): boolean {
  if (env.VERCEL_ENV === "preview" || env.VERCEL_ENV === "development")
    return false;
  const url = resolveSiteUrl(env);
  return (
    url.protocol === "https:" &&
    (env.VERCEL_ENV === "production" || Boolean(env.SITE_URL))
  );
}

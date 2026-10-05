import "server-only";
import { environmentSchema } from "@/validations/environment";

const parsed = environmentSchema.safeParse({
  SITE_URL: process.env.SITE_URL || undefined,
  VERCEL_ENV: process.env.VERCEL_ENV || undefined,
  VERCEL_URL: process.env.VERCEL_URL || undefined,
  VERCEL_PROJECT_PRODUCTION_URL:
    process.env.VERCEL_PROJECT_PRODUCTION_URL || undefined,
});

if (!parsed.success) {
  // Report names, never environment values or secrets.
  const fields = parsed.error.issues
    .map((issue) => issue.path.join("."))
    .join(", ");
  throw new Error(
    `Variables de entorno inválidas: ${fields}. Revisa .env.example.`,
  );
}

export const env = parsed.data;

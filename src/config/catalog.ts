import "server-only";
import { resolveWhatsAppPhones } from "./catalog-phones";

export const catalogSettings = {
  whatsAppPhones: resolveWhatsAppPhones(process.env),
} as const;

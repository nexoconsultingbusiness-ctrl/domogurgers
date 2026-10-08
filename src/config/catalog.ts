import "server-only";
import { normalizeWhatsAppPhone } from "@/features/catalog/order";

// Public business contact confirmed by the user on October 8, 2026.
const fallbackPhone = process.env.WHATSAPP_NUMBER?.trim() || "573213390551";

export const catalogSettings = {
  whatsAppPhones: {
    mani: normalizeWhatsAppPhone(
      process.env.WHATSAPP_MANI_NUMBER?.trim() || fallbackPhone,
    ),
    yopal: normalizeWhatsAppPhone(
      process.env.WHATSAPP_YOPAL_NUMBER?.trim() || fallbackPhone,
    ),
  },
} as const;

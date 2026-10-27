import { normalizeWhatsAppPhone } from "@/features/catalog/order";

// Public business contacts confirmed by the user on October 27, 2026.
const defaultPhones = {
  yopal: "573112567920",
  mani: "573213390551",
} as const;

export function resolveWhatsAppPhones(
  env: Readonly<Record<string, string | undefined>> = {},
) {
  // Each branch has its own fallback; the former shared WHATSAPP_NUMBER is ignored.
  return {
    yopal: normalizeWhatsAppPhone(
      env.WHATSAPP_YOPAL_NUMBER?.trim() || defaultPhones.yopal,
    ),
    mani: normalizeWhatsAppPhone(
      env.WHATSAPP_MANI_NUMBER?.trim() || defaultPhones.mani,
    ),
  };
}

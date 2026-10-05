import { apiSuccess } from "@/lib/api-response";
import { getApiInfo } from "@/server/services/api-service";

export const runtime = "nodejs";

export function GET() {
  return apiSuccess(getApiInfo());
}

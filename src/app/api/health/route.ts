import { getHealth } from "@/server/services/health-service";

export const runtime = "nodejs";

export function GET() {
  return Response.json(getHealth(), {
    headers: { "Cache-Control": "no-store" },
  });
}

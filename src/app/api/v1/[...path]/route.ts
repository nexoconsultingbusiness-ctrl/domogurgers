import { apiError } from "@/lib/api-response";

export const runtime = "nodejs";

function notFound() {
  return apiError("El recurso solicitado no existe.", "NOT_FOUND", 404);
}

export {
  notFound as GET,
  notFound as POST,
  notFound as PUT,
  notFound as PATCH,
  notFound as DELETE,
  notFound as OPTIONS,
};

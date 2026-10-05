import type { ApiFailure, ApiSuccess } from "@/types/api";

export function apiSuccess<T>(
  data: T,
  status = 200,
  message: string | null = null,
): Response {
  return Response.json(
    { success: true, data, message } satisfies ApiSuccess<T>,
    { status },
  );
}

export function apiError(
  message: string,
  code: string,
  status: number,
): Response {
  return Response.json(
    {
      success: false,
      data: null,
      message,
      error: { code },
    } satisfies ApiFailure,
    { status },
  );
}

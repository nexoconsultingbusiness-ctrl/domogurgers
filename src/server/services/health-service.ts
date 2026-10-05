import "server-only";

export function getHealth() {
  return { success: true, status: "ok", service: "web-api" } as const;
}

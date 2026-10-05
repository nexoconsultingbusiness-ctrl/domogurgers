import "server-only";

export function getApiInfo() {
  return {
    name: "DomoBurgers API",
    version: "v1",
    endpoints: { health: "/api/health" },
  } as const;
}

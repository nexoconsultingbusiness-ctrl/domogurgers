import assert from "node:assert/strict";
import test from "node:test";
import { apiError, apiSuccess } from "../src/lib/api-response";

test("API envelope preserves data and semantic status", async () => {
  const response = apiSuccess({ id: "sample" }, 201);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    success: true,
    data: { id: "sample" },
    message: null,
  });
});

test("API errors have a machine code and never leak raw errors", async () => {
  const response = apiError("Recurso no encontrado.", "NOT_FOUND", 404);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    success: false,
    data: null,
    message: "Recurso no encontrado.",
    error: { code: "NOT_FOUND" },
  });
});

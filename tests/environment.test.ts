import assert from "node:assert/strict";
import test from "node:test";
import {
  canIndexSite,
  environmentSchema,
  resolveSiteUrl,
} from "../src/validations/environment";

test("local builds need no secrets and are not indexed", () => {
  const env = environmentSchema.parse({});
  assert.equal(resolveSiteUrl(env).origin, "http://localhost:3000");
  assert.equal(canIndexSite(env), false);
});

test("preview origin overrides production SITE_URL and cannot be indexed", () => {
  const env = environmentSchema.parse({
    SITE_URL: "https://domo.example",
    VERCEL_ENV: "preview",
    VERCEL_URL: "domo-branch.vercel.app",
  });
  assert.equal(resolveSiteUrl(env).origin, "https://domo-branch.vercel.app");
  assert.equal(canIndexSite(env), false);
});

test("production uses the explicit origin, or Vercel's supplied production domain", () => {
  assert.equal(
    resolveSiteUrl({
      SITE_URL: "https://domo.example",
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "domo.vercel.app",
    }).origin,
    "https://domo.example",
  );
  assert.equal(
    resolveSiteUrl({
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "domo.vercel.app",
    }).origin,
    "https://domo.vercel.app",
  );
  assert.equal(
    canIndexSite({
      SITE_URL: "https://domo.example",
      VERCEL_ENV: "production",
    }),
    true,
  );
});

test("invalid origins, credentials, paths and unsafe protocols are rejected", () => {
  for (const value of [
    "invalid",
    "javascript:alert(1)",
    "ftp://example.com",
    "https://u:p@example.com",
    "https://example.com/path",
    "https://example.com?q=x",
    "https://example.com#x",
  ]) {
    assert.equal(
      environmentSchema.safeParse({ SITE_URL: value }).success,
      false,
      value,
    );
  }
  assert.equal(
    environmentSchema.safeParse({ VERCEL_URL: "example.com/path" }).success,
    false,
  );
  assert.equal(canIndexSite({ SITE_URL: "http://localhost:3000" }), false);
});

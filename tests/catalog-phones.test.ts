import assert from "node:assert/strict";
import test from "node:test";
import { resolveWhatsAppPhones } from "../src/config/catalog-phones";
import {
  buildWhatsAppUrl,
  type OrderDetails,
} from "../src/features/catalog/order";

test("changing the selected branch changes the WhatsApp recipient and order label", () => {
  const phones = resolveWhatsAppPhones();
  const cart = [{ productId: "tradicional", quantity: 2 }];
  const details: OrderDetails = {
    customerName: "Cliente de prueba",
    branch: "yopal",
    fulfillment: "pickup",
    address: "",
    notes: "",
  };

  for (const branch of ["yopal", "mani", "yopal"] as const) {
    const url = buildWhatsAppUrl(phones[branch], cart, { ...details, branch });
    assert.ok(url);
    const parsed = new URL(url);
    assert.equal(parsed.origin, "https://wa.me");
    assert.equal(
      parsed.pathname,
      branch === "yopal" ? "/573112567920" : "/573213390551",
    );
    const message = parsed.searchParams.get("text")!;
    assert.match(message, branch === "yopal" ? /Sede: Yopal/ : /Sede: Maní/);
    assert.match(message, /2 × Tradicional/);
    assert.match(message, /Subtotal de productos: \$39\.800 COP/);
  }
});

test("a legacy shared number cannot redirect both branches to the same recipient", () => {
  for (const sharedPhone of ["573213390551", "573001234567", "invalid"]) {
    assert.deepEqual(resolveWhatsAppPhones({ WHATSAPP_NUMBER: sharedPhone }), {
      yopal: "573112567920",
      mani: "573213390551",
    });
  }
});

test("branch overrides are normalized and blanks use that branch's own default", () => {
  assert.deepEqual(
    resolveWhatsAppPhones({
      WHATSAPP_YOPAL_NUMBER: " +57 300 1234567 ",
      WHATSAPP_MANI_NUMBER: "  ",
    }),
    { yopal: "573001234567", mani: "573213390551" },
  );
  assert.deepEqual(
    resolveWhatsAppPhones({
      WHATSAPP_YOPAL_NUMBER: "",
      WHATSAPP_MANI_NUMBER: "+57 (300) 765-4321",
    }),
    { yopal: "573112567920", mani: "573007654321" },
  );
});

test("an invalid branch override disables only that branch without rerouting it", () => {
  assert.deepEqual(
    resolveWhatsAppPhones({ WHATSAPP_YOPAL_NUMBER: "invalid" }),
    { yopal: null, mani: "573213390551" },
  );
  assert.deepEqual(resolveWhatsAppPhones({ WHATSAPP_MANI_NUMBER: "invalid" }), {
    yopal: "573112567920",
    mani: null,
  });
});

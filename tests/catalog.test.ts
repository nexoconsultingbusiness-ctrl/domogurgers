import assert from "node:assert/strict";
import test from "node:test";
import { catalogProducts } from "../src/features/catalog/catalog-data";
import {
  MAX_ITEM_QUANTITY,
  addToCart,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getCartSummary,
  normalizeCart,
  normalizeWhatsAppPhone,
  removeFromCart,
  setCartQuantity,
  validateOrderDetails,
  type OrderDetails,
} from "../src/features/catalog/order";

const details: OrderDetails = {
  customerName: "María & José",
  fulfillment: "delivery",
  branch: "mani",
  address: "Calle 4 # 8-10, Maní",
  notes: "Sin cebolla & salsa aparte",
};

test("restoring a cart ignores malformed and unknown entries and merges bounded quantities", () => {
  assert.deepEqual(
    normalizeCart([
      null,
      false,
      "domo-doble",
      { productId: "unknown", quantity: 1 },
      { productId: "domo-doble", quantity: -1 },
      { productId: "domo-doble", quantity: 0 },
      { productId: "domo-doble", quantity: 1.5 },
      { productId: "domo-doble", quantity: "3" },
      { productId: "domo-doble", quantity: Infinity },
      { productId: "domo-doble", quantity: NaN },
      { productId: "domo-doble", quantity: Number.MAX_VALUE },
      { productId: "domo-doble", quantity: 90 },
      { productId: "domo-doble", quantity: 20 },
      { productId: "bacon-royal", quantity: 2 },
    ]),
    [
      { productId: "domo-doble", quantity: MAX_ITEM_QUANTITY },
      { productId: "bacon-royal", quantity: 2 },
    ],
  );
  assert.deepEqual(normalizeCart({ items: [] }), []);
  assert.deepEqual(normalizeCart(undefined), []);
});

test("subtotal uses only the current catalog, even when persisted metadata is tampered with", () => {
  const cart = normalizeCart([
    { productId: "domo-doble", quantity: 2, price: 1, name: "Fake burger" },
    { productId: "crispy-chicken", quantity: 1, lineTotal: 0 },
  ]);
  const summary = getCartSummary(cart);
  assert.equal(summary.quantity, 3);
  assert.equal(summary.subtotal, 93700);
  assert.equal(summary.items[0].product.name, catalogProducts[0].name);
  assert.equal(summary.items[0].lineTotal, 65800);
});

test("cart editing caps quantities, preserves order, removes at zero and never mutates its input", () => {
  const initial = [{ productId: "domo-doble", quantity: 1 }];
  const added = addToCart(initial, "domo-doble", 100);
  assert.equal(initial[0].quantity, 1);
  assert.equal(added[0].quantity, 99);
  assert.deepEqual(addToCart(initial, "unknown"), initial);
  assert.deepEqual(addToCart(initial, "domo-doble", -5), initial);
  const second = addToCart(initial, "bacon-royal");
  assert.deepEqual(setCartQuantity(second, "domo-doble", 3), [
    { productId: "domo-doble", quantity: 3 },
    { productId: "bacon-royal", quantity: 1 },
  ]);
  assert.deepEqual(setCartQuantity(initial, "domo-doble", 1.5), initial);
  assert.deepEqual(setCartQuantity(initial, "domo-doble", 0), []);
  assert.deepEqual(removeFromCart(second, "bacon-royal"), initial);
});

test("WhatsApp URL preserves accents, ampersands and the complete structured order", () => {
  const cart = [{ productId: "domo-doble", quantity: 2 }];
  const url = buildWhatsAppUrl("+57 (300) 123-4567", cart, details, {
    demo: true,
  });
  assert.ok(url);
  const parsed = new URL(url);
  assert.equal(parsed.origin, "https://wa.me");
  assert.equal(parsed.pathname, "/573001234567");
  assert.equal([...parsed.searchParams.keys()].length, 1);
  const message = parsed.searchParams.get("text")!;
  assert.equal(message, buildWhatsAppMessage(cart, details, { demo: true }));
  assert.match(message, /PEDIDO DE PRUEBA/);
  assert.match(message, /María & José/);
  assert.match(message, /Sede: Maní/);
  assert.match(message, /Dirección: Calle 4 # 8-10, Maní/);
  assert.match(message, /2 × D'omo Doble/);
  assert.match(message, /Subtotal de productos: \$65\.800 COP/);
  assert.match(message, /Sin cebolla & salsa aparte/);
  assert.match(message, /costo del domicilio/);
});

test("pickup excludes a stale delivery address and delivery cost language", () => {
  const pickup = {
    ...details,
    fulfillment: "pickup" as const,
    branch: "yopal" as const,
  };
  const message = buildWhatsAppMessage(
    [{ productId: "bacon-royal", quantity: 1 }],
    pickup,
  );
  assert.match(message, /Sede: Yopal/);
  assert.match(message, /Entrega: Recoger en sede/);
  assert.doesNotMatch(
    message,
    /Dirección:|Calle 4|costo del domicilio|PEDIDO DE PRUEBA/,
  );
  assert.deepEqual(validateOrderDetails({ ...pickup, address: "" }), {});
});

test("order validation requires a name and a delivery address and bounds free text", () => {
  assert.deepEqual(validateOrderDetails(details), {});
  assert.ok(
    validateOrderDetails({ ...details, customerName: "  " }).customerName,
  );
  assert.ok(validateOrderDetails({ ...details, address: "  " }).address);
  assert.ok(
    validateOrderDetails({ ...details, customerName: "a".repeat(81) })
      .customerName,
  );
  assert.ok(
    validateOrderDetails({ ...details, address: "a".repeat(241) }).address,
  );
  assert.ok(validateOrderDetails({ ...details, notes: "a".repeat(501) }).notes);
});

test("missing or unsafe destinations and incomplete orders cannot create a WhatsApp URL", () => {
  const cart = [{ productId: "domo-doble", quantity: 1 }];
  for (const phone of [
    undefined,
    null,
    "",
    "123",
    "0123456789",
    "1234567890123456",
    "+57abc3001234567",
    "https://wa.me/573001234567",
    "57+3001234567",
    "57/3001234567",
  ]) {
    assert.equal(normalizeWhatsAppPhone(phone), null, String(phone));
    assert.equal(buildWhatsAppUrl(phone, cart, details), null, String(phone));
  }
  assert.equal(buildWhatsAppUrl("573001234567", [], details), null);
  assert.equal(
    buildWhatsAppUrl("573001234567", cart, { ...details, address: "" }),
    null,
  );
  assert.equal(
    buildWhatsAppUrl("573001234567", cart, { ...details, customerName: "" }),
    null,
  );
});

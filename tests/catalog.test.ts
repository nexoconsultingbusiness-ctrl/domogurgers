import assert from "node:assert/strict";
import test from "node:test";
import {
  catalogProducts,
  catalogSections,
  catalogCombo,
  catalogIsProvisional,
  type ComboBeverage,
} from "../src/features/catalog/catalog-data";
import {
  MAX_ITEM_QUANTITY,
  addToCart,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getCartSummary,
  getCartLineKey,
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
      "bacon-cheese",
      { productId: "unknown", quantity: 1 },
      { productId: "bacon-cheese", quantity: -1 },
      { productId: "bacon-cheese", quantity: 0 },
      { productId: "bacon-cheese", quantity: 1.5 },
      { productId: "bacon-cheese", quantity: "3" },
      { productId: "bacon-cheese", quantity: Infinity },
      { productId: "bacon-cheese", quantity: NaN },
      { productId: "bacon-cheese", quantity: Number.MAX_VALUE },
      { productId: "bacon-cheese", quantity: 90 },
      { productId: "bacon-cheese", quantity: 20 },
      { productId: "tradicional", quantity: 2 },
    ]),
    [
      { productId: "bacon-cheese", quantity: MAX_ITEM_QUANTITY },
      { productId: "tradicional", quantity: 2 },
    ],
  );
  assert.deepEqual(normalizeCart({ items: [] }), []);
  assert.deepEqual(normalizeCart(undefined), []);
});

test("subtotal uses only the current catalog, even when persisted metadata is tampered with", () => {
  const cart = normalizeCart([
    { productId: "bacon-cheese", quantity: 2, price: 1, name: "Fake burger" },
    { productId: "pollo-crispy", quantity: 1, lineTotal: 0 },
  ]);
  const summary = getCartSummary(cart);
  assert.equal(summary.quantity, 3);
  assert.equal(summary.subtotal, 127300);
  assert.equal(summary.items[0].product.name, catalogProducts[0].name);
  assert.equal(summary.items[0].lineTotal, 93800);
});

test("cart editing caps quantities, preserves order, removes at zero and never mutates its input", () => {
  const initial = [{ productId: "bacon-cheese", quantity: 1 }];
  const added = addToCart(initial, "bacon-cheese", 100);
  assert.equal(initial[0].quantity, 1);
  assert.equal(added[0].quantity, 99);
  assert.deepEqual(addToCart(initial, "unknown"), initial);
  assert.deepEqual(addToCart(initial, "bacon-cheese", -5), initial);
  const second = addToCart(initial, "tradicional");
  assert.deepEqual(setCartQuantity(second, "bacon-cheese", 3), [
    { productId: "bacon-cheese", quantity: 3 },
    { productId: "tradicional", quantity: 1 },
  ]);
  assert.deepEqual(setCartQuantity(initial, "bacon-cheese", 1.5), initial);
  assert.deepEqual(setCartQuantity(initial, "bacon-cheese", 0), []);
  assert.deepEqual(removeFromCart(second, "tradicional"), initial);
});

test("WhatsApp URL preserves accents, ampersands and the complete structured order", () => {
  const cart = [{ productId: "bacon-cheese", quantity: 2 }];
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
  assert.match(message, /2 × Bacon Cheese/);
  assert.match(message, /Subtotal de productos: \$93\.800 COP/);
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
    [{ productId: "tradicional", quantity: 1 }],
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
  const cart = [{ productId: "bacon-cheese", quantity: 1 }];
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

test("the photographed menu replaces demo products and preserves complete category coverage", () => {
  assert.equal(catalogIsProvisional, false);
  assert.equal(catalogProducts.length, 58);
  assert.equal(new Set(catalogProducts.map((product) => product.id)).size, 58);
  assert.deepEqual(
    catalogSections.map(
      (section) =>
        catalogProducts.filter((product) => product.category === section.id)
          .length,
    ),
    [17, 3, 2, 4, 2, 13, 13, 4],
  );
  for (const product of catalogProducts) {
    assert.ok(
      catalogSections.some((section) => section.id === product.category),
    );
    assert.ok(Number.isSafeInteger(product.price) && product.price > 0);
  }
  assert.equal(
    catalogProducts.find((product) => product.id === "house")?.price,
    17900,
  );
  assert.equal(
    catalogProducts.find((product) => product.id === "domo-gringas")?.price,
    21000,
  );
  assert.equal(
    catalogProducts.find((product) => product.id === "domo-picada-costillas")
      ?.price,
    59900,
  );
  assert.equal(
    catalogProducts.find((product) => product.id === "adicional-costilla")
      ?.price,
    16800,
  );
  assert.deepEqual(
    catalogProducts.find((product) => product.id === "salchipapa")?.ingredients,
    [],
  );
  assert.deepEqual(
    normalizeCart([{ productId: "domo-doble", quantity: 1 }]),
    [],
  );
});

test("plain products and different combo beverages remain separate and identical combos merge", () => {
  const plain = addToCart([], "tradicional");
  const coke = addToCart(plain, "tradicional", 2, "coca-cola");
  const soda = addToCart(coke, "tradicional", 1, "soda");
  const merged = addToCart(soda, "tradicional", 1, "coca-cola");
  assert.deepEqual(merged, [
    { productId: "tradicional", quantity: 1 },
    { productId: "tradicional", quantity: 3, comboBeverage: "coca-cola" },
    { productId: "tradicional", quantity: 1, comboBeverage: "soda" },
  ]);
  assert.equal(new Set(merged.map(getCartLineKey)).size, 3);
  assert.equal(getCartSummary(merged).subtotal, 19900 + 4 * 30400);
  const edited = setCartQuantity(merged, "tradicional", 2, "soda");
  assert.equal(edited[1].quantity, 3);
  assert.equal(edited[2].quantity, 2);
  assert.deepEqual(removeFromCart(edited, "tradicional", "coca-cola"), [
    { productId: "tradicional", quantity: 1 },
    { productId: "tradicional", quantity: 2, comboBeverage: "soda" },
  ]);
  assert.deepEqual(setCartQuantity(edited, "tradicional", 0), edited.slice(1));
  assert.equal(
    addToCart(merged, "tradicional", 100, "coca-cola")[1].quantity,
    MAX_ITEM_QUANTITY,
  );
  assert.deepEqual(plain, [{ productId: "tradicional", quantity: 1 }]);
});

test("every product supports the authorized combo and persisted prices cannot override its surcharge", () => {
  assert.equal(catalogCombo.price, 10500);
  assert.equal(catalogCombo.appliesTo, "all");
  for (const product of catalogProducts) {
    const restored = normalizeCart([
      {
        productId: product.id,
        quantity: 2,
        comboBeverage: "ginger",
        price: 1,
        comboPrice: 0,
        unitPrice: 0,
      },
    ]);
    const summary = getCartSummary(restored);
    assert.equal(summary.subtotal, (product.price + 10500) * 2);
    assert.equal(summary.items[0].comboLabel, "Combo: papas + Ginger");
  }
  for (const invalid of [null, "", "unknown", {}, true, 10500]) {
    assert.deepEqual(
      normalizeCart([
        { productId: "tradicional", quantity: 1, comboBeverage: invalid },
      ]),
      [],
    );
  }
});

test("WhatsApp includes the selected combo beverage, quantity and full unit price", () => {
  for (const beverage of catalogCombo.beverages) {
    const cart = addToCart([], "tradicional", 2, beverage.id as ComboBeverage);
    const url = buildWhatsAppUrl("573001234567", cart, details);
    assert.ok(url);
    const message = new URL(url).searchParams.get("text")!;
    assert.ok(
      message.includes(`2 × Tradicional + Combo: papas + ${beverage.label}`),
    );
    assert.match(message, /\$30\.400 c\/u/);
    assert.match(message, /Subtotal de productos: \$60\.800 COP/);
    assert.doesNotMatch(message, /PEDIDO DE PRUEBA/);
  }
});

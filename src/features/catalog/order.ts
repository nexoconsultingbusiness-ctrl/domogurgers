import {
  catalogProducts,
  catalogCombo,
  formatPrice,
  getComboLabel,
  isComboBeverage,
  type CatalogProduct,
  type ComboBeverage,
} from "./catalog-data";

export const MAX_ITEM_QUANTITY = 99;

export type CartLine = {
  productId: string;
  quantity: number;
  comboBeverage?: ComboBeverage;
};
export type ResolvedCartLine = {
  product: CatalogProduct;
  quantity: number;
  comboBeverage?: ComboBeverage;
  comboLabel: string | null;
  unitPrice: number;
  lineTotal: number;
};
export type OrderDetails = {
  customerName: string;
  fulfillment: "delivery" | "pickup";
  branch: "mani" | "yopal";
  address: string;
  notes: string;
};
export type OrderErrors = Partial<Record<keyof OrderDetails, string>>;
export type OrderMessageOptions = { demo?: boolean };

const productsById = new Map(
  catalogProducts.map((product) => [product.id, product]),
);

export function getCartLineKey(
  line: Pick<CartLine, "productId" | "comboBeverage">,
) {
  return `${line.productId}:${line.comboBeverage ?? "solo"}`;
}

/** Restore known products, combo choices and integer quantities, never prices. */
export function normalizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const lines = new Map<string, CartLine>();
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const { productId, quantity, comboBeverage } = entry as Record<
      string,
      unknown
    >;
    if (
      typeof productId !== "string" ||
      !productsById.has(productId) ||
      typeof quantity !== "number" ||
      !Number.isSafeInteger(quantity) ||
      quantity <= 0 ||
      (comboBeverage !== undefined && !isComboBeverage(comboBeverage))
    ) {
      continue;
    }
    const line: CartLine = {
      productId,
      quantity,
      ...(isComboBeverage(comboBeverage) ? { comboBeverage } : {}),
    };
    const key = getCartLineKey(line);
    line.quantity = Math.min(
      MAX_ITEM_QUANTITY,
      (lines.get(key)?.quantity ?? 0) + quantity,
    );
    lines.set(key, line);
  }
  return Array.from(lines.values());
}

export function resolveCart(cart: readonly CartLine[]): ResolvedCartLine[] {
  return normalizeCart(cart).map(({ productId, quantity, comboBeverage }) => {
    // normalizeCart admits only IDs present in this trusted catalog.
    const product = productsById.get(productId)!;
    const unitPrice = product.price + (comboBeverage ? catalogCombo.price : 0);
    return {
      product,
      quantity,
      comboBeverage,
      comboLabel: comboBeverage ? getComboLabel(comboBeverage) : null,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });
}

export function getCartSummary(cart: readonly CartLine[]) {
  const items = resolveCart(cart);
  return {
    items,
    quantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0),
  };
}

export function addToCart(
  cart: readonly CartLine[],
  productId: string,
  quantity = 1,
  comboBeverage?: ComboBeverage,
): CartLine[] {
  return normalizeCart([...cart, { productId, quantity, comboBeverage }]);
}

export function setCartQuantity(
  cart: readonly CartLine[],
  productId: string,
  quantity: number,
  comboBeverage?: ComboBeverage,
): CartLine[] {
  const normalized = normalizeCart(cart);
  if (!Number.isSafeInteger(quantity) || quantity < 0) return normalized;
  const key = getCartLineKey({ productId, comboBeverage });
  const remaining = normalized.filter((item) => getCartLineKey(item) !== key);
  if (quantity === 0) return remaining;
  const existingIndex = normalized.findIndex(
    (item) => getCartLineKey(item) === key,
  );
  if (existingIndex >= 0) {
    normalized[existingIndex] = {
      productId,
      quantity: Math.min(quantity, MAX_ITEM_QUANTITY),
      ...(comboBeverage ? { comboBeverage } : {}),
    };
    return normalized;
  }
  return normalizeCart([...remaining, { productId, quantity, comboBeverage }]);
}

export function removeFromCart(
  cart: readonly CartLine[],
  productId: string,
  comboBeverage?: ComboBeverage,
): CartLine[] {
  const key = getCartLineKey({ productId, comboBeverage });
  return normalizeCart(cart).filter((item) => getCartLineKey(item) !== key);
}

export function validateOrderDetails(details: OrderDetails): OrderErrors {
  const errors: OrderErrors = {};
  if (!details.customerName.trim()) {
    errors.customerName = "Escribe tu nombre para identificar el pedido.";
  } else if (details.customerName.trim().length > 80) {
    errors.customerName = "Usa un nombre de hasta 80 caracteres.";
  }
  if (details.fulfillment !== "delivery" && details.fulfillment !== "pickup") {
    errors.fulfillment = "Selecciona cómo quieres recibir tu pedido.";
  }
  if (details.branch !== "mani" && details.branch !== "yopal") {
    errors.branch = "Selecciona una sede.";
  }
  if (details.fulfillment === "delivery" && !details.address.trim()) {
    errors.address = "Escribe la dirección para el domicilio.";
  } else if (
    details.fulfillment === "delivery" &&
    details.address.trim().length > 240
  ) {
    errors.address = "Usa una dirección de hasta 240 caracteres.";
  }
  if (details.notes.trim().length > 500) {
    errors.notes = "Escribe observaciones de hasta 500 caracteres.";
  }
  return errors;
}

/** An international number is configured by the business, without a default. */
export function normalizeWhatsAppPhone(
  phone: string | undefined | null,
): string | null {
  if (typeof phone !== "string") return null;
  const formatted = phone.trim();
  if (!/^\+?[\d\s().-]+$/.test(formatted)) return null;
  const digits = formatted.replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

export function buildWhatsAppMessage(
  cart: readonly CartLine[],
  details: OrderDetails,
  options: OrderMessageOptions = {},
): string {
  const { items, subtotal } = getCartSummary(cart);
  const lines = [
    "Hola DomoBurgers, quiero hacer este pedido:",
    ...(options.demo
      ? ["*PEDIDO DE PRUEBA · Carta y precios provisionales, por confirmar.*"]
      : []),
    "",
    `Nombre: ${details.customerName.trim()}`,
    `Sede: ${details.branch === "mani" ? "Maní" : "Yopal"}`,
    `Entrega: ${details.fulfillment === "delivery" ? "A domicilio" : "Recoger en sede"}`,
    ...(details.fulfillment === "delivery"
      ? [`Dirección: ${details.address.trim()}`]
      : []),
    "",
    ...items.map(
      ({ product, quantity, lineTotal, unitPrice, comboLabel }) =>
        `${quantity} × ${product.name}${comboLabel ? ` + ${comboLabel}` : ""} (${formatPrice(unitPrice)} c/u): ${formatPrice(lineTotal)}`,
    ),
    "",
    `Subtotal de productos: ${formatPrice(subtotal)} COP`,
    ...(details.notes.trim() ? [`Observaciones: ${details.notes.trim()}`] : []),
    "",
    details.fulfillment === "delivery"
      ? "Por favor, confirmen disponibilidad, costo del domicilio, total y tiempo de entrega."
      : "Por favor, confirmen disponibilidad, total y tiempo para recoger.",
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(
  phone: string | undefined | null,
  cart: readonly CartLine[],
  details: OrderDetails,
  options: OrderMessageOptions = {},
): string | null {
  const number = normalizeWhatsAppPhone(phone);
  if (
    !number ||
    !normalizeCart(cart).length ||
    Object.keys(validateOrderDetails(details)).length > 0
  ) {
    return null;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(cart, details, options))}`;
}

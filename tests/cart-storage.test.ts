import assert from "node:assert/strict";
import test from "node:test";
import { addToCart } from "../src/features/catalog/order";
import { cartStore } from "../src/features/catalog/use-cart";

const storageKey = "domoburgers:cart:v1";

test("cart storage survives denial and quota failures, then resumes cross-tab synchronization", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const events = new EventTarget();
  let stored: string | null = null;
  let denied = false;
  let full = false;
  const localStorage = {
    getItem: () => stored,
    setItem: (_key: string, value: string) => {
      if (full) throw new Error("QuotaExceededError");
      stored = value;
    },
  };
  const browser = {
    get localStorage() {
      if (denied) throw new Error("SecurityError");
      return localStorage;
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
  const notifyStorage = (
    storageArea: unknown,
    key: string | null = storageKey,
  ) => {
    const event = new Event("storage");
    Object.defineProperties(event, {
      key: { value: key },
      storageArea: { value: storageArea },
    });
    events.dispatchEvent(event);
  };
  let unsubscribe = () => {};

  try {
    Reflect.deleteProperty(globalThis, "window");
    assert.equal(cartStore.getSnapshot(), "[]");
    assert.equal(cartStore.getServerSnapshot(), "[]");
    assert.doesNotThrow(() => cartStore.subscribe(() => {})());

    Object.defineProperty(globalThis, "window", {
      value: browser,
      configurable: true,
    });
    let notifications = 0;
    unsubscribe = cartStore.subscribe(() => notifications++);
    stored = "{invalid-json";
    cartStore.updateCart((cart) => addToCart(cart, "bacon-cheese"));
    assert.deepEqual(JSON.parse(cartStore.getSnapshot()), [
      { productId: "bacon-cheese", quantity: 1 },
    ]);
    assert.equal(notifications, 1);

    full = true;
    cartStore.updateCart((cart) => addToCart(cart, "bacon-cheese"));
    cartStore.updateCart((cart) => addToCart(cart, "bacon-cheese"));
    assert.equal(JSON.parse(cartStore.getSnapshot())[0].quantity, 3);
    assert.equal(JSON.parse(stored!)[0].quantity, 1);

    // A successful later write must unlock reads and cross-tab updates again.
    full = false;
    cartStore.updateCart((cart) => addToCart(cart, "bacon-cheese"));
    assert.equal(JSON.parse(stored!)[0].quantity, 4);
    stored = JSON.stringify([{ productId: "tradicional", quantity: 2 }]);
    notifyStorage(localStorage);
    assert.deepEqual(JSON.parse(cartStore.getSnapshot()), [
      { productId: "tradicional", quantity: 2 },
    ]);

    denied = true;
    cartStore.updateCart((cart) => addToCart(cart, "tradicional"));
    assert.equal(JSON.parse(cartStore.getSnapshot())[0].quantity, 3);
    denied = false;
    // Cross-tab clearing recovers from a prior access denial as well.
    stored = null;
    notifyStorage(localStorage, null);
    assert.equal(cartStore.getSnapshot(), "[]");

    const beforeUnrelatedEvents = notifications;
    notifyStorage({}, storageKey);
    notifyStorage(localStorage, "another-cart");
    assert.equal(notifications, beforeUnrelatedEvents);
    unsubscribe();
    unsubscribe = () => {};
    notifyStorage(localStorage);
    assert.equal(notifications, beforeUnrelatedEvents);
  } finally {
    unsubscribe();
    if (originalWindow) {
      Object.defineProperty(globalThis, "window", originalWindow);
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
  }
});

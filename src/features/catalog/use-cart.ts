"use client";

import { useMemo, useSyncExternalStore } from "react";
import { normalizeCart, type CartLine } from "./order";

const storageKey = "domoburgers:cart:v1";
const changeEvent = "domoburgers:cart-change";
let memory = "[]";
let storageUnavailable = false;

function snapshot() {
  if (typeof window === "undefined") return "[]";
  if (storageUnavailable) return memory;
  try {
    memory = window.localStorage.getItem(storageKey) ?? "[]";
  } catch {
    storageUnavailable = true;
    // Private browsing or full storage: the cart still works in this tab.
  }
  return memory;
}

function subscribe(notify: () => void) {
  if (typeof window === "undefined") return () => {};
  function onStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return;
    try {
      if (event.storageArea !== window.localStorage) return;
    } catch {
      return;
    }
    // A subsequent change in another tab may mean storage is available again.
    storageUnavailable = false;
    notify();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, notify);
  };
}

function parse(value: string): CartLine[] {
  try {
    return normalizeCart(JSON.parse(value));
  } catch {
    return [];
  }
}

function updateCart(update: (current: CartLine[]) => CartLine[]) {
  if (typeof window === "undefined") return;
  memory = JSON.stringify(normalizeCart(update(parse(snapshot()))));
  try {
    window.localStorage.setItem(storageKey, memory);
    storageUnavailable = false;
  } catch {
    storageUnavailable = true;
    // Persist only product IDs and quantities, never customer details.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export const cartStore = {
  getSnapshot: snapshot,
  getServerSnapshot: () => "[]",
  subscribe,
  updateCart,
};

export function useCart() {
  const value = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const cart = useMemo(() => parse(value), [value]);

  return { cart, updateCart: cartStore.updateCart };
}

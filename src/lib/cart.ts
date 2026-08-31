// src/lib/cart.ts
import { useSyncExternalStore } from "react";

export type CartLine = {
  id: string;
  slug: string;
  variantId: string;
  sku: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  qty: number;
};

type AddInput = {
  slug: string;
  variantId: string;
  sku: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  qty: number;
};

const STORAGE_KEY = "lbl_cart_v1";

function lineId(slug: string, variantId: string) {
  return `${slug}:${variantId}`;
}

function loadInitial(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

let state: CartLine[] = loadInitial();
const listeners = new Set<() => void>();

function persistAndNotify() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing etc.) — cart still works for this session
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot(): CartLine[] {
  return [];
}

function add(input: AddInput) {
  const id = lineId(input.slug, input.variantId);
  const existing = state.find((l) => l.id === id);
  state = existing
    ? state.map((l) => (l.id === id ? { ...l, qty: l.qty + input.qty } : l))
    : [...state, { ...input, id }];
  persistAndNotify();
}

function updateQty(targetId: string, qty: number) {
  state =
    qty <= 0
      ? state.filter((l) => l.id !== targetId)
      : state.map((l) => (l.id === targetId ? { ...l, qty } : l));
  persistAndNotify();
}

function remove(targetId: string) {
  state = state.filter((l) => l.id !== targetId);
  persistAndNotify();
}

function clear() {
  state = [];
  persistAndNotify();
}

export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  return { lines, subtotal, add, updateQty, remove, clear };
}
import { useSyncExternalStore, type ReactNode } from "react";

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

function loadInitialLines(): CartLine[] {
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

let lines: CartLine[] = loadInitialLines();
let drawerOpen = false;
const listeners = new Set<() => void>();

function persistLines() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // localStorage unavailable (private browsing etc.) — cart still works for this session
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type CartSnapshot = { lines: CartLine[]; open: boolean };
let snapshot: CartSnapshot = { lines, open: drawerOpen };

function updateSnapshot() {
  snapshot = { lines, open: drawerOpen };
  notify();
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot(): CartSnapshot {
  return { lines: [], open: false };
}

function add(input: AddInput) {
  const id = lineId(input.slug, input.variantId);
  const existing = lines.find((l) => l.id === id);
  lines = existing
    ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + input.qty } : l))
    : [...lines, { ...input, id }];
  persistLines();
  drawerOpen = true; // open the drawer on add, standard e-commerce pattern
  updateSnapshot();
}

function setQty(targetId: string, qty: number) {
  lines =
    qty <= 0
      ? lines.filter((l) => l.id !== targetId)
      : lines.map((l) => (l.id === targetId ? { ...l, qty } : l));
  persistLines();
  updateSnapshot();
}

function remove(targetId: string) {
  lines = lines.filter((l) => l.id !== targetId);
  persistLines();
  updateSnapshot();
}

function clear() {
  lines = [];
  persistLines();
  updateSnapshot();
}

function setOpen(value: boolean) {
  drawerOpen = value;
  updateSnapshot();
}

export function useCart() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const subtotal = state.lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  return {
    lines: state.lines,
    open: state.open,
    subtotal,
    add,
    setQty,
    remove,
    clear,
    setOpen,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
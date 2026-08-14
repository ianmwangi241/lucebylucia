import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./products";

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  qty: number;
};

type CartContext = {
  lines: CartLine[];
  open: boolean;
  count: number;
  subtotal: number;
  setOpen: (open: boolean) => void;
  add: (product: Product, color: string, size: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback(
    (product: Product, color: string, size: string, qty = 1) => {
      const id = `${product.slug}-${color}-${size}`;
      setLines((current) => {
        const existing = current.find((line) => line.id === id);
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, qty: line.qty + qty } : line,
          );
        }
        return [
          ...current,
          {
            id,
            slug: product.slug,
            name: product.name,
            price: product.salePrice ?? product.price,
            image: product.images[0]!,
            color,
            size,
            qty,
          },
        ];
      });
      setOpen(true);
    },
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) => (line.id === id ? { ...line, qty } : line)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      lines,
      open,
      setOpen,
      add,
      setQty,
      remove,
      count: lines.reduce((total, line) => total + line.qty, 0),
      subtotal: lines.reduce((total, line) => total + line.qty * line.price, 0),
    }),
    [lines, open, add, setQty, remove],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

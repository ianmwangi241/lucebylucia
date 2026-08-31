import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/supabase/cart";
import { formatKsh } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`bg-ink/50 absolute inset-0 transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Your bag"
        className={`bg-background absolute top-0 right-0 flex h-full w-full max-w-md flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="eyebrow">Your Bag</h2>
          <button aria-label="Close bag" onClick={() => setOpen(false)}>
            <X className="size-5" strokeWidth={1.2} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
            <div className="hairline-gold" />
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-muted-foreground text-sm">
              Every piece is made in small runs. Find yours.
            </p>
            <Link to="/shop" onClick={() => setOpen(false)} className="btn-ink">
              Shop New In
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-4 py-6">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="bg-muted h-32 w-24 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm tracking-wide">{line.name}</p>
                      <button
                        aria-label={`Remove ${line.name}`}
                        onClick={() => remove(line.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" strokeWidth={1.2} />
                      </button>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs tracking-[0.16em] uppercase">
                      {line.color} / {line.size}
                    </p>
                    <p className="mt-3 text-sm">{formatKsh(line.price)}</p>
                    <div className="mt-4 inline-flex items-center border">
                      <button
                        aria-label="Decrease quantity"
                        className="px-3 py-2"
                        onClick={() => setQty(line.id, line.qty - 1)}
                      >
                        <Minus className="size-3" strokeWidth={1.4} />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {line.qty}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        className="px-3 py-2"
                        onClick={() => setQty(line.id, line.qty + 1)}
                      >
                        <Plus className="size-3" strokeWidth={1.4} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-xl">
                  {formatKsh(subtotal)}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Delivery calculated at checkout · Nairobi same-day available.
              </p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="btn-ink mt-5 w-full"
              >
                Checkout
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="link-gold text-muted-foreground mx-auto mt-5 block text-[11px] tracking-[0.24em] uppercase"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

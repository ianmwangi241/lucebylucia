import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import {
  CATEGORIES,
  COLLECTIONS,
  COLOR_SWATCHES,
  SIZES,
  products,
} from "@/lib/products";

type Search = { category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category:
      typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — Dresses, Sets & Occasion Wear | Luce by Lucia" },
      {
        name: "description",
        content:
          "Browse every Luce by Lucia piece: dresses, tops, tailored sets and occasion wear. Filter by size, colour and price. Prices in KSh.",
      },
      { property: "og:title", content: "Shop All — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Dresses, tailored sets and occasion wear designed in Nairobi. Filter by size, colour and price.",
      },
    ],
  }),
  component: Shop,
});

const SORTS = [
  "Featured",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Best Selling",
] as const;

function Shop() {
  const { category } = Route.useSearch();
  const [activeCategory, setActiveCategory] = useState(category ?? "All");
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [collection, setCollection] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = products.filter((product) => {
      if (activeCategory === "New Arrivals") return product.badge === "New";
      if (activeCategory !== "All" && product.category !== activeCategory)
        return false;
      if (size && !product.sizes.includes(size)) return false;
      if (color && !product.colors.includes(color)) return false;
      if (collection && product.collection !== collection) return false;
      return true;
    });
    const price = (p: (typeof products)[number]) => p.salePrice ?? p.price;
    if (sort === "Price: Low to High")
      list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === "Price: High to Low")
      list = [...list].sort((a, b) => price(b) - price(a));
    if (sort === "Best Selling")
      list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === "Newest") list = [...list].reverse();
    return list;
  }, [activeCategory, size, color, collection, sort]);

  const clear = () => {
    setActiveCategory("All");
    setSize(null);
    setColor(null);
    setCollection(null);
  };

  const filters = (
    <div className="space-y-10">
      <FilterGroup title="Category">
        {["All", ...CATEGORIES].map((item) => (
          <Chip
            key={item}
            active={activeCategory === item}
            onClick={() => setActiveCategory(item)}
          >
            {item}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        {SIZES.map((item) => (
          <Chip
            key={item}
            active={size === item}
            onClick={() => setSize(size === item ? null : item)}
          >
            {item}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Colour">
        {Object.keys(COLOR_SWATCHES).map((item) => (
          <button
            key={item}
            onClick={() => setColor(color === item ? null : item)}
            aria-pressed={color === item}
            className={`flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase ${
              color === item ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span
              className={`size-3.5 rounded-full border ${
                color === item ? "ring-gold ring-1 ring-offset-2" : ""
              }`}
              style={{ backgroundColor: COLOR_SWATCHES[item] }}
            />
            {item}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Collection">
        {COLLECTIONS.map((item) => (
          <Chip
            key={item}
            active={collection === item}
            onClick={() => setCollection(collection === item ? null : item)}
          >
            {item}
          </Chip>
        ))}
      </FilterGroup>

      <button
        onClick={clear}
        className="link-gold text-muted-foreground text-[11px] tracking-[0.22em] uppercase"
      >
        Clear all
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 lg:px-10 lg:py-20">
      <header className="border-b pb-8">
        <p className="eyebrow text-muted-foreground">Shop</p>
        <h1 className="display-lg mt-4">All Pieces</h1>
        <p className="text-muted-foreground mt-4 max-w-md text-sm">
          Small-run womenswear made in Nairobi. Prices in KSh, delivered
          nationwide.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="flex items-center justify-between gap-4 pb-8">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 border px-4 py-3 text-[11px] tracking-[0.22em] uppercase lg:hidden"
            >
              <SlidersHorizontal className="size-3.5" strokeWidth={1.3} />
              Filters
            </button>
            <p className="text-muted-foreground hidden text-[11px] tracking-[0.2em] uppercase lg:block">
              {results.length} pieces
            </p>
            <label className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase">
              <span className="text-muted-foreground">Sort by</span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as (typeof SORTS)[number])
                }
                className="border-b bg-transparent py-1 text-[11px] tracking-[0.16em] uppercase outline-none"
              >
                {SORTS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="border py-24 text-center">
              <div className="hairline-gold mx-auto" />
              <p className="font-display mt-6 text-2xl">Nothing here yet</p>
              <p className="text-muted-foreground mt-3 text-sm">
                Try removing a filter — or ask us on WhatsApp what&apos;s coming
                next.
              </p>
              <button onClick={clear} className="btn-ink mt-8">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3 lg:gap-x-6">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="bg-ink/50 absolute inset-0"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="bg-background absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Filters</h2>
              <button
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <X className="size-5" strokeWidth={1.2} />
              </button>
            </div>
            <div className="mt-8">{filters}</div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="btn-ink mt-10 w-full"
            >
              Show {results.length} pieces
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="eyebrow text-muted-foreground">{title}</h3>
      <div className="mt-4 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`link-gold text-left text-[11px] tracking-[0.16em] uppercase ${
        active ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

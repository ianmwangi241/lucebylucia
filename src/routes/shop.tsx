import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { COLOR_SWATCHES, SIZES } from "@/lib/products";
import {
  getCategories,
  getCollections,
  getProducts,
  type ProductSort,
} from "@/lib/services/product-service";

type Search = {
  category?: string | undefined;
  collection?: string | undefined;
  sort?: ProductSort | undefined;
};

const SORT_VALUES: ProductSort[] = ["featured", "newest", "price-asc", "price-desc"];
const SORT_LABELS: Record<ProductSort, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
  category:
    typeof search["category"] === "string" ? search["category"] : undefined,
  collection:
    typeof search["collection"] === "string" ? search["collection"] : undefined,
  sort: SORT_VALUES.includes(search["sort"] as ProductSort)
    ? (search["sort"] as ProductSort)
    : undefined,
}),
  loaderDeps: ({ search }) => ({
    category: search.category,
    collection: search.collection,
    sort: search.sort,
  }),
  loader: async ({ deps }) => {
    const [products, categories, collections] = await Promise.all([
      getProducts({ data: deps }),
      getCategories(),
      getCollections(),
    ]);
    return { products, categories, collections };
  },
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

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products, categories, collections } = Route.useLoaderData();

  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    return products.filter((product) => {
      if (size && !product.sizes.includes(size)) return false;
      if (color && !product.colors.includes(color)) return false;
      return true;
    });
  }, [products, size, color]);

  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const clear = () => {
    setSize(null);
    setColor(null);
    navigate({ search: {} });
  };

  const filters = (
    <div className="space-y-10">
      <FilterGroup title="Category">
        <Chip active={!search.category} onClick={() => setSearch({ category: undefined })}>
          All
        </Chip>
        {categories.map((item) => (
          <Chip
            key={item.id}
            active={search.category === item.slug}
            onClick={() => setSearch({ category: item.slug ?? undefined })}
          >
            {item.name}
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
        <Chip active={!search.collection} onClick={() => setSearch({ collection: undefined })}>
          All
        </Chip>
        {collections.map((item) => (
          <Chip
            key={item.id}
            active={search.collection === item.slug}
            onClick={() => setSearch({ collection: item.slug ?? undefined })}
          >
            {item.name}
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
          Small-run womenswear made in Nairobi. Prices in KSh, delivered nationwide.
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
                value={search.sort ?? "featured"}
                onChange={(event) => setSearch({ sort: event.target.value as ProductSort })}
                className="border-b bg-transparent py-1 text-[11px] tracking-[0.16em] uppercase outline-none"
              >
                {SORT_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {SORT_LABELS[value]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="border py-24 text-center">
              <div className="hairline-gold mx-auto" />
              <p className="font-display mt-6 text-2xl">Nothing here yet</p>
              <p className="text-muted-foreground mt-3 text-sm">
                Try removing a filter — or ask us on WhatsApp what&apos;s coming next.
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

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="bg-ink/50 absolute inset-0" onClick={() => setFiltersOpen(false)} />
          <div className="bg-background absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Filters</h2>
              <button aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <X className="size-5" strokeWidth={1.2} />
              </button>
            </div>
            <div className="mt-8">{filters}</div>
            <button onClick={() => setFiltersOpen(false)} className="btn-ink mt-10 w-full">
              Show {results.length} pieces
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
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
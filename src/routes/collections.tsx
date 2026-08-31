import { Link, createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/product-card";
import { getCollections, getProducts } from "@/lib/services/product-service";

export const Route = createFileRoute("/collections")({
  loader: async () => {
    const [collections, products] = await Promise.all([
      getCollections(),
      getProducts({ data: {} }),
    ]);
    return { collections, products };
  },
  head: () => ({
    meta: [
      {
        title:
          "Collections — Made For The Moment, After Dark & Active & Lounge | Luce by Lucia",
      },
      {
        name: "description",
        content:
          "Explore Luce by Lucia collections: Made For The Moment, After Dark, and Active & Lounge, designed and cut in Nairobi.",
      },
      { property: "og:title", content: "Collections — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Made For The Moment, After Dark, and Active & Lounge — collections designed and cut in Nairobi.",
      },
    ],
  }),
  component: Collections,
});

// Theming has no DB equivalent, so dark/light per section stays hardcoded,
// keyed by the collection's slug in Supabase. Verify these slugs match
// what's actually in your `collections` table — a slug that doesn't
// match here just falls back to the light theme, it won't error.
const COLLECTION_THEME: Record<string, { dark: boolean }> = {
  "made-for-the-moment": { dark: false },
  "after-dark": { dark: true },
  "active-lounge": { dark: false },
};

function Collections() {
  const { collections, products } = Route.useLoaderData();

  return (
    <>
      <header className="bg-ink text-ivory px-5 py-20 text-center lg:py-28">
        <p className="eyebrow text-gold-soft">Collections</p>
        <h1 className="display-xl mt-5">The Lookbook</h1>
        <p className="text-ivory/60 mx-auto mt-6 max-w-md text-sm leading-relaxed">
          Curated collections designed to live together and move with you.
        </p>
      </header>

      {collections.map((collection) => {
        const dark = COLLECTION_THEME[collection.slug ?? ""]?.dark ?? false;
        const items = products.filter(
          (product) => product.collectionSlug === collection.slug,
        );

        return (
          <section
            key={collection.id}
            className={dark ? "bg-ink text-ivory" : ""}
          >
            <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection campaign`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="bg-muted aspect-[4/5] w-full" />
                )}
                <div>
                  <p
                    className={`eyebrow ${dark ? "text-gold-soft" : "text-muted-foreground"}`}
                  >
                    Collection
                  </p>
                  <h2 className="display-lg mt-5">{collection.name}</h2>
                  <div className="hairline-gold mt-7" />
                  <p
                    className={`mt-7 text-sm leading-loose ${dark ? "text-ivory/65" : "text-muted-foreground"}`}
                  >
                    {collection.description}
                  </p>
                  <Link
                    to="/shop"
                    search={{ collection: collection.slug ?? undefined }}
                    className={dark ? "btn-ghost-light mt-9" : "btn-ink mt-9"}
                  >
                    Shop {items.length} Pieces
                  </Link>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
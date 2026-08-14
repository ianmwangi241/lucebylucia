import { Link, createFileRoute } from "@tanstack/react-router";
import collectionImg from "@/assets/collection.jpg";
import afterDarkImg from "@/assets/afterdark.jpg";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Made For The Moment & After Dark | Luce by Lucia" },
      {
        name: "description",
        content:
          "Explore Luce by Lucia collections: Made For The Moment daywear and the After Dark evening drop, designed and cut in Nairobi.",
      },
      { property: "og:title", content: "Collections — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Made For The Moment and After Dark — two collections designed and cut in Nairobi.",
      },
    ],
  }),
  component: Collections,
});

const COLLECTION_META = [
  {
    name: "Made For The Moment",
    image: collectionImg,
    dark: false,
    copy: "Ivory, blush and stone. Fluid tailoring and knife pleats for the hours that fill your week — meetings, lunches, weddings, everything after.",
  },
  {
    name: "After Dark",
    image: afterDarkImg,
    dark: true,
    copy: "Black, champagne and midnight satin. Bias cuts, sculpted columns and one belted coat dress. Limited runs, released once.",
  },
];

function Collections() {
  return (
    <>
      <header className="bg-ink text-ivory px-5 py-20 text-center lg:py-28">
        <p className="eyebrow text-gold-soft">Collections</p>
        <h1 className="display-xl mt-5">The Lookbook</h1>
        <p className="text-ivory/60 mx-auto mt-6 max-w-md text-sm leading-relaxed">
          Two collections, released seasonally, designed to live together.
        </p>
      </header>

      {COLLECTION_META.map((collection) => {
        const items = products.filter(
          (product) => product.collection === collection.name,
        );
        return (
          <section
            key={collection.name}
            className={collection.dark ? "bg-ink text-ivory" : ""}
          >
            <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <img
                  src={collection.image}
                  alt={`${collection.name} collection campaign`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div>
                  <p
                    className={`eyebrow ${collection.dark ? "text-gold-soft" : "text-muted-foreground"}`}
                  >
                    Collection
                  </p>
                  <h2 className="display-lg mt-5">{collection.name}</h2>
                  <div className="hairline-gold mt-7" />
                  <p
                    className={`mt-7 text-sm leading-loose ${collection.dark ? "text-ivory/65" : "text-muted-foreground"}`}
                  >
                    {collection.copy}
                  </p>
                  <Link
                    to="/shop"
                    className={collection.dark ? "btn-ghost-light mt-9" : "btn-ink mt-9"}
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

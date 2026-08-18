import { Link, createFileRoute } from "@tanstack/react-router";
import collectionImg from "@/assets/signature-1.jpg";
import afterDarkImg from "@/assets/sculpt-jumpsuit.jpg";
import activeLoungeImg from "@/assets/aura-set-long.jpg";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Made For The Moment, After Dark & Active & Lounge | Luce by Lucia" },
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

const COLLECTION_META = [
  {
    name: "Made For The Moment",
    image: collectionImg,
    dark: false,
    copy: "Classic lines, signature co-ords and versatile dresses for the hours that fill your week — meetings, lunches, and everything after.",
  },
  {
    name: "After Dark",
    image: afterDarkImg,
    dark: true,
    copy: "Bold evening pieces and sculpted silhouettes designed for nights out and memorable moments. Limited runs, released once.",
  },
  {
    name: "Active & Lounge",
    image: activeLoungeImg,
    dark: false,
    copy: "Seamless sets, breathable knits, and effortless daily uniforms built for comfort and movement without compromising on style.",
  },
];

function Collections() {
  return (
    <>
      <header className="bg-ink text-ivory px-5 py-20 text-center lg:py-28">
        <p className="eyebrow text-gold-soft">Collections</p>
        <h1 className="display-xl mt-5">The Lookbook</h1>
        <p className="text-ivory/60 mx-auto mt-6 max-w-md text-sm leading-relaxed">
          Curated collections designed to live together and move with you.
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
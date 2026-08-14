import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import collectionImg from "@/assets/collection.jpg";
import storyImg from "@/assets/story.jpg";
import afterDarkImg from "@/assets/afterdark.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catTops from "@/assets/cat-tops.jpg";
import catSets from "@/assets/cat-sets.jpg";
import catJumpsuits from "@/assets/cat-jumpsuits.jpg";
import detailImg from "@/assets/detail.jpg";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luce by Lucia — The Art of Being You | Nairobi Fashion House" },
      {
        name: "description",
        content:
          "Elegant dresses, tailored sets and occasion wear designed in Nairobi. Shop the new collection in KSh with M-Pesa checkout and nationwide delivery.",
      },
      {
        property: "og:title",
        content: "Luce by Lucia — The Art of Being You",
      },
      {
        property: "og:description",
        content:
          "A Nairobi fashion house for women who dress for themselves. Shop the new collection.",
      },
    ],
  }),
  component: Home,
});

const CATEGORY_CARDS = [
  { title: "Dresses", image: catDresses },
  { title: "Tops", image: catTops },
  { title: "Two-Piece Sets", image: catSets },
  { title: "Occasion Wear", image: catJumpsuits },
];

const REVIEWS = [
  {
    quote: "Beautiful quality and the fit was perfect. It felt made for me.",
    name: "Verified Customer, Nairobi",
  },
  {
    quote:
      "The satin dress arrived next day and looked far more expensive than it was.",
    name: "Verified Customer, Kisumu",
  },
  {
    quote: "Their WhatsApp team helped me pick my size. Faultless service.",
    name: "Verified Customer, Mombasa",
  },
];

const SOCIAL = [
  catDresses,
  collectionImg,
  catSets,
  storyImg,
  catTops,
  detailImg,
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink relative">
        <img
          src={heroImg}
          alt="Model wearing the Lucia black wrap dress in an architectural Nairobi space"
          width={1600}
          height={1920}
          className="h-[78vh] w-full object-cover object-center opacity-90 lg:h-[92vh]"
        />
        <div className="from-ink/85 via-ink/25 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 lg:px-10 lg:pb-24">
            <div className="reveal max-w-xl">
              <p className="eyebrow text-gold-soft">New Season</p>
              <h1 className="display-xl text-ivory mt-5">
                The Art of
                <br />
                Being You
              </h1>
              <p className="text-ivory/75 mt-6 max-w-md text-sm leading-relaxed sm:text-base">
                Considered pieces cut in Nairobi for women who dress for
                themselves — not for the room.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn-ghost-light">
                  Shop the Collection
                </Link>
                <Link
                  to="/collections"
                  className="link-gold text-gold-soft text-[11px] tracking-[0.24em] uppercase"
                >
                  View Lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION STORY — asymmetric */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <img
              src={collectionImg}
              alt="Two models in ivory and blush tailored co-ord sets"
              loading="lazy"
              width={1408}
              height={1760}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <p className="eyebrow text-muted-foreground">
              The Latest Collection
            </p>
            <h2 className="display-lg mt-5">Made for the Moment</h2>
            <div className="hairline-gold mt-7" />
            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Fluid crepe, sandwashed silk and knife pleats in a palette of
              ivory, blush and black. Twelve pieces designed to be layered,
              broken apart and worn far beyond a single occasion.
            </p>
            <Link to="/collections" className="btn-ink mt-9">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="border-t py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-lg">Shop by Category</h2>
            <Link
              to="/shop"
              className="link-gold text-[11px] tracking-[0.24em] uppercase"
            >
              View All
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {CATEGORY_CARDS.map((category) => (
              <Link
                key={category.title}
                to="/shop"
                search={{ category: category.title }}
                className="group relative block overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={`${category.title} category`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="from-ink/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-ivory font-display text-xl tracking-[0.12em] uppercase">
                    {category.title}
                  </h3>
                  <span className="text-gold-soft mt-2 inline-flex items-center gap-2 text-[10px] tracking-[0.26em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop Category <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="text-center">
          <p className="eyebrow text-muted-foreground">New Arrivals</p>
          <h2 className="display-lg mt-4">Just Landed</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
            Discover the latest pieces from Luce by Lucia.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* AFTER DARK DROP */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-0">
          <div className="lg:py-32">
            <p className="eyebrow text-gold-soft">The New Drop</p>
            <h2 className="display-xl mt-5">After Dark</h2>
            <div className="hairline-gold mt-8" />
            <p className="text-ivory/65 mt-8 max-w-sm text-sm leading-loose">
              Eight pieces in black, champagne and midnight satin. Cut for
              evenings that ask a little more of you. Limited runs — once
              they&apos;re gone, they&apos;re gone.
            </p>
            <Link to="/collections" className="btn-ghost-light mt-10">
              Shop the Drop
            </Link>
          </div>
          <img
            src={afterDarkImg}
            alt="Model in a black evening gown lit against darkness"
            loading="lazy"
            width={1600}
            height={1104}
            className="h-full w-full object-cover lg:min-h-[80vh]"
          />
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <img
            src={storyImg}
            alt="Model seated in a blush satin slip dress"
            loading="lazy"
            width={1312}
            height={1600}
            className="aspect-[4/5] w-full object-cover"
          />
          <div>
            <p className="eyebrow text-muted-foreground">The Luce Woman</p>
            <h2 className="display-lg mt-5">
              Confident. Elegant.
              <br />
              Unforgettable.
            </h2>
            <div className="hairline-gold mt-7" />
            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Luce began in a small Nairobi studio with one belief: a garment
              should meet the woman where she is. Every piece is drafted,
              fitted and finished in-house, in small runs, on real bodies of
              every shape.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-loose">
              We do not design to correct you. We design to reveal you.
            </p>
            <Link to="/about" className="btn-ink mt-9">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* THE LUCE EDIT */}
      <section className="bg-secondary/40 border-y py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-muted-foreground">Bestsellers</p>
              <h2 className="display-lg mt-4">The Luce Edit</h2>
            </div>
            <Link
              to="/shop"
              className="link-gold text-[11px] tracking-[0.24em] uppercase"
            >
              View All
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {products.slice(2, 6).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="display-lg text-center">Loved by the Luce Woman</h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure key={review.name} className="border-t pt-8">
              <div className="text-gold flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="font-display mt-5 text-xl leading-snug">
                “{review.quote}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-5 text-[11px] tracking-[0.2em] uppercase">
                — {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SOCIAL */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="text-center">
            <p className="eyebrow text-muted-foreground">@lucebylucia</p>
            <h2 className="display-lg mt-4">Follow the Luce World</h2>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
            {SOCIAL.map((image, index) => (
              <a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden"
                aria-label="View this look on Instagram"
              >
                <img
                  src={image}
                  alt="Luce by Lucia look shared on Instagram"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="bg-ink/30 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center lg:py-28">
          <p className="eyebrow text-gold-soft">Newsletter</p>
          <h2 className="display-lg mt-5">Join the Luce List</h2>
          <p className="text-ivory/60 mt-5 text-sm leading-relaxed">
            Be the first to discover new collections, exclusive drops and
            private offers.
          </p>
          <form
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Your email address"
              className="border-ivory/30 text-ivory placeholder:text-ivory/40 focus:border-gold flex-1 border-b bg-transparent px-1 py-4 text-sm outline-none"
            />
            <button type="submit" className="btn-ghost-light">
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";

import heroImg from "@/assets/aura-set-long.webp";
import collectionImg from "@/assets/signature-1.webp";
import storyImg from "@/assets/sculpt-jumpsuit.webp";
import afterDarkImg from "@/assets/everyday-set-short-5.webp";
import aurasetshort1 from "@/assets/aura-set-short-1.webp";
import everydaysetshort4 from "@/assets/everyday-set-long-1.webp";
import signature4 from "@/assets/signature-1.webp";
import sculpt3 from "@/assets/sculpt-jumpsuit.webp";
import zola1 from "@/assets/zola-1.webp";
import sahara4 from "@/assets/sahara.webp";
import aurasetlong3 from "@/assets/aura-set-long-3.webp";
import everydaysetlong1 from "@/assets/everyday-set-long-1.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luce by Lucia — The Art of Being You | Nairobi Fashion House" },
      {
        name: "description",
        content:
          "Elegant dresses, active & lounge sets and occasion wear designed in Nairobi. Shop the new collection in KSh with M-Pesa checkout and nationwide delivery.",
      },
      { property: "og:title", content: "Luce by Lucia — The Art of Being You" },
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
  { title: "Sahara", image: sahara4 },
  { title: "Aura Set Short", image: aurasetshort1 },
  { title: "Aura Set Long", image: aurasetlong3 },
  { title: "Everyday Set Short", image: everydaysetshort4 },
  { title: "Zola", image: zola1 },
  { title: "Signature", image: signature4 },
  { title: "Sculpt Jumpsuit", image: sculpt3 },
  { title: "Everyday Set Long", image: everydaysetlong1 },
];

const TICKER_ITEMS = [
  "ELEGANT",
  "M-PESA CHECKOUT",
  "NATIONWIDE DELIVERY",
  "STYLISH",
];

const REVIEWS = [
  {
    quote: "Beautiful quality and the fit was perfect. It felt made for me.",
    name: "Verified Customer, Nairobi",
  },
  {
    quote:
      "The set arrived next day and looked far more striking than expected.",
    name: "Verified Customer, Kisumu",
  },
  {
    quote: "Their team helped me pick my size. Faultless service.",
    name: "Verified Customer, Mombasa",
  },
];

const SOCIAL = [aurasetlong3, collectionImg, sahara4, afterDarkImg, sculpt3, zola1];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const revealSection = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-80px" },
};

function Home() {
  return (
    <>
      {/* HERO — vertical monogram ribbon + soft rose bloom behind the headline */}
      <section className="bg-ink relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={heroImg}
            alt="Model wearing the Aura long set in an architectural Nairobi space"
            width={1600}
            height={1920}
            className="h-[80vh] w-full object-cover object-center lg:h-[94vh]"
          />
        </motion.div>
        <div className="from-ink/90 via-ink/30 absolute inset-0 bg-gradient-to-r to-transparent" />

        {/* signature: soft rose bloom, positioned behind where the headline sits */}
        <div className="blush-bloom pointer-events-none absolute left-[6%] top-[38%] size-[420px] opacity-60" />

        {/* signature: rotated monogram ribbon along the right edge, desktop only */}
        <div className="text-ivory/40 ribbon-vertical eyebrow pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
          LUCE · NAIROBI · EST. 2021
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 lg:px-10 lg:pb-24">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative max-w-xl"
            >
              <motion.p variants={fadeUp} className="eyebrow text-rose flex items-center gap-2">
                <span className="bg-rose inline-block size-1.5 rounded-full" />
                New Season
              </motion.p>
              <motion.h1 variants={fadeUp} className="display-xl text-ivory mt-5">
                The Art of
                <br />
                Being <span className="text-gold-soft italic">You</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-ivory/75 mt-6 max-w-md text-sm leading-relaxed sm:text-base"
              >
                Womenswear brand offering premium, ready-to-wear clothing designed to make you look and feel your absolute best.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link to="/shop" className="btn-ghost-light">
                  Shop the Collection
                </Link>
                <Link
                  to="/collections"
                  className="link-gold text-gold-soft text-[11px] tracking-[0.24em] uppercase"
                >
                  View Lookbook
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="bg-ink border-rose/20 overflow-hidden border-y py-3">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-gold-soft eyebrow flex items-center gap-6 whitespace-nowrap px-6"
            >
              {item}
              <span className="bg-rose inline-block size-1 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTION STORY — asymmetric */}
      <motion.section
        {...revealSection}
        variants={stagger}
        className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <img
              src={collectionImg}
              alt="Models in signature co-ord sets"
              loading="lazy"
              width={1408}
              height={1760}
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-5 lg:pl-6">
            <p className="eyebrow text-muted-foreground">
              The Latest Collection
            </p>
            <h2 className="display-lg mt-5">Made for the Moment</h2>
            <div className="hairline-gold mt-7" />
            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Fluid knits, stretch ribbed fabrics and comfortable silhouettes designed to be layered,
              broken apart and worn far beyond a single occasion.
            </p>
            <Link to="/collections" className="btn-ink mt-9">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* SHOP BY CATEGORY */}
      <section className="border-y py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <h2 className="display-lg">Shop by Category</h2>
            <Link to="/shop" className="link-gold text-[11px] tracking-[0.24em] uppercase">
              View All
            </Link>
          </motion.div>
          <motion.div
            {...revealSection}
            variants={stagger}
            className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
          >
            {CATEGORY_CARDS.map((category) => (
              <motion.div key={category.title} variants={fadeUp}>
                <Link
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
                  <div className="from-ink/75 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-ivory font-display text-xl tracking-[0.12em] uppercase">
                      {category.title}
                    </h3>
                    <span className="text-blush mt-2 inline-flex items-center gap-2 text-[10px] tracking-[0.26em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Shop Category <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <motion.div {...revealSection} variants={fadeUp} className="text-center">
          <p className="eyebrow text-muted-foreground">New Arrivals</p>
          <h2 className="display-lg mt-4">Just Landed</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
            Discover the latest pieces from Luce by Lucia.
          </p>
        </motion.div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* AFTER DARK DROP */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-0">
          <motion.div {...revealSection} variants={fadeUp} className="lg:py-32">
            <p className="eyebrow text-rose">The New Drop</p>
            <h2 className="display-xl mt-5">After Dark</h2>
            <div className="hairline-gold mt-8" />
            <p className="text-ivory/65 mt-8 max-w-sm text-sm leading-loose">
              Striking pieces designed for evenings that ask a little more of you. Limited runs — once
              they&apos;re gone, they&apos;re gone.
            </p>
            <Link to="/collections" className="btn-ghost-light mt-10">
              Shop the Drop
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={afterDarkImg}
              alt="Packaging and evening wear drop"
              loading="lazy"
              width={1600}
              height={1104}
              className="h-full w-full object-cover lg:min-h-[80vh]"
            />
          </motion.div>
        </div>
      </section>

      {/* BRAND STORY — with a small handwritten-feel pull-quote in rose */}
      <motion.section
        {...revealSection}
        variants={stagger}
        className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={fadeUp} className="relative">
            <img
              src={storyImg}
              alt="Model seated in a sculpt jumpsuit"
              loading="lazy"
              width={1312}
              height={1600}
              className="aspect-[4/5] w-full object-cover"
            />
            <p className="text-rose bg-ivory border-rose/30 absolute -bottom-6 left-6 max-w-[220px] border px-5 py-4 font-display text-lg italic shadow-sm">
              &ldquo;We design to reveal you.&rdquo;
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="eyebrow text-muted-foreground">The Luce Woman</p>
            <h2 className="display-lg mt-5">
              Confident. Elegant.
              <br />
              Unforgettable.
            </h2>
            <div className="hairline-gold mt-7" />
            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Luce by Lucia is an online womenswear brand offering premium, ready-to-wear clothing designed to make you look and feel your absolute best.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-loose">
              We keep our online catalog fresh, premium, and accessible. Skip the mass-market clutter and invest in clothing designed to hold its place as a favorite in your closet for years to come.
            </p>
            <Link to="/about" className="btn-ink mt-9">
              Discover Our Brand
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* THE LUCE EDIT */}
      <section className="bg-secondary/30 border-y py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="eyebrow text-muted-foreground">Bestsellers</p>
              <h2 className="display-lg mt-4">The Luce Edit</h2>
            </div>
            <Link to="/shop" className="link-gold text-[11px] tracking-[0.24em] uppercase">
              View All
            </Link>
          </motion.div>
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {products.slice(2, 6).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <motion.h2 {...revealSection} variants={fadeUp} className="display-lg text-center">
          Loved by the Luce Woman
        </motion.h2>
        <motion.div
          {...revealSection}
          variants={stagger}
          className="mt-14 grid gap-10 lg:grid-cols-3"
        >
          {REVIEWS.map((review) => (
            <motion.figure
              key={review.name}
              variants={fadeUp}
              className="border-rose/40 border-t-2 pt-8"
            >
              <div className="text-gold flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="font-display mt-5 text-xl leading-snug">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="text-muted-foreground mt-5 text-[11px] tracking-[0.2em] uppercase">
                — {review.name}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* SOCIAL */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div {...revealSection} variants={fadeUp} className="text-center">
            <p className="eyebrow text-muted-foreground">@lucebylucia</p>
            <h2 className="display-lg mt-4">Follow the Luce World</h2>
          </motion.div>
          <motion.div
            {...revealSection}
            variants={stagger}
            className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3"
          >
            {SOCIAL.map((image, index) => (
              <motion.a
                key={index}
                variants={fadeUp}
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
                <span className="bg-rose/30 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink text-ivory">
        <motion.div
          {...revealSection}
          variants={fadeUp}
          className="mx-auto max-w-2xl px-5 py-20 text-center lg:py-28"
        >
          <p className="eyebrow text-rose">Newsletter</p>
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
              className="border-ivory/30 text-ivory placeholder:text-ivory/40 focus:border-rose flex-1 border-b bg-transparent px-1 py-4 text-sm outline-none transition-colors"
            />
            <button type="submit" className="btn-ghost-light">
              Join
            </button>
          </form>
        </motion.div>
      </section>
    </>
  );
}
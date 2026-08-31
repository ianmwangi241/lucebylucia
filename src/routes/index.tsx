import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Instagram, Star } from "lucide-react";

import { ProductCard } from "@/components/site/product-card";
import { getProducts } from "@/lib/services/product-service";
import { getHomeImages } from "@/lib/services/home-service";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, images] = await Promise.all([
      getProducts({
        data: {
          sort: "newest",
        },
      }),
      getHomeImages(),
    ]);

    return {
      products,
      images,
    };
  },

  head: () => ({
    meta: [
      {
        title: "Luce by Lucia — The Art of Being You",
      },
      {
        name: "description",
        content:
          "Discover Luce by Lucia — premium ready-to-wear womenswear designed in Nairobi. Shop elegant dresses, sets, jumpsuits and occasion wear with M-Pesa checkout and nationwide delivery.",
      },
      {
        property: "og:title",
        content: "Luce by Lucia — The Art of Being You",
      },
      {
        property: "og:description",
        content:
          "Premium womenswear designed in Nairobi for women who dress for themselves.",
      },
    ],
  }),

  component: Home,
});

/* =========================================================
   CONTENT
========================================================= */

const TICKER_ITEMS = [
  "DESIGNED IN NAIROBI",
  "M-PESA CHECKOUT",
  "NATIONWIDE DELIVERY",
  "PREMIUM READY-TO-WEAR",
  "THE ART OF BEING YOU",
];

const REVIEWS = [
  {
    quote:
      "Beautiful quality and the fit was perfect. It felt made for me.",
    name: "Verified Customer",
    location: "Nairobi",
  },
  {
    quote:
      "The set arrived beautifully packaged and looked even better in person.",
    name: "Verified Customer",
    location: "Kisumu",
  },
  {
    quote:
      "Their team helped me choose my size. The entire experience was seamless.",
    name: "Verified Customer",
    location: "Mombasa",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealSection = {
  initial: "hidden" as const,

  whileInView: "visible" as const,

  viewport: {
    once: true,
    margin: "-80px",
  },
};

/* =========================================================
   HOME
========================================================= */

function Home() {
  const { products, images } = Route.useLoaderData();

  /*
   * Homepage editorial categories.
   *
   * These images are supplied by getHomeImages()
   * from Supabase Storage.
   */
  const categoryCards = [
    {
      title: "Sahara",
      image: images.sahara,
    },
    {
      title: "Aura Set Short",
      image: images.auraSetShort,
    },
    {
      title: "Aura Set Long",
      image: images.auraSetLong,
    },
    {
      title: "Everyday Set Short",
      image: images.everydaySetShort,
    },
    {
      title: "Zola",
      image: images.zola,
    },
    {
      title: "Signature",
      image: images.signature,
    },
    {
      title: "Sculpt Jumpsuit",
      image: images.sculpt,
    },
    {
      title: "Everyday Set Long",
      image: images.everydaySetLong,
    },
  ];

  const socialImages = [
    images.auraSetLong,
    images.collection,
    images.sahara,
    images.afterDark,
    images.sculpt,
    images.zola,
  ];

  const newArrivals = products.slice(0, 4);

  const editProducts =
    products.length > 4
      ? products.slice(4, 8)
      : products.slice(0, 4);

  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-ink relative min-h-[88vh] overflow-hidden lg:min-h-[94vh]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.06,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <img
            src={images.hero}
            alt="Luce by Lucia new season collection"
            width={1600}
            height={1920}
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Dark editorial overlay */}
        <div className="from-ink/95 via-ink/45 absolute inset-0 bg-gradient-to-r to-transparent" />

        <div className="from-ink/30 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        {/* Decorative bloom */}
        <div className="blush-bloom pointer-events-none absolute left-[5%] top-[35%] size-[400px] opacity-50" />

        {/* Vertical branding */}
        <div className="text-ivory/40 eyebrow pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] lg:block">
          LUCE · NAIROBI · EST. 2021
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[88vh] items-end lg:min-h-[94vh]">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 lg:px-10 lg:pb-24">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.p
                variants={fadeUp}
                className="eyebrow text-rose flex items-center gap-2"
              >
                <span className="bg-rose size-1.5 rounded-full" />
                New Season
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="display-xl text-ivory mt-5"
              >
                The Art of
                <br />
                Being{" "}
                <span className="text-gold-soft italic">
                  You
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-ivory/75 mt-6 max-w-lg text-sm leading-relaxed sm:text-base"
              >
                Premium ready-to-wear womenswear designed
                in Nairobi for women who dress with
                confidence, elegance and intention.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-5"
              >
                <Link
                  to="/shop"
                  className="btn-ghost-light"
                >
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

        {/* Scroll indicator */}
        <div className="text-ivory/50 absolute bottom-7 right-5 hidden items-center gap-3 lg:flex">
          <span className="text-[9px] tracking-[0.3em] uppercase">
            Discover
          </span>

          <span className="bg-ivory/40 h-px w-12" />
        </div>
      </section>

      {/* =====================================================
          TICKER
      ===================================================== */}

      <section
        aria-label="Luce by Lucia highlights"
        className="bg-ink border-rose/20 overflow-hidden border-y py-3"
      >
        <div className="marquee-track">
          {[
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
          ].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-gold-soft eyebrow flex items-center gap-6 whitespace-nowrap px-6"
            >
              {item}

              <span className="bg-rose size-1 rounded-full" />
            </span>
          ))}
        </div>
      </section>

      {/* =====================================================
          INTRO / LATEST COLLECTION
      ===================================================== */}

      <motion.section
        {...revealSection}
        variants={stagger}
        className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={fadeIn}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden">
              <motion.img
                initial={{
                  scale: 1.06,
                }}
                whileInView={{
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                src={images.collection}
                alt="Luce by Lucia signature collection"
                loading="lazy"
                width={1408}
                height={1760}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 lg:pl-6"
          >
            <p className="eyebrow text-muted-foreground">
              The Latest Collection
            </p>

            <h2 className="display-lg mt-5">
              Made for
              <br />
              the Moment
            </h2>

            <div className="hairline-gold mt-7" />

            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Discover considered silhouettes, fluid
              textures and effortless pieces designed to
              move with you.
            </p>

            <p className="text-muted-foreground mt-4 text-sm leading-loose">
              From everyday dressing to moments that call
              for something more, every Luce piece is
              designed to become part of your story.
            </p>

            <Link
              to="/collections"
              className="btn-ink mt-9 inline-flex"
            >
              Explore Collection
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          SHOP BY CATEGORY
      ===================================================== */}

      <section className="border-y py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="flex flex-wrap items-end justify-between gap-5"
          >
            <div>
              <p className="eyebrow text-muted-foreground">
                Explore
              </p>

              <h2 className="display-lg mt-3">
                Shop by Category
              </h2>
            </div>

            <Link
              to="/shop"
              className="link-gold text-[11px] tracking-[0.24em] uppercase"
            >
              View All
            </Link>
          </motion.div>

          <motion.div
            {...revealSection}
            variants={stagger}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          >
            {categoryCards.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeUp}
              >
                <Link
                  to="/shop"
                  search={{
                    category: category.title,
                  }}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={`${category.title} collection`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />

                  <div className="from-ink/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <h3 className="text-ivory font-display text-base tracking-[0.12em] uppercase sm:text-xl">
                      {category.title}
                    </h3>

                    <span className="text-blush mt-2 inline-flex items-center gap-2 text-[9px] tracking-[0.24em] uppercase opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      Shop Category
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          NEW ARRIVALS
      ===================================================== */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <motion.div
          {...revealSection}
          variants={fadeUp}
          className="text-center"
        >
          <p className="eyebrow text-muted-foreground">
            New Arrivals
          </p>

          <h2 className="display-lg mt-4">
            Just Landed
          </h2>

          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-relaxed">
            The newest pieces to enter the Luce wardrobe.
          </p>
        </motion.div>

        {newArrivals.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-16 text-center text-sm">
            New pieces are coming soon.
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="link-gold text-[11px] tracking-[0.24em] uppercase"
          >
            Shop All New Arrivals
          </Link>
        </div>
      </section>

      {/* =====================================================
          AFTER DARK
      ===================================================== */}

      <section className="bg-ink text-ivory overflow-hidden">
        <div className="mx-auto grid max-w-[1600px] items-stretch lg:grid-cols-2">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="flex items-center px-5 py-20 lg:px-10 lg:py-32"
          >
            <div className="max-w-lg">
              <p className="eyebrow text-rose">
                The New Drop
              </p>

              <h2 className="display-xl mt-5">
                After Dark
              </h2>

              <div className="hairline-gold mt-8" />

              <p className="text-ivory/65 mt-8 max-w-md text-sm leading-loose">
                Striking pieces designed for evenings that
                ask a little more of you. Elevated
                silhouettes, confident details and effortless
                glamour.
              </p>

              <Link
                to="/collections"
                className="btn-ghost-light mt-10 inline-flex"
              >
                Shop the Drop
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={images.afterDark}
              alt="Luce by Lucia evening collection"
              loading="lazy"
              width={1600}
              height={1104}
              className="h-full min-h-[500px] w-full object-cover lg:min-h-[80vh]"
            />
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          THE LUCE WOMAN
      ===================================================== */}

      <motion.section
        {...revealSection}
        variants={stagger}
        className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={fadeUp}
            className="relative"
          >
            <div className="overflow-hidden">
              <motion.img
                initial={{
                  scale: 1.05,
                }}
                whileInView={{
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                }}
                src={images.story}
                alt="Luce by Lucia sculpt jumpsuit"
                loading="lazy"
                width={1312}
                height={1600}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <p className="text-rose bg-ivory border-rose/30 absolute -bottom-6 left-5 max-w-[240px] border px-5 py-4 font-display text-lg italic shadow-sm sm:left-8">
              &ldquo;We design to reveal you.&rdquo;
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="eyebrow text-muted-foreground">
              The Luce Woman
            </p>

            <h2 className="display-lg mt-5">
              Confident.
              <br />
              Elegant.
              <br />
              Unforgettable.
            </h2>

            <div className="hairline-gold mt-7" />

            <p className="text-muted-foreground mt-7 text-sm leading-loose">
              Luce by Lucia is a Nairobi womenswear
              brand creating premium ready-to-wear clothing
              for women who want to look and feel their
              absolute best.
            </p>

            <p className="text-muted-foreground mt-4 text-sm leading-loose">
              We believe getting dressed should feel
              effortless. Our collections are designed to
              give you pieces you can wear, rewear and make
              entirely your own.
            </p>

            <Link
              to="/about"
              className="btn-ink mt-9 inline-flex"
            >
              Discover Our Brand
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          THE LUCE EDIT / BESTSELLERS
      ===================================================== */}

      <section className="bg-secondary/30 border-y py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="flex flex-wrap items-end justify-between gap-5"
          >
            <div>
              <p className="eyebrow text-muted-foreground">
                The Edit
              </p>

              <h2 className="display-lg mt-4">
                Pieces to Know
              </h2>
            </div>

            <Link
              to="/shop"
              className="link-gold text-[11px] tracking-[0.24em] uppercase"
            >
              View All
            </Link>
          </motion.div>

          {editProducts.length > 0 ? (
            <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
              {editProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* =====================================================
          BRAND STATEMENT
      ===================================================== */}

      <section className="bg-ivory">
        <motion.div
          {...revealSection}
          variants={fadeUp}
          className="mx-auto max-w-4xl px-5 py-24 text-center lg:py-36"
        >
          <p className="eyebrow text-muted-foreground">
            Luce by Lucia
          </p>

          <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Clothing should never
            <br />
            <span className="text-gold-soft italic">
              wear you.
            </span>
          </h2>

          <div className="hairline-gold mx-auto mt-8 max-w-[80px]" />

          <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-sm leading-loose">
            We create pieces that leave room for the most
            important part of every look — you.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <motion.div
          {...revealSection}
          variants={fadeUp}
          className="text-center"
        >
          <p className="eyebrow text-muted-foreground">
            The Luce Experience
          </p>

          <h2 className="display-lg mt-4">
            Loved by the Luce Woman
          </h2>
        </motion.div>

        <motion.div
          {...revealSection}
          variants={stagger}
          className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12"
        >
          {REVIEWS.map((review, index) => (
            <motion.figure
              key={`${review.name}-${index}`}
              variants={fadeUp}
              className="border-rose/40 border-t-2 pt-8"
            >
              <div
                className="text-gold flex gap-1"
                aria-label="5 out of 5 stars"
              >
                {Array.from({
                  length: 5,
                }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="size-3.5 fill-current"
                  />
                ))}
              </div>

              <blockquote className="font-display mt-5 text-xl leading-snug">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="text-muted-foreground mt-5 text-[10px] tracking-[0.2em] uppercase">
                — {review.name}, {review.location}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* =====================================================
          INSTAGRAM / SOCIAL
      ===================================================== */}

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.div
            {...revealSection}
            variants={fadeUp}
            className="text-center"
          >
            <p className="eyebrow text-muted-foreground flex items-center justify-center gap-2">
              <Instagram className="size-3.5" />
              @lucebylucia
            </p>

            <h2 className="display-lg mt-4">
              Follow the Luce World
            </h2>

            <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
              Discover new looks, styling inspiration and
              life beyond the collection.
            </p>
          </motion.div>

          <motion.div
            {...revealSection}
            variants={stagger}
            className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3"
          >
            {socialImages.map((image, index) => (
              <motion.a
                key={`${image}-${index}`}
                variants={fadeUp}
                href="https://instagram.com/lucebylucia"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden"
                aria-label="Follow Luce by Lucia on Instagram"
              >
                <img
                  src={image}
                  alt="Luce by Lucia fashion look"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="bg-rose/30 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="text-ivory absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="size-5" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="bg-ink text-ivory">
        <motion.div
          {...revealSection}
          variants={fadeUp}
          className="mx-auto max-w-2xl px-5 py-20 text-center lg:py-28"
        >
          <p className="eyebrow text-rose">
            Stay in the know
          </p>

          <h2 className="display-lg mt-5">
            Join the Luce List
          </h2>

          <p className="text-ivory/60 mx-auto mt-5 max-w-md text-sm leading-relaxed">
            Be the first to discover new collections,
            exclusive drops and special offers.
          </p>

          <form
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label
              htmlFor="newsletter"
              className="sr-only"
            >
              Email address
            </label>

            <input
              id="newsletter"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              className="border-ivory/30 text-ivory placeholder:text-ivory/40 focus:border-rose min-h-12 flex-1 border-b bg-transparent px-1 py-4 text-sm outline-none transition-colors"
            />

            <button
              type="submit"
              className="btn-ghost-light"
            >
              Join
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
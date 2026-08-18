import { Link, createFileRoute } from "@tanstack/react-router";
import storyImg from "@/assets/sculpt-jumpsuit.jpg";
import detailImg from "@/assets/packaging.jpg";
import collectionImg from "@/assets/signature-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Luce by Lucia" },
      {
        name: "description",
        content:
          "Shop premium womenswear designed, fitted, and crafted in Nairobi. Discover limited-run collections made for real bodies.",
      },
      { property: "og:title", content: "About Us — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Premium Nairobi-made womenswear, crafted in small batches and tailored for everyday elegance.",
      },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Made in Nairobi",
    copy: "Every piece is proudly cut, sewn, and finished right here in our local studio by skilled artisans.",
  },
  {
    title: "Limited Batches",
    copy: "We stock in small runs to guarantee exclusivity, prevent mass overproduction, and maintain strict quality control.",
  },
  {
    title: "Tailored for Real Bodies",
    copy: "Every design is tested and fitted across sizes XS–XXL to ensure a flawless fit that flatters your shape.",
  },
];

function About() {
  return (
    <>
      <header className="relative">
        <img
          src={collectionImg}
          alt="Luce by Lucia collection showcase"
          className="h-[52vh] w-full object-cover"
        />
        <div className="bg-ink/45 absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div>
            <p className="eyebrow text-gold-soft">Welcome to Luce</p>
            <h1 className="display-xl text-ivory mt-5">Effortless Style, Exceptional Quality</h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-20 lg:py-28 text-center lg:text-left">
        <div className="hairline-gold mx-auto lg:mx-0" />
        <p className="font-display mt-10 text-2xl leading-relaxed lg:text-3xl">
          Luce by Lucia is an online womenswear brand offering premium, ready-to-wear clothing designed to make you look and feel your absolute best.
        </p>
        <p className="text-muted-foreground mt-8 text-sm leading-loose">
          Shopping for clothes that actually fit well shouldn&apos;t be a compromise. Based in Nairobi, we curate and produce high-end apparel focusing on clean silhouettes, durable fabrics, and meticulous attention to detail. Whether you are dressing up for a special evening out or upgrading your daily wardrobe, our pieces deliver reliable style and comfort.
        </p>
        <p className="text-muted-foreground mt-6 text-sm leading-loose">
          We keep our online catalog fresh, premium, and accessible. Skip the mass-market clutter and invest in clothing designed to hold its place as a favorite in your closet for years to come.
        </p>
      </section>

      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <img
            src={storyImg}
            alt="Model wearing a Luce by Lucia sculpt jumpsuit"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div>
            <p className="eyebrow text-gold-soft">Why Shop With Us</p>
            <h2 className="display-lg mt-5">
              Clothing That Works for Your Lifestyle
            </h2>
            <div className="hairline-gold mt-7" />
            <p className="text-ivory/65 mt-7 text-sm leading-loose">
              You deserve clothes made with care. From sturdy, high-grade stitching to comfortable linings and flattering cuts, every item in our shop is selected and built to meet high standards. Browse our catalog today and find your next favorite outfit.
            </p>
            <Link to="/shop" className="btn-ghost-light mt-9">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-center">
          <img
            src={detailImg}
            alt="Packaging and brand details"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
          <div className="space-y-10 lg:pt-8">
            <div className="border-b pb-4">
              <p className="eyebrow text-gold-soft">The Standard</p>
              <h3 className="font-display text-3xl mt-2">What Sets Us Apart</h3>
            </div>
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t pt-6">
                <h4 className="font-display text-2xl">{pillar.title}</h4>
                <p className="text-muted-foreground mt-3 text-sm leading-loose">
                  {pillar.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
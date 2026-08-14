import { Link, createFileRoute } from "@tanstack/react-router";
import storyImg from "@/assets/story.jpg";
import detailImg from "@/assets/detail.jpg";
import collectionImg from "@/assets/collection.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — A Nairobi Fashion House | Luce by Lucia" },
      {
        name: "description",
        content:
          "Luce by Lucia designs, fits and finishes womenswear in a Nairobi studio. Read the story behind the house and how each piece is made.",
      },
      { property: "og:title", content: "Our Story — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Designed, fitted and finished in a Nairobi studio, in small runs, on real bodies.",
      },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Cut in Nairobi",
    copy: "Every pattern is drafted and sewn in our Kilimani studio by a team of eight.",
  },
  {
    title: "Small Runs",
    copy: "We produce in limited quantities so nothing is wasted and nothing is everywhere.",
  },
  {
    title: "Fitted on Real Bodies",
    copy: "Each style is fitted across XS–XXL before it ever reaches the collection.",
  },
];

function About() {
  return (
    <>
      <header className="relative">
        <img
          src={collectionImg}
          alt="Luce by Lucia campaign portrait"
          className="h-[52vh] w-full object-cover"
        />
        <div className="bg-ink/45 absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div>
            <p className="eyebrow text-gold-soft">Our Story</p>
            <h1 className="display-xl text-ivory mt-5">Luce, meaning light</h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
        <div className="hairline-gold mx-auto" />
        <p className="font-display mt-10 text-2xl leading-relaxed lg:text-3xl">
          Lucia started this house with three machines, a rented room in
          Kilimani, and a stubborn idea: that a woman should never have to
          change her body to fit a garment.
        </p>
        <p className="text-muted-foreground mt-8 text-sm leading-loose">
          We began by making one dress, again and again, until it fell correctly
          on every woman who tried it. That dress became the Lucia Satin Slip —
          still the piece our customers return for. Everything since has been
          built the same way: drafted by hand, fitted across six sizes,
          finished in-house, released in small numbers.
        </p>
        <p className="text-muted-foreground mt-6 text-sm leading-loose">
          We are Kenyan, and we make clothing that competes anywhere. Not
          because it references somewhere else — because the work is good.
        </p>
      </section>

      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <img
            src={storyImg}
            alt="Model wearing a blush satin slip dress"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div>
            <p className="eyebrow text-gold-soft">The Luce Woman</p>
            <h2 className="display-lg mt-5">
              Confident. Elegant. Unforgettable.
            </h2>
            <div className="hairline-gold mt-7" />
            <p className="text-ivory/65 mt-7 text-sm leading-loose">
              She dresses for herself. She keeps pieces for years. She notices a
              hem, a lining, a covered button. We design for her attention.
            </p>
            <Link to="/shop" className="btn-ghost-light mt-9">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <img
            src={detailImg}
            alt="Close detail of black satin with gold stitching"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
          <div className="space-y-10 lg:pt-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t pt-6">
                <h3 className="font-display text-2xl">{pillar.title}</h3>
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

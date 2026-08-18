import { createFileRoute } from "@tanstack/react-router";
import signatureImg from "@/assets/signature-1.jpg";
import sculptImg from "@/assets/sculpt-jumpsuit.jpg";
import packagingImg from "@/assets/packaging.jpg";
import auraImg from "@/assets/aura-set-long.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — Styling & Fit Notes | Luce by Lucia" },
      {
        name: "description",
        content:
          "Styling notes, fit guidance and behind-the-seams stories from the Luce by Lucia studio in Nairobi.",
      },
      { property: "og:title", content: "The Journal — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Styling notes, fit guidance and behind-the-seams stories from our Nairobi studio.",
      },
    ],
  }),
  component: Journal,
});

const POSTS = [
  {
    title: "Five ways to wear the Aura Set",
    category: "Styling",
    date: "August 2026",
    image: signatureImg,
    excerpt:
      "One set, five silhouettes — from a Westlands boardroom to a Karen garden wedding.",
  },
  {
    title: "How we fit a slip dress",
    category: "Behind the seams",
    date: "July 2026",
    image: sculptImg,
    excerpt:
      "Bias cuts are unforgiving. Here is how our pattern team drafts one that isn't.",
  },
  {
    title: "On choosing fabric in Nairobi",
    category: "The studio",
    date: "June 2026",
    image: packagingImg,
    excerpt:
      "Why we buy in small lots, and what we look for before a roll enters the studio.",
  },
  {
    title: "Dressing for the long season",
    category: "Styling",
    date: "May 2026",
    image: auraImg,
    excerpt:
      "Layering for a city where mornings are cool and afternoons are not.",
  },
];

function Journal() {
  const [lead, ...rest] = POSTS;

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 lg:px-10 lg:py-20">
      <header className="border-b pb-10 text-center">
        <p className="eyebrow text-muted-foreground">Journal</p>
        <h1 className="display-xl mt-5">Notes from the Studio</h1>
      </header>

      {lead && (
        <article className="group mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <img
            src={lead.image}
            alt={lead.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <p className="eyebrow text-muted-foreground">
              {lead.category} · {lead.date}
            </p>
            <h2 className="display-lg mt-5">{lead.title}</h2>
            <p className="text-muted-foreground mt-6 text-sm leading-loose">
              {lead.excerpt}
            </p>
            <span className="link-gold mt-8 inline-block text-[11px] tracking-[0.24em] uppercase">
              Read the story
            </span>
          </div>
        </article>
      )}

      <div className="mt-20 grid gap-12 border-t pt-16 lg:grid-cols-3">
        {rest.map((post) => (
          <article key={post.title} className="group">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <p className="eyebrow text-muted-foreground mt-6">
              {post.category} · {post.date}
            </p>
            <h3 className="font-display mt-3 text-2xl">{post.title}</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-loose">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
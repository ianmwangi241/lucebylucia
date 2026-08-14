import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      "New Arrivals",
      "Collections",
      "Best Sellers",
      "Dresses",
      "Two-Piece Sets",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "Contact Us",
      "Size Guide",
      "Delivery",
      "Returns",
      "FAQs",
      "Track Order",
    ],
  },
  { title: "About", links: ["Our Story", "Journal", "Sustainability"] },
  { title: "Follow", links: ["Instagram", "TikTok", "WhatsApp"] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="border-ivory/10 border-t">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-10 lg:py-24">
          <div>
            <p className="font-display text-2xl tracking-[0.28em] uppercase">
              Luce
            </p>
            <p className="text-gold-soft mt-2 text-[10px] tracking-[0.4em] uppercase">
              by Lucia
            </p>
            <p className="text-ivory/60 mt-6 max-w-xs text-sm leading-relaxed">
              A Nairobi fashion house designing considered pieces for women who
              dress for themselves.
            </p>
            <div className="hairline-gold mt-8" />
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow text-gold-soft">{column.title}</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={
                        link === "Our Story"
                          ? "/about"
                          : link === "Journal"
                            ? "/journal"
                            : link === "Collections"
                              ? "/collections"
                              : "/shop"
                      }
                      className="link-gold text-ivory/70"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-ivory/10 border-t">
        <div className="text-ivory/45 mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-[10px] tracking-[0.2em] uppercase sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Luce by Lucia · Nairobi, Kenya</p>
          <div className="flex gap-6">
            <Link to="/links">Links</Link>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

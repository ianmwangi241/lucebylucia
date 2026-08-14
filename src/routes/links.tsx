import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Links — Shop, WhatsApp & Socials | Luce by Lucia" },
      {
        name: "description",
        content:
          "All Luce by Lucia links in one place: shop new in, the After Dark drop, size guide, WhatsApp orders, Instagram and TikTok.",
      },
      { property: "og:title", content: "Links — Luce by Lucia" },
      {
        property: "og:description",
        content:
          "Shop new in, message us on WhatsApp, or follow the Luce world.",
      },
    ],
  }),
  component: Links,
});

const INTERNAL = [
  { label: "Shop New In", to: "/shop" as const },
  { label: "The After Dark Drop", to: "/collections" as const },
  { label: "Our Story", to: "/about" as const },
  { label: "The Journal", to: "/journal" as const },
  { label: "Track My Order", to: "/account" as const },
];

const EXTERNAL = [
  { label: "WhatsApp Orders & Sizing", href: "https://wa.me/254700000000" },
  { label: "Instagram — @lucebylucia", href: "https://instagram.com" },
  { label: "TikTok — @lucebylucia", href: "https://tiktok.com" },
];

function Links() {
  return (
    <div className="bg-ink text-ivory relative min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="from-ink via-ink/85 to-ink absolute inset-0 bg-gradient-to-b" />

      <div className="relative mx-auto max-w-md px-5 py-20">
        <div className="text-center">
          <p className="font-display text-2xl tracking-[0.34em] uppercase">
            Luce
          </p>
          <p className="text-gold-soft mt-2 text-[10px] tracking-[0.42em] uppercase">
            by Lucia
          </p>
          <div className="hairline-gold mx-auto mt-7" />
          <p className="text-ivory/65 mt-7 text-sm leading-relaxed">
            Womenswear designed &amp; made in Nairobi. Shop in KSh · M-Pesa ·
            Nationwide delivery.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {INTERNAL.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="border-ivory/20 hover:border-gold hover:text-gold-soft flex items-center justify-between border px-6 py-5 text-[11px] tracking-[0.24em] uppercase transition-colors duration-300"
            >
              {link.label}
              <ArrowUpRight className="size-4" strokeWidth={1.2} />
            </Link>
          ))}
          {EXTERNAL.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ivory/20 hover:border-gold hover:text-gold-soft flex items-center justify-between border px-6 py-5 text-[11px] tracking-[0.24em] uppercase transition-colors duration-300"
            >
              {link.label}
              <ArrowUpRight className="size-4" strokeWidth={1.2} />
            </a>
          ))}
        </div>

        <p className="text-ivory/40 mt-14 text-center text-[10px] tracking-[0.24em] uppercase">
          © Luce by Lucia · Nairobi
        </p>
      </div>
    </div>
  );
}

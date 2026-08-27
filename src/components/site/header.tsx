import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart";

const NAV_CATEGORIES = [
  "New Arrivals",
  "Dresses",
  "Tops",
  "Bottoms",
  "Two-Piece Sets",
  "Occasion Wear",
];

const NAV = [
  {
    label: "New In",
    to: "/shop",
    search: { category: "New Arrivals" },
  },
  {
    label: "Shop",
    to: "/shop",
  },
  {
    label: "Collections",
    to: "/collections",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Journal",
    to: "/journal",
  },
] as const;

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const solid = scrolled || !overlay;

  return (
    <>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          solid
            ? "bg-ink text-ivory border-ivory/10 border-b"
            : "text-ivory border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-5 lg:px-10">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenu(true)}
          >
            <Menu className="size-5" strokeWidth={1.2} />
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="font-display text-lg leading-none tracking-[0.32em] uppercase lg:text-xl">
              Luce
            </span>

            <span className="text-gold-soft mt-1 block text-[9px] tracking-[0.4em] uppercase">
              by Lucia
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={
                  "search" in item
                    ? (item.search as never)
                    : undefined
                }
                className="link-gold text-[11px] tracking-[0.24em] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearch(true)}
            >
              <Search
                className="size-[18px]"
                strokeWidth={1.2}
              />
            </button>

            {/* Wishlist */}
            <Link
              to="/shop"
              aria-label="Wishlist"
              className="hidden sm:inline-flex"
            >
              <Heart
                className="size-[18px]"
                strokeWidth={1.2}
              />
            </Link>

            {/* Account */}
            <Link
              to="/login"
              aria-label="Account"
              className="hidden sm:inline-flex"
            >
              <User
                className="size-[18px]"
                strokeWidth={1.2}
              />
            </Link>

            {/* Shopping bag */}
            <button
              type="button"
              aria-label={`Bag, ${count} items`}
              onClick={() => setOpen(true)}
              className="relative"
            >
              <ShoppingBag
                className="size-[18px]"
                strokeWidth={1.2}
              />

              {count > 0 && (
                <span className="bg-gold text-ink absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[9px]">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          MOBILE MENU
      ============================================================ */}

      <div
        className={`bg-ink text-ivory fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          menu
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-5 py-6">
          <Link
            to="/"
            onClick={() => setMenu(false)}
            className="font-display tracking-[0.32em] uppercase"
          >
            Luce
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <X
              className="size-5"
              strokeWidth={1.2}
            />
          </button>
        </div>

        {/* Main navigation */}
        <nav className="flex flex-col px-5">
          {NAV.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              search={
                "search" in item
                  ? (item.search as never)
                  : undefined
              }
              onClick={() => setMenu(false)}
              className="border-ivory/10 font-display border-b py-5 text-3xl"
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Categories */}
        <div className="text-ivory/60 mt-8 flex flex-col gap-3 px-5 text-[11px] tracking-[0.24em] uppercase">
          {NAV_CATEGORIES.slice(1).map((category) => (
            <Link
              key={category}
              to="/shop"
              search={{ category } as never}
              onClick={() => setMenu(false)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* ============================================================
          SEARCH OVERLAY
      ============================================================ */}

      {search && (
        <div className="bg-ink/95 fixed inset-0 z-50 px-5 py-10">
          <div className="mx-auto max-w-2xl">
            {/* Close */}
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearch(false)}
              >
                <X
                  className="text-ivory size-5"
                  strokeWidth={1.2}
                />
              </button>
            </div>

            {/* Search label */}
            <label
              htmlFor="site-search"
              className="eyebrow text-gold-soft mt-12 block"
            >
              Search the boutique
            </label>

            {/* Search input */}
            <input
              id="site-search"
              autoFocus
              type="search"
              placeholder="Dresses, sets, occasion wear…"
              className="border-ivory/30 text-ivory font-display placeholder:text-ivory/40 focus:border-gold mt-4 w-full border-b bg-transparent pb-4 text-2xl outline-none"
            />

            {/* Category shortcuts */}
            <div className="text-ivory/50 mt-8 flex flex-wrap gap-3 text-[11px] tracking-[0.2em] uppercase">
              {NAV_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to="/shop"
                  search={{ category } as never}
                  onClick={() => setSearch(false)}
                  className="border-ivory/20 hover:border-gold border px-4 py-2"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
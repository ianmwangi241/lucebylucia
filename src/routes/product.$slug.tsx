import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { SizeGuide } from "@/components/site/size-guide";
import { ProductCard } from "@/components/site/product-card";
import { useCart } from "@/lib/cart";
import {
  COLOR_SWATCHES,
  formatKsh,
  getProduct,
  products,
} from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Piece unavailable — Luce by Lucia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${formatKsh(product.salePrice ?? product.price)} | Luce by Lucia`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

const ACCORDION = [
  "Description",
  "Details & Material",
  "Size & Fit",
  "Delivery",
  "Returns",
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]!);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [guide, setGuide] = useState(false);
  const [open, setOpen] = useState<string | null>("Description");

  const price = product.salePrice ?? product.price;
  const related = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  const accordionBody = (section: string) => {
    switch (section) {
      case "Description":
        return product.description;
      case "Details & Material":
        return product.material;
      case "Size & Fit":
        return product.fit;
      case "Delivery":
        return "Nairobi: same-day or next-day depending on your area. Nationwide: 2–4 working days via courier. Delivery fees are calculated at checkout by county.";
      default:
        return "Unworn pieces can be returned or exchanged within 7 days of delivery, with tags attached. Sale pieces are exchange only.";
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 lg:px-10 lg:py-16">
      <nav className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">
        <Link to="/shop" className="link-gold">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex gap-3 lg:flex-col">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                className={`w-16 border lg:w-20 ${
                  active === index ? "border-gold" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="bg-muted flex-1 overflow-hidden">
            <img
              src={product.images[active]}
              alt={`${product.name} in ${color}`}
              width={900}
              height={1200}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.5]"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-6">
          <p className="eyebrow text-muted-foreground">{product.collection}</p>
          <h1 className="font-display mt-4 text-4xl leading-tight lg:text-5xl">
            {product.name}
          </h1>
          <div className="mt-5 flex items-center gap-4">
            <p className="text-lg">
              {product.salePrice ? (
                <>
                  <span className="text-destructive">
                    {formatKsh(product.salePrice)}
                  </span>{" "}
                  <span className="text-muted-foreground text-sm line-through">
                    {formatKsh(product.price)}
                  </span>
                </>
              ) : (
                formatKsh(product.price)
              )}
            </p>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="text-gold flex">
                {Array.from({ length: product.rating }).map((_, index) => (
                  <Star key={index} className="size-3 fill-current" />
                ))}
              </span>
              {product.reviews} reviews
            </div>
          </div>

          <div className="hairline-gold mt-7" />

          <p className="text-muted-foreground mt-7 text-sm leading-loose">
            {product.description}
          </p>

          {/* Colour */}
          <div className="mt-9">
            <p className="eyebrow text-muted-foreground">
              Colour — <span className="text-foreground">{color}</span>
            </p>
            <div className="mt-4 flex gap-3">
              {product.colors.map((item) => (
                <button
                  key={item}
                  onClick={() => setColor(item)}
                  aria-label={item}
                  aria-pressed={color === item}
                  className={`size-7 rounded-full border ${
                    color === item ? "ring-gold ring-1 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: COLOR_SWATCHES[item] }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-muted-foreground">Size</p>
              <button
                onClick={() => setGuide(true)}
                className="link-gold text-[11px] tracking-[0.2em] uppercase"
              >
                What&apos;s my size?
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((item) => {
                const soldOut = product.soldOutSizes?.includes(item);
                return (
                  <button
                    key={item}
                    disabled={soldOut}
                    onClick={() => setSize(item)}
                    aria-pressed={size === item}
                    className={`min-w-12 border px-4 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors ${
                      size === item
                        ? "border-ink bg-ink text-ivory"
                        : "hover:border-gold"
                    } ${soldOut ? "text-muted-foreground line-through opacity-50" : ""}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + add */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center border">
              <button
                aria-label="Decrease quantity"
                className="px-4"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus className="size-3" strokeWidth={1.4} />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="px-4"
                onClick={() => setQty(qty + 1)}
              >
                <Plus className="size-3" strokeWidth={1.4} />
              </button>
            </div>
            <button
              onClick={() => size && add(product, color, size, qty)}
              disabled={!size}
              className="btn-ink flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {size ? "Add to Bag" : "Select a size"}
            </button>
          </div>

          <button className="link-gold text-muted-foreground mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
            <Heart className="size-4" strokeWidth={1.2} /> Add to Wishlist
          </button>

          <div className="text-muted-foreground mt-8 flex items-start gap-3 border-t pt-6 text-xs leading-relaxed">
            <Truck className="mt-0.5 size-4 shrink-0" strokeWidth={1.2} />
            <p>
              Nairobi same-day / next-day delivery. Nationwide courier 2–4 days.
              Pay with M-Pesa or card at checkout.
            </p>
          </div>

          {/* Accordion */}
          <div className="mt-8 border-t">
            {ACCORDION.map((section) => (
              <div key={section} className="border-b">
                <button
                  onClick={() => setOpen(open === section ? null : section)}
                  aria-expanded={open === section}
                  className="flex w-full items-center justify-between py-5 text-left text-[11px] tracking-[0.22em] uppercase"
                >
                  {section}
                  <span className="text-gold">
                    {open === section ? "−" : "+"}
                  </span>
                </button>
                {open === section && (
                  <p className="text-muted-foreground pb-6 text-sm leading-loose">
                    {accordionBody(section)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile add */}
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t p-3 lg:hidden">
        <button
          onClick={() => size && add(product, color, size, qty)}
          className="btn-ink w-full"
        >
          {size ? `Add to Bag · ${formatKsh(price * qty)}` : "Select a size"}
        </button>
      </div>

      <section className="mt-24 border-t pt-16">
        <h2 className="display-lg text-center">You May Also Love</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <SizeGuide
        open={guide}
        onClose={() => setGuide(false)}
        fit={product.fit}
      />
    </div>
  );
}

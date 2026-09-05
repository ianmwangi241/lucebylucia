// src/routes/product.$slug.tsx
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import { SizeGuide } from "@/components/site/size-guide";
import { ProductCard } from "@/components/site/product-card";
import { useCart } from "@/lib/cart";
import { COLOR_SWATCHES, formatKsh } from "@/lib/products";
import { getProductBySlug, getProducts } from "@/lib/services/product-service";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    let product;
    try {
      product = await getProductBySlug({ data: params.slug });
    } catch {
      throw notFound();
    }

    const sameCategory = product.categorySlug
      ? await getProducts({ data: { category: product.categorySlug } })
      : [];

    const related = sameCategory
      .filter((item) => item.slug !== product.slug)
      .slice(0, 4);

    return { product, related };
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
    const description = (product.description || `Shop ${product.name} from Luce by Lucia.`).slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: product.images[0] ?? "" },
      ],
    };
  },

  notFoundComponent: () => (
    <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow text-muted-foreground">404</p>
      <h1 className="display-lg mt-4">Product Not Found</h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        This piece may have sold out or moved. Take a look at the rest of the
        collection instead.
      </p>
      <Link to="/shop" className="btn-ink mt-8">
        Back to Shop
      </Link>
    </div>
  ),

  component: ProductPage,
});

const ACCORDION = ["Description", "Details & Material", "Size & Fit", "Delivery", "Returns"];

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState<string | null>(
    () => product.sizes.find((s) => !product.soldOutSizes.includes(s)) ?? null
  );
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [guide, setGuide] = useState(false);
  const [open, setOpen] = useState<string | null>("Description");

  const price = product.salePrice ?? product.price;

  const matchedVariant = useMemo(() => {
    if (product.sizes.length > 0 && !size) return null;
    return product.variants.find(
      (v) =>
        (product.colors.length === 0 || v.color === color) &&
        (product.sizes.length === 0 || v.sizeCode === size)
    );
  }, [product.variants, product.colors.length, product.sizes.length, color, size]);

  // A variant must actually exist and be in stock to add to bag — this is
  // stricter than before because order_items now requires a real
  // product_variant_id, so "no matched row" means there's nothing to order.
  const canAdd = Boolean(
    matchedVariant &&
      matchedVariant.is_available &&
      matchedVariant.stock_quantity > 0
  );

  const accordionBody = (section: string) => {
    switch (section) {
      case "Description":
        return product.description || "No description available for this piece yet.";
      case "Details & Material":
        return "Fabric and care details for this piece will be added soon.";
      case "Size & Fit":
        return "This piece runs true to size. Use the size guide for full measurements.";
      case "Delivery":
        return "Nairobi: same-day or next-day depending on your area. Nationwide: 2–4 working days via courier. Delivery fees are calculated at checkout by county.";
      default:
        return "Unworn pieces can be returned or exchanged within 7 days of delivery, with tags attached. Sale pieces are exchange only.";
    }
  };

  const handleAdd = () => {
    if (!canAdd || !matchedVariant) return;
    add({
      slug: product.slug,
      variantId: matchedVariant.id,
      sku: matchedVariant.sku,
      name: product.name,
      image: product.images[0] ?? "",
      color,
      size: size ?? "",
      price: matchedVariant.price ?? price,
      qty,
    });
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
            {product.images[active] && (
              <img
                src={product.images[active]}
                alt={`${product.name} in ${color}`}
                width={900}
                height={1200}
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.5]"
              />
            )}
          </div>
        </div>

        <div className="lg:pt-6">
          {product.collection && (
            <p className="eyebrow text-muted-foreground">{product.collection}</p>
          )}
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
          </div>

          <div className="hairline-gold mt-7" />

          <p className="text-muted-foreground mt-7 text-sm leading-loose">
            {product.description}
          </p>

          {product.colors.length > 0 && (
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
          )}

          {product.sizes.length > 0 && (
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
                  const soldOut = product.soldOutSizes.includes(item);
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
          )}

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
              onClick={handleAdd}
              disabled={!canAdd}
              className="btn-ink flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {product.sizes.length === 0 || size ? "Add to Bag" : "Select a size"}
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

      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t p-3 lg:hidden">
        <button onClick={handleAdd} disabled={!canAdd} className="btn-ink w-full disabled:opacity-40">
          {product.sizes.length === 0 || size
            ? `Add to Bag · ${formatKsh(price * qty)}`
            : "Select a size"}
        </button>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t pt-16">
          <h2 className="display-lg text-center">You May Also Love</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}

      <SizeGuide
        open={guide}
        onClose={() => setGuide(false)}
        fit="This piece runs true to size."
      />
    </div>
  );
}
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { COLOR_SWATCHES, formatKsh, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <div className="bg-muted relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={`${product.name} in ${product.colors[0]}`}
            loading="lazy"
            width={900}
            height={1200}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          {product.badge && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 text-[9px] tracking-[0.26em] uppercase ${
                product.badge === "Sale"
                  ? "bg-ink text-gold-soft"
                  : "bg-background/90 text-foreground"
              }`}
            >
              {product.badge}
            </span>
          )}
          <span className="bg-background/85 absolute top-3 right-3 grid size-9 place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Heart className="size-4" strokeWidth={1.2} />
          </span>
          <span className="bg-ink/85 text-ivory absolute inset-x-0 bottom-0 translate-y-full py-3 text-center text-[10px] tracking-[0.26em] uppercase transition-transform duration-400 group-hover:translate-y-0">
            Quick View
          </span>
        </div>

        <div className="pt-4">
          <h3 className="text-[13px] tracking-[0.1em] uppercase">
            {product.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-2 text-sm">
            {product.salePrice ? (
              <>
                <span className="text-destructive">
                  {formatKsh(product.salePrice)}
                </span>
                <span className="text-muted-foreground line-through">
                  {formatKsh(product.price)}
                </span>
              </>
            ) : (
              formatKsh(product.price)
            )}
          </p>
        </div>
      </Link>

      <div className="mt-3 flex items-center gap-2">
        {product.colors.map((color) => (
          <span
            key={color}
            title={color}
            className="size-3 rounded-full border"
            style={{ backgroundColor: COLOR_SWATCHES[color] ?? "#ccc" }}
          />
        ))}
      </div>
    </article>
  );
}

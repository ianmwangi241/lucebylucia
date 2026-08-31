// src/lib/services/product-service.ts
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProductRow = Tables<"products">;
type ProductImageRow = Tables<"product_images">;
type ProductVariantRow = Tables<"product_variants">;
type CategoryRow = Tables<"categories">;
type CollectionRow = Tables<"collections">;

type CategoryRef = Pick<CategoryRow, "id" | "name" | "slug">;
type CollectionRef = Pick<CollectionRow, "id" | "name" | "slug">;

type ProductCategoryJoin = { categories: CategoryRef | null };
type ProductCollectionJoin = {
  sort_order: number;
  collections: CollectionRef | null;
};

type ProductWithRelations = ProductRow & {
  product_categories: ProductCategoryJoin[];
  product_collections: ProductCollectionJoin[];
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
};

export type ProductImage = ProductImageRow & { url: string };

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc";

export type VariantWithSizeCode = ProductVariantRow & {
  sizeCode: string | null;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  categorySlug: string | null;
  collection: string;
  colors: string[];
  sizes: string[];
  soldOutSizes: string[];
  images: string[];
  description: string;
  featured: boolean;
  createdAt: string;
  badge?: "New" | "Bestseller" | "Sale" | "Low stock";
};

export type ProductDetail = Product & {
  variants: VariantWithSizeCode[];
};

// ---------------------------------------------------------------------------
// Size label -> code mapping
// ---------------------------------------------------------------------------

const SIZE_LABEL_TO_CODE: Record<string, string> = {
  "extra small": "XS",
  "xs": "XS",
  "small": "S",
  "s": "S",
  "medium": "M",
  "m": "M",
  "large": "L",
  "l": "L",
  "extra large": "XL",
  "xl": "XL",
  "double extra large": "XXL",
  "2x large": "XXL",
  "2xl": "XXL",
  "xxl": "XXL",
};

function toSizeCode(size: string | null): string | null {
  if (!size) return null;
  const key = size.trim().toLowerCase();
  return SIZE_LABEL_TO_CODE[key] ?? size;
}

// ---------------------------------------------------------------------------
// Color normalization (DB has lowercase "red"; UI swatches expect "Red")
// ---------------------------------------------------------------------------

function toTitleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// ---------------------------------------------------------------------------
// Shared query fragment + helpers
// ---------------------------------------------------------------------------

const PRODUCT_SELECT = `
  *,
  product_categories ( categories ( id, name, slug ) ),
  product_collections ( sort_order, collections ( id, name, slug ) ),
  product_images ( id, storage_path, alt_text, sort_order, is_primary ),
  product_variants ( id, sku, size, color, price, stock_quantity, is_available )
`;

function attachImageUrls(
  supabase: ReturnType<typeof createClient>,
  images: ProductImageRow[]
): ProductImage[] {
  return [...images]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((image) => ({
      ...image,
      url: supabase.storage
        .from("product_images")
        .getPublicUrl(image.storage_path).data.publicUrl,
    }));
}

function mapProduct(
  row: ProductWithRelations,
  supabase: ReturnType<typeof createClient>
): ProductDetail {
  const images = attachImageUrls(supabase, row.product_images);

  const variantsWithCodes: VariantWithSizeCode[] = row.product_variants.map(
    (v) => ({
      ...v,
      sizeCode: toSizeCode(v.size),
      color: v.color ? toTitleCase(v.color) : v.color,
    })
  );

  const sizes = Array.from(
    new Set(
      variantsWithCodes
        .map((v) => v.sizeCode)
        .filter((s): s is string => Boolean(s))
    )
  );

  const colors = Array.from(
    new Set(
      variantsWithCodes
        .map((v) => v.color)
        .filter((c): c is string => Boolean(c))
    )
  );

  const soldOutSizes = Array.from(
    new Set(
      variantsWithCodes
        .filter((v) => !v.is_available || v.stock_quantity <= 0)
        .map((v) => v.sizeCode)
        .filter((s): s is string => Boolean(s))
    )
  );

  const firstCategory = row.product_categories[0]?.categories ?? null;
  const sortedCollections = [...row.product_collections].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const firstCollection = sortedCollections[0]?.collections ?? null;

  return {
    slug: row.slug,
    name: row.name,
    price: row.base_price,
    salePrice: row.sale_price ?? undefined,
    category: firstCategory?.name ?? "Uncategorized",
    categorySlug: firstCategory?.slug ?? null,
    collection: firstCollection?.name ?? "",
    colors,
    sizes,
    soldOutSizes,
    images: images.map((img) => img.url),
    description: row.description ?? "",
    featured: row.featured ?? false,
    createdAt: row.created_at,
    badge: row.sale_price ? ("Sale" as const) : undefined,
    variants: variantsWithCodes,
  };
}

function sortProducts(products: ProductDetail[], sort?: ProductSort) {
  const list = [...products];
  const priceOf = (p: ProductDetail) => p.salePrice ?? p.price;

  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "price-asc":
      return list.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return list.sort((a, b) => priceOf(b) - priceOf(a));
    case "featured":
    default:
      return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("status", "active")
      .single();

    if (error) throw error;

    return mapProduct(data as unknown as ProductWithRelations, supabase);
  });

export const getProducts = createServerFn({ method: "GET" })
  .validator(
    (filters?: { category?: string; collection?: string; sort?: ProductSort }) =>
      filters ?? {}
  )
  .handler(async ({ data: filters }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active");

    if (error) throw error;

    let rows = data as unknown as ProductWithRelations[];

    if (filters.category) {
      rows = rows.filter((row) =>
        row.product_categories.some(
          (pc) => pc.categories?.slug === filters.category
        )
      );
    }

    if (filters.collection) {
      rows = rows.filter((row) =>
        row.product_collections.some(
          (pcol) => pcol.collections?.slug === filters.collection
        )
      );
    }

    const mapped = rows.map((row) => mapProduct(row, supabase));
    return sortProducts(mapped, filters.sort);
  });

// ---------------------------------------------------------------------------
// Categories & Collections (for filter chips)
// ---------------------------------------------------------------------------

export const getCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return data;
  }
);

export const getCollections = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("collections")
      .select("id, name, slug, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return data;
  }
);
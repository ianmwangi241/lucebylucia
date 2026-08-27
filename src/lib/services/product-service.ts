import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

type ProductRow = Tables<"products">;
type ProductImageRow = Tables<"product_images">;
type ProductVariantRow = Tables<"product_variants">;
type CategoryRow = Pick<Tables<"categories">, "id" | "name" | "slug">;
type CollectionRow = Pick<Tables<"collections">, "id" | "name" | "slug">;

type ProductWithRelations = ProductRow & {
  // products <-> categories is many-to-many via product_categories,
  // there is no category_id on products itself
  product_categories: { categories: CategoryRow | null }[];
  // products <-> collections is many-to-many via product_collections,
  // there is no collection_id on products itself
  product_collections: { collections: CollectionRow | null }[];
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
};

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc";

export type ProductsFilter = {
  category?: string; // category slug
  collection?: string; // collection slug
  sort?: ProductSort;
};

function buildProductSelect(opts: { categoryFilter: boolean; collectionFilter: boolean }) {
  // Use !inner only when we actually need to filter by that relation.
  // Forcing !inner unconditionally would silently drop products whose
  // category (or collection) links are empty.
  const categoriesFragment = opts.categoryFilter
    ? "product_categories!inner ( categories!inner ( id, name, slug ) )"
    : "product_categories ( categories ( id, name, slug ) )";

  const collectionsFragment = opts.collectionFilter
    ? "product_collections!inner ( collections!inner ( id, name, slug ) )"
    : "product_collections ( collections ( id, name, slug ) )";

  return `
    *,
    ${categoriesFragment},
    ${collectionsFragment},
    product_images ( id, storage_path, alt_text, sort_order, is_primary ),
    product_variants ( id, sku, size, color, price, stock_quantity, is_available )
  `;
}

function attachImageUrls(
  supabase: ReturnType<typeof createClient>,
  images: ProductImageRow[]
) {
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
  supabase: ReturnType<typeof createClient>,
  row: ProductWithRelations
) {
  const images = attachImageUrls(supabase, row.product_images);

  const sizes = Array.from(
    new Set(
      row.product_variants.map((v) => v.size).filter((s): s is string => Boolean(s))
    )
  );
  const colors = Array.from(
    new Set(
      row.product_variants.map((v) => v.color).filter((c): c is string => Boolean(c))
    )
  );
  const soldOutSizes = Array.from(
    new Set(
      row.product_variants
        .filter((v) => !v.is_available || (v.stock_quantity ?? 0) <= 0)
        .map((v) => v.size)
        .filter((s): s is string => Boolean(s))
    )
  );

  const category = row.product_categories[0]?.categories ?? null;

  return {
    slug: row.slug,
    name: row.name,
    price: row.base_price,
    salePrice: row.sale_price ?? undefined,
    category: category?.name ?? "Uncategorized",
    categorySlug: category?.slug ?? null,
    collection: row.product_collections[0]?.collections?.name ?? "",
    collectionSlug: row.product_collections[0]?.collections?.slug ?? null,
    colors,
    sizes,
    soldOutSizes,
    images: images.map((img) => img.url),
    description: row.description ?? "",
    featured: row.featured ?? false,
    badge: row.sale_price ? ("Sale" as const) : undefined,
  };
}

// ProductCard and other consumers import this type directly.
export type Product = ReturnType<typeof mapProduct>;

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(buildProductSelect({ categoryFilter: false, collectionFilter: false }))
      .eq("slug", slug)
      // hide draft/archived products from the public product page too;
      // drop this if you need this route for admin previews
      .eq("status", "active")
      .single();

    if (error) throw error;

    const row = data as unknown as ProductWithRelations;
    return mapProduct(supabase, row);
  });

export const getProducts = createServerFn({ method: "GET" })
  .validator((filters?: ProductsFilter) => filters ?? {})
  .handler(async ({ data: filters }) => {
    const supabase = createClient();

    const select = buildProductSelect({
      categoryFilter: Boolean(filters.category),
      collectionFilter: Boolean(filters.collection),
    });

    let query = supabase.from("products").select(select).eq("status", "active");

    if (filters.category) {
      query = query.eq("product_categories.categories.slug", filters.category);
    }
    if (filters.collection) {
      query = query.eq("product_collections.collections.slug", filters.collection);
    }

    switch (filters.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "price-asc":
        query = query.order("base_price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("base_price", { ascending: false });
        break;
      default:
        query = query
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;

    const rows = data as unknown as ProductWithRelations[];
    return rows.map((row) => mapProduct(supabase, row));
  });

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
});

export const getCollections = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createClient();

  // collections.image_path is a foreign key into product_images.id
  // (not a raw path), so the campaign photo has to be joined and
  // resolved via getPublicUrl, same as product images.
  const { data, error } = await supabase
    .from("collections")
    .select(
      `
      id,
      name,
      slug,
      description,
      product_images ( storage_path, alt_text )
    `
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.product_images
      ? supabase.storage
          .from("product_images")
          .getPublicUrl(row.product_images.storage_path).data.publicUrl
      : null,
  }));
});
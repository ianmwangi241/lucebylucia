import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

type ProductRow = Tables<"products">;
type ProductImageRow = Tables<"product_images">;
type ProductVariantRow = Tables<"product_variants">;
type CategoryRow = Pick<Tables<"categories">, "id" | "name" | "slug">;
type CollectionRow = Pick<Tables<"collections">, "id" | "name" | "slug">;

type ProductWithRelations = ProductRow & {
  categories: CategoryRow | null;
  collections: CollectionRow | null;
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
};

const PRODUCT_SELECT = `
  *,
  categories ( id, name, slug ),
  collections ( id, name, slug ),
  product_images ( id, storage_path, alt_text, sort_order, is_primary ),
  product_variants ( id, sku, size, color, price, stock_quantity, is_available )
`;

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

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .single();

    if (error) throw error;

    const row = data as unknown as ProductWithRelations;
    const images = attachImageUrls(supabase, row.product_images);

    return { ...row, images };
  });

export const getProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active");

    if (error) throw error;

    const rows = data as unknown as ProductWithRelations[];

    return rows.map((row) => {
      const images = attachImageUrls(supabase, row.product_images);

      const sizes = Array.from(
        new Set(
          row.product_variants
            .map((v) => v.size)
            .filter((s): s is string => Boolean(s))
        )
      );
      const colors = Array.from(
        new Set(
          row.product_variants
            .map((v) => v.color)
            .filter((c): c is string => Boolean(c))
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

      return {
        slug: row.slug,
        name: row.name,
        price: row.base_price,
        salePrice: row.sale_price ?? undefined,
        category: row.categories?.name ?? "Uncategorized",
        collection: row.collections?.name ?? "",
        colors,
        sizes,
        soldOutSizes,
        images: images.map((img) => img.url),
        description: row.description ?? "",
        featured: row.featured ?? false,
        badge: row.sale_price ? ("Sale" as const) : undefined,
      };
    });
  }
);
// src/services/product-service.ts
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";

interface ProductImage {
  id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  sku: string;
  size: string | null;
  color: string | null;
  price: number;
  stock_quantity: number;
  is_available: boolean;
}

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (
          id, storage_path, alt_text, sort_order, is_primary
        ),
        product_variants (
          id, sku, size, color, price, stock_quantity, is_available
        )
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;

    const productImages = data.product_images as ProductImage[];

    const images = productImages
      .sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order)
      .map((image: ProductImage) => ({
        ...image,
        url: supabase.storage
          .from("product_images")
          .getPublicUrl(image.storage_path).data.publicUrl,
      }));

    return { ...data, images };
  });
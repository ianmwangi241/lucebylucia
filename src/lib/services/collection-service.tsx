import { createServerFn } from "@tanstack/react-start";

// TODO: point this at your SERVER supabase client (the one using getRequest/setCookie)
import { createClient } from "@/lib/supabase/server";

// TODO: set to the Supabase Storage bucket that holds your product images
const IMAGE_BUCKET = "product_images";

export type HomeCollection = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export const getActiveCollections = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeCollection[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("collections")
      .select(
        "id, name, slug, sort_order, product_images!collections_image_path_fkey(storage_path)"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data ?? []).map((c) => {
      const img = c.product_images as unknown as {
        storage_path: string;
      } | null;

      const image = img?.storage_path
        ? supabase.storage.from(IMAGE_BUCKET).getPublicUrl(img.storage_path)
            .data.publicUrl
        : "";

      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        image,
      };
    });
  }
);
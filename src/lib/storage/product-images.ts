import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function getProductImageUrl(path: string) {
  return supabase.storage
    .from("product_images")
    .getPublicUrl(path)
    .data.publicUrl;
}
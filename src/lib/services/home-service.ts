import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/lib/supabase/server";

const STORAGE_BUCKET = "product_images";

function getImageUrl(
  supabase: ReturnType<typeof createClient>,
  path: string,
) {
  return supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path).data.publicUrl;
}

export const getHomeImages = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = createClient();

  return {
    hero: getImageUrl(
      supabase,
      "aura-set-long/aura-set-long.webp",
    ),

    collection: getImageUrl(
      supabase,
      "signature/signature-1.webp",
    ),

    story: getImageUrl(
      supabase,
      "sculpt/sculpt-jumpsuit.webp",
    ),

    afterDark: getImageUrl(
      supabase,
      "everyday-set-short/everyday-set-short-5.webp",
    ),

    auraSetShort: getImageUrl(
      supabase,
      "aura-set-short/aura-set-short-1.webp",
    ),

    everydaySetShort: getImageUrl(
      supabase,
      "everyday-set-short/everyday-set-short-5.webp",
    ),

    signature: getImageUrl(
      supabase,
      "signature/signature-1.webp",
    ),

    sculpt: getImageUrl(
      supabase,
      "sculpt/sculpt-jumpsuit.webp",
    ),

    zola: getImageUrl(
      supabase,
      "zola/zola-1.webp",
    ),

    sahara: getImageUrl(
      supabase,
      "sahara/sahara.webp",
    ),

    auraSetLong: getImageUrl(
      supabase,
      "aura-set-long/aura-set-long-3.webp",
    ),

    everydaySetLong: getImageUrl(
      supabase,
      "everyday-set-long/everyday-set-long-1.webp",
    ),
  };
});
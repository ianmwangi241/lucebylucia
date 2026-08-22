import auraSetLong from "@/assets/aura-set-long-2.webp";
import auraSetLong2 from "@/assets/aura-set-long-2.webp";
import auraSetLong3 from "@/assets/aura-set-long-3.webp";
import auraSetShort1 from "@/assets/aura-set-short-1.webp";
import everydaySetLong1 from "@/assets/everyday-set-long-1.webp";
import everydaySetShort1 from "@/assets/everyday-set-short-1.webp";
import sahara from "@/assets/sahara.webp";
import sculptJumpsuit from "@/assets/sculpt-jumpsuit.webp";
import signature1 from "@/assets/signature-1.webp";
import zola1 from "@/assets/zola-1.webp";
import packaging from "@/assets/packaging.webp";

export type Product = {
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  collection: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  material: string;
  fit: string;
  rating: number;
  reviews: number;
  badge?: "New" | "Bestseller" | "Sale" | "Low stock";
  soldOutSizes?: string[];
};

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLOR_SWATCHES: Record<string, string> = {
  Black: "#141210",
  Ivory: "#F4F1E8",
  Blush: "#E8C7CE",
  Champagne: "#C9A227",
  Stone: "#D8D2C6",
  Purple: "#9B7EDE",
  Brown: "#6B4423",
  Red: "#C8102E",
  Olive: "#556B2F",
};

export const products: Product[] = [
  {
    slug: "aura-set-long",
    name: "Aura Set Long",
    price: 3500,
    category: "Two-Piece Sets",
    collection: "Active & Lounge",
    colors: ["Blue", "Pink", "Brown"],
    sizes: SIZES,
    images: [auraSetLong, auraSetLong2, auraSetLong3],
    description:
      "A seamless long-sleeve top and matching full-length leggings set designed for maximum comfort and effortless style.",
      material: "Premium nylon-spandex blend. Moisture-wicking and breathable.",
    fit: "True to size with high-stretch contour fit.",
    rating: 5,
    reviews: 14,
    badge: "Bestseller",
  },
  {
    slug: "aura-set-short",
    name: "Aura Set Short",
    price: 3000,
    category: "Two-Piece Sets",
    collection: "Active & Lounge",
    colors: ["Grey", "Pink", "Brown"],
    sizes: SIZES,
    images: [auraSetShort1, packaging],
    description:
      "A lightweight seamless crop top and biker short set built for everyday movement and warm days.",
    material: "Soft stretch athletic knit. Machine washable.",
    fit: "Fitted silhouette with supportive waistband.",
    rating: 5,
    reviews: 22,
    badge: "New",
  },
  {
    slug: "sahara",
    name: "Sahara",
    price: 4500,
    category: "Occasion Wear",
    collection: "Made For The Moment",
    colors: ["Purple", "Black", "Brown"],
    sizes: SIZES,
    images: [sahara, packaging],
    description:
      "A striking statement piece designed with sophisticated contours and premium fabric that hugs your silhouette.",
    material: "Stretch ribbed polyester blend with reinforced seams.",
    fit: "Body-hugging tailored fit.",
    rating: 5,
    reviews: 19,
    badge: "Bestseller",
  },
  {
    slug: "everyday-set-long",
    name: "Everyday Set Long",
    price: 4000,
    category: "Two-Piece Sets",
    collection: "Active & Lounge",
    colors: ["Black", "Purple"],
    sizes: SIZES,
    images: [everydaySetLong1, packaging],
    description:
      "Your new go-to ensemble. A comfortable full-length active set crafted for lounging or running errands in style.",
    material: "Cotton-touch breathable performance fabric.",
    fit: "Relaxed yet flattering everyday fit.",
    rating: 4,
    reviews: 27,
    badge: "Sale",
  },
  {
    slug: "everyday-set-short",
    name: "Everyday Set Short",
    price: 3500,
    category: "Two-Piece Sets",
    collection: "Active & Lounge",
    colors: ["Black", "Purple"],
    sizes: SIZES,
    images: [everydaySetShort1, packaging],
    description:
      "The shorter counterpart to our favorite daily uniform, pairing a cropped top with easy-wearing shorts.",
    material: "Breathable stretch cotton blend.",
    fit: "True to size with flexible waistbands.",
    rating: 5,
    reviews: 11,
  },
  {
    slug: "sculpt-jumpsuit",
    name: "Sculpt Jumpsuit",
    price: 4500,
    category: "Occasion Wear",
    collection: "After Dark",
    colors: ["Red", "Black", "Brown"],
    sizes: SIZES,
    images: [sculptJumpsuit, packaging],
    description:
      "A bold, form-fitting full-length jumpsuit engineered to sculpt your figure with an open-back design detail.",
    material: "Heavyweight stretch elastane blend.",
    fit: "Fitted, contouring silhouette.",
    rating: 5,
    reviews: 35,
    badge: "Bestseller",
  },
  {
    slug: "signature",
    name: "Signature",
    price: 3500,
    category: "Two-Piece Sets",
    collection: "Made For The Moment",
    colors: ["Black", "Blue", "Brown"],
    sizes: SIZES,
    images: [signature1, packaging],
    description:
      "A classic branded set featuring clean lines and our signature minimalist aesthetic.",
    material: "Soft cotton fleece blend.",
    fit: "Comfortable standard fit.",
    rating: 4,
    reviews: 16,
    badge: "New",
  },
  {
    slug: "zola",
    name: "Zola",
    price: 3500,
    category: "Dresses",
    collection: "Made For The Moment",
    colors: ["Purple", "White", "Olive", "Black"],
    sizes: SIZES,
    images: [zola1, packaging],
    description:
      "An effortless piece designed for versatility, easily transitioning from daytime chic to casual evening outings.",
    material: "Ribbed knit fabric with comfortable stretch.",
    fit: "Fluid, flattering drape.",
    rating: 5,
    reviews: 20,
    badge: "New",
  },
];

export const CATEGORIES = [
  "New Arrivals",
  "Dresses",
  "Tops",
  "Bottoms",
  "Two-Piece Sets",
  "Occasion Wear",
];

export const COLLECTIONS = ["Made For The Moment", "After Dark", "Active & Lounge"];

export const formatKsh = (value: number) =>
  `KSh ${value.toLocaleString("en-KE")}`;

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import detail from "@/assets/detail.jpg";
import story from "@/assets/story.jpg";
import collection from "@/assets/collection.jpg";

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
};

export const products: Product[] = [
  {
    slug: "lucia-satin-slip-dress",
    name: "Lucia Satin Slip Dress",
    price: 8500,
    category: "Dresses",
    collection: "After Dark",
    colors: ["Black", "Blush", "Champagne"],
    sizes: SIZES,
    images: [p1, detail, story],
    description:
      "A bias-cut satin slip that moves with you. Cut long and lean with a softly draped cowl and adjustable straps — the piece you will reach for when the evening matters.",
    material: "94% viscose satin, 6% elastane. Lined bodice. Made in Nairobi.",
    fit: "True to size with a fluid drape. Model is 176cm and wears a size S.",
    rating: 5,
    reviews: 12,
    badge: "Bestseller",
    soldOutSizes: ["XXL"],
  },
  {
    slug: "amara-tailored-set",
    name: "Amara Tailored Set",
    price: 12900,
    salePrice: 10900,
    category: "Two-Piece Sets",
    collection: "Made For The Moment",
    colors: ["Ivory", "Stone", "Black"],
    sizes: SIZES,
    images: [p2, collection, detail],
    description:
      "A softly structured blazer and wide-leg trouser, cut from a fluid crepe that holds its line all day. Wear together, or break it apart and rebuild your week around it.",
    material: "Recycled polyester crepe with a matte finish. Fully lined blazer.",
    fit: "Relaxed through the shoulder. Size down for a sharper silhouette.",
    rating: 5,
    reviews: 31,
    badge: "Sale",
  },
  {
    slug: "zola-pleated-maxi-skirt",
    name: "Zola Pleated Maxi Skirt",
    price: 6900,
    category: "Bottoms",
    collection: "Made For The Moment",
    colors: ["Blush", "Ivory", "Black"],
    sizes: SIZES,
    images: [p3, detail],
    description:
      "Knife pleats that catch the light with every step. High-rise, elasticated at the back for comfort, and finished at a graceful ankle length.",
    material: "Pleated satin twill. Hand wash cold, hang to dry.",
    fit: "Regular fit. Wear high on the natural waist.",
    rating: 4,
    reviews: 18,
    badge: "New",
  },
  {
    slug: "nia-silk-wrap-blouse",
    name: "Nia Silk Wrap Blouse",
    price: 7400,
    category: "Tops",
    collection: "Made For The Moment",
    colors: ["Champagne", "Ivory", "Black"],
    sizes: SIZES,
    images: [p4, detail],
    description:
      "A liquid champagne wrap blouse with a self-tie waist. Understated from the front, quietly dramatic in movement.",
    material: "100% sandwashed silk. Dry clean recommended.",
    fit: "Regular fit, adjustable wrap closure.",
    rating: 5,
    reviews: 9,
    badge: "New",
  },
  {
    slug: "imani-belted-coat-dress",
    name: "Imani Belted Coat Dress",
    price: 15500,
    category: "Occasion Wear",
    collection: "After Dark",
    colors: ["Black", "Stone"],
    sizes: SIZES,
    images: [p5, detail],
    description:
      "Double-breasted, waist-defining and cut just below the knee. A single piece that carries you from a boardroom in Westlands to dinner without a change.",
    material: "Wool-blend suiting with satin lining. Gold-tone buckle.",
    fit: "Tailored fit. Belted at the natural waist.",
    rating: 5,
    reviews: 24,
    badge: "Bestseller",
  },
  {
    slug: "safiya-column-gown",
    name: "Safiya Column Gown",
    price: 19800,
    category: "Occasion Wear",
    collection: "After Dark",
    colors: ["Ivory", "Black"],
    sizes: SIZES,
    images: [p6, story, detail],
    description:
      "A sculpted column gown in heavyweight crepe, with a clean neckline and an open back finished by hand. Made for the moments that get photographed.",
    material: "Heavyweight stretch crepe, hand-finished back detail.",
    fit: "Fitted. Floor length — designed for a 4cm heel.",
    rating: 5,
    reviews: 7,
    badge: "Low stock",
    soldOutSizes: ["XS", "XXL"],
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

export const COLLECTIONS = ["Made For The Moment", "After Dark"];

export const formatKsh = (value: number) =>
  `KSh ${value.toLocaleString("en-KE")}`;

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

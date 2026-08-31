// src/lib/products.ts
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

export const formatKsh = (value: number) =>
  `KSh ${value.toLocaleString("en-KE")}`;
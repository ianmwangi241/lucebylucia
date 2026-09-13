// src/lib/products.ts
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLOR_SWATCHES: Record<string, string> = {
  black: "#141210",
  charcoal: "#363636",
  darkgrey: "#5A5A5A",
  grey: "#808080",
  lightgrey: "#D3D3D3",
  white: "#FFFFFF",
  ivory: "#F4F1E8",
  cream: "#FFFDD0",
  beige: "#F5F5DC",
  khaki: "#C3B091",
  stone: "#D8D2C6",
  tan: "#D2B48C",
  brown: "#6B4423",
  darkbrown: "#3D2314",
  camel: "#C19A6B",
  red: "#C8102E",
  darkred: "#8B0000",
  burgundy: "#800020",
  maroon: "#660000",
  pink: "#FFC0CB",
  hotpink: "#FF69B4",
  blush: "#E8C7CE",
  rose: "#FF66CC",
  magenta: "#FF00FF",
  orange: "#FFA500",
  peach: "#FFDAB9",
  coral: "#FF7F50",
  yellow: "#FFFF00",
  gold: "#FFD700",
  champagne: "#C9A227",
  lime: "#00FF00",
  olive: "#556B2F",
  sage: "#9CAF88",
  mint: "#98FF98",
  green: "#008000",
  darkgreen: "#006400",
  emerald: "#50C878",
  teal: "#008080",
  cyan: "#00FFFF",
  skyblue: "#87CEEB",
  lightblue: "#ADD8E6",
  blue: "#0000FF",
  darkblue: "#00008B",
  navy: "#000080",
  royalblue: "#4169E1",
  indigo: "#4B0082",
  purple: "#9B7EDE",
  violet: "#EE82EE",
  lavender: "#E6E6FA",
  plum: "#8E4585",
};

export const getColorSwatch = (colorName: string): string => {
  if (!colorName) return "#CCCCCC";
  const normalized = colorName.toLowerCase().replace(/\s+/g, "");
  return COLOR_SWATCHES[normalized] || "#CCCCCC";
};

export const formatKsh = (value: number) =>
  `KSh ${value.toLocaleString("en-KE")}`;
import { ProductImages } from "../../types/cards";

export function findProductImage(title?: string, category?: string) {
  if (!title || !category) return undefined;

  const normalized = title.toLowerCase();

  return ProductImages.find(
    img =>
      img.category === category &&
      normalized.includes(img.name.toLowerCase())
  )?.url;
}

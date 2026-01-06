import { findProductImage } from "../components/shared/findimages";
import type { Product } from "../types/cards";

export function groupByCategory(products: Product[]) {
  return products.reduce((acc, product) => {
    const category = product.category?.toLowerCase() || "outros";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
}


export function getImage(product:Product){

  const primary=product?.images?.find(img => img.isPrimary);
  if(primary)return primary.url
  if(product?.images?.length) return product.images[0].url
  const mapped = findProductImage(product?.name, product?.category);
    if (mapped) return mapped;
    return 
}


export function HeartIcon({ filled = false, size = 20 }) {
  const fill = filled ? "#ef4444" : "none"; // vermelho quando ativo
  const stroke = filled ? "#ef4444" : "#626468"; // cinza quando inativo
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"     
      focusable="false"
    >
      <path d="M20.8 7.2c-1.3-3-4.2-4.1-7.2-2.8l-.6.3-.6-.3C8.9 3.1 6 4.2 4.7 7.2c-1.3 3 0 6.6 3 8.1L12 20.5l3.3-5.2c3-1.5 4.3-5.1 3.5-8.1z" />
    </svg>
  );
}

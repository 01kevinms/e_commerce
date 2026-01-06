import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/GroupCatgeorie";
import type {  Product } from "../../types/cards";

type Props = {
  product: Product;
};

export function ProductSearchCard({ product }: Props) {
  const navigate = useNavigate();
  const image = getImage(product);
  return (
    <article
      onClick={() => navigate(`/product/${product._id!.$oid}`)}
      className="cursor-pointer rounded-xl bg-[#414C5E] p-4 hover:scale-[1.02] transition"
    >
      <img
        src={image}
        alt={product.name}
        className="h-40 w-full rounded-lg object-cover"
      />

      <div className="mt-4 space-y-1">
        <h2 className="text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-300 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-2 text-xl font-bold text-blue-400">
          R$ {product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}

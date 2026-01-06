import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Product, ReviewResponse } from "../../types/cards";
import { getProductById, getProducts, getReview } from "../../services/apis/Get.routes";

import { ProductPurchase } from "../../components/product/ProductPurchase";
import CarouselCard from "../../components/product/CardsProducts";
import { RatingSummary } from "../../components/product/reviews/RatingSummary";
import { ReviewList } from "../../components/product/reviews/ReviewList";



function ItemSelect() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewData, setReviewData] = useState<ReviewResponse | null>(null);

  useEffect(() => {
    if (!id) return;

    getProductById(id).then(setProduct);
    getProducts().then(setProducts);
    getReview(id).then(setReviewData);
  }, [id]);

  if (!product) {
    return <p className="p-5 text-gray-800 dark:text-white">Carregando produto...</p>;
  }

  return (
    <div className="min-h-dvh dark:bg-[#282828] bg-gray-200 text-gray-800 dark:text-white">
      {/* HEADER */}
      <header className="flex justify-around gap-10 border-b px-20 py-6">
        <aside className="flex gap-10">
          <ProductPurchase product={product} />

          <article className="space-y-2">
            <h1 className="text-6xl font-bold">
              {product.name}
            </h1>

            {reviewData && (
              <RatingSummary
                average={reviewData.average}
                total={reviewData.totalReview}
              />
            )}
          </article>
        </aside>
      </header>

      {/* REVIEWS */}
      <section className="px-20 py-10 space-y-4">
        <h3 className="text-xl font-semibold">
          Avaliações
        </h3>

        {reviewData && (
          <ReviewList reviews={reviewData.review} />
        )}
      </section>

      {/* SUGESTÕES */}
      <section className="dark:bg-[#191919] bg-gray-400 px-10 py-6">
        <h3 className="mb-6 text-xl font-semibold">
          Produtos que talvez você goste
        </h3>
        <CarouselCard products={products} />
      </section>
    </div>
  );
}

export default ItemSelect;

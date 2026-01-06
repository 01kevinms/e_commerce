import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/cards";
import { findProductImage } from "../shared/findimages";
import { useWishlist } from "../../hooks/useWish";
import { HeartIcon } from "../../utils/GroupCatgeorie";

interface ProductCardProps {
  product: Product;
 }

export function CardProducts({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const {wishlist, toggle}= useWishlist();
  
  const mainImage = findProductImage(product?.name, product?.category) || product.images![0].url;
  
  const isFav = wishlist.some(item => item.id === product.id);
  return (
<div className="group relative max-w-[260px] cursor-pointer overflow-hidden rounded-2xl dark:bg-[#111] bg-gray-300 text-gray-800 dark:text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
  
  {/* IMAGEM */}
  <article className="relative">
    {/* Favorito */}
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggle(product)
      }}
      className={`absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 backdrop-blur transition hover:scale-110 ${
        isFav ? "text-red-500" : "text-gray-300"
      }`}
    >
      <HeartIcon filled={isFav} size={18} />
    </button>

    {/* Overlay hover */}
    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

    <img
      src={mainImage}
      alt={product.name}
      onClick={() => navigate(`/product/${product.id}`)}
      className="h-52 w-full object-cover transition group-hover:scale-105"
    />
  </article>

  {/* CONTEÚDO */}
  <article
    onClick={() => navigate(`/product/${product.id}`)}
    className="space-y-1 p-4"
  >
    <p className="truncate text-base font-semibold">
      {product.name}
    </p>

    {/* Categoria */}
    <span className="text-xs uppercase tracking-wide">
      {product.category}
    </span>

    {/* Preço */}
    <p className="pt-2 text-lg font-bold text-blue-400">
      R$ {product.price.toFixed(2)}
    </p>
  </article>
</div>

  );
}

interface CarouselProps {
  products: Product[];
}

export default function CarouselCard({ products }: CarouselProps) {
  return (
  <div className="relative w-full">
 <Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
  spaceBetween={20}
  slidesPerView={3}
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }}
  className="mySwiper"
>
  {products.map((product) => (
    <SwiperSlide key={product.id}>
      <div className="h-full flex justify-center">
        <CardProducts product={product} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

</div>



  );
}

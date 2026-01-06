import { Heart, Trash2 } from "lucide-react";
import { useWishlist } from "../../hooks/useWish";
import type { Product } from "../../types/cards";
import { getImage } from "../../utils/GroupCatgeorie";
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const{wishlist, remove}=useWishlist<Product>()
const navigate = useNavigate()
  return (
   <main className="min-h-screen dark:bg-[#1f1f1f] p-6 text-gray-800 dark:text-white">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="text-pink-500" />
          Meus Favoritos
        </h1>
        <p className="dark:text-gray-400 mt-1">
          Produtos que você salvou
        </p>
      </header>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <Heart size={64} className="text-gray-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-400 max-w-md">
            Clique no ❤️ dos produtos para salvá-los aqui.
          </p>
        </div>
      )}

      {/* GRID */}
      {wishlist.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl dark:bg-[#2a2a2a] bg-gray-300 p-4 shadow hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={getImage(item)}
                  alt={item.name}
                  className="h-48 w-full rounded-xl object-cover"
                />

                {/* REMOVER */}
                <button
                  onClick={() => remove(item.id)}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-2 hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {item.name}
                </h3>

                <p className=" text-sm line-clamp-2 mt-1">
                  {item.description}
                </p>

                <p className="mt-3 text-xl font-bold">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>

              <button 
              onClick={()=>navigate(`/product/${item.id}`)}
              className="mt-4 w-full rounded-xl text-white bg-blue-600 py-2 font-semibold hover:bg-blue-700 transition">
                Ver produto
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favoritos;

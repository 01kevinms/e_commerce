import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { searchProducts } from "../../services/apis/Get.routes";
import { useLoading } from "../shared/LoadingProvider";

export function ProductSearch() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const{show,hide}= useLoading()
  useEffect(() => {
    async function load() {
      try {
        
        
        show("Pesquisando produto...")
        
        const res = await searchProducts({
          search: debouncedSearch,
          page: 1,
          limit: 10,
        });
        
        setProducts(res.data);
      } catch (error) {
      }finally{
        hide();
      }
    }

    load();
  }, [debouncedSearch]);

  return (
    <div className="max-w-4xl mx-auto space-y-4 bg-transparent dark:bg-[#1f1f1f] text-gray-800 dark:text-white">
      {/* INPUT */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar produtos..."
        className="w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 bg-transparent dark:bg-[#1f1f1f] text-gray-800 dark:text-white"
      />

      {/* LOADING */}

      {/* RESULTADOS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className=" p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition"
          >
            <h3 className="font-semibold text-sm truncate">
              {product.name}
            </h3>

            <p className="text-xs text-gray-400 line-clamp-2">
              {product.description}
            </p>

            <p className="mt-2 font-bold text-blue-400">
              R$ {product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-sm text-gray-400">
          Nenhum produto encontrado
        </p>
      )}
    </div>
  );
}

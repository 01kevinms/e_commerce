import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../services/apis/Get.routes";
import { ProductSearchCard } from "../../components/cards/CardSearch";

export function SearchPage() {
  const [params] = useSearchParams();
  const search = params.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      if (!search) return;

      setLoading(true);

      const res = await searchProducts({
        search,
        page,
        limit: 12,
      });

      setProducts(res.data);
      setLoading(false);
    }

    load();
  }, [search, page]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-white">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Resultados para: <span className="text-blue-500">{search}</span>
        </h1>

        <p className="text-sm text-gray-400">
          {products.length} produtos encontrados
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">Buscando produtos...</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map(product => (
          <ProductSearchCard
            key={product.id}
            product={product}
            />
        ))}
      </div>

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-gray-400">
          Nenhum produto encontrado
        </p>
      )}
    </div>
  );
}

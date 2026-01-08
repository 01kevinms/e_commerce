import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../services/apis/Get.routes";
import { ProductSearchCard } from "../../components/cards/CardSearch";
import Loading from "../../components/shared/Loading";
import { useLoading } from "../../components/shared/LoadingProvider";

export function SearchPage() {
  const [params] = useSearchParams();
  const search = params.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);  
  const [loading] = useState(false);
  const [page] = useState(1);
  const{show,hide}=useLoading()
  
  useEffect(() => {
    async function load() {
      if (!search) return;

      show("Carregando produtos...");

      const res = await searchProducts({
        search,
        page,
        limit: 12,
      });

      setProducts(res.data);
      hide();
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
        <Loading/>
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

import { useEffect, useState } from "react"
import { DashboardLayout } from "../../components/store/DashboardStore"
import { OrdersTable } from "../../components/store/OrdersTable"
import { ProductsTable } from "../../components/store/ProductsTable"
import { StatsCard } from "../../components/store/StatsCard"
import { StoreHeader } from "../../components/store/StoreHeader"
import { GethistoricalStore, getProfile } from "../../services/apis/Get.routes"
import type { HistoricalStoreResponse, Product, Store } from "../../types/cards"
import { useLoading } from "../../components/shared/LoadingProvider"

function DashboardStore() {
  const [store, setStore] = useState<Store | null>(null);
  const [historical,setHistorical]= useState<HistoricalStoreResponse | null>(null)  

  const products: Product[] = historical?.ProductsCreate ?? [];
  const{show,hide}=useLoading()

  useEffect(() => {
    async function LoadinaDashboard() {
      try {
        show("Carregando Informacõe...s")
        
        const user= await getProfile()
        
        if (!user.store) {
            throw new Error("Usuário não possui loja");
          }
          setStore(user.store);

          const history = await GethistoricalStore()
          setHistorical(history)
                
      } catch (error) {
        console.error(error);
        setStore(null);
      }finally{hide()}
    }
    LoadinaDashboard()
  }, []);

  if (!store) return <p className="p-5 text-gray-800 dark:text-white">Você ainda não possui uma loja</p>;

  return (
    <DashboardLayout>
      <StoreHeader
        name={store.name}
        description={store.description}
        createdAt={store.createdAt}
        logo={store.logo}
        
      />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <StatsCard title="Faturamento" value={`R$ ${historical?.revenue.toFixed(2) ?? "0,00"}`} />
            <StatsCard title="Pedidos" value={historical?.ordersCount ?? 0} />
            <StatsCard title="Produtos" value={products.length} />
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Pedidos recentes</h2>
            {historical?.items &&(
              <OrdersTable orders={historical.items}/>
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Produtos</h2>
                {products.length > 0 ? (
                  <ProductsTable products={products} />
                ) : (
                  <p>Nenhum produto encontrado</p>
                )}

        </section>
    </DashboardLayout>
    )
}

export default DashboardStore
import { useEffect, useState } from "react";
import type {  Product } from "../../types/cards";
import { getProducts } from "../../services/apis/Get.routes";
import CarouselCard, { CardProducts } from "../../components/product/CardsProducts";
import { groupByCategory } from "../../utils/GroupCatgeorie";
import BackgroundHeader from "../../components/theme/background";

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    getProducts().then(res => setProducts(res));    
  }, []);

  const categories = groupByCategory(products);
  return (
    <div className="min-h-screen w-full dark:bg-[#1f1f1f] text-gray-800 dark:text-white">

  {/* HERO / BANNER */}
  <header className="relative h-[440px] overflow-hidden md:mx-12">

  {/* IMAGEM */}
   <BackgroundHeader/>

  <div className=" absolute inset-0 bg-linear-to-b from-transparent via-black/10  to-[#282828]"/>
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-[#282828]"/>

  {/* CONTEÚDO */}
  <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 text-white">
    <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
      Produtos com preços imperdíveis
    </h1>
    <p className="mt-4 max-w-xl text-gray-300">
      Descubra produtos selecionados com qualidade e ofertas exclusivas.
    </p>
  </div>

</header>



  {/* TÍTULO PRINCIPAL */}
  <section className="mx-6 mt-16 md:mx-20 ">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-semibold">
        Produtos em destaque
      </h2>

      <span className="text-sm text-gray-400">
        Atualizado hoje
      </span>
    </div>

    <div className="mt-3 h-1 w-24 rounded bg-blue-600" />
  </section>

  {/* CONTEÚDO */}
  <main className="mx-6 mt-10 space-y-20 md:mx-12">

    {/* CATEGORIAS */}
    {Object.entries(categories).map(([categoryName, list]) => (
      <section key={categoryName}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-wide">
            {categoryName.toUpperCase()}
          </h3>
      
        </div>

        <CarouselCard products={list}/>
      </section>
    ))}

    {/* OFERTAS */}
    <section className="rounded-3xl dark:bg-linear-to-br from-[#111] to-[#1c1c1c] p-8 shadow-xl text-gray-800 dark:text-white">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-semibold md:text-4xl">
          🔥 Ofertas especiais
        </h2>
       
      </header>

      <article className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[230px] transition hover:scale-105"
          >
            <CardProducts product={product} />
          </div>
        ))}
      </article>
    </section>

  </main>

  {/* FOOTER */}
  <footer className="mt-20 border-t border-white/10 bg-[#0A0B1A] py-6 text-center text-sm text-gray-400">
    © 2025 E-Shop — Todos os direitos reservados
  </footer>

</div>

  );
}

export default Dashboard;

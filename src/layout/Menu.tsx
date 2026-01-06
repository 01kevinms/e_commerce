import { Link, Outlet, useNavigate } from "react-router-dom";
import { Heart, Home, Settings, ShoppingCart, Store, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { Cart } from "../types/cards";
import { getCart, getProfile } from "../services/apis/Get.routes";

function MenuDashBoard() {
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(true);
  
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCart().then(setCart);
    getProfile().then(setUser);
    
  }, []);

  const qtyProducts = cart?.items?.length ?? 0;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleLogout() {
    navigate("/signin");
  }

  return (
    <div className="flex min-h-screen text-gray-800 dark:text-white dark:bg-gray-900  bg-gray-100">

      {/* SIDEBAR */}
      {sideOpen && (
        <aside className="w-64 bg-white z-10 dark:bg-gray-800 shadow-lg flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-indigo-600">
              Menu
            </h1>
          </div>

          <nav  onClick={() => setSideOpen(false)} className="flex-1 p-4 space-y-2">
            <Link
              to="/"             
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <Home size={22} />
              Início
            </Link>

            <Link
              to="/favoritos"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <Heart size={22} />
              Favoritos
            </Link>

           {user?.store && (

              <Link
              to="/store/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700"
              >
              <Store size={22} />
              Loja
            </Link>
            )}


            <Link
              to="/User"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <User size={22} />
              Usuario
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <Settings size={22} />
              Configurações
            </Link>
            
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          </nav>

        </aside>
      )}

      {/* CONTEÚDO */}
      <div className="relative flex flex-1 flex-col w-full ">

        {/* HEADER */}
        <header className="dark:bg-[#0A0B1A]  w-full border-b border-white/10 text-gray-800 dark:text-white">
          <div className="flex border-b border-gray-700 h-20 items-center justify-between px-8 text-white">
          <button
              onClick={() => setSideOpen(!sideOpen)}
              className="p-3 rounded-md flex relative justify-center text-gray-800 dark:text-white transition cursor-pointer hover:scale-115"
                >
                <span
                className={` absolute h-1 w-8 bg-gray-800 dark:bg-white transition-all duration-300
                ${sideOpen ? "rotate-45" : "-translate-y-2"}
                `}
                />

                <span
                className={` absolute h-1 w-8 bg-gray-800 dark:bg-white transition-all duration-300
                ${sideOpen ? "-rotate-45" : "translate-y-2"}
                `}
                />
            </button>

            {/* LOGO */}
            <h2
              onClick={() => navigate("/")}
              className="cursor-pointer text-2xl tracking-widest text-gray-800 dark:text-white"
            >
              NEO-SHOP <span className="text-blue-500">//</span>
            </h2>

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="relative flex items-center max-w-xl flex-1 mx-8 text-gray-800 bg-transparent"
            >
              <input
                type="text"
                placeholder="Buscar produtos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-200 dark:bg-[#1f1f1f] text-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700 text-white"
              >
                Buscar
              </button>
            </form>

            {/* AÇÕES */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/cart")}
                className="relative rounded-xl p-2 text-blue-500 hover:bg-white/10"
              >
                <ShoppingCart size={26} />
                {qtyProducts > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-xs flex items-center justify-center">
                    {qtyProducts}
                  </span>
                )}
              </button>

              <button 
              onClick={()=>navigate("/user")}
              className="rounded-xl p-2 text-blue-500 hover:bg-white/10">
                <User size={26} />
              </button>             
            </div>
          </div>
        </header>

        {/* PÁGINAS */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default MenuDashBoard;

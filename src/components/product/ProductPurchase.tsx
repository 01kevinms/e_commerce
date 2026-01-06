import { useMemo, useState } from "react";
import type { PropPurchase } from "../../types/cards";
import { findProductImage } from "../shared/findimages";
import { updateCart } from "../../services/apis/Put.routes";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { ItemMore } from "../shared/ItemMore";
import { useNavigate } from "react-router-dom";

export function ProductPurchase({product}:PropPurchase){
    const [qty,setQty]= useState(1)
    const [added,setAdded] = useState(false)
    const image = useMemo(() => {
    return (
      findProductImage(product.name, product.category) ||
      product.images?.[0]?.url ||
      "/fallback.jpg"
    );
  }, [product]);

  async function handleAddToCart() {
    await updateCart(product.id,qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500);
  }
  const navigate=useNavigate()

  function handlePurchase(){
  navigate("/checkout",{
    state:{
      items:[{
        productId:product.id,
        quantity: qty
    }]
    }
  })
  }

return(
     <div className="space-y-4">
      <img src={image} alt={product.name} className="w-80 rounded-lg" />

      <p className="text-xl font-semibold">
        R$ {product.price.toFixed(2)}
      </p>

      <div className="flex gap-4">
        <button 
        onClick={handlePurchase}
        className="rounded-lg bg-[#139CC2] px-4 py-3 text-white hover:scale-105">
          Comprar
        </button>

        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 rounded-lg border px-4 py-2  hover:scale-105"
        >
          <ShoppingCart />
          Carrinho
        </button>

        <ItemMore value={qty} max={product.stock} onChange={setQty} />
      </div>

      {added && (
        <div className="flex items-center gap-2 rounded-lg bg-green-900/30 p-2 text-green-400">
          <CheckCircle size={18} />
          Item adicionado ao carrinho!
        </div>
      )}
    </div>
)
}
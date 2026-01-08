import { useEffect, useState } from "react";
import { DeleteCartItem } from "../../services/apis/Delete.routes";

import type { Cart } from "../../types/cards";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/cart/CartUserItem";
import { CartFooter } from "../../components/cart/CartFooter";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../services/apis/Get.routes";
import { useLoading } from "../../components/shared/LoadingProvider";

export default function CartUser() {

  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const{show,hide}=useLoading()
  
  async function load() {
    try {
      show("Carregando informações...")
      const data = await getCart();
      setCart(data)
    } catch (error) {
      console.error(error)
    }finally{hide()}
  }
  function toggleSelect(id: string) {
  setSelectedIds(prev =>
  prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
}

function handleCheckout(){
  if(!cart)return
  const selectedItems = cart.items.filter(i=>selectedIds.includes(i.product.id))
  if(selectedItems.length === 0){
    alert()
    return
  }
  navigate("/checkout",{
    state:{
      items: selectedItems.map(item=>({
        productId:item.productId,
        quantity: item.quantity
      }))
    }
  })
}

  useEffect(() => {    
    load();
  }, []);

  const totals = useCart(cart, selectedIds);
  const navigate=useNavigate()

   if (!cart?.items.length) {
     return <p>Carrinho vazio</p>;
   }

  return (
    <main className="flex h-full flex-col dark:bg-[#1f1f1f] text-gray-800 dark:text-white">
      <section className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-8">
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            checked={selectedIds.includes(
              item.product.id
            )}
            onToggle={() =>
              toggleSelect(item.product.id)
            }
            onRemove={() =>
              DeleteCartItem(item.id).then(load)
            }
          />
        ))}
      </section>

      <CartFooter
        items={
          totals.hasSelection
            ? totals.selectedTotalItems
            : totals.totalitems
        }
        price={
          totals.hasSelection
            ? totals.selectedTotalPrice
            : totals.totalprice
        }
        hasSelection={totals.hasSelection}
        onClick={handleCheckout}
      />

    </main>
  );
}

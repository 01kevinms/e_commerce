import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../types/cards";
import { getImage } from "../../utils/GroupCatgeorie";

export function CartPurchase(item:CartItem){
const navigate = useNavigate()
const image = getImage(item.product) 
const subtotal = item.quantity * item.product.price
 
return(
<article className="grid grid-cols-[auto_96px_1fr_auto] items-center gap-4 rounded-xl text-gray-800 dark:text-white dark:bg-[#414C5E] bg-gray-200 p-4">
      <img
        src={image}
        alt={item.product.name}
        onClick={() =>
          navigate(`/product/${item.product.id}`)
        }
        className="h-40 w-40 cursor-pointer rounded-lg object-cover"
      />

      <div className="flex flex-1 flex-col ">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {item.product.name}
        </h2>

        <p className="text-gray-800 dark:text-white">
          {item.product.description}
        </p>

        <p className="text-sm text-gray-800 dark:text-white">
          Quantidade: {item.quantity}
        </p>

        <p className="mt-2 text-xl font-bold text-gray-800 dark:text-white">
          R$ {subtotal.toFixed(2)}
        </p>
      </div>     
    </article>
)
}
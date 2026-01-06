import { useNavigate } from "react-router-dom";
import type { PropsCart } from "../../types/cards";
import { getImage } from "../../utils/GroupCatgeorie";

export function CartItem({item,checked,onToggle,onRemove}:PropsCart){
const navigate = useNavigate()
const image = getImage(item.product)
const subtotal = item.quantity * item.product.price
 
return(
<article className="grid grid-cols-[auto_96px_1fr_auto] items-center gap-4 rounded-xl text-gray-800 dark:text-white dark:bg-[#414C5E] bg-gray-200 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="size-5"
      />

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

        <p className=" text-gray-800 dark:text-white">
          {item.product.description}
        </p>

        <p className="text-sm text-gray-800 dark:text-white">
          Quantidade: {item.quantity}
        </p>

        <p className="mt-2 text-xl font-bold">
          R$ {subtotal.toFixed(2)}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white"
      >
        Remover
      </button>
    </article>
)
}
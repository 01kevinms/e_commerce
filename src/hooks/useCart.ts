import type { Cart } from "../types/cards";

export function useCart(cart:Cart | null, selectedIds:string[]){

  const items = cart?.items ?? [];

  const totalitems = items.reduce((acc,item)=>acc + item.quantity,0)

  const totalprice = items.reduce((acc,item)=>acc + item.quantity * item.product.price,0)

  const selecteditems = items.filter(item=> selectedIds.includes(item.product.id))

  const selectedTotalItems = selecteditems.reduce((acc,item)=> acc + item.quantity,0)

  const selectedTotalPrice = selecteditems.reduce((acc,item)=> acc + item.quantity * item.product.price,0)

  return{
     totalitems,
    totalprice,
    selectedTotalItems,
    selectedTotalPrice,
    hasSelection: selectedIds.length > 0,
  }
}
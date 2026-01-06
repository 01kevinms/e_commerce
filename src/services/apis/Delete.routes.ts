import api from "../../utils/axios.api";

export async function DeleteCartItem(itemId:string){
    const res = await api.delete(`/user/cart/item/${itemId}`);
    return res.data
}


export async function DeleteCount(userId:string) {
  const res = await api.delete(`/auth/${userId}`)
  return res.data
}

export async function DeleteOrder(id:string) {
  const res = await api.delete(`/user/orders/${id}`)
  return res.data
}
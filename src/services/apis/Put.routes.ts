import type { Address } from "../../types/cards";
import api from "../../utils/axios.api";

export async function updateCart(productId: string, qty: number) {
  const res = await api.put("/user/cart",{
    productId,
    quantity: qty
  });
  return res.data;
}

export async function updateAddress(addressId:string,data:Address) {
  const res = await api.put(`/user/address/${addressId}`, data)
  return res.data
}

export async function updatePassword(data:{currentPassword:string, newPassword:string}) {
  const res = await api.put("/auth/password",data)
  return res.data
}

export async function CancelOrder(id:string) {
  const res = await api.put(`/user/orders/${id}/cancel`)
return res.data
}
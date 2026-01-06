import type { CheckoutData, ProductCreate, ReviewsApi, StoreTypes } from "../../types/cards";
import api from "../../utils/axios.api";

export async function LoginUser(email: string, password: string) {
  const res = await api.post("/auth/signin", {
    email,
    password,
  });

  return res.data; // { accessToken }
}

export async function RegisterUser(
  name: string,
  email: string,
  password: string
) {
  const res = await api.post("/auth/signup", {
    name,
    email,
    password,
  });

  return res.data;
}

export async function checkoutOrder(data:CheckoutData){
const res = await api.post("/user/checkout",data)
return res.data
}

export async function ConfirmDelivered(id:string) {
  const res= await api.post(`/user/orders/${id}/confirm`)
  return res.data
}

export async function Createreview(orderId:string,productId:string,data:ReviewsApi) {
  const res= await api.post(`/user/orders/${orderId}/products/${productId}/review`,data)
  return res.data
}

export async function CreateStoreApi(data:StoreTypes) {
  const res = await api.post("/user/store",data)
  return res.data
}
export async function CreateProductAPI(data:ProductCreate) {
  const formData = new FormData();
 
formData.append("name", data.name);
formData.append("price", data.price.toString());
formData.append("stock", data.stock.toString());
formData.append("category", data.category);
formData.append("description", data.description);
formData.append("images", data.images[0]);

// para aumentar a quantidades de imagens num so produto
data.images.forEach(img => {
  formData.append("images", img);
});

const res = await api.post("/product",formData,{
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
return res.data
}

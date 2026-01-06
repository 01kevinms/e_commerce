import api from "../../utils/axios.api"

export async function getProducts() {
    const res = await api.get("/product")
    if(!res){
        throw new Error("Erro ao buscar produtos")
    }
    return res.data
}

export async function getCategories() {
    const res = await api.get("/category")
     if(!res){
        throw new Error("Erro ao buscar categorias")
    }
    return res.data
}

export async function getProductById(id:string){
    const res = await api.get(`/product/${id}`)
     if(!res){
        throw new Error("Erro ao buscar produto")
    }
    return res.data
}

export async function getCart(){
    const res = await api.get("/user/cart")
    if(!res){
        throw new Error("Erro ao buscar carrinho")
    }
    return res.data
}

export async function getReview(productId:string) {
   const res = await api.get(`/product/${productId}/reviews`);
  return res.data;
}

export async function getProfile(){
  const res = await api.get("/user/profile")
  return res.data
}

export async function GetOrder() {
  const res=await api.get("/user/orders")
  return res.data
}

export async function getOrderId(OrderId:string) {
  const res = await api.get(`/user/orders/${OrderId}`)
  return res.data
}

export async function searchProducts(params: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const res = await api.get("/product/search", {
    params: {
      search: params.search,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });

  return res.data;
}

export async function GethistoricalStore() {
  const res = await api.get("/user/store/historical")
  return res.data

}
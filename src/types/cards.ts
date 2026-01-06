import { z } from "zod";
import { CartItem } from "../components/cart/CartUserItem";

export const addressSchema = z.object({
  street: z.string().min(3, "Rua obrigatória"),
  number: z.number().min(1, "Número inválido"),
  city: z.string().min(2, "Cidade obrigatória"),
  zip: z.string().min(5, "CEP inválido"),
  country: z.string().min(2, "País obrigatório"),
  isDefault: z.boolean().optional(),
});
export type Store = {
  name: string;
  description?: string;
  logo?: string;
  createdAt?: string;
  slug: string;
};
// export type StoreDashboardProps = {
//   store: {
//     name: string;
//     logo?: string;
//     description?: string;
//     createdAt?: string;
//     slug: string;
//   };
//   stats: {
//     totalProducts: number;
//     totalOrders: number;
//     totalReviews: number;
//   };
// };
export type StoreTypes ={
  name:string
  description?:string
  logo?: string
}
export interface ProductCreate{
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
  category: string;
}
export type AddressFormData = z.infer<typeof addressSchema>;

export type OrderStatus = 
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";
export const statusOrder: Record<string, string> = {
  PENDING: "bg-yellow-600/20 text-yellow-400",
  PAID: "bg-blue-600/20 text-blue-400",
  SHIPPED: "bg-purple-600/20 text-purple-400",
  COMPLETED: "bg-green-600/20 text-green-400",
  CANCELED: "bg-red-600/20 text-red-400",
};
export const statusMap: Record<
  OrderStatus,
  { label: string; color: string }
> = {
  PENDING: {
    label: "Aguardando pagamento",
    color: "bg-yellow-500",
  },
  PAID: {
    label: "Pagamento aprovado",
    color: "bg-green-500",
  },
  SHIPPED: {
    label: "Enviado",
    color: "bg-blue-500",
  },
  DELIVERED: {
    label: "Entregue",
    color: "bg-emerald-600",
  },
  CANCELED: {
    label: "Cancelado",
    color: "bg-red-600",
  },
};


export type Order = {
  id: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  paymentMethod: string;
  address: {
    street: string;
    number: string;
    city: string;
    zip: string;
    country: string;
  };
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};


export interface ProductImage {
  id: number;
  name: string;
  url: string;
  category: string;
  isPrimary?: Boolean;
}
export type CheckoutData = {
  items: CartItem[];
  addressId?: Address;
  paymentMethod?: MethodPayment;
};

export type MethodPayment = "PIX" | "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO";

export type PropsCart={
   item: CartItem;
  checked: boolean;
  onToggle(): void;
  onRemove(): void;
}
export type PropsSearch={
  item:CartItem
}
export interface historicalOrders{
   product: {
    id: string;
    name: string;
  };
  order: {
    id: string;
    status: OrderStatus;
    createdAt: string;
  };
  quantity: number;
  price: number;
}
export interface HistoricalStoreResponse {
  items: historicalOrders[]
  status: {
    _sum: {
      quantity: number | null
      price: number | null
    }
  }
  revenue: number
  ordersCount: number
  ProductsCreate: Product[]
}


export type PropsFootCart = {
  items: number;
  price: number;
  hasSelection: boolean;
  onClick: ()=>void
};
export interface PropPurchase {
  product: Product; 
}
export type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: {
    name: string;
  };
};
export type ReviewsApi={
  rating: number;
  comment?: string;
}
export type ReviewResponse = {
  review: Review[];
  average: number;
  totalReview: number;
};



export interface Product {
  _id?:{$oid:string}
   id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: string;
    images?: ProductImage[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  cartId: string;
  product: Product
}
export type Address = {
  id?:string
  street?: string;
  number?: number;
  city?: string;
  zip?: string;
  country?: string;
  isDefault?: boolean;
};
export interface Cart {
  id: string;
  userId: string;
  updatedAt: string;
  items: CartItem[];
}

export type Props = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};
export type Theme = "light" | "dark"; // Define os tipos possíveis de tema
 export interface ThemeContextType { 
      theme: Theme; // Tema atual
      toggleTheme: () => void; // Função de alternar tema
      }

export interface AuthContextType { 
  user: any 
  token: string | null
  login: (
    email: string, 
    password: string) => Promise<void>
  logout: () => void;
  register:(
    name: string, 
    email: string, 
    password: string) => Promise<void>; 
  loading: any;
  }
     export interface User { // Interface para tipagem do usuário
      id: string; // ID do usuário
      name: string; // Nome do usuário
      email: string; // Email do usuário
      address?: Address[]
      }

      export const ProductImages: ProductImage[] = [
  // 🔌 ELETRÔNICOS
  {
    id: 9,
    name: "headphone",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765328959/image_9_plpqbb.png",
  },
  {
    id: 10,
    name: "sound",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765328960/image_16_ucj1wg.png",
  },
  {
    id: 11,
    name: "phone",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765328959/image_14_iemnhv.png",
  },
  {
    id: 12,
    name: "watch",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765328959/image_15_hy1ccg.png",
  },
  {
    id: 13,
    name: "camera",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765671302/cam_i5vtdz.png",
  },
  {
    id: 14,
    name: "pc",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765671301/pc_gamer_xeu02u.png",
  },
  {
    id: 15,
    name: "xbox",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765671302/xbox_bowwwl.png",
  },

  // 🛠️ FERRAMENTAS
  {
    id: 23,
    name: "martelo",
    category: "ferramentas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765385299/Gemini_Generated_Image_sylqd5sylqd5sylq_w6qerf.png",
  },
  {
    id: 24,
    name: "parafusa",
    category: "ferramentas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765385300/Gemini_Generated_Image_8l9asf8l9asf8l9a_rybrmz.png",
  },
  {
    id: 25,
    name: "lixadeira",
    category: "ferramentas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765671302/lixaderia_msxqyl.png",
  },
  {
    id: 26,
    name: "makita",
    category: "ferramentas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765671302/makita_ghqpuu.png",
  },

  // 👟 CALÇADOS
  {
    id: 30,
    name: "tenis de corrida",
    category: "calcados",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764839/tenis_corrida_wkdj7q.png",
  },
  {
    id: 31,
    name: "bola de tenis",
    category: "esportes",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764838/tenis_bola_avhumk.png",
  },
  {
    id: 32,
    name: "tenis casual",
    category: "calcados",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764838/tenis_branco_enizjo.png",
  },

  // 👕 ROUPAS
  {
    id: 33,
    name: "casaco",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764839/casaco_jphult.png",
  },
  {
    id: 34,
    name: "vestido preto",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764839/vestido_preto_rpnlwg.png",
  },
  {
    id: 35,
    name: "calça legging",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/calca_legging_oeuhwa.png",
  },
  {
    id: 36,
    name: "short cinza",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764838/short_cinza_vyuk1y.png",
  },
  {
    id: 37,
    name: "camisa social",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/camisa_social_dqx6uo.png",
  },
  {
    id: 38,
    name: "jaqueta jeans",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/jaqueta_jeans_thzvmr.png",
  },
  {
    id: 39,
    name: "calca jeans",
    category: "roupas",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764836/calça_jeans_pc2ngp.png",
  },

  // 🎧 ELETRÔNICOS (NOVOS)
  {
    id: 40,
    name: "fone bluetooth",
    category: "eletronicos",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764839/fone_branco_ubblhl.png",
  },
  {
    id: 41,
    name: "relogio",
    category: "acessorios",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/relogio_ljvuu1.png",
  },

  // 🧢 ACESSÓRIOS
  {
    id: 42,
    name: "cinto",
    category: "acessorios",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764838/cinto_snkd7p.png",
  },
  {
    id: 43,
    name: "carteira",
    category: "acessorios",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/carteira_tsnbqd.png",
  },
  {
    id: 44,
    name: "oculos",
    category: "acessorios",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/oculos_mfsijy.png",
  },

  // 🏀 ESPORTES
  {
    id: 45,
    name: "basquete",
    category: "esportes",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764837/basquete_zuspsm.png",
  },
  {
    id: 46,
    name: "capacete",
    category: "esportes",
    url: "https://res.cloudinary.com/dudpqqgch/image/upload/v1765764838/capacete_pd0sgn.png",
  },
];
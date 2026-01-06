import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderId } from "../../services/apis/Get.routes";
import { statusMap, type Order } from "../../types/cards";

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return;

    getOrderId(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Carregando pedido...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center text-red-500">
        Pedido não encontrado
      </div>
    );
  }

  const status = statusMap[order.status];

  return (
 <main className="max-w-4xl mx-auto p-6 space-y-6 text-white">

  {/* TOPO */}
  <div className="flex items-center gap-4">
    <button
      onClick={() => navigate("/")}
      className="flex items-center bg-blue-500 rounded p-2 gap-2 text-md text-gray-300 hover:text-white hover:scale-110 transition"
    >
      ← Voltar à loja
    </button>
  </div>

  {/* HEADER */}
  <section className="bg-[#1f1f1f] rounded-xl p-6 shadow space-y-2">
    <div className="flex flex-wrap items-center gap-3">
      <h1 className="text-2xl font-bold">
        Pedido confirmado
      </h1>

      <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${status.color}`}
      >
        {status.label}
      </span>
    </div>

    <p className="text-sm text-gray-400">
      Pedido #{order.id}
    </p>

    <p className="text-xs text-gray-500">
      Criado em{" "}
      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
    </p>
  </section>


      {/* ITENS */}
   <section className="bg-[#1f1f1f] rounded-xl p-6 shadow">
  <h2 className="text-lg font-semibold mb-4">
    Itens do pedido
  </h2>

  <div className="space-y-4">
    {order.items.map((item: any) => (
      <div
        key={item.id}
        className="flex justify-between items-center border-b border-gray-700 pb-4"
      >
        <div>
          <p className="font-medium">
            Produto #{item.productId}
          </p>
          <p className="text-sm text-gray-400">
            Quantidade: {item.quantity}
          </p>
        </div>

        <p className="font-semibold">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    ))}
  </div>
</section>


      {/* ENDEREÇO */}
     <section className="bg-[#1f1f1f] rounded-xl p-6 shadow">
  <h2 className="text-lg font-semibold mb-3">
    Endereço de entrega
  </h2>

  <p className="text-gray-300">
    {order.address.street}, {order.address.number}
  </p>
  <p className="text-sm text-gray-400">
    {order.address.city} • {order.address.zip}
  </p>
  <p className="text-sm text-gray-400">
    {order.address.country}
  </p>
</section>


      {/* RESUMO */}
      <section className="bg-[#1f1f1f] rounded-xl p-6 shadow">
  <h2 className="text-lg font-semibold mb-4">
    Resumo do pagamento
  </h2>

  <div className="flex justify-between text-sm text-gray-400">
    <span>Método</span>
    <span>{order.paymentMethod}</span>
  </div>

  <div className="flex justify-between text-xl font-bold mt-4">
    <span>Total</span>
    <span className="text-green-400">
      R$ {order.total.toFixed(2)}
    </span>
  </div>
</section>

    </main>
  );
}

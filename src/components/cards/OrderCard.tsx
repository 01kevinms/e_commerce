import { useNavigate } from "react-router-dom";
import { statusOrder } from "../../types/cards";
import { OrderActions } from "./OrderAction";

export function OrderCard({
  order,
  onCancel,
  onDelete,
  onConfirmDelivered,
}: any) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 p-4 dark:bg-[#2a2a2a] bg-gray-400 rounded-lg">
      <div>
        <p className="font-medium">
          Pedido #{order.id.slice(-6)}
        </p>
        <p className="text-sm">
          R$ {order.total.toFixed(2)} •{" "}
          {new Date(order.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        <span
          className={`text-sm px-3 py-1 rounded ${statusOrder[order.status]}`}
        >
          {order.status}
        </span>

        <button
          onClick={() => navigate(`/order/${order.id}`)}
          className="dark:bg-gray-700 bg-gray-300 hover:bg-gray-600 px-3 py-1 rounded text-sm"
        >
          Ver
        </button>

        <OrderActions
          order={order}
          onCancel={onCancel}
          onDelete={onDelete}
          onConfirmDelivered={onConfirmDelivered}
        />
      </div>
    </div>
  );
}

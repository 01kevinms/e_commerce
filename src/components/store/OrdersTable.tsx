import { type historicalOrders } from "../../types/cards";
import { OrderStatusBadge } from "./OrdersStatus";

interface Props {
  orders: historicalOrders[];
}

export function OrdersTable({ orders }: Props) {
  
  return (
    <div className="dark:bg-[#1f1f1f] bg-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="dark:bg-[#2a2a2a] bg-gray-300">
          <tr>
            <th className="p-3 text-left">Pedido</th>
            <th className="p-3">Produto</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(item => (
            <tr key={item.order.id} className="border-t border-gray-700">
              <td className="p-3">#{item.order.id}</td>
              <td className="p-3">{item.product.name}</td>
              <td className="p-3 text-center">
                R$ {item.price * item.quantity}
              </td>
               <td className="p-3 text-center">
                <OrderStatusBadge status={item.order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

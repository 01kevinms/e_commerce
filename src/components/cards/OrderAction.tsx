
export function OrderActions({
  order,
  onCancel,
  onDelete,
  onConfirmDelivered,
}: any) {

  return (
    <>
      {order.status === "PENDING" && (
        <button
          onClick={() => onCancel(order.id)}
          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
        >
          Cancelar
        </button>
      )}

      {(order.status === "PENDING" || order.status === "CANCELED") && (
        <button
          onClick={() => onDelete(order.id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
        >
          Remover
        </button>
      )}

      {order.status === "SHIPPED" && (
        <button
          onClick={() => onConfirmDelivered(order.items.id)}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
        >
          Confirmar entrega
        </button>
      )}
    </>
  );
}

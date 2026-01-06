import { statusMap, type OrderStatus } from "../../types/cards";

interface Props {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: Props) {
  const config = statusMap[status];

  if (!config) {
    return (
      <span className="px-2 py-1 rounded dark:bg-gray-600 text-xs">
        Desconhecido
      </span>
    );
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

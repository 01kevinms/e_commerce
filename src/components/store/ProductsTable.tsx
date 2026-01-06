import type { Product } from "../../types/cards";

type ProductsTableProps = {
  products: Product[];
};

export function ProductsTable({ products }: ProductsTableProps) {
  if (!products.length) {
    return (
      <p className="text-gray-800 dark:text-white">Nenhum produto cadastrado</p>
    );
  }

  return (
    <div className="dark:bg-[#1f1f1f] bg-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="dark:bg-[#2a2a2a] bg-gray-300">
          <tr>
            <th className="p-3 text-left">Produto</th>
            <th className="p-3 text-center">Preço</th>
            <th className="p-3 text-center">Estoque</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-700"
            >
              <td className="p-3">{product.name}</td>
              <td className="p-3 text-center">
                R$ {product.price.toFixed(2)}
              </td>
              <td className="p-3 text-center">
                {product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

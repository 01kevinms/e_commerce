export default function ItemsStep({ items, onNext }: any) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Itens do pedido</h2>

      {items.map((item: any) => (
        <div key={item.productId} className="bg-[#2a2a2a] p-4 rounded-lg mb-2">
          Produto: {item.productId} | Qtd: {item.quantity}
        </div>
      ))}

      <button
        onClick={onNext}
        className="mt-6 bg-green-600 w-full py-3 rounded-lg"
      >
        Continuar
      </button>
    </>
  );
}

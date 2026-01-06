export default function ConfirmStep({
  items,
  user,
  paymentMethod,
  onBack,
  onConfirm,
}: any) {
  const address = user?.address?.find((a: any) => a.isDefault);

  return (
    <div className="space-y-6">

      {/* TÍTULO */}
      <div>
        <h2 className="text-2xl font-semibold">Confirmar pedido</h2>
        <p className="text-gray-400 text-sm">
          Revise as informações antes de finalizar
        </p>
      </div>

      {/* ITENS */}
      <div className="bg-[#2a2a2a] rounded-lg p-4">
        <h3 className="font-semibold mb-3">🧺 Itens</h3>

        {items.map((item: any) => (
          <div
            key={item.productId}
            className="flex justify-between text-sm py-2 border-b border-gray-700 last:border-none"
          >
            <span>{item.productId}</span>
            <span>Qtd: {item.quantity}</span>
          </div>
        ))}
      </div>

      {/* ENDEREÇO */}
      <div className="bg-[#2a2a2a] rounded-lg p-4">
        <h3 className="font-semibold mb-2">📍 Endereço de entrega</h3>

        {address ? (
          <p className="text-sm text-gray-300">
            {address.street}, {address.number} <br />
            {address.city} - {address.zip} <br />
            {address.country}
          </p>
        ) : (
          <p className="text-red-400 text-sm">
            Nenhum endereço selecionado
          </p>
        )}
      </div>

      {/* PAGAMENTO */}
      <div className="bg-[#2a2a2a] rounded-lg p-4">
        <h3 className="font-semibold mb-2">💳 Pagamento</h3>
        <p className="text-sm text-gray-300">
          {paymentMethod}
        </p>
      </div>

      {/* AÇÕES */}
      <div className="pt-4 space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold"
        >
          Finalizar pedido
        </button>

        <button
          onClick={onBack}
          className="w-full bg-gray-700 hover:bg-gray-600 transition py-3 rounded-lg"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

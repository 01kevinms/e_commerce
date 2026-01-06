export default function PaymentStep({
  paymentMethod,
  onSelect,
  onNext,
  onBack,
}: any) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Pagamento</h2>

      {["PIX", "BOLETO", "CREDIT_CARD", "DEBIT_CARD"].map((method) => (
        <label
          key={method}
          className={`block p-4 rounded-lg mb-2 cursor-pointer
            ${paymentMethod === method ? "bg-green-600" : "bg-[#2a2a2a]"}`}
        >
          <input
            type="radio"
            checked={paymentMethod === method}
            onChange={() => onSelect(method)}
            className="hidden"
          />
          {method}
        </label>
      ))}

      <div className="flex gap-4 mt-6">
        <button onClick={onBack} className="w-1/2 bg-gray-600 py-3 rounded-lg">
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!paymentMethod}
          className="w-1/2 bg-green-600 py-3 rounded-lg disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </>
  );
}

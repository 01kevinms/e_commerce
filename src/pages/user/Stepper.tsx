export default function Stepper({ step }: { step: number }) {
  const steps = ["Itens", "Endereço", "Pagamento", "Confirmação"];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => {
        const active = step >= index + 1;

        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${active ? "bg-green-600" : "bg-gray-600"}`}
            >
              {index + 1}
            </div>
            <span className={active ? "text-white" : "text-gray-400"}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

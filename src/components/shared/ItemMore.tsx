import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};

export function ItemMore({
  value,
  onChange,
  min = 1,
  max = 99,
}: Props) {
  const [showMaxWarning, setShowMaxWarning] = useState(false);

  // Atualiza o aviso sempre que value mudar
  useEffect(() => {
    if (value >= max) {
      setShowMaxWarning(true);
    } else {
      setShowMaxWarning(false);
    }
  }, [value, max]);

  function decrease() {
    const newValue = Math.max(min, value - 1);
    onChange(newValue);
  }

  function increase() {
    if (value >= max) return;
    onChange(value + 1);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let num = e.target.valueAsNumber;

    if (isNaN(num) || num < min) num = min;
    if (num > max) num = max;

    onChange(num);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button
          onClick={decrease}
          disabled={value <= min}
          className={`p-2 rounded-lg border transition ${
            value <= min
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-[#1f1f1f] hover:bg-gray-700"
          }`}
        >
          <Minus size={16} className="text-white" />
        </button>

        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleInput}
          className="w-16 text-center rounded-lg border px-2 py-1.5 "
        />

        <button
          onClick={increase}
          disabled={value >= max}
          className={`p-2 rounded-lg border transition ${
            value >= max
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-[#1f1f1f] hover:bg-gray-700"
          }`}
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>

      {showMaxWarning && (
        <p className="text-red-400 text-sm animate-pulse">
          Quantidade máxima atingida ({max})
        </p>
      )}
    </div>
  );
}

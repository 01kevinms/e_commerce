import type { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300">{label}</label>

      <input
        {...props}
        className={`w-full rounded-lg px-3 py-2 bg-[#1f1f1f] border
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-green-500"
          }
        `}
      />

      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}

type ConfirmModalProps = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export function ConfirmModal({
  title = "Confirmação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-white">
          {title}
        </h2>

        <p className="text-gray-400 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            {loading ? "Processando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

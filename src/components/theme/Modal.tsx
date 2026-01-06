import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: ModalProps) {
  // Fecha no ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose} // clique fora
    >
      <div
        onClick={e => e.stopPropagation()} // impede fechar ao clicar dentro
        className="
          bg-[#1f1f1f]
          rounded-xl
          w-full
          max-w-md
          p-6
          shadow-2xl
          animate-fade-in
        "
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

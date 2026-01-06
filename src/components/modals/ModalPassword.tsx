// components/ui/Modal.tsx
import {type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function ModalPassword({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  // Fecha com ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-[#1f1f1f] p-6 shadow-xl animate-fade-in">
        <header className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button onClick={onClose}>
            <X />
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}

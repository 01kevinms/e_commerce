import { useState } from "react";
import { Createreview } from "../../services/apis/Post.routes";

interface ReviewModalProps {
  orderId: string;
  product: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export function ReviewModal({ onClose, orderId, product }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      await Createreview(orderId, product.id, {
        rating,
        comment,
      });
      alert("Avaliação enviada com sucesso!");
      onClose();
    } catch {
      alert("Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">
          Avaliar {product.name}
        </h2>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                rating >= star ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full bg-[#2a2a2a] p-3 rounded-lg text-sm"
          placeholder="Escreva sua opinião..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

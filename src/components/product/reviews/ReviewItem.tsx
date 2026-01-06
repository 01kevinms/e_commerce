// components/review/ReviewItem.tsx
import type { Review } from "../../../types/cards";
import { StarRating } from "./StartRating";

export function ReviewItem({ review }: { review: Review }) {
  return (
    <article className="bg-[#414C5E] p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <p className="font-medium text-white">
          {review.user?.name ?? "Usuário"}
        </p>
        <StarRating value={review.rating} />
      </div>

      {review.comment && (
        <p className="text-gray-200">
          {review.comment}
        </p>
      )}

      <span className="text-sm text-gray-400">
        {new Date(review.createdAt!).toLocaleDateString("pt-BR")}
      </span>
    </article>
  );
}

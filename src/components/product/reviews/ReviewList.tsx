// components/review/ReviewList.tsx
import type { Review } from "../../../types/cards";
import { ReviewItem } from "./ReviewItem";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <p className="text-gray-400">
        Nenhuma avaliação ainda.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}

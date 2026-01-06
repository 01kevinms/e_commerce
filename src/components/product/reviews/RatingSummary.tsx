// components/review/RatingSummary.tsx

import { StarRating } from "./StartRating";

type Props = {
  average: number;
  total: number;
};

export function RatingSummary({ average, total }: Props) {
  return (
    <div className="flex items-center gap-3">
      <StarRating value={average} size={18} />
      <span className="text-gray-300">
        {average.toFixed(1)} / 5
      </span>
      <span className="text-gray-400 text-sm">
        ({total} avaliações)
      </span>
    </div>
  );
}

// components/review/StarRating.tsx
import { Star } from "lucide-react";

type Props = {
  value: number;
  size?: number;
};

export function StarRating({ value, size = 16 }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill =
          value >= i ? "text-yellow-400" :
          value >= i - 0.5 ? "text-yellow-400/50" :
          "text-gray-500";

        return (
          <Star
            key={i}
            size={size}
            className={fill}
          />
        );
      })}
    </div>
  );
}

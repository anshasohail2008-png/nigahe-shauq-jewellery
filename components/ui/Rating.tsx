import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function Rating({ rating, reviewCount, size = 'sm', showCount = true }: RatingProps) {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${star <= Math.round(rating) ? 'fill-champagne-400 text-champagne-400' : 'text-charcoal-300 dark:text-charcoal-600'}`}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${textSizes[size]} text-charcoal-400 dark:text-charcoal-500`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

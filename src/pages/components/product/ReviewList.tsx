import type { Review } from '@/types';
import { Rating } from '@/components/ui/Rating';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewList({ reviews, rating, reviewCount }: ReviewListProps) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <div>
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-charcoal-100 dark:border-charcoal-700">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-4 mb-2">
            <span className="font-serif text-5xl text-charcoal-800 dark:text-ivory">{rating.toFixed(1)}</span>
            <div>
              <Rating rating={rating} showCount={false} size="lg" />
              <p className="text-xs text-charcoal-400 mt-1">Based on {reviewCount} reviews</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3">
              <span className="text-xs text-charcoal-500 w-8">{d.star} star</span>
              <div className="flex-1 h-2 bg-charcoal-100 dark:bg-charcoal-700 overflow-hidden">
                <div className="h-full bg-champagne-400 transition-all duration-500" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="text-xs text-charcoal-400 w-8 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-champagne-200 dark:bg-champagne-700 flex items-center justify-center text-sm font-serif text-charcoal-700 dark:text-ivory">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-charcoal-800 dark:text-ivory">{review.name}</p>
                  <span className="text-xs text-charcoal-400">{review.date}</span>
                </div>
                <Rating rating={review.rating} showCount={false} />
                <p className="mt-2 font-serif text-lg text-charcoal-700 dark:text-charcoal-200">{review.title}</p>
                <p className="mt-1 text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{review.body}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-charcoal-400 py-8">No reviews yet. Be the first to share your experience.</p>
        )}
      </div>

      <p className="mt-8 text-xs text-charcoal-400 italic">
        Demo reviews shown for illustration. These are not from verified customers.
      </p>
    </div>
  );
}

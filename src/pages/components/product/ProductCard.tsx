import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, setCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product.id);
    showToast('Added to your bag.');
    setCartOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(inWishlist ? 'Removed from wishlist.' : 'Added to wishlist.');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-beige-50 dark:bg-charcoal-700">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Second image on hover */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestSeller && <Badge variant="bestseller">Bestseller</Badge>}
            {!product.inStock && <Badge variant="out">Sold Out</Badge>}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              inWishlist
                ? 'bg-rose-500 text-white'
                : 'bg-ivory/80 dark:bg-charcoal-800/80 text-charcoal-700 dark:text-charcoal-200 hover:bg-ivory dark:hover:bg-charcoal-800'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </button>

          {/* Quick view + Add to cart overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider bg-ivory/90 dark:bg-charcoal-800/90 text-charcoal-800 dark:text-ivory backdrop-blur-md hover:bg-ivory dark:hover:bg-charcoal-800 transition-colors"
              >
                <Eye className="w-4 h-4" /> Quick View
              </button>
            )}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider bg-charcoal-800/90 dark:bg-champagne-300/90 text-ivory dark:text-charcoal-900 backdrop-blur-md hover:bg-charcoal-800 dark:hover:bg-champagne-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 text-center">
          <p className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 mb-1">{product.collection}</p>
          <h3 className="font-serif text-base text-charcoal-800 dark:text-ivory group-hover:text-champagne-500 dark:group-hover:text-champagne-300 transition-colors">
            {product.name}
          </h3>
          <div className="mt-1.5 flex justify-center">
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-charcoal-400 line-through text-sm">{formatPrice(product.price)}</span>
                <span className="text-charcoal-800 dark:text-ivory font-medium">{formatPrice(product.salePrice)}</span>
              </>
            ) : (
              <span className="text-charcoal-800 dark:text-ivory font-medium">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

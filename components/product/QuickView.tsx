import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, X } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Modal } from '@/components/ui/Modal';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart, setCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product.id);
    showToast('Added to your bag.');
    onClose();
    setCartOpen(true);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    showToast(isInWishlist(product.id) ? 'Removed from wishlist.' : 'Added to wishlist.');
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} className="max-w-4xl">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto bg-beige-50 dark:bg-charcoal-700">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          {discount > 0 && <Badge variant="sale" className="absolute top-4 left-4">-{discount}%</Badge>}
        </div>
        <div className="p-8 flex flex-col">
          <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-2">{product.collection}</p>
          <h2 className="font-serif text-2xl text-charcoal-800 dark:text-ivory mb-3">{product.name}</h2>
          <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          <div className="mt-4 flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-charcoal-400 line-through">{formatPrice(product.price)}</span>
                <span className="text-2xl font-serif text-charcoal-800 dark:text-ivory">{formatPrice(product.salePrice)}</span>
              </>
            ) : (
              <span className="text-2xl font-serif text-charcoal-800 dark:text-ivory">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="mt-4 text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed line-clamp-4">{product.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className={`inline-block w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-rose-500'}`} />
            <span className="text-charcoal-500 dark:text-charcoal-400">{product.inStock ? `In stock (${product.stockCount} available)` : 'Sold out'}</span>
          </div>

          <div className="mt-auto pt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
            <button
              onClick={handleWishlist}
              className="p-3.5 border border-charcoal-200 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-300 hover:border-rose-400 hover:text-rose-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-4 text-center text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </Modal>
  );
}

import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { EmptyState } from '@/components/ui/EmptyState';

export function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, setCartOpen } = useCart();
  const { showToast } = useToast();

  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const handleMoveToCart = (productId: string) => {
    addToCart(productId);
    removeFromWishlist(productId);
    showToast('Moved to your bag.');
    setCartOpen(true);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-lux py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
        <EmptyState
          icon={<Heart className="w-16 h-16" />}
          title="Your wishlist is empty"
          description="Save pieces you love by tapping the heart icon. They'll appear here for when you're ready."
          actionLabel="Browse Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />

      <div className="flex items-center justify-between mt-6 mb-8">
        <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory">My Wishlist</h1>
        <button onClick={clearWishlist} className="text-xs uppercase tracking-wider text-charcoal-500 hover:text-rose-500 transition-colors">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="group border border-charcoal-100 dark:border-charcoal-700 p-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-beige-50 dark:bg-charcoal-700 mb-4">
              <Link to={`/product/${product.slug}`}>
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </Link>
              {!product.inStock && <Badge variant="out" className="absolute top-3 left-3">Sold Out</Badge>}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-ivory/80 dark:bg-charcoal-800/80 backdrop-blur-md text-charcoal-600 dark:text-charcoal-200 hover:text-rose-500 transition-colors"
                aria-label="Remove from wishlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Link to={`/product/${product.slug}`}>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">{product.collection}</p>
              <h3 className="font-serif text-base text-charcoal-800 dark:text-ivory hover:text-champagne-500 transition-colors">{product.name}</h3>
            </Link>
            <div className="mt-1.5"><Rating rating={product.rating} reviewCount={product.reviewCount} /></div>
            <div className="mt-2 flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-charcoal-400 line-through text-sm">{formatPrice(product.price)}</span>
                  <span className="text-charcoal-800 dark:text-ivory font-medium">{formatPrice(product.salePrice)}</span>
                </>
              ) : (
                <span className="text-charcoal-800 dark:text-ivory font-medium">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleMoveToCart(product.id)}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" /> Move to Bag
              </button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="p-2.5 border border-charcoal-200 dark:border-charcoal-600 text-charcoal-500 hover:text-rose-500 hover:border-rose-400 transition-colors"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

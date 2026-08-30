import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, discount, shipping, total, moveToWishlist } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleMoveToWishlist = (productId: string) => {
    addToWishlist(productId);
    moveToWishlist(productId);
    showToast('Moved to wishlist.');
  };

  if (items.length === 0) {
    return (
      <div className="container-lux py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        <EmptyState
          icon={<ShoppingBag className="w-16 h-16" />}
          title="Your bag is empty"
          description="Looks like you haven't added anything yet. Explore our collections and find your next favourite piece."
          actionLabel="Start Shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-8">Shopping Bag</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            const price = product.salePrice ?? product.price;

            return (
              <div key={item.productId} className="flex gap-4 sm:gap-6 border-b border-charcoal-100 dark:border-charcoal-700 pb-6">
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-24 h-32 sm:w-32 sm:h-40 object-cover bg-beige-50 dark:bg-charcoal-700" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-charcoal-400">{product.collection}</p>
                      <Link to={`/product/${product.slug}`} className="font-serif text-lg text-charcoal-800 dark:text-ivory hover:text-champagne-500 transition-colors">
                        {product.name}
                      </Link>
                      <p className="text-xs text-charcoal-400 mt-1">{product.material} · {product.stone === 'None' ? 'No stone' : product.stone}</p>
                    </div>
                    <p className="font-serif text-lg text-charcoal-800 dark:text-ivory whitespace-nowrap">{formatPrice(price * item.quantity)}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                    <div className="flex items-center border border-charcoal-200 dark:border-charcoal-600">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm text-charcoal-800 dark:text-ivory">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => handleMoveToWishlist(item.productId)} className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal-500 hover:text-rose-500 transition-colors">
                      <Heart className="w-4 h-4" /> Move to Wishlist
                    </button>
                    <button onClick={() => removeFromCart(item.productId)} className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal-500 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-warmwhite dark:bg-charcoal-800 p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="border-t border-charcoal-200 dark:border-charcoal-700 pt-4 flex justify-between font-serif text-lg text-charcoal-800 dark:text-ivory">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            {shipping > 0 && (
              <p className="mt-3 text-xs text-charcoal-400">
                Add {formatPrice(150 - subtotal)} more for free shipping.
              </p>
            )}
            <Link
              to="/checkout"
              className="block w-full text-center py-3.5 mt-6 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-400">
              <ShoppingBag className="w-3.5 h-3.5" /> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

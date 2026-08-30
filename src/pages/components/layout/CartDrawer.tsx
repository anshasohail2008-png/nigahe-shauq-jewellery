import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, subtotal, shipping, total, moveToWishlist } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!isCartOpen) return null;

  const handleMoveToWishlist = (productId: string) => {
    addToWishlist(productId);
    moveToWishlist(productId);
    showToast('Moved to wishlist.');
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-ivory dark:bg-charcoal-800 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-charcoal-100 dark:border-charcoal-700">
          <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Bag
          </h2>
          <button onClick={() => setCartOpen(false)} className="p-2 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-charcoal-300 dark:text-charcoal-600 mb-4" />
            <p className="text-charcoal-500 dark:text-charcoal-400 mb-6">Your bag is empty.</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="px-6 py-3 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                const price = product.salePrice ?? product.price;

                return (
                  <div key={item.productId} className="flex gap-4">
                    <Link to={`/product/${product.slug}`} onClick={() => setCartOpen(false)} className="shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-20 h-24 object-cover bg-beige-100 dark:bg-charcoal-700" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-sm text-charcoal-800 dark:text-ivory hover:text-champagne-500 transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <p className="text-xs text-charcoal-400 mt-1">{product.material} · {product.stone === 'None' ? 'No stone' : product.stone}</p>
                      <p className="text-sm text-charcoal-800 dark:text-ivory mt-1">{formatPrice(price)}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-charcoal-200 dark:border-charcoal-600">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1.5 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-sm text-charcoal-800 dark:text-ivory">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1.5 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleMoveToWishlist(item.productId)} className="text-charcoal-400 hover:text-rose-500 transition-colors" aria-label="Move to wishlist">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button onClick={() => removeFromCart(item.productId)} className="text-charcoal-400 hover:text-rose-500 transition-colors" aria-label="Remove">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-700 p-5 space-y-3">
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-serif text-lg text-charcoal-800 dark:text-ivory pt-2 border-t border-charcoal-100 dark:border-charcoal-700">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full text-center py-3.5 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="block w-full text-center py-3 text-sm uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
              >
                View Full Bag
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

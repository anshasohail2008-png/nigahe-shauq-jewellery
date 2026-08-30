import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Truck, RefreshCw, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { ReviewList } from '@/components/product/ReviewList';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button, LinkButton } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/ui/EmptyState';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart, setCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');

  if (!product) {
    return (
      <div className="container-lux py-20">
        <EmptyState
          title="Product not found"
          description="The piece you're looking for may have been moved or sold out."
          actionLabel="Back to Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const mayAlsoLike = products.filter((p) => p.id !== product.id && p.collection === product.collection).slice(0, 4);
  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product.id, quantity);
    showToast('Added to your bag.');
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product.id, quantity);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    showToast(inWishlist ? 'Removed from wishlist.' : 'Added to wishlist.');
  };

  const accordionItems = [
    { title: 'Product Details', content: `${product.description} Material: ${product.material}. Stone: ${product.stone === 'None' ? 'No stone' : product.stone}. Collection: ${product.collection}. Dimensions: ${product.dimensions}.` },
    { title: 'Specifications', content: product.specifications.map((s) => `${s.label}: ${s.value}`).join('. ') },
    { title: 'Care Instructions', content: product.careInstructions },
  ];

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` },
        { label: product.name },
      ]} />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {discount > 0 && <Badge variant="sale">-{discount}% Off</Badge>}
            {product.isNew && <Badge variant="new">New Arrival</Badge>}
            {product.isBestSeller && <Badge variant="bestseller">Bestseller</Badge>}
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-charcoal-400 mb-2">{product.collection} Collection</p>
          <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <button onClick={() => setActiveTab('reviews')} className="text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:underline">
              Read reviews
            </button>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            {product.salePrice ? (
              <>
                <span className="font-serif text-3xl text-charcoal-800 dark:text-ivory">{formatPrice(product.salePrice)}</span>
                <span className="text-lg text-charcoal-400 line-through">{formatPrice(product.price)}</span>
                <span className="text-sm text-rose-500">Save {formatPrice(product.price - product.salePrice)}</span>
              </>
            ) : (
              <span className="font-serif text-3xl text-charcoal-800 dark:text-ivory">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            {product.inStock ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-charcoal-600 dark:text-charcoal-300">In stock — {product.stockCount} available</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-rose-500">Currently sold out</span>
              </>
            )}
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-charcoal-100 dark:border-charcoal-700">
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Material</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{product.material}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Stone</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{product.stone === 'None' ? 'No stone' : product.stone}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Color</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{product.color}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Dimensions</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{product.dimensions}</p>
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-charcoal-200 dark:border-charcoal-600">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-charcoal-800 dark:text-ivory">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-3 text-charcoal-500 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleWishlist}
              className={`p-3.5 border transition-colors ${inWishlist ? 'border-rose-400 text-rose-500' : 'border-charcoal-200 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-300 hover:border-rose-400 hover:text-rose-500'}`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </Button>
            <Button onClick={handleBuyNow} disabled={!product.inStock} variant="secondary" className="flex-1" size="lg">
              Buy Now
            </Button>
          </div>

          {/* Shipping & Returns mini */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-champagne-500 mt-0.5 shrink-0" />
              <p className="text-charcoal-500 dark:text-charcoal-400"><span className="text-charcoal-700 dark:text-charcoal-200">Free shipping</span> on orders over $150. Standard delivery 3–5 business days.</p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-champagne-500 mt-0.5 shrink-0" />
              <p className="text-charcoal-500 dark:text-charcoal-400"><span className="text-charcoal-700 dark:text-charcoal-200">14-day returns</span>. Easy, no-questions-asked return policy on unworn pieces.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-8 border-b border-charcoal-100 dark:border-charcoal-700 mb-8">
          {([
            { key: 'details', label: 'Product Details' },
            { key: 'reviews', label: `Reviews (${product.reviewCount})` },
            { key: 'shipping', label: 'Shipping & Returns' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 text-sm uppercase tracking-wider transition-colors relative ${
                activeTab === tab.key
                  ? 'text-charcoal-800 dark:text-ivory'
                  : 'text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-px bg-champagne-400" />}
            </button>
          ))}
        </div>

        <div className="max-w-3xl">
          {activeTab === 'details' && (
            <div>
              <Accordion items={accordionItems} defaultOpen={0} />
            </div>
          )}
          {activeTab === 'reviews' && (
            <ReviewList reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-6 text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              <div>
                <h3 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-2">Shipping Information</h3>
                <p>We offer complimentary standard shipping on all orders over $150 within the United States. Orders are processed within 1–2 business days. Standard delivery takes 3–5 business days; express delivery takes 1–2 business days. International shipping rates are calculated at checkout.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-2">Return Information</h3>
                <p>We accept returns within 14 days of delivery for unworn pieces in their original packaging. To initiate a return, visit your account dashboard or contact our customer care team. Refunds are processed within 5–7 business days of receiving the returned item.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-2">Warranty</h3>
                <p>Every NIGAHE SHAUQ piece comes with a 6-month warranty against manufacturing defects. This does not cover normal wear, loss, or damage from misuse.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-charcoal-800 dark:text-ivory text-center mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* More from collection */}
      {mayAlsoLike.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-charcoal-800 dark:text-ivory text-center mb-10">More from {product.collection}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
            {mayAlsoLike.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

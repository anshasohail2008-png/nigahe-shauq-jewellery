import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, ChevronRight, LogOut } from 'lucide-react';
import { demoOrders, demoAddresses } from '@/data/demoData';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Form';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings';

const statusColors: Record<string, string> = {
  Processing: 'bg-champagne-100 text-champagne-700 dark:bg-champagne-800 dark:text-champagne-200',
  Shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Out for Delivery': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

export function AccountPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const { items: wishlistItems } = useWishlist();
  const wishlistProducts = wishlistItems.map((i) => products.find((p) => p.id === i.productId)).filter((p): p is NonNullable<typeof p> => !!p);

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-8">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <div className="bg-warmwhite dark:bg-charcoal-800 p-5 mb-4">
              <div className="w-14 h-14 rounded-full bg-champagne-200 dark:bg-champagne-700 flex items-center justify-center font-serif text-xl text-charcoal-700 dark:text-ivory mb-3">
                A
              </div>
              <p className="font-medium text-charcoal-800 dark:text-ivory">Aisha Khan</p>
              <p className="text-xs text-charcoal-400">aisha@example.com</p>
            </div>
            <nav className="space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                    tab === t.key
                      ? 'bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900'
                      : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-beige-50 dark:hover:bg-charcoal-800'
                  }`}
                >
                  <t.icon className="w-4 h-4" /> {t.label}
                  {t.key === 'wishlist' && wishlistProducts.length > 0 && (
                    <span className="ml-auto text-xs opacity-70">{wishlistProducts.length}</span>
                  )}
                </button>
              ))}
              <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-charcoal-500 hover:text-rose-500 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <div className="bg-warmwhite dark:bg-charcoal-800 p-6 lg:p-8">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Profile Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue="Aisha Khan" />
                <Input label="Email" defaultValue="aisha@example.com" />
                <Input label="Phone" defaultValue="+92 300 1234567" />
                <Input label="City" defaultValue="Karachi" />
              </div>
              <button className="mt-6 px-6 py-3 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {tab === 'orders' && (
            <div>
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Order History</h2>
              <div className="space-y-4">
                {demoOrders.map((order) => (
                  <div key={order.id} className="bg-warmwhite dark:bg-charcoal-800 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-charcoal-100 dark:border-charcoal-700">
                      <div>
                        <p className="font-serif text-charcoal-800 dark:text-ivory">{order.orderNumber}</p>
                        <p className="text-xs text-charcoal-400">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>{order.status}</span>
                        <Link to="/track-order" className="text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:underline flex items-center gap-1">
                          Track <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 shrink-0">
                          <img src={item.image} alt={item.name} className="w-12 h-16 object-cover" />
                          <div>
                            <p className="text-xs text-charcoal-800 dark:text-ivory line-clamp-1">{item.name}</p>
                            <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-charcoal-100 dark:border-charcoal-700 flex justify-between">
                      <span className="text-sm text-charcoal-500">Total</span>
                      <span className="font-serif text-charcoal-800 dark:text-ivory">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Saved Items</h2>
              {wishlistProducts.length === 0 ? (
                <div className="bg-warmwhite dark:bg-charcoal-800 p-12 text-center">
                  <Heart className="w-10 h-10 text-charcoal-300 dark:text-charcoal-600 mx-auto mb-3" />
                  <p className="text-charcoal-500 mb-4">No saved items yet.</p>
                  <Link to="/shop" className="text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:underline">Browse Shop</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <Link key={p.id} to={`/product/${p.slug}`} className="flex gap-4 bg-warmwhite dark:bg-charcoal-800 p-4 hover:shadow-sm transition-shadow">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover" />
                      <div>
                        <p className="font-serif text-sm text-charcoal-800 dark:text-ivory">{p.name}</p>
                        <p className="text-xs text-charcoal-400">{formatPrice(p.salePrice ?? p.price)}</p>
                        {!p.inStock && <Badge variant="out" className="mt-1">Sold Out</Badge>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div>
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Saved Addresses</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {demoAddresses.map((addr) => (
                  <div key={addr.id} className="bg-warmwhite dark:bg-charcoal-800 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-charcoal-800 dark:text-ivory">{addr.label}</p>
                      {addr.isDefault && <Badge variant="default">Default</Badge>}
                    </div>
                    <p className="text-sm text-charcoal-800 dark:text-ivory">{addr.fullName}</p>
                    <p className="text-sm text-charcoal-500">{addr.street}</p>
                    <p className="text-sm text-charcoal-500">{addr.city} {addr.postalCode}</p>
                    <p className="text-sm text-charcoal-500 mt-1">{addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="bg-warmwhite dark:bg-charcoal-800 p-6 lg:p-8">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Settings</h2>
              <div className="space-y-5">
                {[
                  { label: 'Email notifications', desc: 'Receive updates about new arrivals and sales' },
                  { label: 'SMS notifications', desc: 'Order updates via text message' },
                  { label: 'Marketing emails', desc: 'Promotional content and newsletters' },
                ].map((s) => (
                  <label key={s.label} className="flex items-center justify-between py-3 border-b border-charcoal-100 dark:border-charcoal-700">
                    <div>
                      <p className="text-sm font-medium text-charcoal-800 dark:text-ivory">{s.label}</p>
                      <p className="text-xs text-charcoal-400">{s.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-10 h-6 accent-champagne-500" />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

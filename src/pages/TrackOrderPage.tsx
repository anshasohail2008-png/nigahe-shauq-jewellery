import { useState } from 'react';
import { Check, Package, Truck, Home, Clock, Search } from 'lucide-react';
import { demoOrders } from '@/data/demoData';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';

const timelineIcons = [Check, Clock, Package, Truck, Home];

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState(demoOrders[1]); // Default to the "Shipped" order

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = demoOrders.find((o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());
    setFoundOrder(found || null);
    setSearched(true);
  };

  const order = searched ? foundOrder : demoOrders[1];

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Track Order' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-8">Track Your Order</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mb-12">
        <Input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Enter order number (e.g. NS-2026-00531)"
          className="flex-1"
        />
        <Button type="submit"><Search className="w-4 h-4" /> Track</Button>
      </form>

      {searched && !order && (
        <div className="text-center py-12">
          <p className="text-charcoal-500 mb-2">No order found with that number.</p>
          <p className="text-xs text-charcoal-400">Try NS-2026-00482, NS-2026-00531, or NS-2026-00548</p>
        </div>
      )}

      {order && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-warmwhite dark:bg-charcoal-800 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-charcoal-100 dark:border-charcoal-700">
                <div>
                  <p className="font-serif text-lg text-charcoal-800 dark:text-ivory">{order.orderNumber}</p>
                  <p className="text-xs text-charcoal-400">Placed on {order.date}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-champagne-100 text-champagne-700 dark:bg-champagne-800 dark:text-champagne-200">{order.status}</span>
              </div>

              {/* Timeline */}
              <div className="relative">
                {order.timeline.map((step, i) => {
                  const Icon = timelineIcons[i];
                  const isLast = i === order.timeline.length - 1;
                  return (
                    <div key={i} className="flex gap-4 pb-8 relative">
                      {!isLast && (
                        <div className={`absolute left-5 top-12 bottom-0 w-px ${step.done ? 'bg-champagne-400' : 'bg-charcoal-200 dark:bg-charcoal-700'}`} />
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? 'bg-champagne-400 text-charcoal-900' : 'bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="pt-2">
                        <p className={`font-medium ${step.done ? 'text-charcoal-800 dark:text-ivory' : 'text-charcoal-400'}`}>{step.label}</p>
                        {step.date && <p className="text-xs text-charcoal-400 mt-0.5">{step.date}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-charcoal-100 dark:border-charcoal-700">
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                  <span className="text-charcoal-800 dark:text-ivory font-medium">Estimated delivery:</span> {order.estimatedDelivery}
                </p>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
                  <span className="text-charcoal-800 dark:text-ivory font-medium">Shipping method:</span> {order.shippingMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Order items */}
          <div className="lg:col-span-1">
            <div className="bg-warmwhite dark:bg-charcoal-800 p-6">
              <h3 className="font-serif text-lg text-charcoal-800 dark:text-ivory mb-4">Items in this order</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover" />
                    <div className="flex-1">
                      <p className="text-xs text-charcoal-800 dark:text-ivory line-clamp-2">{item.name}</p>
                      <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-charcoal-100 dark:border-charcoal-700">
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Payment: {order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button, LinkButton } from '@/components/ui/Button';

export function OrderConfirmationPage() {
  const orderStr = localStorage.getItem('ns-last-order');
  const order = orderStr ? JSON.parse(orderStr) : null;

  if (!order) {
    return (
      <div className="container-lux py-20 text-center">
        <h1 className="font-serif text-2xl text-charcoal-800 dark:text-ivory mb-4">No order found</h1>
        <p className="text-charcoal-500 mb-8">It looks like you haven't placed an order yet.</p>
        <LinkButton to="/shop" variant="primary">Start Shopping</LinkButton>
      </div>
    );
  }

  return (
    <div className="container-lux py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-full">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mb-3">Thank You for Your Order!</h1>
        <p className="text-charcoal-500 dark:text-charcoal-400 mb-2">A confirmation has been sent to {order.customer.email}.</p>
        <p className="font-serif text-xl text-champagne-500 dark:text-champagne-300 mb-10">{order.orderNumber}</p>

        {/* Summary card */}
        <div className="bg-warmwhite dark:bg-charcoal-800 p-8 text-left mb-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-charcoal-100 dark:border-charcoal-700">
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Customer</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{order.customer.fullName}</p>
              <p className="text-sm text-charcoal-500">{order.customer.email}</p>
              <p className="text-sm text-charcoal-500">{order.customer.address}, {order.customer.city}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Delivery</p>
              <p className="text-sm text-charcoal-800 dark:text-ivory">{order.shippingMethod}</p>
              <p className="text-sm text-charcoal-500">Est. {order.estimatedDelivery}</p>
              <p className="text-sm text-charcoal-500 mt-1">{order.paymentMethod}</p>
            </div>
          </div>

          <h3 className="text-xs uppercase tracking-wider text-charcoal-400 mb-4">Items</h3>
          <div className="space-y-3 mb-6">
            {order.items.map((item: any) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-16 object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-charcoal-800 dark:text-ivory">{item.name}</p>
                  <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
                </div>
                <p className="text-sm text-charcoal-800 dark:text-ivory">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-charcoal-100 dark:border-charcoal-700 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
              <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
              <span>Shipping</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between font-serif text-lg text-charcoal-800 dark:text-ivory pt-2">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton to="/shop" variant="primary">Continue Shopping</LinkButton>
          <LinkButton to="/track-order" variant="outline">
            <Package className="w-4 h-4" /> Track Order <ArrowRight className="w-4 h-4" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

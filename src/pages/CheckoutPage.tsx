import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, Wallet, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import { Input } from '@/components/ui/Form';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';

const steps = ['Information', 'Shipping', 'Payment', 'Review'] as const;
type Step = typeof steps[number];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>('Information');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', postalCode: '',
  });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="container-lux py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <EmptyState
          icon={<ShoppingBag className="w-16 h-16" />}
          title="Your bag is empty"
          description="Add items to your bag before proceeding to checkout."
          actionLabel="Browse Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  const stepIndex = steps.indexOf(step);

  const validateInfo = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.postalCode.trim()) e.postalCode = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 'Information' && !validateInfo()) return;
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) setStep(steps[nextIndex]);
  };

  const handleBack = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) setStep(steps[prevIndex]);
  };

  const handlePlaceOrder = () => {
    const orderNumber = generateOrderNumber();
    const order = {
      orderNumber,
      customer: form,
      items: items.map((item) => {
        const p = products.find((x) => x.id === item.productId);
        return { productId: item.productId, name: p?.name || '', price: p?.salePrice ?? p?.price ?? 0, quantity: item.quantity, image: p?.images[0] || '' };
      }),
      subtotal,
      shipping: shippingMethod === 'express' ? 15 : shipping,
      total: subtotal + (shippingMethod === 'express' ? 15 : shipping),
      shippingMethod: shippingMethod === 'express' ? 'Express Delivery' : 'Standard Delivery',
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment',
      estimatedDelivery: new Date(Date.now() + (shippingMethod === 'express' ? 2 : 5) * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      date: new Date().toISOString(),
      status: 'Processing' as const,
    };
    localStorage.setItem('ns-last-order', JSON.stringify(order));
    const existing = JSON.parse(localStorage.getItem('ns-orders') || '[]');
    existing.unshift({ ...order, id: `o${Date.now()}`, timeline: [
      { label: 'Order Confirmed', date: new Date().toLocaleDateString('en-US'), done: true },
      { label: 'Processing', date: new Date().toLocaleDateString('en-US'), done: true },
      { label: 'Shipped', date: '', done: false },
      { label: 'Out for Delivery', date: '', done: false },
      { label: 'Delivered', date: '', done: false },
    ] });
    localStorage.setItem('ns-orders', JSON.stringify(existing));
    clearCart();
    showToast('Order placed successfully!');
    navigate('/order-confirmation');
  };

  const shippingCost = shippingMethod === 'express' ? 15 : shipping;
  const finalTotal = subtotal + shippingCost;

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-hide">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 ${i <= stepIndex ? 'text-charcoal-800 dark:text-ivory' : 'text-charcoal-300 dark:text-charcoal-600'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${i < stepIndex ? 'bg-champagne-300 text-charcoal-900 border-champagne-300' : i === stepIndex ? 'border-charcoal-800 dark:border-ivory' : 'border-charcoal-200 dark:border-charcoal-600'}`}>
                {i < stepIndex ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="text-xs uppercase tracking-wider hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-charcoal-300 dark:text-charcoal-600" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Information */}
          {step === 'Information' && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory">Customer Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} error={errors.fullName} placeholder="Aisha Khan" />
                <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="aisha@example.com" />
                <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="+92 300 1234567" />
                <Input label="Postal Code" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} error={errors.postalCode} placeholder="75500" />
              </div>
              <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} error={errors.address} placeholder="12 Rosewood Lane" />
              <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city} placeholder="Karachi" />
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 'Shipping' && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory">Shipping Method</h2>
              {[
                { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', cost: shipping, icon: Truck },
                { id: 'express', label: 'Express Delivery', desc: '1–2 business days', cost: 15, icon: Truck },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-5 border cursor-pointer transition-colors ${shippingMethod === opt.id ? 'border-champagne-400 bg-champagne-50 dark:bg-charcoal-800' : 'border-charcoal-200 dark:border-charcoal-600 hover:border-charcoal-300'}`}
                >
                  <input type="radio" name="shipping" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id as 'standard' | 'express')} className="sr-only" />
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === opt.id ? 'border-champagne-400' : 'border-charcoal-300 dark:border-charcoal-600'}`}>
                    {shippingMethod === opt.id && <span className="w-2.5 h-2.5 rounded-full bg-champagne-400" />}
                  </span>
                  <opt.icon className="w-5 h-5 text-charcoal-500" />
                  <div className="flex-1">
                    <p className="font-medium text-charcoal-800 dark:text-ivory">{opt.label}</p>
                    <p className="text-sm text-charcoal-400">{opt.desc}</p>
                  </div>
                  <span className="font-serif text-charcoal-800 dark:text-ivory">{opt.cost === 0 ? 'Free' : formatPrice(opt.cost)}</span>
                </label>
              ))}
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 'Payment' && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory">Payment Method</h2>
              <p className="text-xs text-charcoal-400 italic">This is a prototype. No real card details are collected or stored.</p>
              {[
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Wallet },
                { id: 'card', label: 'Card Payment', desc: 'Credit / Debit card (demo only)', icon: CreditCard },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-5 border cursor-pointer transition-colors ${paymentMethod === opt.id ? 'border-champagne-400 bg-champagne-50 dark:bg-charcoal-800' : 'border-charcoal-200 dark:border-charcoal-600 hover:border-charcoal-300'}`}
                >
                  <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id as 'cod' | 'card')} className="sr-only" />
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === opt.id ? 'border-champagne-400' : 'border-charcoal-300 dark:border-charcoal-600'}`}>
                    {paymentMethod === opt.id && <span className="w-2.5 h-2.5 rounded-full bg-champagne-400" />}
                  </span>
                  <opt.icon className="w-5 h-5 text-charcoal-500" />
                  <div className="flex-1">
                    <p className="font-medium text-charcoal-800 dark:text-ivory">{opt.label}</p>
                    <p className="text-sm text-charcoal-400">{opt.desc}</p>
                  </div>
                </label>
              ))}
              {paymentMethod === 'card' && (
                <div className="ml-8 space-y-4 pt-4 border-t border-charcoal-100 dark:border-charcoal-700">
                  <Input label="Name on Card" value={cardForm.name} onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })} placeholder="Aisha Khan" />
                  <Input label="Card Number" value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} placeholder="•••• •••• •••• ••••" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry" value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} placeholder="MM/YY" />
                    <Input label="CVC" value={cardForm.cvc} onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })} placeholder="•••" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 'Review' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory">Review Your Order</h2>
              <div className="border border-charcoal-100 dark:border-charcoal-700 p-5">
                <h3 className="text-xs uppercase tracking-wider text-charcoal-400 mb-3">Customer</h3>
                <p className="text-sm text-charcoal-800 dark:text-ivory">{form.fullName}</p>
                <p className="text-sm text-charcoal-500">{form.email} · {form.phone}</p>
                <p className="text-sm text-charcoal-500">{form.address}, {form.city} {form.postalCode}</p>
              </div>
              <div className="border border-charcoal-100 dark:border-charcoal-700 p-5">
                <h3 className="text-xs uppercase tracking-wider text-charcoal-400 mb-3">Shipping</h3>
                <p className="text-sm text-charcoal-800 dark:text-ivory">{shippingMethod === 'express' ? 'Express Delivery (1–2 days)' : 'Standard Delivery (3–5 days)'}</p>
              </div>
              <div className="border border-charcoal-100 dark:border-charcoal-700 p-5">
                <h3 className="text-xs uppercase tracking-wider text-charcoal-400 mb-3">Payment</h3>
                <p className="text-sm text-charcoal-800 dark:text-ivory">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment (demo)'}</p>
              </div>
              <div className="border border-charcoal-100 dark:border-charcoal-700 p-5">
                <h3 className="text-xs uppercase tracking-wider text-charcoal-400 mb-3">Items</h3>
                <div className="space-y-3">
                  {items.map((item) => {
                    const p = products.find((x) => x.id === item.productId);
                    if (!p) return null;
                    const price = p.salePrice ?? p.price;
                    return (
                      <div key={item.productId} className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-16 object-cover" />
                        <div className="flex-1">
                          <p className="text-sm text-charcoal-800 dark:text-ivory">{p.name}</p>
                          <p className="text-xs text-charcoal-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm text-charcoal-800 dark:text-ivory">{formatPrice(price * item.quantity)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-8">
            {stepIndex > 0 ? (
              <button onClick={handleBack} className="text-sm uppercase tracking-wider text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                Back
              </button>
            ) : <span />}
            {stepIndex < steps.length - 1 ? (
              <button onClick={handleNext} className="px-8 py-3 text-sm uppercase tracking-wider bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors">
                Continue
              </button>
            ) : (
              <button onClick={handlePlaceOrder} className="px-8 py-3 text-sm uppercase tracking-wider bg-champagne-400 text-charcoal-900 hover:bg-champagne-300 transition-colors">
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-warmwhite dark:bg-charcoal-800 p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-lg text-charcoal-800 dark:text-ivory mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                const price = p.salePrice ?? p.price;
                return (
                  <div key={item.productId} className="flex gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-16 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-charcoal-800 dark:text-ivory line-clamp-1">{p.name}</p>
                      <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
                    </div>
                    <p className="text-xs text-charcoal-800 dark:text-ivory whitespace-nowrap">{formatPrice(price * item.quantity)}</p>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-charcoal-200 dark:border-charcoal-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal-500 dark:text-charcoal-400">
                <span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-serif text-lg text-charcoal-800 dark:text-ivory pt-2 border-t border-charcoal-200 dark:border-charcoal-700">
                <span>Total</span><span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

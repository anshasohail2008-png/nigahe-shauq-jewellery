import type { Order, Address } from '@/types';

export const demoAddresses: Address[] = [
  { id: 'a1', label: 'Home', fullName: 'Aisha Khan', street: '12 Rosewood Lane', city: 'Karachi', postalCode: '75500', phone: '+92 300 1234567', isDefault: true },
  { id: 'a2', label: 'Office', fullName: 'Aisha Khan', street: 'Floor 7, Clifton Tower', city: 'Karachi', postalCode: '75600', phone: '+92 300 1234567' },
];

export const demoOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'NS-2026-00482',
    date: '2026-08-01',
    status: 'Delivered',
    items: [
      { productId: 'p001', name: 'Aurora Solitaire Ring', price: 142, quantity: 1, image: 'https://images.pexels.com/photos/2732096/pexels-photo-2732096.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { productId: 'p007', name: 'Aurora Drop Earrings', price: 119, quantity: 1, image: 'https://images.pexels.com/photos/5370644/pexels-photo-5370644.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
    subtotal: 261, shipping: 0, discount: 20, total: 241,
    shippingMethod: 'Express Delivery',
    paymentMethod: 'Card Payment',
    estimatedDelivery: '2026-08-04',
    customer: { name: 'Aisha Khan', email: 'aisha@example.com', phone: '+92 300 1234567', address: '12 Rosewood Lane', city: 'Karachi', postalCode: '75500' },
    timeline: [
      { label: 'Order Confirmed', date: '2026-08-01', done: true },
      { label: 'Processing', date: '2026-08-01', done: true },
      { label: 'Shipped', date: '2026-08-02', done: true },
      { label: 'Out for Delivery', date: '2026-08-04', done: true },
      { label: 'Delivered', date: '2026-08-04', done: true },
    ],
  },
  {
    id: 'o2',
    orderNumber: 'NS-2026-00531',
    date: '2026-08-08',
    status: 'Shipped',
    items: [
      { productId: 'p013', name: 'Aurora Pendant Necklace', price: 169, quantity: 1, image: 'https://images.pexels.com/photos/4889719/pexels-photo-4889719.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
    subtotal: 169, shipping: 5, discount: 0, total: 174,
    shippingMethod: 'Standard Delivery',
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: '2026-08-14',
    customer: { name: 'Aisha Khan', email: 'aisha@example.com', phone: '+92 300 1234567', address: '12 Rosewood Lane', city: 'Karachi', postalCode: '75500' },
    timeline: [
      { label: 'Order Confirmed', date: '2026-08-08', done: true },
      { label: 'Processing', date: '2026-08-08', done: true },
      { label: 'Shipped', date: '2026-08-10', done: true },
      { label: 'Out for Delivery', date: '', done: false },
      { label: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'o3',
    orderNumber: 'NS-2026-00548',
    date: '2026-08-11',
    status: 'Processing',
    items: [
      { productId: 'p019', name: 'Aurora Tennis Bracelet', price: 179, quantity: 2, image: 'https://images.pexels.com/photos/34399144/pexels-photo-34399144.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
    subtotal: 358, shipping: 0, discount: 35, total: 323,
    shippingMethod: 'Express Delivery',
    paymentMethod: 'Card Payment',
    estimatedDelivery: '2026-08-15',
    customer: { name: 'Aisha Khan', email: 'aisha@example.com', phone: '+92 300 1234567', address: '12 Rosewood Lane', city: 'Karachi', postalCode: '75500' },
    timeline: [
      { label: 'Order Confirmed', date: '2026-08-11', done: true },
      { label: 'Processing', date: '2026-08-11', done: true },
      { label: 'Shipped', date: '', done: false },
      { label: 'Out for Delivery', date: '', done: false },
      { label: 'Delivered', date: '', done: false },
    ],
  },
];

export const demoReviews = [
  { name: 'Ayesha M.', rating: 5, date: 'July 2026', title: 'Felt like a heirloom', body: 'The Aurora pendant I ordered exceeded every expectation. The packaging felt like opening a gift, and the piece itself has a weight and warmth that photographs simply cannot capture. I have already recommended NIGAHE SHAUQ to my sisters.' },
  { name: 'Rabia S.', rating: 5, date: 'June 2026', title: 'My wedding day set', body: 'I wore the Mehfil Bridal Set on my wedding day. The kundan work was flawless and it photographed beautifully. It felt like a piece that had been in my family for generations.' },
  { name: 'Nadia K.', rating: 4, date: 'June 2026', title: 'Everyday favourite', body: 'The Everyday Twist Ring has become my go-to. I wear it to work and it still looks as polished as the day it arrived. Took off one star only because I wish there were more sizes.' },
  { name: 'Sana T.', rating: 5, date: 'May 2026', title: 'A gift that moved her to tears', body: 'I gifted the Zarina Signet Ring to my mother for her birthday. She was speechless. The ruby is deep and rich and the gold has a lovely warm tone. Beautiful craftsmanship.' },
];

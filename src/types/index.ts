export type Category =
  | 'Rings'
  | 'Earrings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Bangles'
  | 'Charms'
  | 'Jewellery Sets';

export type Material = 'Gold' | 'Silver' | 'Platinum' | 'Rose Gold' | 'Brass';
export type Stone = 'Diamond' | 'Pearl' | 'Emerald' | 'Ruby' | 'Sapphire' | 'Kundan' | 'None';
export type Collection = 'Heritage' | 'Aurora' | 'Mehfil' | 'Noor' | 'Zarina' | 'Everyday Luxe';

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: Category;
  material: Material;
  stone: Stone;
  color: string;
  collection: Collection;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  images: string[];
  description: string;
  specifications: { label: string; value: string }[];
  dimensions: string;
  careInstructions: string;
  inStock: boolean;
  stockCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
  estimatedDelivery: string;
  customer: { name: string; email: string; phone: string; address: string; city: string; postalCode: string };
  timeline: { label: string; date: string; done: boolean }[];
}

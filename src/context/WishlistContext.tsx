import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { WishlistItem } from '@/types';

interface WishlistContextValue {
  items: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = 'ns-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((productId: string) => {
    setItems((prev) => (prev.find((x) => x.productId === productId) ? prev : [...prev, { productId, addedAt: new Date().toISOString() }]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((prev) => (prev.find((x) => x.productId === productId) ? prev.filter((x) => x.productId !== productId) : [...prev, { productId, addedAt: new Date().toISOString() }]));
  }, []);

  const isInWishlist = useCallback((productId: string) => items.some((x) => x.productId === productId), [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}

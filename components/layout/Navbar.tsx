import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X, Moon, Sun } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { Logo } from './Logo';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'New Arrivals', to: '/shop?filter=new' },
  { label: 'Best Sellers', to: '/shop?filter=bestseller' },
  { label: 'Collections', to: '/collections' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-charcoal-800 dark:bg-charcoal-700 text-ivory text-center py-2 text-[11px] tracking-wider uppercase">
        Complimentary shipping on orders over $150 — Stay in the Glow
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-sm'
          : 'bg-ivory dark:bg-charcoal-900'
      }`}>
        <nav className="container-lux">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2 text-charcoal-700 dark:text-charcoal-200"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Logo className="lg:flex-1" />

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = link.to === location.pathname ||
                  (link.to.includes('?') && location.pathname + location.search === link.to);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`text-xs uppercase tracking-wider transition-colors link-underline ${
                      isActive
                        ? 'text-champagne-500 dark:text-champagne-300'
                        : 'text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <Link
                to="/account"
                className="p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/wishlist"
                className="relative p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-rose-500 text-white rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-champagne-400 text-charcoal-900 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="border-t border-charcoal-100 dark:border-charcoal-800 py-4 animate-fade-in">
              <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-2xl mx-auto">
                <Search className="w-5 h-5 text-charcoal-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, category, material, or collection..."
                  autoFocus
                  className="flex-1 bg-transparent text-charcoal-800 dark:text-ivory placeholder:text-charcoal-400 focus:outline-none text-sm"
                />
                <button type="submit" className="text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
                  Search
                </button>
              </form>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-ivory dark:bg-charcoal-800 shadow-xl animate-slide-in overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-100 dark:border-charcoal-700">
              <Logo onClick={() => setMobileOpen(false)} />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-charcoal-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="py-3 px-3 text-sm uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200 hover:bg-beige-50 dark:hover:bg-charcoal-700 rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-charcoal-100 dark:border-charcoal-700 mt-3 pt-3 flex flex-col gap-1">
                <Link to="/account" className="py-3 px-3 text-sm uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200 hover:bg-beige-50 dark:hover:bg-charcoal-700 rounded transition-colors">
                  My Account
                </Link>
                <Link to="/wishlist" className="py-3 px-3 text-sm uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200 hover:bg-beige-50 dark:hover:bg-charcoal-700 rounded transition-colors">
                  Wishlist ({wishlistCount})
                </Link>
                <Link to="/faq" className="py-3 px-3 text-sm uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200 hover:bg-beige-50 dark:hover:bg-charcoal-700 rounded transition-colors">
                  FAQ
                </Link>
                <Link to="/track-order" className="py-3 px-3 text-sm uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200 hover:bg-beige-50 dark:hover:bg-charcoal-700 rounded transition-colors">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

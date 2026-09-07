import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useToast } from '@/context/ToastContext';

const quickLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
];

const customerCare = [
  { label: 'Shipping', to: '/shipping-policy' },
  { label: 'Returns', to: '/return-policy' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'FAQ', to: '/faq' },
];

const legal = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Refund Policy', to: '/return-policy' },
];

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Welcome to the inner circle. Check your inbox.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-800 dark:bg-charcoal-900 text-charcoal-200 mt-20">
      {/* Newsletter */}
      <div className="border-b border-charcoal-700">
        <div className="container-lux py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-3xl text-ivory mb-3">Stay in the Glow</h3>
            <p className="text-charcoal-300 mb-8">Be the first to know about new collections, private sales, and jewellery stories.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-charcoal-700 border border-charcoal-600 pl-11 pr-4 py-3 text-sm text-ivory placeholder:text-charcoal-400 focus:outline-none focus:border-champagne-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-champagne-300 text-charcoal-900 text-sm font-medium uppercase tracking-wider hover:bg-champagne-200 transition-colors"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-lux py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Logo className="mb-5" />
            <p className="text-sm text-charcoal-300 leading-relaxed max-w-xs">
              Thoughtfully designed jewellery created to add a little more brilliance to every moment. Jewels that speak without words.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 flex items-center justify-center border border-charcoal-600 text-charcoal-300 hover:border-champagne-400 hover:text-champagne-300 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-ivory mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-charcoal-300 hover:text-champagne-300 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-ivory mb-5">Customer Care</h4>
            <ul className="space-y-3">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-charcoal-300 hover:text-champagne-300 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-ivory mb-5">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-charcoal-300 hover:text-champagne-300 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-700">
        <div className="container-lux py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-400">© 2026 NIGAHE SHAUQ. All rights reserved.</p>
          <p className="text-xs text-charcoal-400">Crafted with care for those who appreciate fine details.</p>
        </div>
      </div>
    </footer>
  );
}

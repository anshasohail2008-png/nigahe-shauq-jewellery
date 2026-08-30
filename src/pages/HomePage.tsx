import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Gem, ShieldCheck, Star, Quote, Instagram } from 'lucide-react';
import type { Product } from '@/types';
import { products, categories, heroImage, storyImage, storyImage2, socialGallery } from '@/data/products';
import { demoReviews } from '@/data/demoData';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickView } from '@/components/product/QuickView';
import { SectionHeading } from '@/components/ui/Breadcrumbs';
import { LinkButton } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';

export function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="NIGAHE SHAUQ fine jewellery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 via-charcoal-900/30 to-transparent" />
        </div>
        <div className="relative h-full container-lux flex items-center">
          <div className="max-w-xl animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-champagne-300 mb-5">NIGAHE SHAUQ</p>
            <h1 className="font-serif text-display text-ivory text-balance mb-5">
              Timeless Elegance,<br />Made to Be Remembered.
            </h1>
            <p className="text-lg text-ivory/80 mb-8 max-w-md leading-relaxed">
              Discover thoughtfully designed jewellery created to add a little more brilliance to every moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton to="/shop" variant="primary" size="lg">Shop Now <ArrowRight className="w-4 h-4" /></LinkButton>
              <LinkButton to="/collections" variant="outline" size="lg" className="border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory">
                Explore Collection
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-lux py-20">
        <SectionHeading title="Shop by Category" subtitle="Find the perfect piece for every occasion, from everyday essentials to bridal sets." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className={`group relative overflow-hidden bg-beige-50 dark:bg-charcoal-800 ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl text-ivory mb-1">{cat.name}</h3>
                <p className="text-xs text-ivory/70 hidden sm:block">{cat.description}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-xs uppercase tracking-wider text-champagne-300 group-hover:gap-2 transition-all">
                  Shop <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-warmwhite dark:bg-charcoal-800/50 py-20">
        <div className="container-lux">
          <SectionHeading title="New Arrivals" subtitle="The latest additions to our collections, freshly crafted and ready to be worn." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
          <div className="text-center mt-12">
            <LinkButton to="/shop?filter=new" variant="outline">View All New Arrivals</LinkButton>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container-lux py-20">
        <SectionHeading title="Best Sellers" subtitle="Loved by our community, these are the pieces that keep finding homes." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
        <div className="text-center mt-12">
          <LinkButton to="/shop?filter=bestseller" variant="outline">Shop Best Sellers</LinkButton>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-charcoal-800 dark:bg-charcoal-900 text-ivory py-20">
        <div className="container-lux grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={storyImage} alt="Craftsmanship" className="w-full aspect-[3/4] object-cover" loading="lazy" />
            <img src={storyImage2} alt="Wearing NIGAHE SHAUQ" className="w-full aspect-[3/4] object-cover mt-8" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-champagne-300 mb-4">Our Story</p>
            <h2 className="font-serif text-headline mb-6">Jewels That Speak Without Words</h2>
            <p className="text-ivory/70 leading-relaxed mb-4">
              NIGAHE SHAUQ was born from a simple belief: that jewellery should carry meaning. Each piece is designed to be more than an accessory — it is a quiet statement, a memory made wearable, a gift that says what words cannot.
            </p>
            <p className="text-ivory/70 leading-relaxed mb-8">
              Drawing from subtle South Asian artistry and modern minimalism, we create pieces that feel both rooted and contemporary. Every design is crafted with intention, finished by hand, and made to be lived in.
            </p>
            <LinkButton to="/about" variant="secondary">Read Our Story</LinkButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-lux py-20">
        <SectionHeading title="Why Choose Us" subtitle="The NIGAHE SHAUQ promise, in every piece we create." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Gem, title: 'Premium Quality', desc: 'Hand-finished pieces crafted from quality materials, built to last.' },
            { icon: Star, title: 'Thoughtful Designs', desc: 'Every piece is designed with intention, blending heritage with modernity.' },
            { icon: ShieldCheck, title: 'Secure Packaging', desc: 'Each order arrives in elegant, protective packaging worthy of gifting.' },
            { icon: RefreshCw, title: 'Easy Returns', desc: 'Changed your mind? Return within 14 days for a full refund.' },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-8 border border-charcoal-100 dark:border-charcoal-700 hover:border-champagne-300 dark:hover:border-champagne-600 transition-colors group">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-beige-50 dark:bg-charcoal-800 group-hover:bg-champagne-100 dark:group-hover:bg-charcoal-700 transition-colors">
                <feature.icon className="w-6 h-6 text-champagne-500" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-800 dark:text-ivory mb-2">{feature.title}</h3>
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-warmwhite dark:bg-charcoal-800/50 py-20">
        <div className="container-lux">
          <SectionHeading title="Kind Words" subtitle="Demo reviews shown for illustration — not from verified customers." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoReviews.map((review, i) => (
              <div key={i} className="bg-ivory dark:bg-charcoal-800 p-8 border border-charcoal-100 dark:border-charcoal-700">
                <Quote className="w-8 h-8 text-champagne-300 mb-4" />
                <Rating rating={review.rating} showCount={false} />
                <p className="mt-4 font-serif text-lg text-charcoal-800 dark:text-ivory">{review.title}</p>
                <p className="mt-2 text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{review.body}</p>
                <div className="mt-6 pt-4 border-t border-charcoal-100 dark:border-charcoal-700">
                  <p className="text-sm font-medium text-charcoal-800 dark:text-ivory">{review.name}</p>
                  <p className="text-xs text-charcoal-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Gallery */}
      <section className="container-lux py-20">
        <SectionHeading title="@nigaheshauq" subtitle="Tag us in your moments for a chance to be featured." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {socialGallery.map((img, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="group relative aspect-square overflow-hidden">
              <img src={img} alt={`Social post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors flex items-center justify-center">
                <Instagram className="w-6 h-6 text-ivory opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

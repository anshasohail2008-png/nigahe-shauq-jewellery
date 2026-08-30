import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, heroImage, storyImage, storyImage2 } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LinkButton } from '@/components/ui/Button';

const collections = [
  { name: 'Heritage', description: 'Timeless pieces inspired by South Asian jewellery traditions, reimagined for the modern wearer.', image: storyImage2 },
  { name: 'Aurora', description: 'Light-catching designs with brilliant stones, made for moments that deserve to sparkle.', image: heroImage },
  { name: 'Mehfil', description: 'Statement pieces for celebrations — bold, ornate, and unapologetically glamorous.', image: storyImage },
  { name: 'Noor', description: 'Everyday elegance with a soft touch. Pieces that feel like a quiet glow.', image: storyImage2 },
  { name: 'Zarina', description: 'Rose gold and warm tones for a feminine, contemporary look.', image: heroImage },
  { name: 'Everyday Luxe', description: 'Minimal, versatile pieces designed to be worn and loved every single day.', image: storyImage },
];

export function CollectionsPage() {
  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collections' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-3">Our Collections</h1>
      <p className="text-charcoal-500 dark:text-charcoal-400 max-w-xl mb-12">Each NIGAHE SHAUQ collection tells its own story. Explore the moods, moments, and materials that define them.</p>

      <div className="space-y-16">
        {collections.map((col, i) => {
          const count = products.filter((p) => p.collection === col.name).length;
          const isReversed = i % 2 === 1;
          return (
            <div key={col.name} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'md:[direction:rtl]' : ''}`}>
              <div className={`relative aspect-[4/3] overflow-hidden [direction:ltr]`}>
                <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
              </div>
              <div className="[direction:ltr]">
                <p className="text-xs uppercase tracking-[0.2em] text-champagne-500 dark:text-champagne-300 mb-3">Collection {String(i + 1).padStart(2, '0')}</p>
                <h2 className="font-serif text-headline text-charcoal-800 dark:text-ivory mb-4">{col.name}</h2>
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-6">{col.description}</p>
                <p className="text-sm text-charcoal-400 mb-6">{count} {count === 1 ? 'piece' : 'pieces'} in this collection</p>
                <LinkButton to={`/shop?collection=${encodeURIComponent(col.name)}`} variant="outline">
                  Explore {col.name} <ArrowRight className="w-4 h-4" />
                </LinkButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

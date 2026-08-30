import { Link } from 'react-router-dom';
import { Gem, Heart, Sparkles, Award, ArrowRight } from 'lucide-react';
import { storyImage, storyImage2, heroImage } from '@/data/products';
import { LinkButton } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/Breadcrumbs';

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={heroImage} alt="NIGAHE SHAUQ" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/60" />
        <div className="relative h-full container-lux flex items-center justify-center text-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-champagne-300 mb-4">Our Story</p>
            <h1 className="font-serif text-display text-ivory mb-4">NIGAHE SHAUQ</h1>
            <p className="text-ivory/80 max-w-xl mx-auto">Jewels that speak without words.</p>
          </div>
        </div>
      </section>

      <div className="container-lux py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </div>

      {/* Brand story */}
      <section className="container-lux py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-champagne-500 dark:text-champagne-300 mb-4">The Beginning</p>
            <h2 className="font-serif text-headline text-charcoal-800 dark:text-ivory mb-6">A Love Letter to Fine Jewellery</h2>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              NIGAHE SHAUQ — "the gaze of desire" — was born from a fascination with the quiet power of jewellery. A single piece can hold a memory, mark a milestone, or say what words cannot. We set out to create a brand that honours that power.
            </p>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              Founded in 2026, our journey began with a simple question: what if every piece of jewellery felt like it was made just for you? Not mass-produced, not generic — but thoughtfully designed, carefully crafted, and built to be lived in.
            </p>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Today, we offer a curated collection that blends subtle South Asian artistry with modern minimalism, each piece designed to be as meaningful as it is beautiful.
            </p>
          </div>
          <div>
            <img src={storyImage} alt="Craftsmanship at NIGAHE SHAUQ" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warmwhite dark:bg-charcoal-800/50 py-20">
        <div className="container-lux">
          <SectionHeading title="Our Philosophy" subtitle="The principles that guide every piece we create." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gem, title: 'Intention', desc: 'Every design begins with a purpose. We create pieces that mean something.' },
              { icon: Heart, title: 'Emotion', desc: 'Jewellery should move you. We design for the moments that matter most.' },
              { icon: Sparkles, title: 'Beauty', desc: 'We believe in quiet luxury — elegance that whispers rather than shouts.' },
              { icon: Award, title: 'Craft', desc: 'Each piece is hand-finished by skilled artisans who care about every detail.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-champagne-100 dark:bg-charcoal-700">
                  <item.icon className="w-5 h-5 text-champagne-500" />
                </div>
                <h3 className="font-serif text-lg text-charcoal-800 dark:text-ivory mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design approach */}
      <section className="container-lux py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img src={storyImage2} alt="Wearing NIGAHE SHAUQ" className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-champagne-500 dark:text-champagne-300 mb-4">Design Approach</p>
            <h2 className="font-serif text-headline text-charcoal-800 dark:text-ivory mb-6">Where Heritage Meets Modernity</h2>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              Our design process draws from two worlds. From South Asian jewellery traditions, we borrow intricate detailing, the warmth of gold, and the significance of stones. From modern minimalism, we take clean lines, versatility, and a restrained palette.
            </p>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              The result is jewellery that feels both rooted and contemporary — pieces that can be worn to a wedding or to the office, that carry tradition without being weighed down by it.
            </p>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              We work in small batches, refining each design until it feels right. Nothing leaves our studio until it passes the most important test: would we wear it ourselves?
            </p>
          </div>
        </div>
      </section>

      {/* Quality & Experience */}
      <section className="bg-charcoal-800 dark:bg-charcoal-900 text-ivory py-20">
        <div className="container-lux text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-champagne-300 mb-4">Our Promise</p>
          <h2 className="font-serif text-headline mb-6">Quality You Can Feel</h2>
          <p className="text-ivory/70 leading-relaxed mb-8">
            From the materials we select to the packaging that arrives at your door, every detail is considered. We use quality alloys, genuine stones, and finishes that endure. Each piece comes in our signature box — worthy of gifting, even if the gift is for yourself.
          </p>
          <LinkButton to="/shop" variant="secondary" size="lg">Explore the Collection <ArrowRight className="w-4 h-4" /></LinkButton>
        </div>
      </section>
    </div>
  );
}

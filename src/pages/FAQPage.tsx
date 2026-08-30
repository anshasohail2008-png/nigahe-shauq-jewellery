import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const faqSections = [
  {
    title: 'Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard delivery takes 3–5 business days within the US. Express delivery takes 1–2 business days. International shipping times vary by destination, typically 7–14 business days.' },
      { q: 'Do you offer free shipping?', a: 'Yes, we offer complimentary standard shipping on all orders over $150. Orders below that threshold incur a flat $8 shipping fee.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries. International shipping rates are calculated at checkout based on your destination and order weight.' },
    ],
  },
  {
    title: 'Delivery',
    questions: [
      { q: 'Can I change my delivery address after ordering?', a: 'You can update your delivery address within 2 hours of placing your order by contacting our customer care team. After that, the order may already be processed.' },
      { q: 'What if I miss my delivery?', a: 'If you are not home, the courier will leave a note with instructions for redelivery or pickup at a nearby location. You can also track your package using the Track Order page.' },
    ],
  },
  {
    title: 'Returns',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 14 days of delivery for unworn pieces in their original packaging. Items must be in the same condition as received.' },
      { q: 'How do I start a return?', a: 'Visit your account dashboard, find the order, and click "Return Item." You can also contact our customer care team with your order number.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5–7 business days of receiving the returned item at our studio. The refund will go back to your original payment method.' },
    ],
  },
  {
    title: 'Exchanges',
    questions: [
      { q: 'Can I exchange a piece for a different one?', a: 'Yes, exchanges are allowed within 14 days of delivery. If the new item costs more, you pay the difference; if less, we refund the difference.' },
      { q: 'Can I exchange for a different size?', a: 'Many of our rings and bangles are adjustable. For non-adjustable pieces, contact us within 14 days to arrange a size exchange.' },
    ],
  },
  {
    title: 'Jewellery Care',
    questions: [
      { q: 'How should I care for my jewellery?', a: 'Store pieces in a dry, airtight pouch to prevent tarnishing. Avoid contact with water, perfume, sweat, and harsh chemicals. Clean gently with a soft microfibre cloth after each wear.' },
      { q: 'Will the gold plating fade?', a: 'With proper care, our gold-finish pieces retain their colour for a long time. However, all plated jewellery naturally wears over time. Avoid water and chemicals to extend the finish.' },
      { q: 'Can I wear my jewellery in the shower?', a: 'We recommend removing jewellery before showering, swimming, or exercising to preserve the finish and prevent damage.' },
    ],
  },
  {
    title: 'Payments',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards, as well as Cash on Delivery (COD) for select regions. This is a prototype store, so no real payments are processed.' },
      { q: 'Is checkout secure?', a: 'Yes. This is a demo store and no real card details are collected or stored. In a live environment, all payments would be processed through a PCI-compliant gateway.' },
    ],
  },
  {
    title: 'Tracking',
    questions: [
      { q: 'How do I track my order?', a: 'Visit the Track Order page and enter your order number. You can also track from your account dashboard under the Orders tab.' },
      { q: 'When will tracking be available?', a: 'Tracking information becomes available once your order has been shipped, typically within 1–2 business days of placing your order.' },
    ],
  },
  {
    title: 'Availability',
    questions: [
      { q: 'An item is sold out. Will it come back?', a: 'Many of our pieces are restocked. Follow us on social media for restock announcements or contact us to be notified.' },
      { q: 'Do you make limited edition pieces?', a: 'Yes, some of our collections are released in limited quantities. Once they sell out, they may not return. We recommend acting quickly on pieces you love.' },
    ],
  },
  {
    title: 'Packaging',
    questions: [
      { q: 'How is my order packaged?', a: 'Each piece arrives in our signature NIGAHE SHAUQ box with a protective pouch and care card. Orders of multiple items are packaged together in a single outer box.' },
      { q: 'Is gift wrapping available?', a: 'Yes, complimentary gift wrapping is available at checkout. You can also add a personalised note at no extra cost.' },
    ],
  },
];

export function FAQPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-3">Frequently Asked Questions</h1>
      <p className="text-charcoal-500 dark:text-charcoal-400 max-w-xl mb-12">Find answers to common questions about shipping, returns, care, and more.</p>

      <div className="max-w-3xl space-y-4">
        {faqSections.map((section, sIdx) => (
          <div key={sIdx} className="border border-charcoal-100 dark:border-charcoal-700">
            <button
              onClick={() => setOpenSection(openSection === sIdx ? null : sIdx)}
              className="flex items-center justify-between w-full p-5 text-left"
            >
              <h2 className="font-serif text-lg text-charcoal-800 dark:text-ivory">{section.title}</h2>
              <ChevronDown className={`w-5 h-5 text-charcoal-400 transition-transform ${openSection === sIdx ? 'rotate-180' : ''}`} />
            </button>
            {openSection === sIdx && (
              <div className="px-5 pb-5 space-y-3 animate-fade-in">
                {section.questions.map((qa, qIdx) => {
                  const key = `${sIdx}-${qIdx}`;
                  return (
                    <div key={qIdx} className="border-t border-charcoal-100 dark:border-charcoal-700 pt-3">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === key ? null : key)}
                        className="flex items-center justify-between w-full text-left py-2"
                      >
                        <span className="text-sm font-medium text-charcoal-800 dark:text-ivory">{qa.q}</span>
                        <ChevronDown className={`w-4 h-4 text-charcoal-400 transition-transform shrink-0 ml-3 ${openQuestion === key ? 'rotate-180' : ''}`} />
                      </button>
                      {openQuestion === key && (
                        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed py-2 animate-fade-in">{qa.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

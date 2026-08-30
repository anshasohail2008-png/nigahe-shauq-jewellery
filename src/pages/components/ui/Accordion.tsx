import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  return (
    <div className="divide-y divide-charcoal-200 dark:divide-charcoal-700">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="font-serif text-lg text-charcoal-800 dark:text-ivory">{item.title}</span>
            <ChevronDown className={`w-5 h-5 text-charcoal-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
            <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

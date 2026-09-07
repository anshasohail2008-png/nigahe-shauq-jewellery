import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="hover:text-charcoal-700 dark:hover:text-charcoal-200 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-charcoal-700 dark:text-charcoal-200">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-charcoal-300 dark:text-charcoal-600">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function SectionHeading({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-serif text-headline text-charcoal-800 dark:text-ivory">{title}</h2>
      {subtitle && <p className="mt-3 text-charcoal-500 dark:text-charcoal-400 max-w-2xl mx-auto">{subtitle}</p>}
      {children}
    </div>
  );
}

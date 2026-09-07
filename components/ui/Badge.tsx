import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'sale' | 'new' | 'bestseller' | 'out' | 'default';
  className?: string;
}

const variants = {
  sale: 'bg-rose-500 text-white',
  new: 'bg-champagne-400 text-charcoal-900',
  bestseller: 'bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900',
  out: 'bg-charcoal-300 text-charcoal-600 dark:bg-charcoal-700 dark:text-charcoal-400',
  default: 'bg-beige-100 text-charcoal-600 dark:bg-charcoal-700 dark:text-charcoal-200',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

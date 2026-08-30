import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-charcoal-800 text-ivory hover:bg-charcoal-700 dark:bg-champagne-300 dark:text-charcoal-900 dark:hover:bg-champagne-200',
  secondary: 'bg-champagne-300 text-charcoal-800 hover:bg-champagne-200 dark:bg-champagne-400 dark:text-charcoal-900',
  outline: 'border border-charcoal-300 text-charcoal-700 hover:border-charcoal-500 hover:bg-charcoal-50 dark:border-charcoal-600 dark:text-charcoal-100 dark:hover:bg-charcoal-800',
  ghost: 'text-charcoal-600 hover:bg-charcoal-100 dark:text-charcoal-300 dark:hover:bg-charcoal-800',
  danger: 'bg-rose-500 text-white hover:bg-rose-600',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const baseClass = 'inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends BaseProps {
  to: string;
}

export function LinkButton({ variant = 'primary', size = 'md', children, className = '', to }: LinkButtonProps) {
  return (
    <Link to={to} className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </Link>
  );
}

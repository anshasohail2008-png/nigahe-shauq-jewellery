import { Link } from 'react-router-dom';

export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.15em] text-charcoal-800 dark:text-ivory group-hover:text-champagne-500 dark:group-hover:text-champagne-300 transition-colors">
        NIGAHE SHAUQ
      </span>
      <span className="mt-0.5 text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-charcoal-400 dark:text-charcoal-500 text-center">
        Fine Jewellery
      </span>
    </Link>
  );
}

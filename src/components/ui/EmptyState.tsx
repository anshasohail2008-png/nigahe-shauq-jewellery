import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 text-charcoal-300 dark:text-charcoal-600">
        {icon || <Package className="w-16 h-16" />}
      </div>
      <h3 className="font-serif text-2xl text-charcoal-800 dark:text-ivory mb-2">{title}</h3>
      {description && <p className="text-charcoal-500 dark:text-charcoal-400 max-w-md mb-6">{description}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wide bg-charcoal-800 text-ivory dark:bg-champagne-300 dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-champagne-200 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

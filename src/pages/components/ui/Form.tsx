interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
          {label}
        </label>
      )}
      <input
        className={`w-full border bg-transparent px-4 py-3 text-sm text-charcoal-800 dark:text-ivory placeholder:text-charcoal-300 dark:placeholder:text-charcoal-600 focus:outline-none focus:border-champagne-400 transition-colors ${
          error ? 'border-rose-400' : 'border-charcoal-200 dark:border-charcoal-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
          {label}
        </label>
      )}
      <textarea
        className={`w-full border bg-transparent px-4 py-3 text-sm text-charcoal-800 dark:text-ivory placeholder:text-charcoal-300 dark:placeholder:text-charcoal-600 focus:outline-none focus:border-champagne-400 transition-colors resize-none ${
          error ? 'border-rose-400' : 'border-charcoal-200 dark:border-charcoal-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

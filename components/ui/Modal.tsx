import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative z-10 w-full max-h-[90vh] overflow-y-auto bg-ivory dark:bg-charcoal-800 shadow-2xl animate-scale-in ${className}`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 text-charcoal-500 hover:text-charcoal-800 dark:text-charcoal-400 dark:hover:text-charcoal-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

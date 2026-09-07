import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-charcoal-800 text-ivory dark:bg-charcoal-700 px-5 py-4 shadow-xl animate-toast-in min-w-[280px] max-w-sm"
        >
          {toast.type === 'error' ? <XCircle className="w-5 h-5 text-rose-400 shrink-0" /> : toast.type === 'info' ? <Info className="w-5 h-5 text-champagne-300 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-champagne-300 shrink-0" />}
          <p className="text-sm flex-1">{toast.message}</p>
          <button onClick={() => dismissToast(toast.id)} className="text-charcoal-400 hover:text-ivory transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

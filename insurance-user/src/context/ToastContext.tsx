import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};
const iconColors = { success: 'text-emerald-500', error: 'text-red-500', warning: 'text-amber-500', info: 'text-blue-500' };

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[100] space-y-2 pointer-events-none" style={{ minWidth: 320 }}>
                {toasts.map(toast => {
                    const Icon = icons[toast.type];
                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-in ${colors[toast.type]}`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[toast.type]}`} />
                            <p className="text-sm font-medium flex-1">{toast.message}</p>
                            <button onClick={() => dismiss(toast.id)} className="p-0.5 hover:opacity-70 transition-opacity">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

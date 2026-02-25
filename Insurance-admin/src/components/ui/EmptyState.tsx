import { FileX } from 'lucide-react';

interface EmptyStateProps {
    icon?: typeof FileX;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({ icon: Icon = FileX, title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {description && <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>}
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

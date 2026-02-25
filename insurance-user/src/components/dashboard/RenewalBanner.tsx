import { AlertTriangle, ArrowRight } from 'lucide-react';

interface RenewalBannerProps {
    onRenew: () => void;
}

export default function RenewalBanner({ onRenew }: RenewalBannerProps) {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-amber-900">Policy Expiring Soon</h3>
                <p className="text-xs text-amber-700 mt-0.5">
                    Your <span className="font-semibold">Health Insurance</span> policy expires in <span className="font-semibold">15 days</span>. Renew now for uninterrupted coverage.
                </p>
            </div>
            <button
                onClick={onRenew}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors flex-shrink-0 shadow-sm"
            >
                Renew Now <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}

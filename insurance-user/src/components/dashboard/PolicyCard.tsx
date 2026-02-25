import { LucideIcon } from 'lucide-react';

interface PolicyCardProps {
  icon: LucideIcon;
  title: string;
  details: string;
  expiry: string;
  expiryStatus: 'healthy' | 'warning';
  borderColor: string;
}

export default function PolicyCard({ icon: Icon, title, details, expiry, expiryStatus, borderColor }: PolicyCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${borderColor} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${borderColor.replace('border-', 'bg-').replace('-500', '-100')} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${borderColor.replace('border-', 'text-')}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{details}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Expires</p>
          <p className={`text-sm font-semibold ${expiryStatus === 'healthy' ? 'text-emerald-600' : 'text-orange-600'}`}>
            {expiry}
          </p>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          Manage
        </button>
      </div>
    </div>
  );
}

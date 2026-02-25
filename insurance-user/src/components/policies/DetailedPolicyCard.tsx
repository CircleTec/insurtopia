import { LucideIcon, Download } from 'lucide-react';

interface DetailedPolicyCardProps {
  icon: LucideIcon;
  title: string;
  policyNumber: string;
  coveredItem: string;
  coveragePeriod: string;
  premium: string;
  status: 'active' | 'renew-soon' | 'expired';
  borderColor: string;
  onManage?: () => void;
  onDownload?: () => void;
}

export default function DetailedPolicyCard({
  icon: Icon,
  title,
  policyNumber,
  coveredItem,
  coveragePeriod,
  premium,
  status,
  borderColor,
  onManage,
  onDownload
}: DetailedPolicyCardProps) {
  const statusConfig = {
    'active': { text: 'Active', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    'renew-soon': { text: 'Renew Soon', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
    'expired': { text: 'Expired', bgColor: 'bg-gray-100', textColor: 'text-gray-700' }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-l-4 ${borderColor} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${borderColor.replace('border-', 'bg-').replace('-500', '-100')} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${borderColor.replace('border-', 'text-')}`} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.bgColor} ${currentStatus.textColor}`}>
          {currentStatus.text}
        </span>
      </div>

      <div className="space-y-3 mb-5">
        <div>
          <p className="text-xs text-gray-500 mb-1">Policy Number</p>
          <p className="text-sm font-mono font-semibold text-gray-900">{policyNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Covered Item</p>
          <p className="text-sm text-gray-900">{coveredItem}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Coverage Period</p>
            <p className="text-sm text-gray-900">{coveragePeriod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Premium</p>
            <p className="text-sm font-semibold text-gray-900">{premium}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <button
          onClick={onManage}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Manage Policy
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

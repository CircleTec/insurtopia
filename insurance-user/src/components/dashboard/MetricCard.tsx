import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  bgColor: string;
  iconColor?: string;
}

export default function MetricCard({ icon: Icon, title, value, bgColor, iconColor = 'text-white' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} rounded-xl p-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

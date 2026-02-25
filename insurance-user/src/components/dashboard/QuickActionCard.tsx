import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
}

export default function QuickActionCard({ icon: Icon, title, description, accentColor }: QuickActionCardProps) {
  return (
    <button className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all text-left group">
      <div className={`w-12 h-12 ${accentColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}

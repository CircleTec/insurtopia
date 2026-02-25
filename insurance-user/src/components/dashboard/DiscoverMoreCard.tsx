import { LucideIcon, ArrowRight } from 'lucide-react';

interface DiscoverMoreCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bgColor: string;
}

export default function DiscoverMoreCard({ icon: Icon, title, subtitle, bgColor }: DiscoverMoreCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all hover:border-emerald-300 group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors flex-shrink-0">
          Check Price
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

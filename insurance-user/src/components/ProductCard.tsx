import { LucideIcon } from 'lucide-react';

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  onClick?: () => void;
}

export default function ProductCard({ icon: Icon, title, description, iconBg, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 text-center border-2 border-transparent hover:border-emerald-100 active:scale-95"
    >
      <div className="flex justify-center mb-5">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </button>
  );
}

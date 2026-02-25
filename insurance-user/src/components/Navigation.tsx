import { Shield, HelpCircle } from 'lucide-react';

interface NavigationProps {
  onLoginClick: () => void;
}

export default function Navigation({ onLoginClick }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-900" strokeWidth={2.5} />
            <span className="text-xl sm:text-2xl font-bold text-emerald-900">Insurtopia</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 hover:text-emerald-900 transition-colors">
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Get Help</span>
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold text-emerald-900 border-2 border-emerald-900 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Login / Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

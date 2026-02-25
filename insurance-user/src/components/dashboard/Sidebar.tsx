import {
  LayoutGrid,
  Shield,
  AlertCircle,
  CreditCard,
  User,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'policies', label: 'My Policies', icon: Shield },
  { id: 'claims', label: 'Claims', icon: AlertCircle },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: FileText },
];

const systemItems = [
  { id: 'profile', label: 'Profile & Settings', icon: User },
  { id: 'help', label: 'Help Center', icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose, activeView, onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50
        ${isCollapsed ? 'w-20' : 'w-72'}
        bg-white border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Branding */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center shadow-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Insurtopia</h1>
                  <p className="text-xs text-gray-500">Customer Portal</p>
                </div>
              )}
            </div>
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-50/50 text-emerald-900 font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="flex-1 text-left text-sm">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* System Section */}
          <div className="mt-8 px-4">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-500 px-4 mb-2 tracking-wider">ACCOUNT</p>
            )}
            <nav className="space-y-1">
              {systemItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? 'bg-gradient-to-r from-emerald-50 to-emerald-50/50 text-emerald-900 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="flex-1 text-left text-sm">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
              AK
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Abebe K.</p>
                  <p className="text-xs text-gray-500 truncate">Customer</p>
                </div>
                <button
                  onClick={() => onNavigate('logout')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

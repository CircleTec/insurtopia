import {
  LayoutDashboard,
  Inbox,
  FileText,
  ScrollText,
  Package,
  Users,
  BarChart3,
  PieChart,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ activeView, onViewChange, isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }: SidebarProps) {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'queue', label: 'My Queue', icon: Inbox, badge: '5' },
    { id: 'policies', label: 'Policies', icon: ScrollText },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'claims', label: 'Claims', icon: ClipboardList, badge: '2' },
    { id: 'rule-engine', label: 'Rule Engine', icon: Shield }
  ];

  const analyticsItems = [
    { id: 'risk-reports', label: 'Risk Reports', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: PieChart },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const systemItems = [
    { id: 'audit-trail', label: 'Audit Trail', icon: ScrollText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      <div className={`
        ${isCollapsed ? 'w-20' : 'w-72'}
        h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50
        transition-all duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
                  <p className="text-xs text-gray-500">Underwriter Portal</p>
                </div>
              )}
            </div>
            {/* Collapse toggle (desktop only) */}
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
            {/* Close button (mobile only) */}
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Operational Section */}
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-50/50 text-emerald-900 font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Analytics Section */}
          <div className="mt-8 px-4">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-500 px-4 mb-2 tracking-wider">ANALYTICS</p>
            )}
            <nav className="space-y-1">
              {analyticsItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
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

          {/* System Section */}
          <div className="mt-8 px-4">
            <nav className="space-y-1">
              {systemItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
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
              DA
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Dawit A.</p>
                  <p className="text-xs text-gray-500 truncate">Senior Underwriter</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

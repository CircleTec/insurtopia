import { useState } from 'react';
import { LayoutGrid, Shield, AlertCircle, CreditCard, User } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const bottomTabs = [
  { id: 'dashboard', label: 'Home', icon: LayoutGrid },
  { id: 'policies', label: 'Policies', icon: Shield },
  { id: 'claims', label: 'Claims', icon: AlertCircle },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function DashboardLayout({ children, onLogout, activeView = 'dashboard', onNavigate = () => { } }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (view: string) => {
    if (view === 'logout') {
      onLogout();
    } else {
      onNavigate(view);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onNavigate={handleNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={`${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} transition-all duration-300 flex flex-col min-h-screen`}>
        <Header onMenuClick={() => setSidebarOpen(true)} onLogout={onLogout} onNavigate={handleNavigate} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Tab Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
          <div className="flex items-center justify-around h-16">
            {bottomTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id)}
                  className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-500'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
                  {isActive && <div className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5"></div>}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

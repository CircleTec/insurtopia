import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
}

export default function Header({ onMenuClick, onLogout, onNavigate }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies, claims..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowDropdown(false); }}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <div className="relative z-20">
                  <NotificationDropdown
                    onViewAll={() => {
                      setShowNotifications(false);
                      onNavigate?.('notifications');
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowDropdown(!showDropdown); setShowNotifications(false); }}
              className="flex items-center gap-3 pl-3 ml-1 border-l border-gray-200 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Abebe K.</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                AK
              </div>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2} />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

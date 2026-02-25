import { useState } from 'react';
import { CheckCheck, ShieldCheck, CreditCard, AlertCircle, FileText, Clock } from 'lucide-react';

interface Notification {
    id: string;
    type: 'claim' | 'payment' | 'policy' | 'system';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface NotificationDropdownProps {
    onViewAll: () => void;
}

const mockNotifications: Notification[] = [
    { id: '1', type: 'claim', title: 'Claim Update', message: 'Your claim CLM-2024-001 has been approved.', timestamp: '2 min ago', read: false },
    { id: '2', type: 'payment', title: 'Payment Due', message: 'Motor Comprehensive premium due in 3 days.', timestamp: '1 hour ago', read: false },
    { id: '3', type: 'policy', title: 'Policy Renewal', message: 'Health Plus policy expires in 15 days.', timestamp: '3 hours ago', read: false },
    { id: '4', type: 'system', title: 'Welcome!', message: 'Your account is verified. Start exploring.', timestamp: '1 day ago', read: true },
    { id: '5', type: 'claim', title: 'Document Requested', message: 'Please upload additional photos for CLM-2024-003.', timestamp: '2 days ago', read: true },
];

const typeConfig = {
    claim: { icon: AlertCircle, color: 'text-amber-600 bg-amber-100' },
    payment: { icon: CreditCard, color: 'text-blue-600 bg-blue-100' },
    policy: { icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-100' },
    system: { icon: FileText, color: 'text-purple-600 bg-purple-100' },
};

export default function NotificationDropdown({ onViewAll }: NotificationDropdownProps) {
    const [notifications, setNotifications] = useState(mockNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map(notif => {
                    const config = typeConfig[notif.type];
                    const Icon = config.icon;
                    return (
                        <button
                            key={notif.id}
                            onClick={() => markRead(notif.id)}
                            className={`w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 ${!notif.read ? 'bg-emerald-50/40' : ''
                                }`}
                        >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${config.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                        {notif.title}
                                    </p>
                                    {!notif.read && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{notif.message}</p>
                                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {notif.timestamp}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <button
                onClick={onViewAll}
                className="w-full px-5 py-3 text-center text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors border-t border-gray-100"
            >
                View All Notifications
            </button>
        </div>
    );
}

import { useState } from 'react';
import { Bell, CheckCheck, ShieldCheck, CreditCard, AlertCircle, FileText, Clock, Search } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface Notification {
    id: string;
    type: 'claim' | 'payment' | 'policy' | 'system';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface NotificationsProps {
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

const allNotifications: Notification[] = [
    { id: '1', type: 'claim', title: 'Claim Approved', message: 'Your claim CLM-2024-001 for Motor Comprehensive has been approved. The payout of ETB 45,000 will be processed within 5 business days.', timestamp: '2 min ago', read: false },
    { id: '2', type: 'payment', title: 'Payment Due Soon', message: 'Your Motor Comprehensive premium payment of ETB 2,500 is due in 3 days. Set up auto-pay to never miss a payment.', timestamp: '1 hour ago', read: false },
    { id: '3', type: 'policy', title: 'Policy Expiring Soon', message: 'Your Health Plus policy (POL-2024-003) will expire in 15 days. Renew now to maintain continuous coverage.', timestamp: '3 hours ago', read: false },
    { id: '4', type: 'claim', title: 'Document Requested', message: 'Your claims adjuster has requested additional photos for claim CLM-2024-003. Please upload within 7 days.', timestamp: '5 hours ago', read: false },
    { id: '5', type: 'system', title: 'Account Verified', message: 'Your account verification is complete! You can now access all features including filing claims and policy renewals.', timestamp: '1 day ago', read: true },
    { id: '6', type: 'payment', title: 'Payment Confirmed', message: 'Your payment of ETB 1,800 for Health Plus Basic policy has been received. Thank you!', timestamp: '2 days ago', read: true },
    { id: '7', type: 'policy', title: 'New Product Available', message: 'Check out our new Crop Insurance product — designed for Ethiopian farmers with flexible coverage options.', timestamp: '3 days ago', read: true },
    { id: '8', type: 'claim', title: 'Claim Filed Successfully', message: 'Your claim CLM-2024-005 has been submitted. You will receive status updates as it progresses.', timestamp: '4 days ago', read: true },
    { id: '9', type: 'system', title: 'App Update', message: 'We have improved the claims filing process. You can now upload multiple documents at once.', timestamp: '1 week ago', read: true },
    { id: '10', type: 'payment', title: 'Auto-Pay Enabled', message: 'Auto-pay has been enabled for your Motor Comprehensive policy. Payments will be deducted monthly.', timestamp: '1 week ago', read: true },
];

const typeConfig: Record<string, { icon: typeof Bell; color: string; label: string }> = {
    claim: { icon: AlertCircle, color: 'text-amber-600 bg-amber-100', label: 'Claim' },
    payment: { icon: CreditCard, color: 'text-blue-600 bg-blue-100', label: 'Payment' },
    policy: { icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-100', label: 'Policy' },
    system: { icon: FileText, color: 'text-purple-600 bg-purple-100', label: 'System' },
};

const filters = ['all', 'unread', 'claim', 'payment', 'policy', 'system'] as const;

export default function Notifications({ onLogout, onNavigate }: NotificationsProps) {
    const [notifications, setNotifications] = useState(allNotifications);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesFilter = activeFilter === 'all' || activeFilter === 'unread' ? (activeFilter === 'unread' ? !n.read : true) : n.type === activeFilter;
        const matchesSearch = searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <DashboardLayout onLogout={onLogout} activeView="notifications" onNavigate={onNavigate}>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
                            <CheckCheck className="w-4 h-4" /> Mark all read
                        </button>
                    )}
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${activeFilter === f
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : typeConfig[f]?.label || f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notification List */}
                <div className="space-y-2">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No notifications found</p>
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notif => {
                            const config = typeConfig[notif.type];
                            const Icon = config.icon;
                            return (
                                <button
                                    key={notif.id}
                                    onClick={() => markRead(notif.id)}
                                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left transition-all hover:shadow-sm ${!notif.read
                                        ? 'bg-white border-emerald-200 shadow-sm'
                                        : 'bg-white border-gray-100 opacity-75 hover:opacity-100'
                                        }`}
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <div className="flex items-center gap-2">
                                                <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {notif.title}
                                                </p>
                                                {!notif.read && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                                                {config.label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {notif.timestamp}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

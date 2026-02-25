import { useState } from 'react';
import { X, CheckCheck, ShieldAlert, FileWarning, Users, CreditCard, Settings, Clock, AlertTriangle, Info, Flame } from 'lucide-react';

interface Activity {
    id: string;
    type: 'application' | 'claim' | 'policy' | 'payment' | 'system';
    severity: 'info' | 'warning' | 'urgent';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface ActivityFeedProps {
    isOpen: boolean;
    onClose: () => void;
}

const mockActivities: Activity[] = [
    { id: '1', type: 'claim', severity: 'urgent', title: 'High-Value Claim Filed', message: 'Claim CLM-2024-012 for ETB 250,000 requires immediate review.', timestamp: '3 min ago', read: false },
    { id: '2', type: 'application', severity: 'info', title: 'New Application', message: 'Tigist Alemu submitted a Motor Comprehensive application.', timestamp: '15 min ago', read: false },
    { id: '3', type: 'policy', severity: 'warning', title: '12 Policies Expiring', message: '12 policies will expire in the next 7 days. Send renewal notices?', timestamp: '1 hour ago', read: false },
    { id: '4', type: 'payment', severity: 'info', title: 'Payment Received', message: 'ETB 45,000 received from Kebede Insurance for policy batch.', timestamp: '2 hours ago', read: false },
    { id: '5', type: 'application', severity: 'info', title: 'Application Approved', message: 'Sara Tadesse approved APP-2024-089 — Health Plus Basic.', timestamp: '3 hours ago', read: true },
    { id: '6', type: 'system', severity: 'warning', title: 'Rule Engine Updated', message: 'Age factor rule v3 published by Dawit Assefa.', timestamp: '4 hours ago', read: true },
    { id: '7', type: 'claim', severity: 'info', title: 'Claim Resolved', message: 'CLM-2024-008 marked as resolved. Payout of ETB 18,500 processed.', timestamp: '5 hours ago', read: true },
    { id: '8', type: 'application', severity: 'info', title: 'New Application', message: 'Meron Haile submitted a Property Insurance application.', timestamp: '6 hours ago', read: true },
    { id: '9', type: 'system', severity: 'info', title: 'Daily Report Ready', message: 'Your daily performance report for Feb 24 is ready to view.', timestamp: '1 day ago', read: true },
    { id: '10', type: 'payment', severity: 'urgent', title: 'Failed Payment', message: 'Auto-debit for POL-2024-045 failed. Customer notified.', timestamp: '1 day ago', read: true },
];

const typeConfig: Record<string, { icon: typeof Info; color: string }> = {
    application: { icon: Users, color: 'text-blue-600 bg-blue-100' },
    claim: { icon: FileWarning, color: 'text-amber-600 bg-amber-100' },
    policy: { icon: ShieldAlert, color: 'text-emerald-600 bg-emerald-100' },
    payment: { icon: CreditCard, color: 'text-purple-600 bg-purple-100' },
    system: { icon: Settings, color: 'text-gray-600 bg-gray-100' },
};

const severityBadge: Record<string, { icon: typeof Info; class: string; label: string }> = {
    info: { icon: Info, class: 'bg-blue-100 text-blue-700', label: 'Info' },
    warning: { icon: AlertTriangle, class: 'bg-amber-100 text-amber-700', label: 'Warning' },
    urgent: { icon: Flame, class: 'bg-red-100 text-red-700', label: 'Urgent' },
};

export default function ActivityFeed({ isOpen, onClose }: ActivityFeedProps) {
    const [activities, setActivities] = useState(mockActivities);
    const unreadCount = activities.filter(a => !a.read).length;

    const markAllRead = () => {
        setActivities(activities.map(a => ({ ...a, read: true })));
    };

    const markRead = (id: string) => {
        setActivities(activities.map(a => a.id === id ? { ...a, read: true } : a));
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            {/* Slide-over panel */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-gray-900">Activity Feed</h2>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors">
                                <CheckCheck className="w-3.5 h-3.5" /> Mark all
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Activity List */}
                <div className="flex-1 overflow-y-auto">
                    {activities.map(activity => {
                        const config = typeConfig[activity.type];
                        const severity = severityBadge[activity.severity];
                        const Icon = config.icon;
                        const SeverityIcon = severity.icon;

                        return (
                            <button
                                key={activity.id}
                                onClick={() => markRead(activity.id)}
                                className={`w-full flex items-start gap-3 px-6 py-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${!activity.read ? 'bg-emerald-50/30' : ''
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className={`text-sm ${!activity.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} truncate`}>
                                            {activity.title}
                                        </p>
                                        {!activity.read && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{activity.message}</p>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${severity.class}`}>
                                            <SeverityIcon className="w-2.5 h-2.5" /> {severity.label}
                                        </span>
                                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                            <Clock className="w-2.5 h-2.5" /> {activity.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-200 flex-shrink-0">
                    <p className="text-[10px] text-gray-400 text-center">Showing last 10 activities</p>
                </div>
            </div>
        </>
    );
}

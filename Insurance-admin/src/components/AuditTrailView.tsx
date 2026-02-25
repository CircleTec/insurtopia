import { useState } from 'react';
import { Search, Download, User, Clock, Filter, Shield, FileEdit, Settings, LogIn, FileText } from 'lucide-react';

interface AuditEntry {
    id: string;
    user: string;
    action: string;
    entity: string;
    entityId: string;
    timestamp: string;
    ip: string;
    actionType: 'policy' | 'claim' | 'rule' | 'product' | 'login' | 'system';
}

const mockEntries: AuditEntry[] = [
    { id: '1', user: 'Dawit Assefa', action: 'Approved policy', entity: 'Policy', entityId: 'POL-2024-089', timestamp: '2024-02-25 09:45:23', ip: '192.168.1.45', actionType: 'policy' },
    { id: '2', user: 'Sara Tadesse', action: 'Reviewed claim', entity: 'Claim', entityId: 'CLM-2024-012', timestamp: '2024-02-25 09:30:11', ip: '192.168.1.52', actionType: 'claim' },
    { id: '3', user: 'Dawit Assefa', action: 'Published rule v3', entity: 'Rule', entityId: 'RUL-AGE-FACTOR', timestamp: '2024-02-25 08:15:44', ip: '192.168.1.45', actionType: 'rule' },
    { id: '4', user: 'Meron Kebede', action: 'Created product', entity: 'Product', entityId: 'PRD-CROP-001', timestamp: '2024-02-24 16:22:08', ip: '192.168.1.67', actionType: 'product' },
    { id: '5', user: 'Sara Tadesse', action: 'Rejected claim', entity: 'Claim', entityId: 'CLM-2024-010', timestamp: '2024-02-24 15:10:55', ip: '192.168.1.52', actionType: 'claim' },
    { id: '6', user: 'Dawit Assefa', action: 'Logged in', entity: 'Session', entityId: 'SES-20240224', timestamp: '2024-02-24 08:00:12', ip: '192.168.1.45', actionType: 'login' },
    { id: '7', user: 'System', action: 'Auto-renewed 5 policies', entity: 'System', entityId: 'BATCH-REN-024', timestamp: '2024-02-24 00:01:00', ip: '127.0.0.1', actionType: 'system' },
    { id: '8', user: 'Meron Kebede', action: 'Updated product pricing', entity: 'Product', entityId: 'PRD-MOTOR-001', timestamp: '2024-02-23 14:33:21', ip: '192.168.1.67', actionType: 'product' },
    { id: '9', user: 'Sara Tadesse', action: 'Approved policy', entity: 'Policy', entityId: 'POL-2024-087', timestamp: '2024-02-23 11:45:09', ip: '192.168.1.52', actionType: 'policy' },
    { id: '10', user: 'Dawit Assefa', action: 'Modified rule conditions', entity: 'Rule', entityId: 'RUL-VEHICLE-TYPE', timestamp: '2024-02-23 10:20:17', ip: '192.168.1.45', actionType: 'rule' },
    { id: '11', user: 'Meron Kebede', action: 'Logged in', entity: 'Session', entityId: 'SES-20240223', timestamp: '2024-02-23 08:05:33', ip: '192.168.1.67', actionType: 'login' },
    { id: '12', user: 'System', action: 'Generated daily report', entity: 'System', entityId: 'RPT-DAILY-223', timestamp: '2024-02-23 00:05:00', ip: '127.0.0.1', actionType: 'system' },
];

const actionTypeConfig: Record<string, { icon: typeof Shield; color: string; label: string }> = {
    policy: { icon: Shield, color: 'bg-emerald-100 text-emerald-700', label: 'Policy' },
    claim: { icon: FileText, color: 'bg-amber-100 text-amber-700', label: 'Claim' },
    rule: { icon: FileEdit, color: 'bg-blue-100 text-blue-700', label: 'Rule' },
    product: { icon: Settings, color: 'bg-purple-100 text-purple-700', label: 'Product' },
    login: { icon: LogIn, color: 'bg-gray-100 text-gray-700', label: 'Login' },
    system: { icon: Settings, color: 'bg-orange-100 text-orange-700', label: 'System' },
};

const actionTypeFilters = ['all', 'policy', 'claim', 'rule', 'product', 'login', 'system'] as const;

export default function AuditTrailView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState<string>('all');
    const [userFilter, setUserFilter] = useState<string>('all');

    const users = ['all', ...Array.from(new Set(mockEntries.map(e => e.user)))];

    const filtered = mockEntries.filter(entry => {
        const matchesAction = actionFilter === 'all' || entry.actionType === actionFilter;
        const matchesUser = userFilter === 'all' || entry.user === userFilter;
        const matchesSearch = searchQuery === '' || entry.action.toLowerCase().includes(searchQuery.toLowerCase()) || entry.entityId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesAction && matchesUser && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Audit Trail</h1>
                    <p className="text-sm text-gray-600 mt-1">Track all system activities for compliance and accountability</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search actions or entity IDs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                    </div>
                    <select
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {users.map(u => (
                            <option key={u} value={u}>{u === 'all' ? 'All Users' : u}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {actionTypeFilters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActionFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${actionFilter === f ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f === 'all' ? 'All' : actionTypeConfig[f]?.label || f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Entity ID</th>
                                <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(entry => {
                                const config = actionTypeConfig[entry.actionType];
                                return (
                                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{entry.timestamp}</span>
                                        </td>
                                        <td className="px-5 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-400" />{entry.user}</span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-700">{entry.action}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${config.color}`}>
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-xs font-mono text-gray-600">{entry.entityId}</td>
                                        <td className="px-5 py-3 text-xs font-mono text-gray-400">{entry.ip}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="p-12 text-center">
                        <Filter className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium text-sm">No entries match your filters</p>
                    </div>
                )}
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
                    Showing {filtered.length} of {mockEntries.length} entries
                </div>
            </div>
        </div>
    );
}

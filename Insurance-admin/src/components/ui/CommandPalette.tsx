import { useState, useEffect, useRef } from 'react';
import { Search, Command, Shield, Users, BarChart3, AlertTriangle, Settings, LayoutDashboard, FileText } from 'lucide-react';

interface SearchItem {
    id: string;
    title: string;
    description: string;
    icon: any;
    category: 'Pages' | 'Management' | 'Analytics' | 'Actions';
    action: () => void;
}

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const searchItems: SearchItem[] = [
        { id: 'p1', title: 'Dashboard', description: 'Real-time overview of metrics', icon: LayoutDashboard, category: 'Pages', action: () => onNavigate('DASHBOARD') },
        { id: 'p2', title: 'Underwriters', description: 'Manage underwriter profiles', icon: Users, category: 'Management', action: () => onNavigate('UNDERWRITERS') },
        { id: 'p3', title: 'Risk Reports', description: 'Portfolio risk analysis', icon: AlertTriangle, category: 'Analytics', action: () => onNavigate('RISK_REPORTS') },
        { id: 'p4', title: 'Performance', description: 'Operational efficiency tracking', icon: BarChart3, category: 'Analytics', action: () => onNavigate('PERFORMANCE') },
        { id: 'p5', title: 'Policy Management', description: 'Global policy administration', icon: Shield, category: 'Management', action: () => onNavigate('POLICIES') },
        { id: 'p6', title: 'Settings', description: 'System configuration and logs', icon: Settings, category: 'Pages', action: () => onNavigate('SETTINGS') },

        { id: 'a1', title: 'Review Applications', description: 'Pending underwriter approvals', icon: FileText, category: 'Actions', action: () => onNavigate('UNDERWRITERS') },
        { id: 'a2', title: 'System Logs', description: 'View technical audit trails', icon: FileText, category: 'Actions', action: () => onNavigate('SETTINGS') },
    ];

    const filteredItems = query === ''
        ? searchItems.slice(0, 5)
        : searchItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                filteredItems[selectedIndex]?.action();
                onClose();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 md:px-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Search Input */}
                <div className="relative p-4 border-b border-gray-100 dark:border-gray-700">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full pl-12 pr-12 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                        placeholder="Search commands, reports, or pages..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        esc
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {filteredItems.length > 0 ? (
                        <div className="space-y-1">
                            {filteredItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            item.action();
                                            onClose();
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${index === selectedIndex
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${index === selectedIndex
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                            }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.category}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="font-bold">No results found for "{query}"</p>
                            <p className="text-sm mt-1">Try searching for a report, user, or administrative task.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↑↓</kbd> Navigate</span>
                        <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">enter</kbd> Select</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Command className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Command Center</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

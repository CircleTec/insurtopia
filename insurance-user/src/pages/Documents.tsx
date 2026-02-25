import { useState } from 'react';
import { FileText, Download, Search, FileSpreadsheet, FileCheck, Grid3x3, List, Calendar, HardDrive } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface Document {
    id: string;
    name: string;
    category: 'policy' | 'receipt' | 'claim' | 'certificate';
    type: string;
    date: string;
    size: string;
    policyNumber?: string;
}

interface DocumentsProps {
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

const mockDocuments: Document[] = [
    { id: '1', name: 'Motor Comprehensive Policy Document', category: 'policy', type: 'PDF', date: '2024-01-15', size: '2.4 MB', policyNumber: 'POL-2024-001' },
    { id: '2', name: 'Health Plus Basic Policy Document', category: 'policy', type: 'PDF', date: '2024-02-20', size: '1.8 MB', policyNumber: 'POL-2024-003' },
    { id: '3', name: 'Premium Payment Receipt - Jan 2024', category: 'receipt', type: 'PDF', date: '2024-01-15', size: '156 KB', policyNumber: 'POL-2024-001' },
    { id: '4', name: 'Premium Payment Receipt - Feb 2024', category: 'receipt', type: 'PDF', date: '2024-02-15', size: '148 KB', policyNumber: 'POL-2024-001' },
    { id: '5', name: 'Premium Payment Receipt - Mar 2024', category: 'receipt', type: 'PDF', date: '2024-03-15', size: '152 KB', policyNumber: 'POL-2024-003' },
    { id: '6', name: 'Claim CLM-2024-001 - Submission Docs', category: 'claim', type: 'ZIP', date: '2024-03-10', size: '8.5 MB' },
    { id: '7', name: 'Claim CLM-2024-001 - Approval Letter', category: 'claim', type: 'PDF', date: '2024-03-20', size: '245 KB' },
    { id: '8', name: 'Accident Photos - CLM-2024-003', category: 'claim', type: 'ZIP', date: '2024-04-01', size: '12.1 MB' },
    { id: '9', name: 'No-Claim Certificate 2023', category: 'certificate', type: 'PDF', date: '2024-01-05', size: '320 KB' },
    { id: '10', name: 'Insurance Verification Letter', category: 'certificate', type: 'PDF', date: '2024-02-01', size: '180 KB' },
];

const categoryConfig: Record<string, { icon: typeof FileText; color: string; label: string }> = {
    policy: { icon: FileCheck, color: 'text-emerald-600 bg-emerald-100', label: 'Policy Document' },
    receipt: { icon: FileSpreadsheet, color: 'text-blue-600 bg-blue-100', label: 'Receipt' },
    claim: { icon: FileText, color: 'text-amber-600 bg-amber-100', label: 'Claim Document' },
    certificate: { icon: FileCheck, color: 'text-purple-600 bg-purple-100', label: 'Certificate' },
};

const tabs = ['all', 'policy', 'receipt', 'claim', 'certificate'] as const;

export default function Documents({ onLogout, onNavigate }: DocumentsProps) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const filtered = mockDocuments.filter(doc => {
        const matchesTab = activeTab === 'all' || doc.category === activeTab;
        const matchesSearch = searchQuery === '' || doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <DashboardLayout onLogout={onLogout} activeView="documents" onNavigate={onNavigate}>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                        <p className="text-sm text-gray-600 mt-1">{mockDocuments.length} documents • {(mockDocuments.reduce((a, d) => a + parseFloat(d.size), 0)).toFixed(1)} MB total</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:bg-gray-100'}`}
                        >
                            <Grid3x3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:bg-gray-100'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Search + Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab === 'all' ? `All (${mockDocuments.length})` : `${categoryConfig[tab]?.label}s`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Document List/Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <HardDrive className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No documents found</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : viewMode === 'list' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {filtered.map(doc => {
                                const config = categoryConfig[doc.category];
                                const Icon = config.icon;
                                return (
                                    <div key={doc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{doc.name}</p>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(doc.date)}</span>
                                                <span className="text-xs text-gray-400">{doc.type}</span>
                                                <span className="text-xs text-gray-400">{doc.size}</span>
                                                {doc.policyNumber && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{doc.policyNumber}</span>}
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map(doc => {
                            const config = categoryConfig[doc.category];
                            const Icon = config.icon;
                            return (
                                <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:border-emerald-200 transition-all group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${config.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">{doc.name}</p>
                                    <p className="text-xs text-gray-500 mb-3">{formatDate(doc.date)} • {doc.size}</p>
                                    <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-gray-50 group-hover:bg-emerald-50 rounded-lg text-xs font-semibold text-gray-600 group-hover:text-emerald-600 transition-colors">
                                        <Download className="w-3.5 h-3.5" /> Download
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

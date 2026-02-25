import { useState } from 'react';
import { BarChart3, TrendingUp, Shield, Users, Calendar, Download, FileText, CreditCard, PieChart } from 'lucide-react';

interface ReportType {
    id: string;
    title: string;
    description: string;
    icon: typeof BarChart3;
    color: string;
    lastGenerated: string;
}

const reportTypes: ReportType[] = [
    { id: 'premium', title: 'Premium Collection Report', description: 'Monthly/quarterly breakdown of collected premiums by product, region, and payment method.', icon: CreditCard, color: 'from-blue-500 to-blue-700', lastGenerated: '2024-02-24' },
    { id: 'claims', title: 'Claims Summary Report', description: 'Analysis of filed, approved, and rejected claims with loss ratios and average processing time.', icon: FileText, color: 'from-amber-500 to-amber-700', lastGenerated: '2024-02-23' },
    { id: 'portfolio', title: 'Policy Portfolio Report', description: 'Active, expired, and cancelled policies with coverage distribution and renewal rates.', icon: Shield, color: 'from-emerald-500 to-emerald-700', lastGenerated: '2024-02-22' },
    { id: 'customers', title: 'Customer Growth Report', description: 'New registrations, churn analysis, customer demographics, and retention metrics.', icon: Users, color: 'from-purple-500 to-purple-700', lastGenerated: '2024-02-20' },
    { id: 'performance', title: 'Underwriter Performance', description: 'Individual underwriter metrics: apps reviewed, approval rates, average review time.', icon: TrendingUp, color: 'from-rose-500 to-rose-700', lastGenerated: '2024-02-18' },
    { id: 'financial', title: 'Financial Summary', description: 'Revenue, expenses, net margin, and projections by product line and region.', icon: PieChart, color: 'from-cyan-500 to-cyan-700', lastGenerated: '2024-02-15' },
];

const mockPreview = {
    stats: [
        { label: 'Total Premiums', value: 'ETB 12.4M', change: '+8.2%' },
        { label: 'Active Policies', value: '2,847', change: '+5.1%' },
        { label: 'Claims Ratio', value: '42.3%', change: '-2.1%' },
        { label: 'Avg Processing', value: '3.2 days', change: '-0.5d' },
    ],
    rows: [
        { product: 'Motor Comprehensive', policies: 1245, premium: 'ETB 4.2M', claims: 32, ratio: '38%' },
        { product: 'Health Plus Basic', policies: 892, premium: 'ETB 3.1M', claims: 45, ratio: '48%' },
        { product: 'Property Insurance', policies: 410, premium: 'ETB 2.8M', claims: 12, ratio: '35%' },
        { product: 'Life Insurance', policies: 300, premium: 'ETB 2.3M', claims: 8, ratio: '28%' },
    ]
};

export default function ReportsView() {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-02-25' });

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                <p className="text-sm text-gray-600 mt-1">Generate, preview, and export business reports</p>
            </div>

            {selectedReport ? (
                /* Report Preview */
                <div className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <button onClick={() => setSelectedReport(null)} className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            ← Back to Reports
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} className="text-sm focus:outline-none" />
                                <span className="text-gray-400">→</span>
                                <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} className="text-sm focus:outline-none" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors">
                                <Download className="w-4 h-4" /> Export PDF
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockPreview.stats.map(stat => (
                            <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <p className={`text-xs font-semibold mt-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : stat.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>{stat.change} vs prev period</p>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900">Breakdown by Product</h3>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase">Product</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase">Policies</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase">Premium</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase">Claims</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase">Loss Ratio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockPreview.rows.map(row => (
                                    <tr key={row.product} className="hover:bg-gray-50">
                                        <td className="px-5 py-3 text-sm font-medium text-gray-900">{row.product}</td>
                                        <td className="px-5 py-3 text-sm text-gray-600">{row.policies.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-sm text-gray-600">{row.premium}</td>
                                        <td className="px-5 py-3 text-sm text-gray-600">{row.claims}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${parseInt(row.ratio) > 45 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {row.ratio}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Report Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reportTypes.map(report => {
                        const Icon = report.icon;
                        return (
                            <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-emerald-200 transition-all group">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center mb-4 shadow-md`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">{report.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">{report.description}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] text-gray-400">Last: {formatDate(report.lastGenerated)}</p>
                                    <button
                                        onClick={() => setSelectedReport(report.id)}
                                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 group-hover:underline"
                                    >
                                        Generate →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

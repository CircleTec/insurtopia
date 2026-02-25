import { useState } from 'react';
import { Clock, TrendingUp, Users, CheckCircle, ArrowUpRight, ArrowDownRight, Award, BarChart3 } from 'lucide-react';
import { BarChart, AreaChart } from './ui/Charts';

interface UnderwriterPerf {
    id: string;
    name: string;
    avatar: string;
    appsProcessed: number;
    avgReviewTime: string;
    approvalRate: number;
    declineRate: number;
    weekTrend: 'up' | 'down' | 'flat';
}

interface ProductPerf {
    product: string;
    applications: number;
    conversionRate: number;
    premiumVolume: string;
    avgPremium: string;
    claimRate: number;
    trend: 'up' | 'down' | 'flat';
}

const mockUnderwriters: UnderwriterPerf[] = [
    { id: 'UW-01', name: 'Bekele Assefa', avatar: 'BA', appsProcessed: 48, avgReviewTime: '1.2h', approvalRate: 82, declineRate: 8, weekTrend: 'up' },
    { id: 'UW-02', name: 'Hiwot Tesfaye', avatar: 'HT', appsProcessed: 42, avgReviewTime: '1.5h', approvalRate: 78, declineRate: 12, weekTrend: 'up' },
    { id: 'UW-03', name: 'Yohannes Alemu', avatar: 'YA', appsProcessed: 36, avgReviewTime: '2.1h', approvalRate: 75, declineRate: 15, weekTrend: 'down' },
    { id: 'UW-04', name: 'Meseret Worku', avatar: 'MW', appsProcessed: 31, avgReviewTime: '1.8h', approvalRate: 80, declineRate: 10, weekTrend: 'flat' },
    { id: 'UW-05', name: 'Solomon Tadesse', avatar: 'ST', appsProcessed: 27, avgReviewTime: '2.4h', approvalRate: 72, declineRate: 18, weekTrend: 'down' },
];

const mockProducts: ProductPerf[] = [
    { product: 'Motor Comprehensive', applications: 245, conversionRate: 68, premiumVolume: 'ETB 4.2M', avgPremium: 'ETB 17,143', claimRate: 12, trend: 'up' },
    { product: 'Health Star Plus', applications: 182, conversionRate: 72, premiumVolume: 'ETB 3.1M', avgPremium: 'ETB 17,033', claimRate: 22, trend: 'up' },
    { product: 'SME Fire & Property', applications: 87, conversionRate: 55, premiumVolume: 'ETB 2.8M', avgPremium: 'ETB 32,184', claimRate: 8, trend: 'flat' },
    { product: 'Travel Secure', applications: 124, conversionRate: 80, premiumVolume: 'ETB 1.5M', avgPremium: 'ETB 12,097', claimRate: 5, trend: 'up' },
];

const weeklyTrend = [
    { label: 'Mon', value1: 18, value2: 14 },
    { label: 'Tue', value1: 24, value2: 19 },
    { label: 'Wed', value1: 22, value2: 16 },
    { label: 'Thu', value1: 28, value2: 22 },
    { day: 'Fri', label: 'Fri', value1: 20, value2: 17 },
    { day: 'Sat', label: 'Sat', value1: 8, value2: 6 },
    { day: 'Sun', label: 'Sun', value1: 4, value2: 3 },
];

const revenueData = [
    { label: 'Jan', value: 1200000 },
    { label: 'Feb', value: 1450000 },
    { label: 'Mar', value: 1380000 },
    { label: 'Apr', value: 1650000 },
    { label: 'May', value: 1820000 },
    { label: 'Jun', value: 1710000 },
];

export default function PerformanceView() {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Performance & Analytics</h1>
                    <p className="text-sm text-gray-600 mt-1">Underwriting efficiency and product performance metrics</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    {(['week', 'month', 'quarter'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${timeRange === range
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'This Quarter'}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Avg Time to Quote</p>
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1.8h</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                        <p className="text-xs text-emerald-600 font-semibold">12% faster than last month</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">68.4%</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        <p className="text-xs text-emerald-600 font-semibold">↑ 4.2% from last month</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">UW Throughput</p>
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">184</p>
                    <p className="text-xs text-gray-500 mt-2">apps processed this month</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">77.3%</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        <p className="text-xs text-emerald-600 font-semibold">↑ 2.1% from last month</p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Activity Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Weekly Activity</h2>
                            <p className="text-sm text-gray-500 mt-1">Applications received vs. approved</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Received</span>
                            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-200"></span> Approved</span>
                        </div>
                    </div>
                    <div className="h-48">
                        <BarChart data={weeklyTrend as any} />
                    </div>
                </div>

                {/* Revenue Trend Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Monthly Revenue</h2>
                            <p className="text-sm text-gray-500 mt-1">Premium volume (ETB)</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-bold">+18.2%</span>
                        </div>
                    </div>
                    <div className="h-48">
                        <AreaChart data={revenueData} color="#10b981" />
                    </div>
                </div>
            </div>

            {/* Two Column Layout: Underwriters + Products */}
            <div className="grid grid-cols-2 gap-8">
                {/* Underwriter Leaderboard */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-gray-900">Underwriter Leaderboard</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {mockUnderwriters.map((uw, idx) => (
                            <div key={uw.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-amber-100 text-amber-800' :
                                    idx === 1 ? 'bg-gray-200 text-gray-700' :
                                        idx === 2 ? 'bg-orange-100 text-orange-800' :
                                            'bg-gray-100 text-gray-500'
                                    }`}>
                                    {idx + 1}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-bold">
                                    {uw.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{uw.name}</p>
                                    <p className="text-xs text-gray-500">{uw.appsProcessed} apps · avg {uw.avgReviewTime}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-600">{uw.approvalRate}%</p>
                                    <div className="flex items-center justify-end gap-0.5">
                                        {uw.weekTrend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                                        {uw.weekTrend === 'down' && <ArrowDownRight className="w-3 h-3 text-red-500" />}
                                        <span className="text-xs text-gray-500">{uw.weekTrend}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Performance */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900">Product Performance</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Product</th>
                                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Apps</th>
                                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Conv.</th>
                                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Volume</th>
                                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Claims</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockProducts.map((p) => (
                                    <tr key={p.product} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-900">{p.product}</p>
                                            <p className="text-xs text-gray-500">avg {p.avgPremium}</p>
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">{p.applications}</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className={`text-sm font-bold ${p.conversionRate >= 70 ? 'text-emerald-600' : p.conversionRate >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {p.conversionRate}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">{p.premiumVolume}</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className={`text-sm font-bold ${p.claimRate <= 10 ? 'text-emerald-600' : p.claimRate <= 20 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {p.claimRate}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

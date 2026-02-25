import { useState } from 'react';
import { AlertTriangle, TrendingUp, Shield, BarChart3, Filter, Download, ChevronDown, Eye } from 'lucide-react';
import { DonutChart } from './ui/Charts';

interface RiskEntry {
  id: string;
  applicantName: string;
  product: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  flaggedReasons: string[];
  date: string;
  status: string;
}

const mockFlaggedApps: RiskEntry[] = [
  { id: 'APP-2024-0891', applicantName: 'Abebe Kebede', product: 'Motor Comprehensive', riskScore: 92, riskLevel: 'Critical', flaggedReasons: ['Vehicle age > 20 years', 'High coverage amount'], date: '2025-01-18', status: 'Manual Review' },
  { id: 'APP-2024-0887', applicantName: 'Tigist Mengistu', product: 'Health Star Plus', riskScore: 85, riskLevel: 'High', flaggedReasons: ['Pre-existing condition'], date: '2025-01-17', status: 'Under Review' },
  { id: 'APP-2024-0882', applicantName: 'Dawit Haile', product: 'SME Fire & Property', riskScore: 78, riskLevel: 'High', flaggedReasons: ['High-value asset', 'Location risk zone'], date: '2025-01-16', status: 'Pending' },
  { id: 'APP-2024-0875', applicantName: 'Meron Tadesse', product: 'Motor Comprehensive', riskScore: 74, riskLevel: 'High', flaggedReasons: ['Multiple claims history'], date: '2025-01-15', status: 'Under Review' },
  { id: 'APP-2024-0871', applicantName: 'Yonas Girma', product: 'Travel Secure', riskScore: 68, riskLevel: 'Medium', flaggedReasons: ['Destination risk'], date: '2025-01-14', status: 'Approved' },
  { id: 'APP-2024-0865', applicantName: 'Sara Bekele', product: 'Health Star Plus', riskScore: 55, riskLevel: 'Medium', flaggedReasons: ['Age bracket'], date: '2025-01-13', status: 'Approved' },
];

const riskDistribution = [
  { product: 'Motor Comprehensive', low: 45, medium: 30, high: 18, critical: 7 },
  { product: 'Health Star Plus', low: 52, medium: 28, high: 15, critical: 5 },
  { product: 'SME Fire & Property', low: 38, medium: 35, high: 20, critical: 7 },
  { product: 'Travel Secure', low: 65, medium: 25, high: 8, critical: 2 },
];

const portfolioRiskData = [
  { label: 'Low Risk', value: 450, color: '#10b981' },
  { label: 'Medium Risk', value: 280, color: '#fbbf24' },
  { label: 'High Risk', value: 120, color: '#f97316' },
  { label: 'Critical Risk', value: 45, color: '#ef4444' },
];

export default function RiskReportsView() {
  const [sortField, setSortField] = useState<'riskScore' | 'date'>('riskScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskBarColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-400';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-gray-300';
    }
  };

  const getScoreBarWidth = (score: number) => `${score}%`;

  const filteredApps = mockFlaggedApps
    .filter(app => filterLevel === 'all' || app.riskLevel === filterLevel)
    .sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1;
      if (sortField === 'riskScore') return (a.riskScore - b.riskScore) * mul;
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * mul;
    });

  const toggleSort = (field: 'riskScore' | 'date') => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Reports</h1>
          <p className="text-sm text-gray-600 mt-1">Portfolio risk exposure and flagged application overview</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Exposure</p>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">ETB 24.8M</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">42.5</p>
          <p className="text-xs text-amber-600 font-semibold mt-2">↑ 3pts from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Loss Ratio</p>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">38.2%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">↓ 2.1% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">High-Risk Count</p>
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">14</p>
          <p className="text-xs text-red-600 font-semibold mt-2">↑ 3 from last month</p>
        </div>
      </div>

      {/* Portfolio Risk & Product Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Risk Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Portfolio Risk Exposure</h2>
              <p className="text-sm text-gray-500 mt-1">Total distribution by risk category</p>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <DonutChart data={portfolioRiskData} />
          </div>
        </div>

        {/* Risk Distribution by Product */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Risk by Product Line</h2>
              <p className="text-sm text-gray-500 mt-1">Percentage baseline by risk level</p>
            </div>
          </div>

          <div className="space-y-5">
            {riskDistribution.map((row) => {
              const total = row.low + row.medium + row.high + row.critical;
              return (
                <div key={row.product} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-tight">{row.product}</p>
                    <p className="text-[10px] text-gray-500 font-semibold">{total} apps</p>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                    <div className={`${getRiskBarColor('low')} transition-all`} style={{ width: `${row.low}%` }}></div>
                    <div className={`${getRiskBarColor('medium')} transition-all`} style={{ width: `${row.medium}%` }}></div>
                    <div className={`${getRiskBarColor('high')} transition-all`} style={{ width: `${row.high}%` }}></div>
                    <div className={`${getRiskBarColor('critical')} transition-all`} style={{ width: `${row.critical}%` }}></div>
                  </div>
                  <div className="flex items-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {row.low}% L</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> {row.medium}% M</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {row.high}% H</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {row.critical}% C</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flagged Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Flagged Applications</h2>
            <p className="text-sm text-gray-500 mt-1">Applications flagged by the Rule Engine for review</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <Filter className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Application</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none" onClick={() => toggleSort('riskScore')}>
                  <span className="flex items-center gap-1">Risk Score {sortField === 'riskScore' && (sortDir === 'desc' ? '↓' : '↑')}</span>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Flags</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none" onClick={() => toggleSort('date')}>
                  <span className="flex items-center gap-1">Date {sortField === 'date' && (sortDir === 'desc' ? '↓' : '↑')}</span>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{app.applicantName}</p>
                    <p className="text-xs text-gray-500">{app.id}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{app.product}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900 w-8">{app.riskScore}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-[80px]">
                        <div
                          className={`h-full rounded-full transition-all ${app.riskScore >= 80 ? 'bg-red-500' :
                              app.riskScore >= 60 ? 'bg-orange-500' :
                                app.riskScore >= 40 ? 'bg-amber-400' : 'bg-emerald-500'
                            }`}
                          style={{ width: getScoreBarWidth(app.riskScore) }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getRiskColor(app.riskLevel)}`}>
                      {app.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {app.flaggedReasons.map((reason, i) => (
                        <p key={i} className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded inline-block mr-1">
                          {reason}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert(`Viewing ${app.id}`)}
                      className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4 text-emerald-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { PolicyApplication } from '../types';

interface QueueViewProps {
  applications: PolicyApplication[];
  onSelectApplication: (app: PolicyApplication) => void;
}

export default function QueueView({ applications, onSelectApplication }: QueueViewProps) {
  const summaryCards = [
    {
      label: 'Pending Reviews',
      value: '12',
      trend: '+12.5%',
      trendUp: true,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Urgent Risk',
      value: '3',
      trend: '-5.1%',
      trendUp: false,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Approved Today',
      value: '8',
      trend: '+15.3%',
      trendUp: true,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Avg Turnaround',
      value: '2.4h',
      trend: '-8.2%',
      trendUp: true,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-40 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <div className={`${card.bgColor} ${card.color} p-2.5 rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-4xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-semibold ${card.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                    {card.trend}
                  </span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by applicant name or policy ID..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
            />
          </div>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Dates</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Risk Levels</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Products</option>
            <option>Motor Comprehensive</option>
            <option>Health Insurance</option>
            <option>Property & Fire</option>
            <option>Business Liability</option>
          </select>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Policy ID
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50/50 cursor-pointer transition-colors h-20"
                  onClick={() => onSelectApplication(app)}
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{app.id}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{app.date}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{app.applicantName}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{app.product}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border ${getRiskBadgeColor(app.riskLevel)}`}>
                      {app.riskScore} - {app.riskLevel}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                        {getInitials(app.assignedTo)}
                      </div>
                      <span className="text-sm text-gray-700">{app.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors">
                      Review →
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

import { TrendingUp, FileCheck, Target, TrendingDown, Plus, UserPlus, Download, DollarSign } from 'lucide-react';
import { PolicyApplication } from '../types';

interface DashboardViewProps {
  applications: PolicyApplication[];
}

export default function DashboardView({ applications }: DashboardViewProps) {
  const approvedCount = applications.filter(app => app.status === 'Approved').length;
  const avgRiskScore = Math.round(applications.reduce((sum, app) => sum + app.riskScore, 0) / applications.length);
  const pendingCount = applications.filter(app => app.status === 'Pending' || app.status === 'Under Review').length;
  const kpiCards = [
    {
      label: 'Total Premium (MTD)',
      value: 'ETB 4.5M',
      trend: '+12%',
      trendUp: true,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Policies Bound',
      value: approvedCount.toString(),
      trend: '+5%',
      trendUp: true,
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Avg. Risk Score',
      value: `${avgRiskScore}/100`,
      trend: avgRiskScore < 50 ? 'Low Risk' : avgRiskScore < 70 ? 'Medium Risk' : 'High Risk',
      trendUp: avgRiskScore < 60,
      icon: Target,
      color: avgRiskScore < 60 ? 'text-emerald-600' : 'text-amber-600',
      bgColor: avgRiskScore < 60 ? 'bg-emerald-50' : 'bg-amber-50'
    },
    {
      label: 'Pending Reviews',
      value: pendingCount.toString(),
      trend: `${applications.length} total`,
      trendUp: false,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const quickActions = [
    {
      title: 'New Manual Quote',
      icon: Plus,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Invite Broker',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Download Monthly Report',
      icon: Download,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivity = [
    { user: 'Sara T.', action: 'approved Policy #POL-2024-1843', time: '2 mins ago' },
    { user: 'Meron K.', action: 'declined Policy #POL-2024-1842', time: '15 mins ago' },
    { user: 'Dawit A.', action: 'requested info for Policy #POL-2024-1841', time: '28 mins ago' }
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-8">
        {kpiCards.map((card, index) => {
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
                  {card.label === 'Avg. Risk Score' ? (
                    <span className="text-xs text-gray-500">Portfolio</span>
                  ) : (
                    <span className="text-xs text-gray-500">vs last month</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-3 gap-8">
        {/* Application Volume Trend - 2/3 width */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Application Volume Trend</h3>
            <p className="text-sm text-gray-500">Applications vs. Approvals (Last 30 Days)</p>
          </div>

          {/* Chart Mock - Line Chart */}
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-4">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-8 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-gray-100"></div>
                ))}
              </div>

              {/* SVG Chart */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Applications line (emerald) */}
                <path
                  d="M 0,180 L 50,160 L 100,140 L 150,165 L 200,130 L 250,145 L 300,110 L 350,125 L 400,95 L 450,105 L 500,80"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 0,180 L 50,160 L 100,140 L 150,165 L 200,130 L 250,145 L 300,110 L 350,125 L 400,95 L 450,105 L 500,80 L 500,256 L 0,256 Z"
                  fill="url(#gradient1)"
                  opacity="0.1"
                />

                {/* Approvals line (blue) */}
                <path
                  d="M 0,200 L 50,185 L 100,170 L 150,180 L 200,160 L 250,165 L 300,145 L 350,155 L 400,130 L 450,140 L 500,120"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  vectorEffect="non-scaling-stroke"
                />

                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Applications</span>
              <span className="text-sm font-semibold text-gray-900">847</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Approvals</span>
              <span className="text-sm font-semibold text-gray-900">576</span>
            </div>
          </div>
        </div>

        {/* Portfolio Distribution - 1/3 width */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Portfolio Distribution</h3>
            <p className="text-sm text-gray-500">By Product Type</p>
          </div>

          {/* Donut Chart Mock */}
          <div className="flex items-center justify-center h-48">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Donut segments */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#10B981"
                strokeWidth="40"
                strokeDasharray="263 439"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="40"
                strokeDasharray="110 439"
                strokeDashoffset="-263"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="40"
                strokeDasharray="66 439"
                strokeDashoffset="-373"
                transform="rotate(-90 100 100)"
              />
              {/* Center circle to create donut effect */}
              <circle cx="100" cy="100" r="50" fill="white" />

              {/* Center text */}
              <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                142
              </text>
              <text x="100" y="115" textAnchor="middle" className="text-xs fill-gray-500">
                Policies
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Motor</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Health</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Property</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-8">
        {/* Quick Actions - 2/3 width */}
        <div className="col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className={`${action.bgColor} ${action.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{action.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity - 1/3 width */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {activity.user.split(' ')[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

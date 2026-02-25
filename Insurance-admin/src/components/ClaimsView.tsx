import { AlertTriangle, CheckCircle, Clock, FileText, DollarSign, Calendar } from 'lucide-react';
import { Claim } from '../types';

interface ClaimsViewProps {
  claims: Claim[];
  onSelectClaim: (claim: Claim) => void;
}

export default function ClaimsView({ claims, onSelectClaim }: ClaimsViewProps) {

  const summaryCards = [
    {
      label: 'Total Claims',
      value: claims.length.toString(),
      trend: '+8 this month',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Pending Review',
      value: claims.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length.toString(),
      trend: 'Requires action',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Approved Claims',
      value: claims.filter(c => c.status === 'Approved' || c.status === 'Paid').length.toString(),
      trend: '75% approval rate',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Total Payout',
      value: 'ETB 1.2M',
      trend: 'This month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800';
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-sm text-gray-600 mt-1">Review and process insurance claims</p>
        </div>
      </div>

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
                <p className="text-xs text-gray-500">{card.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by claim ID, policy number, or customer name..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
            />
          </div>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Status</option>
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Paid</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Products</option>
            <option>Motor Comprehensive</option>
            <option>Health Star Plus</option>
            <option>Property & Fire</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Dates</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Policy Number
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Claim Type
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className="hover:bg-gray-50/50 cursor-pointer transition-colors h-20"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{claim.id}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{claim.policyNumber}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{claim.customerName}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{claim.product}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{claim.claimType}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{claim.claimAmount}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                        {getInitials(claim.assignedTo)}
                      </div>
                      <span className="text-sm text-gray-700">{claim.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{claim.submittedDate}</span>
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

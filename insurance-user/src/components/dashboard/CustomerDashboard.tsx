import { Shield, Banknote, Calendar, CheckCircle, AlertTriangle, RefreshCw, Download, Car, Heart, Plane, Home, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import QuickActionCard from './QuickActionCard';
import PolicyCard from './PolicyCard';
import AddPolicyCard from './AddPolicyCard';
import DiscoverMoreCard from './DiscoverMoreCard';
import PendingPaymentsCard from './PendingPaymentsCard';
import RenewalBanner from './RenewalBanner';
import { AreaChart } from '../ui/Charts';

const paymentHistory = [
  { label: 'Jul', value: 3200 },
  { label: 'Aug', value: 4500 },
  { label: 'Sep', value: 4500 },
  { label: 'Oct', value: 3200 },
  { label: 'Nov', value: 6800 },
  { label: 'Dec', value: 8200 },
];

interface CustomerDashboardProps {
  onAddPolicy?: () => void;
  onPayment?: (applicationId: string) => void;
  onNavigate?: (view: string) => void;
}

export default function CustomerDashboard({ onAddPolicy, onPayment, onNavigate }: CustomerDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your insurance portfolio</p>
      </div>

      {onPayment && <PendingPaymentsCard onPayment={onPayment} />}

      <RenewalBanner onRenew={() => onNavigate?.('policies')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Shield}
          title="Active Policies"
          value="2"
          bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <MetricCard
          icon={Banknote}
          title="Total Coverage"
          value="ETB 2.5M"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={Calendar}
          title="Next Payment"
          value="Jan 25"
          bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <MetricCard
          icon={CheckCircle}
          title="Active Claims"
          value="0"
          bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Active Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PolicyCard
                icon={Car}
                title="Motor Comprehensive"
                details="Toyota Corolla • Code 2-B48291"
                expiry="Jan 01, 2026"
                expiryStatus="healthy"
                borderColor="border-blue-500"
              />
              <PolicyCard
                icon={Heart}
                title="Health Insurance"
                details="Family Plan • Code H-3290A"
                expiry="Feb 15, 2025"
                expiryStatus="warning"
                borderColor="border-rose-500"
              />
              <AddPolicyCard onClick={() => onAddPolicy?.()} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Protect more of your life</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DiscoverMoreCard
                icon={Plane}
                title="Travel Insurance"
                subtitle="From 500 ETB/trip"
                bgColor="bg-gradient-to-br from-sky-500 to-sky-600"
              />
              <DiscoverMoreCard
                icon={Home}
                title="Home Insurance"
                subtitle="Protect against fire & theft"
                bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Spending Insights</h2>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">+12%</span>
              </div>
            </div>
            <div className="h-40">
              <AreaChart data={paymentHistory} color="#10b981" height={160} />
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-4 font-medium italic">Premium payment history (Last 6 months)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Payment Success</p>
                    <p className="text-sm text-gray-600">ETB 4,500</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>

              <div className="pb-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Policy Renewal</p>
                    <p className="text-sm text-gray-600">Motor Insurance</p>
                    <p className="text-xs text-gray-400 mt-1">Last Week</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Policy Issued</p>
                    <p className="text-sm text-gray-600">Health Insurance</p>
                    <p className="text-xs text-gray-400 mt-1">2 Weeks Ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What would you like to do?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            icon={AlertTriangle}
            title="File a Claim"
            description="Submit a new insurance claim"
            accentColor="bg-gradient-to-br from-red-500 to-red-600"
          />
          <QuickActionCard
            icon={RefreshCw}
            title="Renew Policy"
            description="Renew your existing policies"
            accentColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <QuickActionCard
            icon={Download}
            title="Download Certificate"
            description="Get your policy documents"
            accentColor="bg-gradient-to-br from-gray-600 to-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

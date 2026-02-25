import { useState } from 'react';
import { Plus, Car, Heart, Plane, Home } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PromoCard from '../components/policies/PromoCard';
import DetailedPolicyCard from '../components/policies/DetailedPolicyCard';
import ApplicationTrackerCard from '../components/policies/ApplicationTrackerCard';
import AddPolicyModal from '../components/policies/AddPolicyModal';
import PolicyManagementModal from '../components/policies/PolicyManagementModal';
import RenewalModal from '../components/policies/RenewalModal';

interface MyPoliciesProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onAddPolicy: () => void;
  onPayment?: (applicationId: string) => void;
}

interface PolicyData {
  policyNumber: string;
  title: string;
  icon: typeof Car;
  coveredItem: string;
  coveragePeriod: string;
  premium: string;
  status: 'active' | 'renew-soon' | 'expired';
  borderColor: string;
}

export default function MyPolicies({ onLogout, onNavigate, onAddPolicy, onPayment }: MyPoliciesProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'history'>('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);
  const [showRenewalModal, setShowRenewalModal] = useState(false);

  const handleSelectPolicyType = (type: string) => {
    console.log('Selected policy type:', type);
    setShowAddModal(false);
  };

  const handleManagePolicy = (policy: PolicyData) => {
    setSelectedPolicy(policy);
  };

  const handleDownloadPolicy = (policyNumber: string) => {
    alert(`Downloading policy document for ${policyNumber}. The PDF will be generated and downloaded.`);
  };

  const pendingApplicationSteps = [
    { label: 'Submitted', status: 'completed' as const },
    { label: 'Under Review', status: 'completed' as const },
    { label: 'Approved', status: 'current' as const },
    { label: 'Payment', status: 'pending' as const },
    { label: 'Active', status: 'pending' as const },
  ];

  return (
    <DashboardLayout onLogout={onLogout} activeView="policies" onNavigate={onNavigate}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Policies</h1>
            <p className="text-gray-600 mt-1">Manage your insurance coverage</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRenewalModal(true)}
              className="border-2 border-amber-500 text-amber-700 px-5 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all flex items-center gap-2"
            >
              Renew Policy
            </button>
            <button
              onClick={() => onNavigate('compare')}
              className="border-2 border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2"
            >
              Compare Products
            </button>
            <button
              onClick={onAddPolicy}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Policy
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Exclusive Offers for You, Tigist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PromoCard
              title="Bundle & Save"
              description="Save 15% on Home Insurance when you bundle with your Car."
              buttonText="View Offer"
              gradientColors="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <PromoCard
              title="Travel Secure"
              description="Planning a trip? Get Travel Secure starting at 500 ETB."
              buttonText="Get Quote"
              gradientColors="bg-gradient-to-br from-orange-500 to-orange-600"
            />
          </div>
        </div>

        <div>
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'active'
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Active Policies
                {activeTab === 'active' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'pending'
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Pending Applications
                {activeTab === 'pending' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'history'
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                History / Expired
                {activeTab === 'history' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'active' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DetailedPolicyCard
                icon={Car}
                title="Motor Comprehensive"
                policyNumber="POL-2024-8821"
                coveredItem="Toyota Corolla (Code 2-B48291)"
                coveragePeriod="Jan 1, 2025 - Jan 1, 2026"
                premium="ETB 4,500 / year"
                status="active"
                borderColor="border-blue-500"
                onManage={() => handleManagePolicy({
                  policyNumber: 'POL-2024-8821',
                  title: 'Motor Comprehensive',
                  icon: Car,
                  coveredItem: 'Toyota Corolla (Code 2-B48291)',
                  coveragePeriod: 'Jan 1, 2025 - Jan 1, 2026',
                  premium: 'ETB 4,500 / year',
                  status: 'active',
                  borderColor: 'border-blue-500'
                })}
                onDownload={() => handleDownloadPolicy('POL-2024-8821')}
              />
              <DetailedPolicyCard
                icon={Heart}
                title="Health Insurance"
                policyNumber="POL-2024-7653"
                coveredItem="Family Plan (Code H-3290A)"
                coveragePeriod="Feb 15, 2024 - Feb 15, 2025"
                premium="ETB 8,200 / year"
                status="renew-soon"
                borderColor="border-rose-500"
                onManage={() => handleManagePolicy({
                  policyNumber: 'POL-2024-7653',
                  title: 'Health Insurance',
                  icon: Heart,
                  coveredItem: 'Family Plan (Code H-3290A)',
                  coveragePeriod: 'Feb 15, 2024 - Feb 15, 2025',
                  premium: 'ETB 8,200 / year',
                  status: 'renew-soon',
                  borderColor: 'border-rose-500'
                })}
                onDownload={() => handleDownloadPolicy('POL-2024-7653')}
              />
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="space-y-6">
              <ApplicationTrackerCard
                applicationId="APP-2025-1201"
                date="Dec 29, 2024"
                icon={Home}
                title="Home Insurance - Comprehensive"
                coverage="Property coverage up to ETB 2,000,000"
                status="Approved"
                statusColor="bg-emerald-100 text-emerald-700"
                steps={pendingApplicationSteps}
                needsPayment={true}
                onPayment={onPayment}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DetailedPolicyCard
                icon={Plane}
                title="Travel Insurance"
                policyNumber="POL-2023-4421"
                coveredItem="Europe Trip (Code T-1120B)"
                coveragePeriod="Jul 10, 2023 - Jul 25, 2023"
                premium="ETB 850 / trip"
                status="expired"
                borderColor="border-sky-500"
                onManage={() => handleManagePolicy({
                  policyNumber: 'POL-2023-4421',
                  title: 'Travel Insurance',
                  icon: Plane,
                  coveredItem: 'Europe Trip (Code T-1120B)',
                  coveragePeriod: 'Jul 10, 2023 - Jul 25, 2023',
                  premium: 'ETB 850 / trip',
                  status: 'expired',
                  borderColor: 'border-sky-500'
                })}
                onDownload={() => handleDownloadPolicy('POL-2023-4421')}
              />
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddPolicyModal
          onClose={() => setShowAddModal(false)}
          onSelectType={handleSelectPolicyType}
        />
      )}

      {selectedPolicy && (
        <PolicyManagementModal
          isOpen={!!selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
          policyNumber={selectedPolicy.policyNumber}
          title={selectedPolicy.title}
          icon={selectedPolicy.icon}
          coveredItem={selectedPolicy.coveredItem}
          coveragePeriod={selectedPolicy.coveragePeriod}
          premium={selectedPolicy.premium}
          status={selectedPolicy.status}
          borderColor={selectedPolicy.borderColor}
        />
      )}

      <RenewalModal isOpen={showRenewalModal} onClose={() => setShowRenewalModal(false)} />
    </DashboardLayout>
  );
}

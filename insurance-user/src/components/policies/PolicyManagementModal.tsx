import { X, Calendar, FileText, AlertTriangle, Download, Mail } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface PolicyManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyNumber: string;
  title: string;
  icon: LucideIcon;
  coveredItem: string;
  coveragePeriod: string;
  premium: string;
  status: 'active' | 'renew-soon' | 'expired';
  borderColor: string;
}

export default function PolicyManagementModal({
  isOpen,
  onClose,
  policyNumber,
  title,
  icon: Icon,
  coveredItem,
  coveragePeriod,
  premium,
  status,
  borderColor
}: PolicyManagementModalProps) {
  if (!isOpen) return null;

  const calculateDaysRemaining = () => {
    const endDate = coveragePeriod.split(' - ')[1];
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining();

  const handleCancelPolicy = () => {
    if (confirm(`Are you sure you want to cancel policy ${policyNumber}? This action cannot be undone.`)) {
      alert('Policy cancellation request submitted. Our team will contact you within 24 hours.');
      onClose();
    }
  };

  const handleDownloadPolicy = () => {
    alert(`Downloading policy document for ${policyNumber}...`);
  };

  const handleRequestChange = () => {
    alert('Change request form will be sent to your email.');
  };

  const handleContactSupport = () => {
    alert('Redirecting to support chat...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${borderColor.replace('border-', 'bg-').replace('-500', '-100')} flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${borderColor.replace('border-', 'text-')}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 font-mono">{policyNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {status === 'active' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Coverage Active</h3>
                  <p className="text-gray-700 text-sm">
                    Your policy is currently active with <span className="font-bold text-emerald-700">{daysRemaining} days</span> remaining until renewal.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Coverage Period: {coveragePeriod}</p>
                </div>
              </div>
            </div>
          )}

          {status === 'renew-soon' && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Renewal Required</h3>
                  <p className="text-gray-700 text-sm">
                    Your policy expires in <span className="font-bold text-orange-700">{daysRemaining} days</span>. Please renew to maintain coverage.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Coverage Period: {coveragePeriod}</p>
                </div>
              </div>
            </div>
          )}

          {status === 'expired' && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Policy Expired</h3>
                  <p className="text-gray-700 text-sm">
                    This policy has expired. Contact support to renew or purchase a new policy.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Coverage Period: {coveragePeriod}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Policy Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Covered Item</p>
                <p className="text-sm font-semibold text-gray-900">{coveredItem}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Premium</p>
                <p className="text-sm font-semibold text-gray-900">{premium}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{status.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Next Payment</p>
                <p className="text-sm font-semibold text-gray-900">
                  {status === 'expired' ? 'N/A' : 'Auto-renew enabled'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">Policy Actions</h3>

            <button
              onClick={handleDownloadPolicy}
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Download Policy Document</p>
                  <p className="text-xs text-gray-500">Get a PDF copy of your policy</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleRequestChange}
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Request Policy Changes</p>
                  <p className="text-xs text-gray-500">Update coverage or beneficiary information</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleContactSupport}
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-left hover:border-teal-300 hover:bg-teal-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Contact Support</p>
                  <p className="text-xs text-gray-500">Get help with your policy</p>
                </div>
              </div>
            </button>

            {status !== 'expired' && (
              <button
                onClick={handleCancelPolicy}
                className="w-full px-6 py-4 bg-white border-2 border-red-200 rounded-xl text-left hover:border-red-400 hover:bg-red-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-900">Cancel Policy</p>
                    <p className="text-xs text-red-600">Terminate this policy permanently</p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Upload,
  Download
} from 'lucide-react';
import { Claim } from '../types';

interface ClaimReviewViewProps {
  claim: Claim;
  onBack: () => void;
  onUpdate: (claim: Claim) => void;
}

export default function ClaimReviewView({ claim, onBack, onUpdate }: ClaimReviewViewProps) {
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [adjustedAmount, setAdjustedAmount] = useState(claim.claimAmount);
  const [notes, setNotes] = useState('');

  const handleApprove = () => {
    const updatedClaim: Claim = {
      ...claim,
      status: 'Approved'
    };
    onUpdate(updatedClaim);
    setTimeout(() => {
      setShowActionModal(false);
      onBack();
    }, 1000);
  };

  const handleReject = () => {
    const updatedClaim: Claim = {
      ...claim,
      status: 'Rejected'
    };
    onUpdate(updatedClaim);
    setTimeout(() => {
      setShowActionModal(false);
      onBack();
    }, 1000);
  };

  const confirmAction = () => {
    if (actionType === 'approve') {
      handleApprove();
    } else if (actionType === 'reject') {
      handleReject();
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const documents = [
    { name: 'Claim Form.pdf', size: '245 KB', uploadedDate: 'Dec 28, 2024' },
    { name: 'Medical Report.pdf', size: '1.2 MB', uploadedDate: 'Dec 28, 2024' },
    { name: 'Invoice.pdf', size: '156 KB', uploadedDate: 'Dec 28, 2024' },
    { name: 'Photos.zip', size: '3.4 MB', uploadedDate: 'Dec 28, 2024' }
  ];

  const timeline = [
    { event: 'Claim Submitted', date: 'Dec 28, 2024 10:30 AM', user: claim.customerName },
    { event: 'Assigned to Adjuster', date: 'Dec 28, 2024 11:15 AM', user: claim.assignedTo },
    { event: 'Documents Verified', date: 'Dec 28, 2024 2:45 PM', user: claim.assignedTo },
    { event: 'Under Review', date: 'Dec 28, 2024 3:00 PM', user: claim.assignedTo }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="p-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Claims</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{claim.id}</h1>
              <p className="text-gray-600 mt-2">{claim.claimType} - {claim.product}</p>
            </div>
            <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusBadgeColor(claim.status)}`}>
              {claim.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content - Left Side (2/3) */}
          <div className="col-span-2 space-y-6">
            {/* Claim Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Claim Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Policy Number</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.policyNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Claim Type</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.claimType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.product}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Submitted Date</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.submittedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Claimed Amount</p>
                  <p className="text-lg font-bold text-emerald-900">{claim.claimAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.assignedTo}</p>
                </div>
              </div>
            </div>

            {/* Claimant Information */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Claimant Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact Number</p>
                  <p className="text-sm font-semibold text-gray-900">+251 91 234 5678</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-semibold text-gray-900">{claim.customerName.toLowerCase().replace(' ', '.')}@email.com</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer ID</p>
                  <p className="text-sm font-semibold text-gray-900">CUST-{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-emerald-600" />
                Incident Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date of Incident</p>
                  <p className="text-sm font-semibold text-gray-900">Dec 25, 2024</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-semibold text-gray-900">Bole Road, Addis Ababa</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {claim.claimType === 'Accident Damage' && 'Vehicle was involved in a collision with another vehicle at an intersection. Front bumper and headlight damaged. Police report filed at the scene.'}
                    {claim.claimType === 'Medical Treatment' && 'Emergency medical treatment required due to sudden illness. Hospitalized for 3 days with complete medical documentation.'}
                    {claim.claimType === 'Theft' && 'Vehicle was stolen from parking lot. Police report filed immediately. No recovery as of date.'}
                    {claim.claimType === 'Surgery' && 'Planned surgery for covered medical condition. All pre-authorization requirements met.'}
                    {claim.claimType === 'Fire Damage' && 'Vehicle damaged due to electrical fire. Fire department report available.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                Supporting Documents
              </h3>
              <div className="space-y-3">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • Uploaded {doc.uploadedDate}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Adjuster Notes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                Adjuster Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your assessment notes here..."
                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Right Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Amount Adjustment */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Settlement Amount
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Claimed Amount</p>
                  <p className="text-lg font-bold text-gray-900">{claim.claimAmount}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Approved Amount</label>
                  <input
                    type="text"
                    value={adjustedAmount}
                    onChange={(e) => setAdjustedAmount(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-900">Policy Coverage Limit</p>
                  <p className="text-sm font-bold text-blue-900 mt-1">ETB 500,000</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Activity Timeline
              </h3>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      {idx < timeline.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-semibold text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      <p className="text-xs text-gray-600 mt-0.5">by {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-end gap-4">
            <button
              onClick={() => {
                setActionType('reject');
                setShowActionModal(true);
              }}
              disabled={claim.status === 'Approved' || claim.status === 'Rejected' || claim.status === 'Paid'}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject Claim
            </button>
            <button
              onClick={() => {
                setActionType('approve');
                setShowActionModal(true);
              }}
              disabled={claim.status === 'Approved' || claim.status === 'Rejected' || claim.status === 'Paid'}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve & Process
            </button>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {actionType === 'approve' && 'Approve Claim'}
                {actionType === 'reject' && 'Reject Claim'}
              </h3>
              <p className="text-sm text-gray-600">
                {actionType === 'approve' && `Are you sure you want to approve this claim for ${adjustedAmount}? The payment will be processed.`}
                {actionType === 'reject' && 'Are you sure you want to reject this claim? The customer will be notified.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm ${
                  actionType === 'reject'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

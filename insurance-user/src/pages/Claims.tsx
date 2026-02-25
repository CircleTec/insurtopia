import { useState } from 'react';
import { FileText, Plus, Search, Filter, Clock, CheckCircle, XCircle, DollarSign, AlertCircle, ChevronRight, X, Upload, ArrowLeft, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Claim, ClaimTimelineEvent } from '../types';

interface ClaimsProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const mockClaims: Claim[] = [
  {
    id: 'CLM-2024-001',
    policyId: 'POL-001',
    policyNumber: 'MC-ETH-2024-00142',
    productName: 'Motor Comprehensive',
    type: 'Accident Damage',
    status: 'under_review',
    filedDate: '2024-12-15',
    lastUpdated: '2024-12-18',
    amount: 85000,
    description: 'Rear-end collision at Meskel Square intersection. Vehicle sustained bumper and trunk damage.',
    documents: [
      { id: 'd1', name: 'Police Report.pdf', type: 'application/pdf', size: 245000, uploadDate: '2024-12-15', category: 'Police Report' },
      { id: 'd2', name: 'Damage Photos.zip', type: 'application/zip', size: 12800000, uploadDate: '2024-12-15', category: 'Photos' },
      { id: 'd3', name: 'Repair Estimate.pdf', type: 'application/pdf', size: 180000, uploadDate: '2024-12-16', category: 'Estimate' }
    ],
    timeline: [
      { id: 't1', date: '2024-12-15', title: 'Claim Filed', description: 'You submitted your claim online', status: 'completed' },
      { id: 't2', date: '2024-12-15', title: 'Documents Received', description: 'All required documents were uploaded', status: 'completed' },
      { id: 't3', date: '2024-12-16', title: 'Assigned to Adjuster', description: 'Claim assigned to Adjuster Kebede M.', status: 'completed' },
      { id: 't4', date: '2024-12-18', title: 'Under Review', description: 'Adjuster is reviewing your claim and documents', status: 'current' },
      { id: 't5', date: '', title: 'Decision', description: 'Pending adjuster decision', status: 'pending' },
      { id: 't6', date: '', title: 'Payment', description: 'If approved, payment will be processed', status: 'pending' }
    ]
  },
  {
    id: 'CLM-2024-002',
    policyId: 'POL-002',
    policyNumber: 'HS-ETH-2024-00089',
    productName: 'Health Star Plus',
    type: 'Medical Expense',
    status: 'approved',
    filedDate: '2024-11-28',
    lastUpdated: '2024-12-10',
    amount: 32000,
    description: 'Emergency hospital visit at Tikur Anbessa Hospital for acute appendicitis treatment.',
    documents: [
      { id: 'd4', name: 'Hospital Invoice.pdf', type: 'application/pdf', size: 320000, uploadDate: '2024-11-28', category: 'Invoice' },
      { id: 'd5', name: 'Discharge Summary.pdf', type: 'application/pdf', size: 150000, uploadDate: '2024-11-29', category: 'Medical Record' }
    ],
    timeline: [
      { id: 't7', date: '2024-11-28', title: 'Claim Filed', description: 'You submitted your claim', status: 'completed' },
      { id: 't8', date: '2024-11-29', title: 'Documents Verified', description: 'All documents verified', status: 'completed' },
      { id: 't9', date: '2024-12-05', title: 'Under Review', description: 'Clinical review completed', status: 'completed' },
      { id: 't10', date: '2024-12-10', title: 'Approved', description: 'Claim approved for ETB 32,000', status: 'completed' },
      { id: 't11', date: '', title: 'Payment Processing', description: 'Payment is being processed', status: 'current' }
    ]
  },
  {
    id: 'CLM-2024-003',
    policyId: 'POL-001',
    policyNumber: 'MC-ETH-2024-00142',
    productName: 'Motor Comprehensive',
    type: 'Windshield Replacement',
    status: 'paid',
    filedDate: '2024-10-05',
    lastUpdated: '2024-10-20',
    amount: 12500,
    description: 'Windshield cracked by road debris on the way to Adama.',
    documents: [
      { id: 'd6', name: 'Photo_windshield.jpg', type: 'image/jpeg', size: 2200000, uploadDate: '2024-10-05', category: 'Photos' }
    ],
    timeline: [
      { id: 't12', date: '2024-10-05', title: 'Claim Filed', description: 'Submitted online', status: 'completed' },
      { id: 't13', date: '2024-10-07', title: 'Approved', description: 'Fast-track approved', status: 'completed' },
      { id: 't14', date: '2024-10-20', title: 'Payment Sent', description: 'ETB 12,500 paid to your CBE account', status: 'completed' }
    ]
  },
  {
    id: 'CLM-2024-004',
    policyId: 'POL-003',
    policyNumber: 'TS-ETH-2024-00034',
    productName: 'Travel Secure',
    type: 'Trip Cancellation',
    status: 'rejected',
    filedDate: '2024-09-12',
    lastUpdated: '2024-09-25',
    amount: 45000,
    description: 'Flight cancellation due to personal schedule conflict.',
    documents: [
      { id: 'd7', name: 'Booking_confirmation.pdf', type: 'application/pdf', size: 95000, uploadDate: '2024-09-12', category: 'Booking' }
    ],
    timeline: [
      { id: 't15', date: '2024-09-12', title: 'Claim Filed', description: 'Submitted online', status: 'completed' },
      { id: 't16', date: '2024-09-18', title: 'Under Review', description: 'Reviewed by travel claims team', status: 'completed' },
      { id: 't17', date: '2024-09-25', title: 'Rejected', description: 'Personal schedule conflict is not a covered reason for cancellation', status: 'completed' }
    ]
  }
];

const mockPolicies = [
  { id: 'POL-001', policyNumber: 'MC-ETH-2024-00142', productName: 'Motor Comprehensive' },
  { id: 'POL-002', policyNumber: 'HS-ETH-2024-00089', productName: 'Health Star Plus' },
  { id: 'POL-003', policyNumber: 'TS-ETH-2024-00034', productName: 'Travel Secure' }
];

const claimTypes: Record<string, string[]> = {
  'Motor Comprehensive': ['Accident Damage', 'Theft', 'Windshield Replacement', 'Third-party Liability', 'Fire Damage'],
  'Health Star Plus': ['Medical Expense', 'Hospitalization', 'Prescription', 'Specialist Consultation'],
  'Travel Secure': ['Trip Cancellation', 'Lost Luggage', 'Medical Emergency Abroad', 'Flight Delay']
};

export default function Claims({ onLogout, onNavigate }: ClaimsProps) {
  const [claims] = useState<Claim[]>(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFileClaimModal, setShowFileClaimModal] = useState(false);
  const [fileClaimStep, setFileClaimStep] = useState(1);

  // File claim form state
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [selectedClaimType, setSelectedClaimType] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const getStatusConfig = (status: Claim['status']) => {
    switch (status) {
      case 'submitted': return { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: FileText };
      case 'under_review': return { label: 'Under Review', color: 'bg-amber-100 text-amber-800', icon: Clock };
      case 'approved': return { label: 'Approved', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle };
      case 'rejected': return { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle };
      case 'paid': return { label: 'Paid', color: 'bg-emerald-100 text-emerald-800', icon: DollarSign };
      default: return { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText };
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: claims.length,
    active: claims.filter(c => ['submitted', 'under_review'].includes(c.status)).length,
    approved: claims.filter(c => c.status === 'approved' || c.status === 'paid').length,
    totalAmount: claims.filter(c => c.status === 'approved' || c.status === 'paid').reduce((sum, c) => sum + c.amount, 0)
  };

  const selectedPolicy = mockPolicies.find(p => p.id === selectedPolicyId);
  const availableClaimTypes = selectedPolicy ? claimTypes[selectedPolicy.productName] || [] : [];

  const resetFileClaimForm = () => {
    setFileClaimStep(1);
    setSelectedPolicyId('');
    setSelectedClaimType('');
    setClaimAmount('');
    setClaimDescription('');
    setIncidentDate('');
    setUploadedFiles([]);
    setShowFileClaimModal(false);
  };

  // ─── CLAIM DETAIL VIEW ───
  if (selectedClaim) {
    const statusConf = getStatusConfig(selectedClaim.status);
    return (
      <DashboardLayout onLogout={onLogout} activeView="claims" onNavigate={onNavigate}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back + Header */}
          <button onClick={() => setSelectedClaim(null)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Claims
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedClaim.id}</h1>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusConf.color}`}>
                    <statusConf.icon className="w-3.5 h-3.5" />
                    {statusConf.label}
                  </span>
                </div>
                <p className="text-gray-600">{selectedClaim.type} • {selectedClaim.productName}</p>
                <p className="text-sm text-gray-500 mt-1">Policy: {selectedClaim.policyNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Claim Amount</p>
                <p className="text-3xl font-bold text-gray-900">ETB {selectedClaim.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
              <p className="text-sm text-gray-600">{selectedClaim.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs font-medium">Filed Date</p>
                <p className="font-semibold text-gray-900">{new Date(selectedClaim.filedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs font-medium">Last Updated</p>
                <p className="font-semibold text-gray-900">{new Date(selectedClaim.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs font-medium">Documents</p>
                <p className="font-semibold text-gray-900">{selectedClaim.documents.length} files</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Claim Timeline</h2>
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {selectedClaim.timeline.map((event: ClaimTimelineEvent) => (
                  <div key={event.id} className="flex items-start gap-4 relative">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${event.status === 'completed' ? 'bg-emerald-600' :
                        event.status === 'current' ? 'bg-blue-600 ring-4 ring-blue-100' :
                          'bg-gray-200'
                      }`}>
                      {event.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                      {event.status === 'current' && <Clock className="w-4 h-4 text-white" />}
                      {event.status === 'pending' && <div className="w-2 h-2 bg-gray-400 rounded-full"></div>}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold ${event.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                          {event.title}
                        </p>
                        {event.date && (
                          <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        )}
                      </div>
                      <p className={`text-sm mt-0.5 ${event.status === 'pending' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Supporting Documents</h2>
            <div className="space-y-3">
              {selectedClaim.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.category} • {(doc.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          {selectedClaim.status === 'under_review' && (
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-bold text-blue-900">Need to provide additional information?</p>
                  <p className="text-sm text-blue-700">Contact your claims adjuster directly</p>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
                Contact Adjuster
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ─── CLAIMS LIST VIEW ───
  return (
    <DashboardLayout onLogout={onLogout} activeView="claims" onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Claims Center</h1>
            <p className="text-sm text-gray-600 mt-1">File and track your insurance claims</p>
          </div>
          <button
            onClick={() => setShowFileClaimModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Plus className="w-5 h-5" />
            File a Claim
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Claims</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-sm text-gray-500">Active Claims</p>
            </div>
            <p className="text-3xl font-bold text-amber-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <p className="text-sm text-gray-500">Approved/Paid</p>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Settled</p>
            <p className="text-3xl font-bold text-gray-900">ETB {stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims by ID, product, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Claims List */}
        <div className="space-y-3">
          {filteredClaims.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No claims found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredClaims.map(claim => {
              const sc = getStatusConfig(claim.status);
              return (
                <button
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim)}
                  className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${claim.status === 'paid' || claim.status === 'approved' ? 'bg-emerald-100' :
                          claim.status === 'rejected' ? 'bg-red-100' :
                            'bg-amber-100'
                        }`}>
                        <sc.icon className={`w-6 h-6 ${claim.status === 'paid' || claim.status === 'approved' ? 'text-emerald-600' :
                            claim.status === 'rejected' ? 'text-red-600' :
                              'text-amber-600'
                          }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-bold text-gray-900">{claim.id}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.color}`}>
                            {sc.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">{claim.type} • {claim.productName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Filed: {new Date(claim.filedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">ETB {claim.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Policy: {claim.policyNumber}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ─── FILE CLAIM MODAL ─── */}
      {showFileClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">File a New Claim</h2>
                <p className="text-sm text-gray-500 mt-0.5">Step {fileClaimStep} of 3</p>
              </div>
              <button onClick={resetFileClaimForm} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Step Indicator */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={`h-1.5 flex-1 rounded-full transition-all ${step <= fileClaimStep ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] font-semibold text-gray-500">Select Policy</span>
                <span className="text-[10px] font-semibold text-gray-500">Claim Details</span>
                <span className="text-[10px] font-semibold text-gray-500">Documents</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Select Policy */}
              {fileClaimStep === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Select the policy for this claim</p>
                  {mockPolicies.map(policy => (
                    <button
                      key={policy.id}
                      onClick={() => { setSelectedPolicyId(policy.id); setSelectedClaimType(''); }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedPolicyId === policy.id
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                        }`}
                    >
                      <p className="text-sm font-bold text-gray-900">{policy.productName}</p>
                      <p className="text-xs text-gray-500 mt-1">Policy: {policy.policyNumber}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Claim Details */}
              {fileClaimStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Claim Type</label>
                    <select
                      value={selectedClaimType}
                      onChange={(e) => setSelectedClaimType(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    >
                      <option value="">Select type...</option>
                      {availableClaimTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Incident</label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Amount (ETB)</label>
                    <input
                      type="number"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={claimDescription}
                      onChange={(e) => setClaimDescription(e.target.value)}
                      placeholder="Describe what happened in detail..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {fileClaimStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Upload Supporting Documents</p>
                    <p className="text-xs text-gray-500 mb-4">Upload relevant documents like receipts, photos, police reports, or medical records.</p>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer"
                      onClick={() => setUploadedFiles([...uploadedFiles, `Document_${uploadedFiles.length + 1}.pdf`])}
                    >
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-gray-700">Click to upload files</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <p className="text-sm font-medium text-gray-700">{file}</p>
                          </div>
                          <button
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                            className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <p className="text-sm font-bold text-emerald-900 mb-3">Claim Summary</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Policy</span>
                        <span className="font-semibold text-emerald-900">{selectedPolicy?.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Type</span>
                        <span className="font-semibold text-emerald-900">{selectedClaimType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Amount</span>
                        <span className="font-semibold text-emerald-900">ETB {Number(claimAmount || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Documents</span>
                        <span className="font-semibold text-emerald-900">{uploadedFiles.length} files</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <button
                onClick={() => {
                  if (fileClaimStep > 1) setFileClaimStep(fileClaimStep - 1);
                  else resetFileClaimForm();
                }}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                {fileClaimStep === 1 ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={() => {
                  if (fileClaimStep < 3) {
                    setFileClaimStep(fileClaimStep + 1);
                  } else {
                    alert('Claim submitted successfully! You will receive a confirmation shortly.');
                    resetFileClaimForm();
                  }
                }}
                disabled={
                  (fileClaimStep === 1 && !selectedPolicyId) ||
                  (fileClaimStep === 2 && (!selectedClaimType || !claimAmount || !claimDescription))
                }
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {fileClaimStep === 3 ? 'Submit Claim' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

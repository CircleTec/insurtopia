import { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  StickyNote,
  ZoomIn,
  ZoomOut,
  Download,
  X,
  Calculator
} from 'lucide-react';
import { PolicyApplication } from '../types';
import { auditTimeline } from '../data/mockData';
import QuoteModal, { QuoteDetails } from './QuoteModal';

interface ReviewCockpitProps {
  application: PolicyApplication;
  onBack: () => void;
  onUpdate: (app: PolicyApplication) => void;
}

export default function ReviewCockpit({ application, onBack, onUpdate }: ReviewCockpitProps) {
  const [activeTab, setActiveTab] = useState<'documents' | 'messages' | 'notes'>('documents');
  const [expandedSections, setExpandedSections] = useState<string[]>(['applicant', 'alerts']);
  const [premiumOverride, setPremiumOverride] = useState('');
  const [notes, setNotes] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'decline' | 'request' | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<QuoteDetails | null>(null);

  const handleApprove = () => {
    const updatedApp: PolicyApplication = {
      ...application,
      status: 'Approved',
      assignedTo: application.assignedTo
    };
    onUpdate(updatedApp);
    setTimeout(() => {
      setShowActionModal(false);
      onBack();
    }, 1000);
  };

  const handleDecline = () => {
    const updatedApp: PolicyApplication = {
      ...application,
      status: 'Declined',
      assignedTo: application.assignedTo
    };
    onUpdate(updatedApp);
    setTimeout(() => {
      setShowActionModal(false);
      onBack();
    }, 1000);
  };

  const handleRequestInfo = () => {
    setActionType('request');
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (actionType === 'approve') {
      handleApprove();
    } else if (actionType === 'decline') {
      handleDecline();
    } else if (actionType === 'request') {
      setShowActionModal(false);
    }
  };

  const handleQuoteGenerated = (quote: QuoteDetails) => {
    setGeneratedQuote(quote);
    setShowQuoteModal(false);
    setPremiumOverride(quote.totalPremium.toString());
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Queue</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{application.id}</h1>
              <p className="text-sm text-gray-600">{application.applicantName} - {application.product}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border ${getRiskBadgeColor(application.riskLevel)}`}>
              Risk Score: {application.riskScore} - {application.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Context */}
        <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Risk Alerts */}
            {application.flaggedReasons && application.flaggedReasons.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 mb-2">Automated Risk Flags</h3>
                    <ul className="space-y-1">
                      {application.flaggedReasons.map((reason, index) => (
                        <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Applicant Details Accordion */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('applicant')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">Applicant Details</h3>
                {expandedSections.includes('applicant') ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSections.includes('applicant') && (
                <div className="p-4 space-y-3 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{application.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Application Date</p>
                      <p className="text-sm font-medium text-gray-900">{application.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="text-sm font-medium text-gray-900">+251 91 123 4567</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-900">applicant@email.com</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ID Number</p>
                      <p className="text-sm font-medium text-gray-900">AA-1234567</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm font-medium text-gray-900">Addis Ababa</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle/Coverage Data Accordion */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('coverage')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">Coverage Details</h3>
                {expandedSections.includes('coverage') ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSections.includes('coverage') && (
                <div className="p-4 space-y-3 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Product Type</p>
                      <p className="text-sm font-medium text-gray-900">{application.product}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coverage Amount</p>
                      <p className="text-sm font-medium text-gray-900">{application.coverageAmount}</p>
                    </div>
                    {application.vehicleAge && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Vehicle Age</p>
                          <p className="text-sm font-medium text-gray-900">{application.vehicleAge} years</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Vehicle Make</p>
                          <p className="text-sm font-medium text-gray-900">Toyota Corolla</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Plate Number</p>
                          <p className="text-sm font-medium text-gray-900">3-12345</p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Premium (Calculated)</p>
                      <p className="text-sm font-medium text-emerald-900">
                        {generatedQuote ? `ETB ${generatedQuote.totalPremium.toLocaleString()}/year` : '12,500 ETB/year'}
                      </p>
                    </div>
                  </div>
                  {generatedQuote && generatedQuote.manualOverride && (
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-amber-900">Manual Override Applied</p>
                      <p className="text-xs text-amber-800 mt-1">{generatedQuote.overrideReason}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                    {generatedQuote ? 'Regenerate Quote' : 'Generate Quote'}
                  </button>
                </div>
              )}
            </div>

            {/* Audit Timeline */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Audit Timeline</h3>
              <div className="space-y-4">
                {auditTimeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-emerald-900 rounded-full" />
                      {index < auditTimeline.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs text-gray-500 mb-1">{event.timestamp}</p>
                      <p className="text-sm text-gray-900">{event.action}</p>
                      <p className="text-xs text-gray-600 mt-1">by {event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Workspace */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === 'documents'
                    ? 'border-emerald-900 text-emerald-900 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === 'messages'
                    ? 'border-emerald-900 text-emerald-900 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === 'notes'
                    ? 'border-emerald-900 text-emerald-900 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <StickyNote className="w-4 h-4" />
                <span>Notes</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Application Documents</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ZoomOut className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">PDF Document Viewer</p>
                    <p className="text-sm text-gray-500 mt-1">Application_Form_{application.id}.pdf</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
                <h3 className="font-semibold text-gray-900 mb-4">Communication Thread</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        AB
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Abebe Bikila</p>
                        <p className="text-xs text-gray-500 mb-2">10:15 AM</p>
                        <p className="text-sm text-gray-700">I have submitted all required documents for my vehicle insurance application.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
                <h3 className="font-semibold text-gray-900 mb-4">Underwriter Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your review notes here..."
                  className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Premium Override (ETB)
                  </label>
                  <input
                    type="text"
                    value={premiumOverride}
                    onChange={(e) => setPremiumOverride(e.target.value)}
                    placeholder="12,500"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Reason for Override
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option>Select reason...</option>
                    <option>Risk mitigation measures in place</option>
                    <option>Long-term customer</option>
                    <option>Bundle discount</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRequestInfo}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Request Info
                </button>
                <button
                  onClick={() => {
                    setActionType('decline');
                    setShowActionModal(true);
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    setActionType('approve');
                    setShowActionModal(true);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md"
                >
                  Approve & Bind
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {actionType === 'approve' && 'Approve Application'}
                {actionType === 'decline' && 'Decline Application'}
                {actionType === 'request' && 'Request Additional Information'}
              </h3>
              <p className="text-sm text-gray-600">
                {actionType === 'approve' && 'Are you sure you want to approve this application? This will generate a quote for the customer.'}
                {actionType === 'decline' && 'Are you sure you want to decline this application? The customer will be notified.'}
                {actionType === 'request' && 'Request additional information from the customer. They will be notified via email.'}
              </p>
            </div>

            {actionType === 'request' && (
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Information Needed
                </label>
                <textarea
                  placeholder="Describe what information is needed..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={4}
                />
              </div>
            )}

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
                  actionType === 'decline'
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

      {/* Quote Generation Modal */}
      {showQuoteModal && (
        <QuoteModal
          application={application}
          onClose={() => setShowQuoteModal(false)}
          onGenerate={handleQuoteGenerated}
        />
      )}
    </div>
  );
}

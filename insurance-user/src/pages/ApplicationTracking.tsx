import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, FileText, CreditCard, Shield } from 'lucide-react';
import { Application } from '../types';

interface ApplicationTrackingProps {
  applicationId: string;
  onBack: () => void;
  onViewQuote: (applicationId: string) => void;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: 'Draft', color: 'gray', icon: FileText },
  submitted: { label: 'Submitted', color: 'blue', icon: CheckCircle },
  under_review: { label: 'Under Review', color: 'amber', icon: Clock },
  documents_required: { label: 'Documents Required', color: 'orange', icon: AlertCircle },
  quote_ready: { label: 'Quote Ready', color: 'emerald', icon: FileText },
  quote_accepted: { label: 'Quote Accepted', color: 'emerald', icon: CheckCircle },
  payment_pending: { label: 'Payment Pending', color: 'blue', icon: CreditCard },
  payment_completed: { label: 'Payment Completed', color: 'green', icon: CheckCircle },
  policy_issued: { label: 'Policy Issued', color: 'green', icon: Shield },
  declined: { label: 'Declined', color: 'red', icon: AlertCircle }
};

const progressSteps = [
  { id: 'submitted', label: 'Application Submitted' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'quote_ready', label: 'Quote Generated' },
  { id: 'payment_completed', label: 'Payment Processed' },
  { id: 'policy_issued', label: 'Policy Issued' }
];

export default function ApplicationTracking({ applicationId, onBack, onViewQuote }: ApplicationTrackingProps) {
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const app = applications.find((a: Application) => a.id === applicationId);

    if (app) {
      const mockStatus = app.status === 'submitted' ? 'under_review' : app.status;

      const mockApplication: Application = {
        ...app,
        status: mockStatus as any,
        progress: getProgressPercentage(mockStatus),
        lastUpdated: new Date().toISOString()
      };

      if (mockStatus === 'under_review') {
        setTimeout(() => {
          mockApplication.status = 'quote_ready';
          mockApplication.progress = getProgressPercentage('quote_ready');

          mockApplication.quote = {
            id: `QT-${Date.now()}`,
            applicationId: mockApplication.id,
            basePremium: Math.floor(Math.random() * 500) + 300,
            taxes: 50,
            fees: 25,
            totalPremium: 0,
            coverageAmount: 500000,
            deductible: 5000,
            validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            breakdown: []
          };

          mockApplication.quote.totalPremium =
            mockApplication.quote.basePremium +
            mockApplication.quote.taxes +
            mockApplication.quote.fees;

          mockApplication.quote.breakdown = [
            { label: 'Base Premium', amount: mockApplication.quote.basePremium },
            { label: 'Taxes (10%)', amount: mockApplication.quote.taxes },
            { label: 'Processing Fees', amount: mockApplication.quote.fees }
          ];

          setApplication(mockApplication);

          const apps = JSON.parse(localStorage.getItem('applications') || '[]');
          const index = apps.findIndex((a: Application) => a.id === applicationId);
          if (index !== -1) {
            apps[index] = mockApplication;
            localStorage.setItem('applications', JSON.stringify(apps));
          }
        }, 3000);
      }

      setApplication(mockApplication);
    }
  }, [applicationId]);

  const getProgressPercentage = (status: string): number => {
    const statusOrder = [
      'draft',
      'submitted',
      'under_review',
      'documents_required',
      'quote_ready',
      'quote_accepted',
      'payment_pending',
      'payment_completed',
      'policy_issued'
    ];
    const index = statusOrder.indexOf(status);
    return ((index + 1) / statusOrder.length) * 100;
  };

  const getCurrentStepIndex = (status: string): number => {
    if (['submitted', 'draft'].includes(status)) return 0;
    if (['under_review', 'documents_required'].includes(status)) return 1;
    if (['quote_ready', 'quote_accepted', 'payment_pending'].includes(status)) return 2;
    if (['payment_completed'].includes(status)) return 3;
    if (['policy_issued'].includes(status)) return 4;
    return 0;
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  const currentStatus = statusConfig[application.status];
  const StatusIcon = currentStatus.icon;
  const currentStepIndex = getCurrentStepIndex(application.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold mb-2">Application Status</h1>
          <p className="text-white/90">{application.productName}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Application ID</p>
              <p className="font-mono font-semibold text-gray-900">{application.id}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-full bg-${currentStatus.color}-100 text-${currentStatus.color}-700 flex items-center gap-2 font-semibold`}
            >
              <StatusIcon className="w-5 h-5" />
              {currentStatus.label}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Progress</h3>
              <span className="text-sm text-gray-500">{Math.round(application.progress)}% Complete</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full h-3 transition-all duration-500"
                style={{ width: `${application.progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900 text-lg">Application Timeline</h3>
            <div className="space-y-4">
              {progressSteps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isPending = index > currentStepIndex;

                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isCurrent ? (
                          <Clock className="w-6 h-6" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        )}
                      </div>
                      {index < progressSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p
                        className={`font-semibold ${
                          isCurrent ? 'text-emerald-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-gray-600 mt-1">
                          We're currently processing your application. This usually takes 24-48 hours.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {application.status === 'quote_ready' && application.quote && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-emerald-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your Quote is Ready!</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Review your personalized quote and proceed with payment
                    </p>
                  </div>
                  <Shield className="w-12 h-12 text-emerald-600" />
                </div>
                <button
                  onClick={() => onViewQuote(application.id)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30"
                >
                  View Quote & Continue
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have questions about your application or need to provide additional information, please contact us.
          </p>
          <div className="flex gap-4">
            <button className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700">
              Contact Support
            </button>
            <button className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700">
              View Application Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

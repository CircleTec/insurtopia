import { LucideIcon, ChevronRight, CreditCard } from 'lucide-react';

interface ApplicationStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
}

interface ApplicationTrackerCardProps {
  applicationId: string;
  date: string;
  icon: LucideIcon;
  title: string;
  coverage: string;
  status: string;
  statusColor: string;
  steps: ApplicationStep[];
  needsPayment?: boolean;
  onPayment?: (applicationId: string) => void;
}

export default function ApplicationTrackerCard({
  applicationId,
  date,
  icon: Icon,
  title,
  coverage,
  status,
  statusColor,
  steps,
  needsPayment = false,
  onPayment
}: ApplicationTrackerCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg font-mono">{applicationId}</h3>
          <p className="text-sm text-gray-500 mt-1">Applied {date}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{coverage}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm z-10 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-white'
                      : step.status === 'current'
                      ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.status === 'completed' ? '✓' : index + 1}
                </div>
                <p
                  className={`text-xs mt-2 text-center font-medium ${
                    step.status === 'current'
                      ? 'text-blue-600'
                      : step.status === 'completed'
                      ? 'text-emerald-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 ${
                      step.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                    style={{ transform: 'translateY(-50%)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <button className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
        {needsPayment && (
          <button
            onClick={() => onPayment?.(applicationId)}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Complete Payment
          </button>
        )}
      </div>
    </div>
  );
}

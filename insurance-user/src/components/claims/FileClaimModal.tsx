import { useState } from 'react';
import { X, Car, Heart, Plane, Home, AlertCircle, Lock, Stethoscope, HelpCircle, ChevronRight } from 'lucide-react';

interface Policy {
  id: string;
  icon: React.ElementType;
  title: string;
  policyNumber: string;
}

interface IncidentType {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface FileClaimModalProps {
  onClose: () => void;
  onSubmit: (policyId: string, incidentType: string) => void;
}

const mockPolicies: Policy[] = [
  { id: 'motor', icon: Car, title: 'Motor Comprehensive', policyNumber: 'POL-2024-8821' },
  { id: 'health', icon: Heart, title: 'Health Insurance', policyNumber: 'POL-2024-7653' },
];

const incidentTypes: IncidentType[] = [
  { id: 'accident', icon: AlertCircle, label: 'Accident' },
  { id: 'theft', icon: Lock, label: 'Theft' },
  { id: 'medical', icon: Stethoscope, label: 'Medical' },
  { id: 'other', icon: HelpCircle, label: 'Other' },
];

export default function FileClaimModal({ onClose, onSubmit }: FileClaimModalProps) {
  const [step, setStep] = useState<'policy' | 'incident'>('policy');
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
    setStep('incident');
  };

  const handleIncidentSelect = (incidentId: string) => {
    setSelectedIncident(incidentId);
  };

  const handleContinue = () => {
    if (selectedPolicy && selectedIncident) {
      onSubmit(selectedPolicy, selectedIncident);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 'policy' ? 'Select Policy' : 'What happened?'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {step === 'policy'
                ? 'Choose which policy this claim is for'
                : 'Select the type of incident'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          {step === 'policy' ? (
            <div className="space-y-4">
              {mockPolicies.map((policy) => {
                const PolicyIcon = policy.icon;
                return (
                  <button
                    key={policy.id}
                    onClick={() => handlePolicySelect(policy.id)}
                    className="w-full flex items-center gap-4 p-5 border-2 border-gray-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <PolicyIcon className="w-7 h-7 text-blue-600 group-hover:text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{policy.title}</h3>
                      <p className="text-sm font-mono text-gray-600">{policy.policyNumber}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {incidentTypes.map((incident) => {
                  const IncidentIcon = incident.icon;
                  return (
                    <button
                      key={incident.id}
                      onClick={() => handleIncidentSelect(incident.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        selectedIncident === incident.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                        selectedIncident === incident.id
                          ? 'bg-emerald-100'
                          : 'bg-gray-100'
                      }`}>
                        <IncidentIcon className={`w-7 h-7 ${
                          selectedIncident === incident.id
                            ? 'text-emerald-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <p className="font-semibold text-gray-900">{incident.label}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('policy')}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!selectedIncident}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Form
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

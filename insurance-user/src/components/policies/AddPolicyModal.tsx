import { useState } from 'react';
import { X, Car, Heart, Plane, Home, CheckCircle } from 'lucide-react';

interface AddPolicyModalProps {
  onClose: () => void;
  onSelectType: (type: string) => void;
}

interface PolicyTypeCardProps {
  icon: React.ElementType;
  title: string;
  onClick: () => void;
  gradientColors: string;
}

function PolicyTypeCard({ icon: Icon, title, onClick, gradientColors }: PolicyTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${gradientColors} rounded-2xl p-8 text-white hover:scale-105 transition-transform shadow-lg group`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
    </button>
  );
}

export default function AddPolicyModal({ onClose, onSelectType }: AddPolicyModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    if (showConfirmation) {
      onSelectType(selectedType);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {showConfirmation ? 'Application Submitted' : 'Select Insurance Type'}
          </h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {showConfirmation ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your application has been submitted successfully. Our team will review it and get back to you shortly.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <p className="text-sm font-semibold text-blue-900 mb-2">Track Your Application</p>
              <p className="text-sm text-blue-700">
                You can monitor the progress of your application in the <span className="font-bold">Pending Applications</span> tab.
                We'll notify you at each stage of the approval process.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Got it, Thanks!
            </button>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-gray-600 mb-8">Choose the type of insurance you'd like to add to your portfolio</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PolicyTypeCard
                icon={Car}
                title="Motor Insurance"
                onClick={() => handleSelectType('motor')}
                gradientColors="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <PolicyTypeCard
                icon={Heart}
                title="Health Insurance"
                onClick={() => handleSelectType('health')}
                gradientColors="bg-gradient-to-br from-rose-500 to-rose-600"
              />
              <PolicyTypeCard
                icon={Plane}
                title="Travel Insurance"
                onClick={() => handleSelectType('travel')}
                gradientColors="bg-gradient-to-br from-sky-500 to-sky-600"
              />
              <PolicyTypeCard
                icon={Home}
                title="Home Insurance"
                onClick={() => handleSelectType('home')}
                gradientColors="bg-gradient-to-br from-amber-500 to-amber-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

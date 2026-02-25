import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';
import { Product, ApplicationFormField } from '../types';
import { applicationForms } from '../data/mockProducts';
import FormField from '../components/application/FormField';

interface ApplicationFormProps {
  product: Product;
  onBack: () => void;
  onSubmit: (applicationId: string) => void;
}

export default function ApplicationForm({ product, onBack, onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedDraft, setSavedDraft] = useState(false);

  const steps = applicationForms[product.id] || [];
  const currentStepData = steps[currentStep];

  useEffect(() => {
    const draftKey = `application_draft_${product.id}`;
    const savedData = localStorage.getItem(draftKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || {});
        setCurrentStep(parsed.currentStep || 0);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, [product.id]);

  const saveDraft = () => {
    const draftKey = `application_draft_${product.id}`;
    const draftData = {
      productId: product.id,
      productName: product.name,
      formData,
      currentStep,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(draftKey, JSON.stringify(draftData));
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    currentStepData.fields.forEach((field: ApplicationFormField) => {
      if (field.conditional) {
        const conditionField = formData[field.conditional.field];
        const conditionValues = Array.isArray(field.conditional.value)
          ? field.conditional.value
          : [field.conditional.value];

        const conditionMet = conditionValues.includes(String(conditionField));
        if (!conditionMet) {
          return;
        }
      }

      if (field.required) {
        const value = formData[field.id];

        if (field.type === 'file') {
          if (!value || value.length === 0) {
            newErrors[field.id] = `${field.label} is required`;
          }
        } else if (field.type === 'checkbox') {
        } else if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = `${field.label} is required`;
        }
      }

      if (field.validation && formData[field.id]) {
        const value = formData[field.id];

        if (field.type === 'number') {
          const numValue = Number(value);
          if (field.validation.min !== undefined && numValue < field.validation.min) {
            newErrors[field.id] = `Minimum value is ${field.validation.min}`;
          }
          if (field.validation.max !== undefined && numValue > field.validation.max) {
            newErrors[field.id] = `Maximum value is ${field.validation.max}`;
          }
        }

        if (field.validation.pattern && field.type === 'text') {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            newErrors[field.id] = field.validation.message || 'Invalid format';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep()) {
      const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const application = {
        id: applicationId,
        productId: product.id,
        productName: product.name,
        status: 'submitted',
        formData,
        submittedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      applications.push(application);
      localStorage.setItem('applications', JSON.stringify(applications));

      localStorage.removeItem(`application_draft_${product.id}`);

      onSubmit(applicationId);
    }
  };

  const shouldShowField = (field: ApplicationFormField): boolean => {
    if (!field.conditional) return true;

    const conditionField = formData[field.conditional.field];
    const conditionValues = Array.isArray(field.conditional.value)
      ? field.conditional.value
      : [field.conditional.value];

    return conditionValues.includes(String(conditionField));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-3xl font-bold mb-2">Apply for {product.name}</h1>
          <p className="text-white/90">Step {currentStep + 1} of {steps.length}: {currentStepData?.title}</p>

          <div className="mt-6 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepData?.title}
              </h2>
              <p className="text-gray-600">{currentStepData?.description}</p>
            </div>

            <div className="space-y-6">
              {currentStepData?.fields.map((field: ApplicationFormField) => {
                if (!shouldShowField(field)) return null;

                return (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    error={errors[field.id]}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={saveDraft}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700"
            >
              {savedDraft ? (
                <>
                  <Check className="w-5 h-5 text-emerald-600" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Draft
                </>
              )}
            </button>

            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30"
                >
                  Submit Application
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

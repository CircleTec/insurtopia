import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Check, FileText, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { Application } from '../types';

interface QuoteAcceptanceProps {
  applicationId: string;
  onBack: () => void;
  onAccept: (applicationId: string) => void;
}

export default function QuoteAcceptance({ applicationId, onBack, onAccept }: QuoteAcceptanceProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signature, setSignature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const app = applications.find((a: Application) => a.id === applicationId);
    if (app) {
      setApplication(app);
    }
  }, [applicationId]);

  const handleAcceptQuote = () => {
    const newErrors: Record<string, string> = {};

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    if (!signature || signature.trim().length < 3) {
      newErrors.signature = 'Please enter your full name as signature';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && application) {
      application.status = 'quote_accepted';
      application.lastUpdated = new Date().toISOString();

      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const index = applications.findIndex((a: Application) => a.id === applicationId);
      if (index !== -1) {
        applications[index] = application;
        localStorage.setItem('applications', JSON.stringify(applications));
      }

      onAccept(applicationId);
    }
  };

  if (!application || !application.quote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Quote not found</p>
        </div>
      </div>
    );
  }

  const quote = application.quote;
  const validUntilDate = new Date(quote.validUntil);

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

          <div className="flex items-center gap-4 mb-2">
            <Shield className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Your Insurance Quote</h1>
              <p className="text-white/90">{application.productName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Quote ID</p>
              <p className="font-mono font-semibold text-gray-900">{quote.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Valid Until</p>
              <p className="font-semibold text-gray-900">{validUntilDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-emerald-700 font-semibold mb-2">Total Premium</p>
              <p className="text-5xl font-bold text-emerald-900 mb-2">
                ETB {quote.totalPremium.toLocaleString()}
              </p>
              <p className="text-emerald-700">per year</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="font-semibold text-gray-900 text-lg">Premium Breakdown</h3>

            <div className="space-y-3">
              {quote.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-semibold text-gray-900">ETB {item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 text-lg font-bold">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-emerald-600">ETB {quote.totalPremium.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Coverage Amount</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ETB {quote.coverageAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Deductible</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ETB {quote.deductible.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Coverage Summary</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Comprehensive coverage as per product terms
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    24/7 claims support and assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Instant policy document delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Flexible payment options available
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-6">Accept Quote</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (e.target.checked && errors.terms) {
                      setErrors({ ...errors, terms: '' });
                    }
                  }}
                  className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
                />
                <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                  I have read and accept the{' '}
                  <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Privacy Policy
                  </button>
                  . I understand the coverage details, exclusions, and my obligations as a policyholder.
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600 ml-8">{errors.terms}</p>
              )}

              <div>
                <label htmlFor="signature" className="block text-sm font-semibold text-gray-700 mb-2">
                  Electronic Signature
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="signature"
                  value={signature}
                  onChange={(e) => {
                    setSignature(e.target.value);
                    if (e.target.value.trim().length >= 3 && errors.signature) {
                      setErrors({ ...errors, signature: '' });
                    }
                  }}
                  placeholder="Type your full legal name"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-serif text-2xl ${
                    errors.signature ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.signature && (
                  <p className="text-sm text-red-600 mt-2">{errors.signature}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  By typing your name, you agree that this constitutes a legal signature confirming your acceptance of this insurance quote.
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Signed on {new Date().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleAcceptQuote}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30 text-lg"
              >
                Accept Quote & Proceed to Payment
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-4">
            Our team is here to help you understand your coverage and answer any questions before you proceed.
          </p>
          <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700">
            Contact an Agent
          </button>
        </div>
      </div>
    </div>
  );
}

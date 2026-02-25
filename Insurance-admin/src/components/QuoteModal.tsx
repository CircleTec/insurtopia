import { useState } from 'react';
import { X, Calculator, AlertCircle } from 'lucide-react';
import { PolicyApplication } from '../types';

interface QuoteModalProps {
  application: PolicyApplication;
  onClose: () => void;
  onGenerate: (quote: QuoteDetails) => void;
}

export interface QuoteDetails {
  basePremium: number;
  riskAdjustment: number;
  taxes: number;
  totalPremium: number;
  manualOverride: boolean;
  overrideReason?: string;
}

export default function QuoteModal({ application, onClose, onGenerate }: QuoteModalProps) {
  const calculateBasePremium = () => {
    const coverage = parseFloat(application.coverageAmount?.replace(/[^0-9]/g, '') || '0');
    let rate = 0.025;

    if (application.product.includes('Motor')) {
      rate = 0.035;
    } else if (application.product.includes('Health')) {
      rate = 0.045;
    } else if (application.product.includes('Property')) {
      rate = 0.028;
    }

    return Math.round(coverage * rate);
  };

  const calculateRiskAdjustment = (basePremium: number) => {
    const riskMultiplier = application.riskScore / 100;
    return Math.round(basePremium * riskMultiplier * 0.5);
  };

  const basePremium = calculateBasePremium();
  const defaultRiskAdjustment = calculateRiskAdjustment(basePremium);
  const defaultTaxes = Math.round((basePremium + defaultRiskAdjustment) * 0.15);
  const defaultTotal = basePremium + defaultRiskAdjustment + defaultTaxes;

  const [manualMode, setManualMode] = useState(false);
  const [customBasePremium, setCustomBasePremium] = useState(basePremium.toString());
  const [customRiskAdjustment, setCustomRiskAdjustment] = useState(defaultRiskAdjustment.toString());
  const [overrideReason, setOverrideReason] = useState('');

  const currentBasePremium = manualMode ? parseInt(customBasePremium) || 0 : basePremium;
  const currentRiskAdjustment = manualMode ? parseInt(customRiskAdjustment) || 0 : defaultRiskAdjustment;
  const currentTaxes = Math.round((currentBasePremium + currentRiskAdjustment) * 0.15);
  const currentTotal = currentBasePremium + currentRiskAdjustment + currentTaxes;

  const handleGenerate = () => {
    const quote: QuoteDetails = {
      basePremium: currentBasePremium,
      riskAdjustment: currentRiskAdjustment,
      taxes: currentTaxes,
      totalPremium: currentTotal,
      manualOverride: manualMode,
      overrideReason: manualMode ? overrideReason : undefined
    };
    onGenerate(quote);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Generate Quote</h3>
              <p className="text-sm text-gray-600">{application.id} - {application.applicantName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">Product: {application.product}</p>
              <p className="text-sm text-blue-800 mt-1">Coverage Amount: {application.coverageAmount}</p>
              <p className="text-sm text-blue-800">Risk Score: {application.riskScore} - {application.riskLevel}</p>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Premium Calculation</h4>
              <button
                onClick={() => setManualMode(!manualMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  manualMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {manualMode ? 'Manual Mode' : 'Auto Mode'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Base Premium:</span>
                {manualMode ? (
                  <input
                    type="number"
                    value={customBasePremium}
                    onChange={(e) => setCustomBasePremium(e.target.value)}
                    className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-900">ETB {basePremium.toLocaleString()}</span>
                )}
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Risk Adjustment:</span>
                {manualMode ? (
                  <input
                    type="number"
                    value={customRiskAdjustment}
                    onChange={(e) => setCustomRiskAdjustment(e.target.value)}
                    className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-900">ETB {defaultRiskAdjustment.toLocaleString()}</span>
                )}
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-lg font-semibold text-gray-900">
                  ETB {(currentBasePremium + currentRiskAdjustment).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Taxes & Fees (15%):</span>
                <span className="text-lg font-semibold text-gray-900">ETB {currentTaxes.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between py-3 bg-emerald-50 rounded-lg px-4 border-2 border-emerald-200">
                <span className="text-base font-bold text-emerald-900">Total Premium:</span>
                <span className="text-2xl font-bold text-emerald-900">ETB {currentTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {manualMode && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Reason for Manual Override <span className="text-red-600">*</span>
              </label>
              <select
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">Select reason...</option>
                <option value="Risk mitigation measures in place">Risk mitigation measures in place</option>
                <option value="Long-term customer discount">Long-term customer discount</option>
                <option value="Bundle discount">Bundle discount</option>
                <option value="Competitive pricing adjustment">Competitive pricing adjustment</option>
                <option value="Special promotion">Special promotion</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={manualMode && !overrideReason}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

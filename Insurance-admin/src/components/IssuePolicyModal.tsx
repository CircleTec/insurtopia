import { useState } from 'react';
import { X, Car, Heart, Home, ArrowRight } from 'lucide-react';

interface IssuePolicyModalProps {
  onClose: () => void;
}

export default function IssuePolicyModal({ onClose }: IssuePolicyModalProps) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  const products = [
    { id: 'motor', name: 'Motor Comprehensive', icon: Car, color: 'emerald' },
    { id: 'health', name: 'Health Star Plus', icon: Heart, color: 'blue' },
    { id: 'property', name: 'SME Fire & Property', icon: Home, color: 'amber' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Select Product Type' : 'Customer Information'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="px-8 py-8">
          {step === 1 ? (
            <div>
              <p className="text-gray-600 mb-6">Choose the insurance product to issue:</p>
              <div className="grid grid-cols-3 gap-6">
                {products.map((product) => {
                  const Icon = product.icon;
                  const isSelected = selectedProduct === product.id;
                  return (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-100' : 'bg-gray-50'
                      }`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-emerald-600' : 'text-gray-600'}`} />
                      </div>
                      <p className={`text-sm font-semibold text-center ${isSelected ? 'text-emerald-900' : 'text-gray-900'}`}>
                        {product.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-6">Search for an existing customer or create a new one:</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search Customer</label>
                  <input
                    type="text"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Enter customer name or ID..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Or create a new customer:</p>
                  <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors font-medium">
                    + Create New Customer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-8 py-6 flex items-center justify-between bg-gray-50 rounded-b-2xl">
          <button
            onClick={() => step === 1 ? onClose() : setStep(1)}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => step === 1 ? setStep(2) : onClose()}
            disabled={step === 1 && !selectedProduct}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              'Proceed to Application Form'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

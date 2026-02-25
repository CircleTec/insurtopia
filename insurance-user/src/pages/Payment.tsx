import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, Check, Loader, AlertCircle } from 'lucide-react';
import { getApplicationById, createPayment, completePayment, Application } from '../lib/payments';

interface PaymentProps {
  applicationId: string;
  onBack: () => void;
  onComplete: (applicationId: string) => void;
}

type PaymentMethod = 'mobile_money' | 'bank_transfer' | 'card';

export default function Payment({ applicationId, onBack, onComplete }: PaymentProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile_money');
  const [processing, setProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState<'telebirr' | 'cbe_birr' | 'mpesa'>('telebirr');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    const app = await getApplicationById(applicationId);
    if (app) {
      setApplication(app);
    }
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'mobile_money') {
      if (!phoneNumber || phoneNumber.trim().length < 10) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment() || !application || !application.quote) return;

    setProcessing(true);

    try {
      const paymentDetails: Record<string, unknown> = {};

      if (paymentMethod === 'mobile_money') {
        paymentDetails.phoneNumber = phoneNumber;
        paymentDetails.provider = provider;
      }

      const payment = await createPayment(
        applicationId,
        application.quote.totalPremium,
        paymentMethod,
        paymentMethod === 'mobile_money' ? provider : undefined,
        paymentDetails
      );

      if (!payment) {
        setProcessing(false);
        return;
      }

      setTimeout(async () => {
        const transactionRef = `TXN-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
        const success = await completePayment(payment.id, transactionRef);

        setProcessing(false);

        if (success) {
          onComplete(applicationId);
        }
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
      setProcessing(false);
    }
  };

  if (!application || !application.quote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Application not found</p>
        </div>
      </div>
    );
  }

  const quote = application.quote;

  const providerLogos: Record<string, string> = {
    telebirr: '📱',
    cbe_birr: '🏦',
    mpesa: '💳'
  };

  const providerNames: Record<string, string> = {
    telebirr: 'TeleBirr',
    cbe_birr: 'CBE Birr',
    mpesa: 'M-Pesa'
  };

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

          <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
          <p className="text-white/90">{application.productName}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>

              <div className="space-y-4">
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'mobile_money'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile_money"
                    checked={paymentMethod === 'mobile_money'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <Smartphone className="w-8 h-8 text-emerald-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Mobile Money</p>
                    <p className="text-sm text-gray-600">TeleBirr, CBE Birr, M-Pesa</p>
                  </div>
                  {paymentMethod === 'mobile_money' && (
                    <Check className="w-6 h-6 text-emerald-600" />
                  )}
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <Building className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Bank Transfer</p>
                    <p className="text-sm text-gray-600">Direct bank transfer</p>
                  </div>
                  {paymentMethod === 'bank_transfer' && (
                    <Check className="w-6 h-6 text-emerald-600" />
                  )}
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <CreditCard className="w-8 h-8 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Debit/Credit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <Check className="w-6 h-6 text-emerald-600" />
                  )}
                </label>
              </div>
            </div>

            {paymentMethod === 'mobile_money' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Mobile Money Details</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Provider
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['telebirr', 'cbe_birr', 'mpesa'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setProvider(p)}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            provider === p
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">{providerLogos[p]}</div>
                          <p className="text-sm font-semibold text-gray-900">{providerNames[p]}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (e.target.value.trim().length >= 10 && errors.phoneNumber) {
                          setErrors({ ...errors, phoneNumber: '' });
                        }
                      }}
                      placeholder="+251 912 345 678"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                        errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-600 mt-2">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                      <strong>How it works:</strong> You will receive a payment request on your {providerNames[provider]} account.
                      Please approve the payment on your mobile device to complete the transaction.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Bank Transfer Instructions</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-semibold">Commercial Bank of Ethiopia</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-semibold">Insurtopia Insurance</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-semibold font-mono">1000123456789</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-semibold font-mono">{applicationId}</span>
                  </div>
                </div>
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-900">
                    Please use your <strong>Application ID</strong> as the transfer reference.
                    Your policy will be activated once we confirm receipt of payment (usually within 1-2 business days).
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay ETB {quote.totalPremium.toLocaleString()}
                </>
              )}
            </button>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Premium</span>
                  <span className="font-semibold">ETB {quote.basePremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">ETB {quote.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fees</span>
                  <span className="font-semibold">ETB {quote.fees.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ETB {quote.totalPremium.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500">
                  Your payment is secured with industry-standard encryption. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

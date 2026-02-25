import { useState } from 'react';
import { X, Shield, Calendar, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

interface RenewalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RenewalModal({ isOpen, onClose }: RenewalModalProps) {
    const [step, setStep] = useState<'review' | 'confirm' | 'success'>('review');

    if (!isOpen) return null;

    const policy = {
        name: 'Health Insurance – Family Plan',
        policyNumber: 'POL-2024-003',
        currentExpiry: 'Feb 15, 2025',
        newExpiry: 'Feb 15, 2026',
        premium: 'ETB 1,800/month',
        annualPremium: 'ETB 21,600/year',
    };

    const handleRenew = () => setStep('confirm');
    const handleConfirm = () => setStep('success');
    const handleClose = () => { setStep('review'); onClose(); };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-50" onClick={handleClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>

                    {step === 'review' && (
                        <>
                            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-5 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-bold">Renew Policy</h2>
                                    <button onClick={handleClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                                </div>
                                <p className="text-sm text-emerald-100">Review and confirm your policy renewal</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{policy.name}</p>
                                            <p className="text-xs text-gray-500">{policy.policyNumber}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-semibold uppercase">Current Expiry</p>
                                            <p className="text-sm font-semibold text-red-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{policy.currentExpiry}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-semibold uppercase">New Expiry</p>
                                            <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{policy.newExpiry}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] text-blue-600 font-semibold uppercase">Premium Amount</p>
                                            <p className="text-lg font-bold text-blue-900">{policy.premium}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-blue-600 font-semibold uppercase">Annual Total</p>
                                            <p className="text-sm font-semibold text-blue-700">{policy.annualPremium}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRenew}
                                    className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue to Payment <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}

                    {step === 'confirm' && (
                        <>
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-5 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-bold">Confirm Payment</h2>
                                    <button onClick={handleClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                                </div>
                                <p className="text-sm text-blue-100">Choose your payment method</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-3">
                                    {['Telebirr', 'CBE Birr', 'Bank Transfer'].map(method => (
                                        <button key={method} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm font-semibold text-gray-900">{method}</span>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleConfirm}
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Pay {policy.premium}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 'success' && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Renewal Successful!</h2>
                            <p className="text-sm text-gray-600 mb-1">Your policy has been renewed until</p>
                            <p className="text-lg font-bold text-emerald-600 mb-6">{policy.newExpiry}</p>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Shield, FileText, CreditCard, Bell, HelpCircle } from 'lucide-react';

interface OnboardingStep {
    title: string;
    description: string;
    icon: typeof Shield;
    color: string;
}

const steps: OnboardingStep[] = [
    { title: 'Welcome to InsurEthiopia!', description: 'Your complete insurance management platform. Let us show you around.', icon: Shield, color: 'from-emerald-500 to-emerald-700' },
    { title: 'Manage Your Policies', description: 'View, renew, and manage all your insurance policies in one place. Track coverage, premiums, and expiry dates.', icon: FileText, color: 'from-blue-500 to-blue-700' },
    { title: 'Payments & Billing', description: 'Make premium payments instantly with Telebirr, CBE Birr, or bank transfer. Track your payment history.', icon: CreditCard, color: 'from-purple-500 to-purple-700' },
    { title: 'Stay Updated', description: 'Get real-time notifications about policy renewals, claim updates, and important announcements.', icon: Bell, color: 'from-orange-500 to-orange-700' },
    { title: 'Need Help?', description: 'Access our Help Center anytime for FAQs, guides, and direct support from our agents.', icon: HelpCircle, color: 'from-teal-500 to-teal-700' },
];

export default function OnboardingTour() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('onboarding-complete');
        if (!seen) setIsVisible(true);
    }, []);

    if (!isVisible) return null;

    const handleComplete = () => {
        localStorage.setItem('onboarding-complete', 'true');
        setIsVisible(false);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else handleComplete();
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const step = steps[currentStep];
    const Icon = step.icon;
    const isLast = currentStep === steps.length - 1;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-[200]" />
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
                    <div className={`bg-gradient-to-br ${step.color} px-8 py-10 text-white text-center relative`}>
                        <button onClick={handleComplete} className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                        <p className="text-sm text-white/80 leading-relaxed">{step.description}</p>
                    </div>

                    <div className="px-8 py-6">
                        {/* Progress Dots */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-6 bg-emerald-500' : 'w-2 bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between gap-3">
                            {currentStep > 0 ? (
                                <button onClick={handlePrev} className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            ) : (
                                <button onClick={handleComplete} className="px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                                    Skip
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                            >
                                {isLast ? 'Get Started' : 'Next'} {!isLast && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Phone, Mail, MessageSquare, Clock, FileText, Shield, CreditCard, AlertCircle, HelpCircle, ExternalLink } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface HelpCenterProps {
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    title: string;
    icon: React.ElementType;
    items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
    {
        id: 'policies',
        title: 'Policies & Coverage',
        icon: Shield,
        items: [
            {
                question: 'How do I purchase a new insurance policy?',
                answer: 'Navigate to the Product Catalog from your dashboard, select the insurance product that fits your needs, fill out the application form, and submit it for review. Once approved, you\'ll receive a quote which you can accept and pay for to activate your policy.'
            },
            {
                question: 'Can I modify my existing policy?',
                answer: 'Yes, you can request policy modifications by contacting our support team. Common changes include updating beneficiary information, adjusting coverage amounts, or adding/removing riders. Some changes may affect your premium.'
            },
            {
                question: 'What happens when my policy expires?',
                answer: 'You\'ll receive renewal reminders 30 days before expiry via email and SMS. You can renew your policy through the Policies section of your dashboard. If your policy lapses, you may need to go through the application process again.'
            },
            {
                question: 'How do I cancel my policy?',
                answer: 'To cancel a policy, go to My Policies, select the policy, and click "Request Cancellation." Please note that cancellation terms vary by product and you may be entitled to a partial refund depending on the remaining term.'
            }
        ]
    },
    {
        id: 'claims',
        title: 'Claims',
        icon: AlertCircle,
        items: [
            {
                question: 'How do I file a claim?',
                answer: 'Go to the Claims Center and click "File a Claim." Select the relevant policy, choose the claim type, provide incident details, and upload supporting documents like photos, receipts, or police reports. You\'ll receive a claim reference number upon submission.'
            },
            {
                question: 'What documents do I need for a claim?',
                answer: 'Required documents vary by claim type. Generally you\'ll need: a completed claim form, proof of loss (photos, receipts), official reports (police report for accidents), and any relevant medical records. The system will guide you through the specific requirements.'
            },
            {
                question: 'How long does claim processing take?',
                answer: 'Standard claims are typically processed within 7-14 business days. Fast-track claims (under ETB 25,000) may be resolved within 3-5 business days. Complex claims requiring investigation may take longer. You can track your claim status in real-time through the Claims Center.'
            },
            {
                question: 'What if my claim is rejected?',
                answer: 'If your claim is rejected, you\'ll receive a detailed explanation of the reasons. You can appeal the decision within 30 days by providing additional documentation or information. Contact our support team for assistance with appeals.'
            }
        ]
    },
    {
        id: 'payments',
        title: 'Payments & Billing',
        icon: CreditCard,
        items: [
            {
                question: 'What payment methods are accepted?',
                answer: 'We accept Mobile Money (Telebirr, M-Pesa), bank transfers (CBE, Awash, Dashen), and card payments (Visa, MasterCard). All payments are processed securely through our payment gateway.'
            },
            {
                question: 'Can I pay my premium in installments?',
                answer: 'Yes, some products offer monthly, quarterly, or semi-annual payment plans. Installment options are presented during the payment step of your application. Additional fees may apply for installment plans.'
            },
            {
                question: 'How do I get a payment receipt?',
                answer: 'Payment receipts are automatically generated and available in the Payments section of your dashboard. You can download PDF receipts for any completed payment. Receipts are also sent to your registered email.'
            },
            {
                question: 'What happens if I miss a payment?',
                answer: 'If you miss a payment, you\'ll receive reminders via email and SMS. There is typically a 15-day grace period during which your coverage remains active. After the grace period, your policy may be suspended until payment is made.'
            }
        ]
    },
    {
        id: 'account',
        title: 'Account & Security',
        icon: HelpCircle,
        items: [
            {
                question: 'How do I reset my password?',
                answer: 'Go to Profile & Settings > Security tab. Enter your current password, then your new password twice. If you\'ve forgotten your password, click "Forgot Password" on the login page to receive a reset link via email.'
            },
            {
                question: 'Is my personal information secure?',
                answer: 'Yes, we use industry-standard encryption (AES-256) for all data at rest and TLS 1.3 for data in transit. We comply with Ethiopian data protection regulations and never share your information with third parties without your consent.'
            },
            {
                question: 'How do I enable two-factor authentication?',
                answer: 'Go to Profile & Settings > Security tab and toggle on "Two-Factor Authentication." You\'ll receive a verification code via SMS each time you log in, adding an extra layer of security to your account.'
            }
        ]
    }
];

export default function HelpCenter({ onLogout, onNavigate }: HelpCenterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<string | null>('policies');
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    const filteredCategories = searchQuery.trim()
        ? faqCategories.map(cat => ({
            ...cat,
            items: cat.items.filter(item =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.items.length > 0)
        : faqCategories;

    const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

    return (
        <DashboardLayout onLogout={onLogout} activeView="help" onNavigate={onNavigate}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center py-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
                    <p className="text-gray-600">Find answers to common questions or reach out to our support team</p>
                </div>

                {/* Search */}
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    {searchQuery && (
                        <p className="text-xs text-gray-500 mt-2 text-center">{totalResults} result{totalResults !== 1 ? 's' : ''} found</p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Phone className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-gray-900">Call Us</p>
                        <p className="text-xs text-gray-500 mt-1">+251 11 234 5678</p>
                        <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Mon–Sat 8AM–6PM
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-bold text-gray-900">Email Support</p>
                        <p className="text-xs text-gray-500 mt-1">support@insurtopia.et</p>
                        <p className="text-[10px] text-blue-600 font-semibold mt-1">Response within 24 hours</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-sm font-bold text-gray-900">Live Chat</p>
                        <p className="text-xs text-gray-500 mt-1">Chat with an agent</p>
                        <p className="text-[10px] text-purple-600 font-semibold mt-1 flex items-center justify-center gap-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Online Now
                        </p>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
                    {filteredCategories.map(category => (
                        <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <category.icon className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{category.title}</p>
                                        <p className="text-xs text-gray-500">{category.items.length} articles</p>
                                    </div>
                                </div>
                                {expandedCategory === category.id ? (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {expandedCategory === category.id && (
                                <div className="border-t border-gray-100">
                                    {category.items.map((item, idx) => {
                                        const key = `${category.id}-${idx}`;
                                        return (
                                            <div key={key} className="border-b border-gray-100 last:border-0">
                                                <button
                                                    onClick={() => setExpandedQuestion(expandedQuestion === key ? null : key)}
                                                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                                                >
                                                    <p className="text-sm font-medium text-gray-800 pr-4">{item.question}</p>
                                                    {expandedQuestion === key ? (
                                                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                                {expandedQuestion === key && (
                                                    <div className="px-5 pb-4">
                                                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Useful Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Useful Resources</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: FileText, label: 'Policy Terms & Conditions', desc: 'Read the full terms' },
                            { icon: Shield, label: 'Privacy Policy', desc: 'How we protect your data' },
                            { icon: FileText, label: 'Claims Procedure Guide', desc: 'Step-by-step instructions' },
                            { icon: HelpCircle, label: 'Video Tutorials', desc: 'Learn how to use the app' },
                        ].map((link, idx) => (
                            <button key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                                <link.icon className="w-5 h-5 text-gray-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-700">{link.label}</p>
                                    <p className="text-xs text-gray-500">{link.desc}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-emerald-500" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

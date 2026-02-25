import { useState } from 'react';
import { Check, Minus, Car, Heart, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface ProductComparisonProps {
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

interface ComparisonProduct {
    id: string;
    name: string;
    icon: typeof Car;
    color: string;
    premium: string;
    coverage: string;
    deductible: string;
    claimLimit: string;
    features: Record<string, boolean | string>;
}

const products: ComparisonProduct[] = [
    {
        id: '1', name: 'Motor Comprehensive', icon: Car, color: 'from-blue-500 to-blue-700',
        premium: 'ETB 2,500/mo', coverage: 'ETB 500,000', deductible: 'ETB 5,000', claimLimit: 'ETB 500,000',
        features: { 'Collision Coverage': true, 'Third-Party Liability': true, 'Theft & Vandalism': true, 'Natural Disaster': true, 'Roadside Assistance': true, 'Rental Car': false, 'Personal Injury': true, 'Windshield Repair': true }
    },
    {
        id: '2', name: 'Motor Third-Party', icon: Car, color: 'from-gray-500 to-gray-700',
        premium: 'ETB 800/mo', coverage: 'ETB 200,000', deductible: 'ETB 10,000', claimLimit: 'ETB 200,000',
        features: { 'Collision Coverage': false, 'Third-Party Liability': true, 'Theft & Vandalism': false, 'Natural Disaster': false, 'Roadside Assistance': false, 'Rental Car': false, 'Personal Injury': true, 'Windshield Repair': false }
    },
    {
        id: '3', name: 'Health Plus Basic', icon: Heart, color: 'from-rose-500 to-rose-700',
        premium: 'ETB 1,800/mo', coverage: 'ETB 1,000,000', deductible: 'ETB 2,000', claimLimit: 'ETB 300,000',
        features: { 'Hospitalization': true, 'Outpatient Care': true, 'Surgery': true, 'Maternity': false, 'Dental': false, 'Vision': false, 'Mental Health': true, 'Prescription Drugs': true }
    },
    {
        id: '4', name: 'Health Plus Premium', icon: Heart, color: 'from-emerald-500 to-emerald-700',
        premium: 'ETB 3,200/mo', coverage: 'ETB 3,000,000', deductible: 'ETB 1,000', claimLimit: 'ETB 1,000,000',
        features: { 'Hospitalization': true, 'Outpatient Care': true, 'Surgery': true, 'Maternity': true, 'Dental': true, 'Vision': true, 'Mental Health': true, 'Prescription Drugs': true }
    },
];

export default function ProductComparison({ onLogout, onNavigate }: ProductComparisonProps) {
    const [selected, setSelected] = useState<string[]>(['1', '2']);

    const toggleProduct = (id: string) => {
        if (selected.includes(id)) {
            if (selected.length > 2) setSelected(selected.filter(s => s !== id));
        } else {
            if (selected.length < 3) setSelected([...selected, id]);
        }
    };

    const compareProducts = products.filter(p => selected.includes(p.id));
    const allFeatureKeys = Array.from(new Set(compareProducts.flatMap(p => Object.keys(p.features))));

    return (
        <DashboardLayout onLogout={onLogout} activeView="compare" onNavigate={onNavigate}>
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <button onClick={() => onNavigate('policies')} className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold mb-3 flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to Policies
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
                    <p className="text-sm text-gray-600 mt-1">Select 2–3 products to compare side by side</p>
                </div>

                {/* Product Selector */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex gap-3 flex-wrap">
                        {products.map(product => {
                            const Icon = product.icon;
                            const isSelected = selected.includes(product.id);
                            return (
                                <button
                                    key={product.id}
                                    onClick={() => toggleProduct(product.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {product.name}
                                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="text-left px-5 py-4 w-40"></th>
                                    {compareProducts.map(product => {
                                        const Icon = product.icon;
                                        return (
                                            <th key={product.id} className="px-5 py-4 text-center min-w-[180px]">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Key metrics */}
                                {(['premium', 'coverage', 'deductible', 'claimLimit'] as const).map(key => (
                                    <tr key={key} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">{key === 'claimLimit' ? 'Claim Limit' : key}</td>
                                        {compareProducts.map(p => (
                                            <td key={p.id} className="px-5 py-3 text-center text-sm font-semibold text-gray-900">{p[key]}</td>
                                        ))}
                                    </tr>
                                ))}

                                {/* Separator */}
                                <tr><td colSpan={compareProducts.length + 1} className="px-5 py-2 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Features</td></tr>

                                {/* Features */}
                                {allFeatureKeys.map(feature => (
                                    <tr key={feature} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-5 py-3 text-sm text-gray-700">{feature}</td>
                                        {compareProducts.map(p => (
                                            <td key={p.id} className="px-5 py-3 text-center">
                                                {p.features[feature] === true ? (
                                                    <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                                                ) : p.features[feature] === false ? (
                                                    <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                                                ) : (
                                                    <span className="text-sm text-gray-600">{p.features[feature]}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4 justify-center">
                    {compareProducts.map(product => (
                        <button
                            key={product.id}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors bg-gradient-to-br ${product.color} text-white hover:opacity-90 shadow-md`}
                        >
                            Get {product.name}
                        </button>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

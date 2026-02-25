import { useState } from 'react';
import { ArrowLeft, Check, X, FileText, Shield, Zap, Phone, Wrench, Users, CreditCard, Calendar, TrendingUp, DollarSign, Lock, MapPin, Hammer, Umbrella, Globe, Clock, Briefcase, Car, Heart, HeartHandshake, Home, Plane } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onApply: (productId: string) => void;
}

const iconMap: Record<string, any> = {
  Shield, Zap, Phone, Wrench, Users, CreditCard, Calendar,
  TrendingUp, DollarSign, FileText, Lock, MapPin, Hammer, Umbrella,
  Globe, Clock, Briefcase, Car, Heart, HeartHandshake, Home, Plane
};

export default function ProductDetail({ product, onBack, onApply }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'requirements'>('overview');

  const IconComponent = iconMap[product.icon];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {IconComponent && <IconComponent className="w-10 h-10" />}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-xl text-white/90 mb-6">{product.shortDescription}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm text-white/80">Coverage Up To</div>
                  <div className="text-2xl font-bold">ETB {product.coverageAmount.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm text-white/80">Starting From</div>
                  <div className="text-2xl font-bold">ETB {product.basePrice}/mo</div>
                </div>
              </div>

              <button
                onClick={() => onApply(product.id)}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg text-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['overview', 'benefits', 'requirements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 px-2 font-semibold transition-colors relative capitalize ${
                  activeTab === tab
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Policy</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.features.map((feature, index) => {
                  const FeatureIcon = iconMap[feature.icon];
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                        {FeatureIcon && <FeatureIcon className="w-6 h-6 text-emerald-600" />}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose This Policy?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Coverage</h3>
                    <p className="text-sm text-gray-600">All-inclusive protection for peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Quick Claims</h3>
                    <p className="text-sm text-gray-600">Fast processing and settlement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                    <p className="text-sm text-gray-600">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Covered</h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Not Covered</h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {product.exclusions.map((exclusion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <p className="text-gray-600 mb-6">
                  Please prepare the following documents before starting your application:
                </p>
                <ul className="space-y-4">
                  {product.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Complete Application Form</h4>
                    <p className="text-sm text-gray-600">Fill in your personal and relevant details</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload Documents</h4>
                    <p className="text-sm text-gray-600">Submit all required documents digitally</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review & Assessment</h4>
                    <p className="text-sm text-gray-600">We'll review your application within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Quote & Pay</h4>
                    <p className="text-sm text-gray-600">Get your quote and complete payment to activate</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-center">
              <button
                onClick={() => onApply(product.id)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-12 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30 text-lg"
              >
                Start Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

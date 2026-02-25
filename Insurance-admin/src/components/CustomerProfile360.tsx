import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle, AlertCircle, FileText, MessageSquare, Clock } from 'lucide-react';
import { Customer } from '../types';
import { customerPoliciesMap, customerActivitiesMap } from '../data/mockData';

interface CustomerProfile360Props {
  customer: Customer;
  onBack: () => void;
}

export default function CustomerProfile360({ customer, onBack }: CustomerProfile360Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'policies' | 'claims' | 'documents' | 'comms'>('overview');

  const mockComms = [
    { id: '1', type: 'email', subject: 'Policy Renewal Reminder', date: '2024-02-24', status: 'delivered', preview: 'Your Motor Comprehensive policy will expire in 15 days...' },
    { id: '2', type: 'sms', subject: 'Payment Confirmation', date: '2024-02-20', status: 'delivered', preview: 'Payment of ETB 2,500 received for POL-2024-001.' },
    { id: '3', type: 'email', subject: 'Claim Status Update', date: '2024-02-18', status: 'opened', preview: 'Your claim CLM-2024-001 has been approved...' },
    { id: '4', type: 'call', subject: 'Welcome Call', date: '2024-01-16', status: 'completed', preview: 'Onboarding call — explained policy terms and filing process.' },
    { id: '5', type: 'email', subject: 'Welcome to InsurEthiopia', date: '2024-01-15', status: 'opened', preview: 'Thank you for choosing InsurEthiopia. Your account is ready...' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const customerPolicies = customerPoliciesMap[customer.id] || [];
  const customerActivities = customerActivitiesMap[customer.id] || [];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Directory</span>
      </button>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4">
                {getInitials(customer.name)}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{customer.name}</h2>
              {customer.segment === 'VIP' && (
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-sm">
                  VIP Customer
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900 break-words">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-sm font-medium text-gray-900">{customer.region}</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${customer.kycVerified ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-amber-50 border-2 border-amber-200'
              }`}>
              {customer.kycVerified ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">KYC Verified</p>
                    <p className="text-xs text-emerald-700">National ID linked</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">KYC Pending</p>
                    <p className="text-xs text-amber-700">Verification required</p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'overview'
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('policies')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'policies'
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  Policies
                </button>
                <button
                  onClick={() => setActiveTab('claims')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'claims'
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  Claims
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'documents'
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('comms')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'comms'
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  Comms
                </button>
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
                      <p className="text-sm font-semibold text-emerald-700 mb-2">Total Premium Paid</p>
                      <p className="text-3xl font-bold text-emerald-900">{customer.totalPremiumPaid}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
                      <p className="text-sm font-semibold text-blue-700 mb-2">Claim Ratio</p>
                      <p className="text-3xl font-bold text-blue-900">{customer.claimRatio}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200">
                      <p className="text-sm font-semibold text-amber-700 mb-2">Tenure</p>
                      <p className="text-3xl font-bold text-amber-900">{customer.tenure}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {customerActivities.length > 0 ? (
                        customerActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No activity recorded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Active Policies</h3>
                  {customerPolicies.length > 0 ? (
                    customerPolicies.map((policy) => (
                      <div
                        key={policy.id}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{policy.product}</h4>
                            <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${policy.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {policy.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Expiry Date</p>
                            <p className="font-semibold text-gray-900">{policy.expiryDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Premium</p>
                            <p className="font-semibold text-gray-900">{policy.premium}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No active policies</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'claims' && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No claims filed</p>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No documents uploaded</p>
                </div>
              )}

              {activeTab === 'comms' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Communication Log</h3>
                    <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> New Message
                    </button>
                  </div>
                  {mockComms.map(comm => (
                    <div key={comm.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-emerald-300 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase ${comm.type === 'email' ? 'bg-blue-100 text-blue-700' :
                              comm.type === 'sms' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                            }`}>{comm.type}</span>
                          <p className="text-sm font-semibold text-gray-900">{comm.subject}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${comm.status === 'opened' ? 'bg-emerald-100 text-emerald-700' :
                            comm.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                          }`}>{comm.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">{comm.preview}</p>
                      <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" />{comm.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

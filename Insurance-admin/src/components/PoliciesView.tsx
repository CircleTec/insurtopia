import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Policy } from '../types';
import { supabase } from '../lib/supabase';
import IssuePolicyModal from './IssuePolicyModal';

export default function PoliciesView() {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPolicies: Policy[] = (data || []).map(p => ({
        id: p.id,
        policyNumber: p.policy_number,
        customer: p.customer_name,
        product: p.product_name,
        effectiveDate: p.effective_date,
        expiryDate: p.expiry_date,
        premium: p.premium,
        status: p.status
      }));

      setPolicies(formattedPolicies);
    } catch (error) {
      console.error('Error fetching policies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading policies...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Policies</h1>
            <p className="text-gray-600 mt-2">Search, manage, and issue insurance policies.</p>
          </div>
          <button
            onClick={() => setShowIssueModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            Issue New Policy
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Policy # or Name..."
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
              />
            </div>
            <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Cancelled</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
              <option>All Products</option>
              <option>Motor Comprehensive</option>
              <option>Health Star Plus</option>
              <option>Travel Secure</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Policy #
                  </th>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Effective Date
                  </th>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {policies.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center">
                      <p className="text-gray-500 mb-4">No policies found</p>
                      <button
                        onClick={() => setShowIssueModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Issue First Policy
                      </button>
                    </td>
                  </tr>
                ) : (
                  policies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="hover:bg-gray-50/50 cursor-pointer transition-colors h-20"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                        {policy.policyNumber}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                          {getInitials(policy.customer)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{policy.customer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{policy.product}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">{policy.effectiveDate}</div>
                        <div className="text-gray-500 text-xs">{policy.expiryDate}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{policy.premium}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showIssueModal && (
        <IssuePolicyModal onClose={() => setShowIssueModal(false)} />
      )}
    </>
  );
}

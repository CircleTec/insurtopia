import { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Customer } from '../types';
import { supabase } from '../lib/supabase';
import CustomerProfile360 from './CustomerProfile360';

export default function CustomersView() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedCustomers: Customer[] = (data || []).map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        region: c.region,
        activePolicies: c.active_policies,
        lifetimeValue: c.lifetime_value,
        status: c.status,
        segment: c.segment,
        kycVerified: c.kyc_verified,
        tags: c.tags || [],
        joinDate: c.join_date,
        totalPremiumPaid: c.total_premium,
        claimRatio: c.claim_ratio,
        tenure: c.tenure
      }));

      setCustomers(formattedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-gray-100 text-gray-800';
  };

  if (selectedCustomer) {
    return <CustomerProfile360 customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Database</h1>
          <p className="text-gray-600 mt-2">View and manage your policyholders.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-colors">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Total Customers</p>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">2,540</p>
          <p className="text-sm text-emerald-600 font-medium">+12% this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Active Coverage</p>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">92%</p>
          <p className="text-sm text-emerald-600 font-medium">+3% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Churn Rate</p>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">1.2%</p>
          <p className="text-sm text-red-600 font-medium">Low churn maintained</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Name, Phone, or TIN..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
            />
          </div>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700">
            <option>All Segments</option>
            <option>VIP</option>
            <option>Standard</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Region
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Active Policies
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lifetime Value
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-8 py-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center">
                    <p className="text-gray-500 mb-4">No customers found</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors">
                      <Plus className="w-5 h-5" />
                      Add First Customer
                    </button>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50/50 transition-colors h-20"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        {getInitials(customer.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                          {customer.segment === 'VIP' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                              VIP
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{customer.phone}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{customer.region}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {customer.activePolicies} {customer.activePolicies === 1 ? 'Policy' : 'Policies'}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{customer.lifetimeValue}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

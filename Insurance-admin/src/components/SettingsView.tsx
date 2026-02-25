import { useState } from 'react';
import { Building2, Users, Bell, Shield, CreditCard, Globe, Sun, Moon } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('company');
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'language', label: t('settings.language'), icon: Globe }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your organization settings and preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-8">
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                <p className="text-sm text-gray-600 mb-6">Update your company profile and branding</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Insurtopia Insurance"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Business Registration Number
                      </label>
                      <input
                        type="text"
                        defaultValue="ETH-INS-2024-001"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Company Address
                    </label>
                    <textarea
                      defaultValue="Bole Road, Addis Ababa, Ethiopia"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="contact@insurtopia.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+251 11 123 4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Company Logo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Upload New Logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage team members and their permissions</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                  + Invite User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Role</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Dawit Assefa', email: 'dawit@insurtopia.com', role: 'Admin', status: 'Active' },
                      { name: 'Sara Tadesse', email: 'sara@insurtopia.com', role: 'Underwriter', status: 'Active' },
                      { name: 'Meron Kebede', email: 'meron@insurtopia.com', role: 'Underwriter', status: 'Active' }
                    ].map((user, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-600 mt-1">Configure how you receive notifications</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'New Application Submitted', desc: 'Get notified when a new application is submitted' },
                  { label: 'Application Approved', desc: 'Get notified when an application is approved' },
                  { label: 'Claim Filed', desc: 'Get notified when a new claim is filed' },
                  { label: 'Payment Received', desc: 'Get notified when a payment is received' },
                  { label: 'Policy Expiring Soon', desc: 'Get notified 30 days before policy expiration' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                        <span className="text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                        <span className="text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Manage authentication and access control</p>
              </div>

              <div className="space-y-5">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-600 mt-1">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Session Timeout</p>
                      <p className="text-xs text-gray-600 mt-1">Auto logout after inactivity</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-sm font-medium text-gray-900 mb-3">Password Policy</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Minimum 8 characters', checked: true },
                      { label: 'Require special characters', checked: true },
                      { label: 'Require numbers', checked: true },
                      { label: 'Require uppercase letters', checked: false }
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 text-emerald-600 rounded" />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md">
                  Save Security Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Payment Gateway Configuration</h3>
                <p className="text-sm text-gray-600 mt-1">Configure payment methods for customers</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Telebirr', logo: '📱', status: 'Connected' },
                  { name: 'CBE Birr', logo: '🏦', status: 'Connected' },
                  { name: 'Chapa', logo: '💳', status: 'Not Connected' }
                ].map((gateway, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{gateway.logo}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{gateway.name}</p>
                        <p className={`text-xs mt-1 ${gateway.status === 'Connected' ? 'text-emerald-600' : 'text-gray-500'}`}>
                          {gateway.status}
                        </p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${gateway.status === 'Connected'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}>
                      {gateway.status === 'Connected' ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Integrations</h3>
                <p className="text-sm text-gray-600 mt-1">Connect with third-party services</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Email Service (SMTP)', icon: '📧', status: 'Active' },
                  { name: 'SMS Provider', icon: '💬', status: 'Active' },
                  { name: 'Document Storage', icon: '📁', status: 'Active' },
                  { name: 'Analytics', icon: '📊', status: 'Inactive' }
                ].map((integration, idx) => (
                  <div key={idx} className="p-6 border border-gray-200 rounded-xl hover:border-emerald-200 transition-colors">
                    <div className="text-4xl mb-3">{integration.icon}</div>
                    <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs font-semibold ${integration.status === 'Active' ? 'text-emerald-600' : 'text-gray-500'
                        }`}>
                        {integration.status}
                      </span>
                      <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                        Configure →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t('settings.language')}</h3>
                <p className="text-sm text-gray-600 mt-1">{t('settings.languageDesc')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-6 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${language === 'en'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                    : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                    }`}
                >
                  <span className="text-2xl block mb-2">🇬🇧</span>
                  English
                </button>
                <button
                  onClick={() => setLanguage('am')}
                  className={`px-6 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${language === 'am'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                    : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                    }`}
                >
                  <span className="text-2xl block mb-2">🇪🇹</span>
                  አማርኛ
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-600 mt-1">Choose between light and dark mode</p>

                <div className="grid grid-cols-2 gap-4 max-w-md mt-4">
                  <button
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`px-6 py-4 rounded-xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-2 ${theme === 'light'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                        : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                      }`}
                  >
                    <Sun className="w-6 h-6" />
                    Light
                  </button>
                  <button
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`px-6 py-4 rounded-xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-2 ${theme === 'dark'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                        : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                      }`}
                  >
                    <Moon className="w-6 h-6" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

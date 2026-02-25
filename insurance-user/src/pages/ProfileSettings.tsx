import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Bell, Lock, Eye, EyeOff, Camera, Save, CheckCircle, Globe, Sun, Moon } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface ProfileSettingsProps {
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

export default function ProfileSettings({ onLogout, onNavigate }: ProfileSettingsProps) {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const { language, setLanguage, t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    // Profile state
    const [firstName, setFirstName] = useState('Abebe');
    const [lastName, setLastName] = useState('Kebede');
    const [email, setEmail] = useState('abebe.kebede@email.com');
    const [phone, setPhone] = useState('+251 912 345 678');
    const [city, setCity] = useState('Addis Ababa');
    const [region, setRegion] = useState('Addis Ababa');
    const [dateOfBirth, setDateOfBirth] = useState('1990-05-15');

    // Security state
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Notification state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);
    const [claimUpdates, setClaimUpdates] = useState(true);
    const [policyReminders, setPolicyReminders] = useState(true);
    const [paymentAlerts, setPaymentAlerts] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);

    const handleSave = () => {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const tabs = [
        { id: 'profile' as const, label: 'Profile', icon: User },
        { id: 'security' as const, label: 'Security', icon: Lock },
        { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    ];

    return (
        <DashboardLayout onLogout={onLogout} activeView="profile" onNavigate={onNavigate}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your account details and preferences</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                {firstName[0]}{lastName[0]}
                            </div>
                            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <Camera className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900">{firstName} {lastName}</h2>
                            <p className="text-sm text-gray-500">{email}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                                    <Shield className="w-3 h-3" /> Verified Customer
                                </span>
                                <span className="text-xs text-gray-400">Member since Jan 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-1.5 text-gray-400" />Email Address
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1.5 text-gray-400" />Phone Number
                                </label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1.5 text-gray-400" />City
                                </label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                                <select value={region} onChange={(e) => setRegion(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                                    <option>Addis Ababa</option>
                                    <option>Oromia</option>
                                    <option>Amhara</option>
                                    <option>SNNPR</option>
                                    <option>Tigray</option>
                                    <option>Somali</option>
                                    <option>Dire Dawa</option>
                                    <option>Harari</option>
                                </select>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                <Globe className="w-4 h-4 inline mr-1.5 text-gray-400" />{t('profile.language')}
                            </label>
                            <p className="text-xs text-gray-500 mb-3">{t('profile.languageDesc')}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${language === 'en'
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                                        : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                                        }`}
                                >
                                    🇬🇧 English
                                </button>
                                <button
                                    onClick={() => setLanguage('am')}
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${language === 'am'
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                                        : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                                        }`}
                                >
                                    🇪🇹 አማርኛ
                                </button>
                            </div>
                        </div>

                        {/* Dark Mode Toggle */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                {theme === 'dark' ? <Moon className="w-4 h-4 inline mr-1.5 text-gray-400" /> : <Sun className="w-4 h-4 inline mr-1.5 text-gray-400" />}
                                Appearance
                            </label>
                            <p className="text-xs text-gray-500 mb-3">Choose between light and dark mode</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => theme !== 'light' && toggleTheme()}
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${theme === 'light'
                                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                                            : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                                        }`}
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </button>
                                <button
                                    onClick={() => theme !== 'dark' && toggleTheme()}
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${theme === 'dark'
                                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                                            : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                                        }`}
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors text-sm">
                                <Save className="w-4 h-4" /> {t('common.save')}
                            </button>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                            <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm pr-12" />
                                    <button onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <div className="relative">
                                        <input type={showNewPassword ? 'text' : 'password'} value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm pr-12" />
                                        <button onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors text-sm">
                                    <Lock className="w-4 h-4" /> Update Password
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div>
                            {twoFactorEnabled && (
                                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                    <p className="text-sm text-emerald-800">✅ Two-factor authentication is enabled. A verification code will be sent to your phone on each login.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-red-50 rounded-2xl border border-red-200 p-8">
                            <h3 className="text-lg font-bold text-red-900 mb-1">Danger Zone</h3>
                            <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data.</p>
                            <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>

                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Channels</p>
                            {[
                                { label: 'Email Notifications', desc: 'Receive updates via email', checked: emailNotifications, onChange: setEmailNotifications },
                                { label: 'SMS Notifications', desc: 'Receive updates via text message', checked: smsNotifications, onChange: setSmsNotifications },
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={item.checked} onChange={(e) => item.onChange(e.target.checked)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Alert Types</p>
                            {[
                                { label: 'Claim Updates', desc: 'Status changes on your claims', checked: claimUpdates, onChange: setClaimUpdates },
                                { label: 'Policy Reminders', desc: 'Renewal and expiry alerts', checked: policyReminders, onChange: setPolicyReminders },
                                { label: 'Payment Alerts', desc: 'Payment due dates and confirmations', checked: paymentAlerts, onChange: setPaymentAlerts },
                                { label: 'Marketing Emails', desc: 'Tips, offers, and product news', checked: marketingEmails, onChange: setMarketingEmails },
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={item.checked} onChange={(e) => item.onChange(e.target.checked)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors text-sm">
                                <Save className="w-4 h-4" /> Save Preferences
                            </button>
                        </div>
                    </div>
                )}

                {/* Save Success Toast */}
                {showSaveSuccess && (
                    <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 z-50">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">Changes saved successfully!</span>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

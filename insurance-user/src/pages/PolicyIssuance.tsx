import { useEffect, useState } from 'react';
import { CheckCircle, Download, Mail, FileText, Shield, Calendar, Phone, Home } from 'lucide-react';
import { Application } from '../types';

interface PolicyIssuanceProps {
  applicationId: string;
  onBackToDashboard: () => void;
}

export default function PolicyIssuance({ applicationId, onBackToDashboard }: PolicyIssuanceProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [policyNumber, setPolicyNumber] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const app = applications.find((a: Application) => a.id === applicationId);

    if (app) {
      const policy = `POL-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setPolicyNumber(policy);

      app.status = 'policy_issued';
      app.progress = 100;
      app.lastUpdated = new Date().toISOString();

      const index = applications.findIndex((a: Application) => a.id === applicationId);
      if (index !== -1) {
        applications[index] = app;
        localStorage.setItem('applications', JSON.stringify(applications));
      }

      setApplication(app);
    }
  }, [applicationId]);

  const handleDownloadPolicy = () => {
    setDownloading(true);

    setTimeout(() => {
      const policyData = {
        policyNumber,
        productName: application?.productName,
        issuedDate: new Date().toISOString(),
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        premium: application?.quote?.totalPremium,
        coverageAmount: application?.quote?.coverageAmount,
        holderName: application?.formData?.fullName || 'Policyholder'
      };

      const blob = new Blob([JSON.stringify(policyData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Policy_${policyNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
    }, 1500);
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading policy details...</p>
        </div>
      </div>
    );
  }

  const startDate = new Date();
  const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Policy Issued Successfully!</h1>
          <p className="text-xl text-white/90">
            Congratulations! Your insurance policy is now active.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <div className="inline-flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-full mb-4">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span className="font-semibold text-emerald-900">Policy Active</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{application.productName}</h2>
            <p className="text-xl text-gray-600 font-mono">{policyNumber}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Policy Period</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-semibold">{startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-semibold">{endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">12 Months</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">Coverage Details</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage Amount:</span>
                  <span className="font-semibold">ETB {application.quote?.coverageAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Premium:</span>
                  <span className="font-semibold">ETB {application.quote?.totalPremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deductible:</span>
                  <span className="font-semibold">ETB {application.quote?.deductible.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleDownloadPolicy}
              disabled={downloading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {downloading ? 'Preparing Download...' : 'Download Policy Document (PDF)'}
            </button>

            <button className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Policy Document
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            What's Next?
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>A copy of your policy has been sent to your registered email address</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Keep your policy number handy for any future correspondence</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Your coverage is now active and you can file claims anytime</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>You will receive a renewal reminder 30 days before policy expiration</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-6 h-6 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Need help or have questions? Our support team is available round the clock.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">+251 11 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">support@insurtopia.et</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">File a Claim</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Need to file a claim? It's quick and easy through your dashboard.
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
              Learn How to File a Claim →
            </button>
          </div>
        </div>

        <div className="text-center pb-12">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-semibold transition-all"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

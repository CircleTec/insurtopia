import { Smartphone, Shield, Download } from 'lucide-react';

export default function AppTeaser() {
  return (
    <section className="bg-gradient-to-br from-emerald-900 to-emerald-800 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Manage your policy on the go
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 leading-relaxed">
              Download the Insurtopia App and get instant access to all your policies, claims, and support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-emerald-900 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Download className="w-5 h-5" />
                Get it on Google Play
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-emerald-900 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Download className="w-5 h-5" />
                Download on App Store
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-80">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 aspect-[9/16]">
                <div className="h-full flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-3xl flex items-center justify-center shadow-lg">
                      <Shield className="w-12 h-12 text-white" strokeWidth={2} />
                    </div>
                    <Smartphone className="w-8 h-8 text-emerald-900 absolute -bottom-2 -right-2" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Insurtopia</h3>
                    <p className="text-sm text-gray-600">Your insurance companion</p>
                  </div>
                  <div className="w-full space-y-3">
                    <div className="h-12 bg-gray-100 rounded-xl"></div>
                    <div className="h-12 bg-gray-100 rounded-xl"></div>
                    <div className="h-12 bg-gray-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

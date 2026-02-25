import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
          Insurance made simple for everyone.
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
          Instant quotes, digital policies, and fast claims. Trusted by over 10,000 Ethiopians.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white border-2 border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-2">
            <input
              type="text"
              placeholder="Enter your car plate or phone number..."
              className="flex-1 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg text-gray-900 placeholder-gray-400 bg-transparent outline-none"
            />
            <button className="flex items-center gap-2 px-6 sm:px-8 py-4 sm:py-5 bg-emerald-900 text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-emerald-800 transition-all shadow-lg whitespace-nowrap">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

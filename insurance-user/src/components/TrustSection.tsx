import { FileText, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Digital First',
    description: 'No paperwork. Get your policy certificate instantly via PDF.'
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Pay directly with Telebirr, CBE Birr, or Chapa.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Claims support anytime, anywhere.'
  }
];

export default function TrustSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 sm:mb-16">
          Why choose Insurtopia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

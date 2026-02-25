interface PromoCardProps {
  title: string;
  description: string;
  buttonText: string;
  gradientColors: string;
}

export default function PromoCard({ title, description, buttonText, gradientColors }: PromoCardProps) {
  return (
    <div className={`${gradientColors} rounded-2xl p-6 text-white shadow-lg`}>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-white/90 mb-6 text-sm leading-relaxed">{description}</p>
      <button className="bg-white text-gray-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
        {buttonText}
      </button>
    </div>
  );
}

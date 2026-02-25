import { Car, Heart, Briefcase, Plane, Home, Users } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductsProps {
  onProductClick: () => void;
}

const products = [
  {
    icon: Car,
    title: 'Car Insurance',
    description: '3rd Party & Comprehensive coverage for your vehicle',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    icon: Heart,
    title: 'Health Insurance',
    description: 'Family & Individual medical plans with extensive benefits',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    icon: Briefcase,
    title: 'SME Business',
    description: 'Property & Liability protection for your business',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    icon: Plane,
    title: 'Travel Insurance',
    description: 'Worldwide coverage for all your trips',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    icon: Home,
    title: 'Home Insurance',
    description: 'Fire & Theft protection for your property',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    icon: Users,
    title: 'Life Insurance',
    description: 'Term Life & Endowment plans for your family',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
];

export default function Products({ onProductClick }: ProductsProps) {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 sm:mb-16">
          What would you like to insure?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

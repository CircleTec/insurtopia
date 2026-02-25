import { useState } from 'react';
import { Search, SlidersHorizontal, Car, Heart, HeartHandshake, Home, Plane, ArrowLeft } from 'lucide-react';
import { products as allProducts } from '../data/mockProducts';
import { Product } from '../types';

interface ProductCatalogProps {
  onProductSelect: (product: Product) => void;
  onBack?: () => void;
}

const categoryIcons: Record<string, any> = {
  auto: Car,
  health: Heart,
  life: HeartHandshake,
  home: Home,
  travel: Plane
};

const categoryColors: Record<string, string> = {
  auto: 'from-blue-500 to-blue-600',
  health: 'from-red-500 to-red-600',
  life: 'from-purple-500 to-purple-600',
  home: 'from-green-500 to-green-600',
  travel: 'from-orange-500 to-orange-600'
};

export default function ProductCatalog({ onProductSelect, onBack }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'health', label: 'Health Insurance' },
    { value: 'life', label: 'Life Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'travel', label: 'Travel Insurance' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under ETB 500' },
    { value: '500-1000', label: 'ETB 500 - 1,000' },
    { value: '1000+', label: 'Above ETB 1,000' }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange === '0-500') matchesPrice = product.basePrice < 500;
    else if (priceRange === '500-1000') matchesPrice = product.basePrice >= 500 && product.basePrice <= 1000;
    else if (priceRange === '1000+') matchesPrice = product.basePrice > 1000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insurance Products</h1>
          <p className="text-xl text-white/90">
            Find the perfect insurance coverage for your needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for insurance products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Price Range (Monthly)
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={priceRange === range.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredProducts.map((product) => {
            const IconComponent = categoryIcons[product.category];
            const colorClass = categoryColors[product.category];

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onProductSelect(product)}
              >
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mb-4`}>
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ETB {product.basePrice}
                    </span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Coverage:</span> Up to ETB {product.coverageAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Benefits:</span> {product.benefits.length}+ included
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductSelect(product);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

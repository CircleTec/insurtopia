import { useState } from 'react';
import { X, Car, Heart, Home, Plane, Shield, User } from 'lucide-react';
import { Product } from '../types';

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

export default function ProductEditModal({ product, onClose, onUpdateProduct }: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    code: product.code,
    icon: product.icon,
    status: product.status,
    description: product.description,
  });

  const icons = [
    { name: 'Car', component: Car },
    { name: 'Heart', component: Heart },
    { name: 'Home', component: Home },
    { name: 'Plane', component: Plane },
    { name: 'Shield', component: Shield },
    { name: 'User', component: User },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      code: formData.code,
      icon: formData.icon,
      status: formData.status,
      description: formData.description,
    };
    onUpdateProduct(updatedProduct);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
            <p className="text-sm text-gray-600 mt-1">Update product details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Icon
            </label>
            <div className="grid grid-cols-6 gap-3">
              {icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: icon.name })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.icon === icon.name
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 mx-auto ${
                      formData.icon === icon.name ? 'text-emerald-600' : 'text-gray-600'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Live' | 'Draft' | 'Archived' })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            >
              <option value="Live">Live</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

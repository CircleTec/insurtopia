import { useState, useEffect } from 'react';
import { Plus, Car, Heart, Home, Plane, Shield, User } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import ProductBuilderWizard from './ProductBuilderWizard';
import ProductEditModal from './ProductEditModal';

export default function ProductsView() {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts: Product[] = (data || []).map(p => ({
        id: p.id,
        name: p.name,
        code: p.code,
        icon: p.icon,
        status: p.status,
        description: p.description,
        activePolicies: p.active_policies,
        riskRules: p.risk_rules,
        formFields: p.form_fields || []
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (newProduct: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          code: newProduct.code,
          icon: newProduct.icon,
          status: newProduct.status,
          description: newProduct.description,
          active_policies: newProduct.activePolicies,
          risk_rules: newProduct.riskRules,
          form_fields: newProduct.formFields || []
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const formattedProduct: Product = {
          id: data.id,
          name: data.name,
          code: data.code,
          icon: data.icon,
          status: data.status,
          description: data.description,
          activePolicies: data.active_policies,
          riskRules: data.risk_rules,
          formFields: data.form_fields || []
        };
        setProducts([formattedProduct, ...products]);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          code: updatedProduct.code,
          icon: updatedProduct.icon,
          status: updatedProduct.status,
          description: updatedProduct.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedProduct.id);

      if (error) throw error;

      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Car,
      Heart,
      Home,
      Plane,
      Shield,
      User
    };
    return icons[iconName] || Car;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-emerald-100 text-emerald-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Archived':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-emerald-500';
      case 'Draft':
        return 'bg-gray-400';
      case 'Archived':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <p className="text-gray-600 mt-2">Manage your insurance products and underwriting rules.</p>
          </div>
          <button
            onClick={() => setShowCreateWizard(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first insurance product.</p>
            <button
              onClick={() => setShowCreateWizard(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {products.map((product) => {
            const IconComponent = getIconComponent(product.icon);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${product.status === 'Live' ? 'bg-emerald-50' : product.status === 'Draft' ? 'bg-gray-50' : 'bg-amber-50'}`}>
                    <IconComponent className={`w-8 h-8 ${product.status === 'Live' ? 'text-emerald-600' : product.status === 'Draft' ? 'text-gray-600' : 'text-amber-600'}`} />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(product.status)}`}></span>
                    {product.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Active Policies:</span>
                      <span className="ml-2 font-semibold text-gray-900">{product.activePolicies.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Risk Rules:</span>
                      <span className="ml-2 font-semibold text-gray-900">{product.riskRules}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="w-full px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg font-semibold transition-colors"
                  >
                    Manage Product
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {showCreateWizard && (
        <ProductBuilderWizard
          onClose={() => setShowCreateWizard(false)}
          onCreateProduct={handleCreateProduct}
        />
      )}

      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
    </>
  );
}

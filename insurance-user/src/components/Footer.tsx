import { Shield, FileText, RefreshCw, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-emerald-400" strokeWidth={2.5} />
              <span className="text-2xl font-bold">Insurtopia</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Making insurance simple and accessible for everyone in Ethiopia.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <FileText className="w-4 h-4" />
                  File a Claim
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Renew Policy
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Car Insurance</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Health Insurance</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Life Insurance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Email: support@insurtopia.et</li>
              <li>Phone: +251 11 123 4567</li>
              <li>Address: Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Insurtopia. Licensed by National Bank of Ethiopia.</p>
        </div>
      </div>
    </footer>
  );
}

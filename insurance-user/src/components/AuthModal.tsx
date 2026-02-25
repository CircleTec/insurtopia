import { useState } from 'react';
import { Shield, Mail, Lock, Loader2 } from 'lucide-react';

interface AuthModalProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function AuthModal({ onLogin, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          {isSignUp ? 'Create Account' : 'Welcome back'}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {isSignUp ? 'Join thousands of Ethiopians securing their future' : 'Sign in to manage your policies'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tigist Alemu"
                  className="w-full px-4 py-3 pl-4 pr-4 border-2 border-gray-200 rounded-xl focus:border-emerald-900 focus:outline-none transition-colors"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tigist@example.com"
                className="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:border-emerald-900 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:border-emerald-900 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-900 focus:ring-emerald-900" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-emerald-900 font-medium hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-emerald-900 text-white text-lg font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isSignUp ? (
              <>Already have an account? <span className="text-emerald-900 font-semibold">Sign In</span></>
            ) : (
              <>Don't have an account? <span className="text-emerald-900 font-semibold">Register</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

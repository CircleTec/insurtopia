import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MyPolicies from './pages/MyPolicies';
import Claims from './pages/Claims';
import Payments from './pages/Payments';
import ProfileSettings from './pages/ProfileSettings';
import HelpCenter from './pages/HelpCenter';
import Notifications from './pages/Notifications';
import Documents from './pages/Documents';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationTracking from './pages/ApplicationTracking';
import QuoteAcceptance from './pages/QuoteAcceptance';
import Payment from './pages/Payment';
import PolicyIssuance from './pages/PolicyIssuance';
import ProductComparison from './pages/ProductComparison';
import AuthModal from './components/AuthModal';
import OnboardingTour from './components/OnboardingTour';
import CommandPalette from './components/ui/CommandPalette';
import { useAuth } from './context/AuthContext';
import { Product } from './types';
import { Loader2 } from 'lucide-react';

type ViewState =
  | 'LANDING'
  | 'AUTH'
  | 'DASHBOARD'
  | 'POLICIES'
  | 'CLAIMS'
  | 'PAYMENTS'
  | 'PROFILE'
  | 'HELP'
  | 'NOTIFICATIONS'
  | 'DOCUMENTS'
  | 'PRODUCT_CATALOG'
  | 'PRODUCT_DETAIL'
  | 'APPLICATION_FORM'
  | 'APPLICATION_TRACKING'
  | 'QUOTE_ACCEPTANCE'
  | 'PAYMENT'
  | 'POLICY_ISSUANCE'
  | 'PRODUCT_COMPARISON';

function App() {
  const { user, signOut, isLoading: isAuthLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentApplicationId, setCurrentApplicationId] = useState<string>('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync view with auth state
  useEffect(() => {
    if (user && currentView === 'LANDING') {
      setCurrentView('DASHBOARD');
    } else if (!user && currentView !== 'LANDING' && currentView !== 'AUTH' && currentView !== 'PRODUCT_CATALOG' && currentView !== 'PRODUCT_DETAIL') {
      setCurrentView('LANDING');
    }
  }, [user, currentView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoginClick = () => {
    setCurrentView('AUTH');
  };

  const handleProductClick = () => {
    setCurrentView('PRODUCT_CATALOG');
  };

  const handleLogin = () => {
    setCurrentView('DASHBOARD');
  };

  const handleCloseAuth = () => {
    setCurrentView('LANDING');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('LANDING');
  };

  const handleAddPolicy = () => {
    setCurrentView('PRODUCT_CATALOG');
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      setCurrentView('DASHBOARD');
    } else if (view === 'policies') {
      setCurrentView('POLICIES');
    } else if (view === 'claims' || view === 'CLAIMS') {
      setCurrentView('CLAIMS');
    } else if (view === 'payments') {
      setCurrentView('PAYMENTS');
    } else if (view === 'profile' || view === 'SETTINGS') {
      setCurrentView('PROFILE');
    } else if (view === 'help' || view === 'HELP') {
      setCurrentView('HELP');
    } else if (view === 'notifications' || view === 'NOTIFICATIONS') {
      setCurrentView('NOTIFICATIONS');
    } else if (view === 'documents' || view === 'DOCUMENTS') {
      setCurrentView('DOCUMENTS');
    } else if (view === 'compare' || view === 'PRODUCT_COMPARISON') {
      setCurrentView('PRODUCT_COMPARISON');
    } else if (view === 'DASHBOARD') {
      setCurrentView('DASHBOARD');
    } else if (view === 'POLICIES') {
      setCurrentView('POLICIES');
    } else if (view === 'PRODUCTS') {
      setCurrentView('PRODUCT_CATALOG');
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT_DETAIL');
  };

  const handleApplyForProduct = (_productId: string) => {
    setCurrentView('APPLICATION_FORM');
  };

  const handleApplicationSubmit = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setCurrentView('APPLICATION_TRACKING');
  };

  const handleViewQuote = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setCurrentView('QUOTE_ACCEPTANCE');
  };

  const handleQuoteAccept = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setCurrentView('PAYMENT');
  };

  const handlePaymentFromPolicies = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setCurrentView('PAYMENT');
  };

  const handlePaymentComplete = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setCurrentView('POLICY_ISSUANCE');
  };

  const handleBackToDashboard = () => {
    if (user) {
      setCurrentView('DASHBOARD');
    } else {
      setCurrentView('LANDING');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-emerald-900 font-bold animate-pulse">Securing your future...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {currentView === 'DASHBOARD' && (
        <div className="animate-fade-in">
          <Dashboard
            onLogout={handleLogout}
            onAddPolicy={handleAddPolicy}
            onNavigate={handleNavigate}
            onPayment={handlePaymentFromPolicies}
          />
        </div>
      )}

      {currentView === 'POLICIES' && (
        <div className="animate-fade-in">
          <MyPolicies
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onAddPolicy={handleAddPolicy}
            onPayment={handlePaymentFromPolicies}
          />
        </div>
      )}

      {currentView === 'CLAIMS' && (
        <div className="animate-fade-in">
          <Claims
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'PAYMENTS' && (
        <div className="animate-fade-in">
          <Payments
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onPayment={handlePaymentFromPolicies}
          />
        </div>
      )}

      {currentView === 'PROFILE' && (
        <div className="animate-fade-in">
          <ProfileSettings
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'HELP' && (
        <div className="animate-fade-in">
          <HelpCenter
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'NOTIFICATIONS' && (
        <div className="animate-fade-in">
          <Notifications
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'DOCUMENTS' && (
        <div className="animate-fade-in">
          <Documents
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'PRODUCT_COMPARISON' && (
        <div className="animate-fade-in">
          <ProductComparison
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'PRODUCT_CATALOG' && (
        <div className="animate-fade-in">
          <ProductCatalog
            onProductSelect={handleProductSelect}
            onBack={() => setCurrentView('DASHBOARD')}
          />
        </div>
      )}

      {currentView === 'PRODUCT_DETAIL' && selectedProduct && (
        <div className="animate-fade-in">
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('PRODUCT_CATALOG')}
            onApply={handleApplyForProduct}
          />
        </div>
      )}

      {currentView === 'APPLICATION_FORM' && selectedProduct && (
        <div className="animate-fade-in">
          <ApplicationForm
            product={selectedProduct}
            onBack={() => setCurrentView('PRODUCT_DETAIL')}
            onSubmit={handleApplicationSubmit}
          />
        </div>
      )}

      {currentView === 'APPLICATION_TRACKING' && currentApplicationId && (
        <div className="animate-fade-in">
          <ApplicationTracking
            applicationId={currentApplicationId}
            onBack={handleBackToDashboard}
            onViewQuote={handleViewQuote}
          />
        </div>
      )}

      {currentView === 'QUOTE_ACCEPTANCE' && currentApplicationId && (
        <div className="animate-fade-in">
          <QuoteAcceptance
            applicationId={currentApplicationId}
            onBack={() => setCurrentView('APPLICATION_TRACKING')}
            onAccept={handleQuoteAccept}
          />
        </div>
      )}

      {currentView === 'PAYMENT' && currentApplicationId && (
        <div className="animate-fade-in">
          <Payment
            applicationId={currentApplicationId}
            onBack={() => setCurrentView('QUOTE_ACCEPTANCE')}
            onComplete={handlePaymentComplete}
          />
        </div>
      )}

      {currentView === 'POLICY_ISSUANCE' && currentApplicationId && (
        <div className="animate-fade-in">
          <PolicyIssuance
            applicationId={currentApplicationId}
            onBackToDashboard={handleBackToDashboard}
          />
        </div>
      )}

      {(currentView === 'LANDING' || currentView === 'AUTH') && (
        <div className="animate-fade-in">
          <LandingPage
            onLoginClick={handleLoginClick}
            onProductClick={handleProductClick}
          />
        </div>
      )}

      {currentView === 'AUTH' && (
        <AuthModal
          onLogin={handleLogin}
          onClose={handleCloseAuth}
        />
      )}

      {currentView === 'DASHBOARD' && <OnboardingTour />}
    </>
  );
}

export default App;

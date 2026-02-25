import { useState, useEffect } from 'react';
import { Menu, Shield, Bell } from 'lucide-react';
import CommandPalette from './components/ui/CommandPalette';
import Sidebar from './components/Sidebar';
import ActivityFeed from './components/ActivityFeed';
import DashboardView from './components/DashboardView';
import QueueView from './components/QueueView';
import ProductsView from './components/ProductsView';
import PoliciesView from './components/PoliciesView';
import CustomersView from './components/CustomersView';
import ReviewCockpit from './components/ReviewCockpit';
import RuleEngineView from './components/RuleEngineView';
import ClaimsView from './components/ClaimsView';
import ClaimReviewView from './components/ClaimReviewView';
import SettingsView from './components/SettingsView';
import RiskReportsView from './components/RiskReportsView';
import PerformanceView from './components/PerformanceView';
import SupportView from './components/SupportView';
import AuditTrailView from './components/AuditTrailView';
import ReportsView from './components/ReportsView';
import { PolicyApplication, Claim } from './types';
import { mockApplications } from './data/mockData';
import { supabase } from './lib/supabase';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<PolicyApplication | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [applications, setApplications] = useState<PolicyApplication[]>(mockApplications);
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    fetchClaims();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedClaims: Claim[] = (data || []).map(c => ({
        id: c.id,
        policyNumber: c.policy_number,
        customerName: c.customer_name,
        product: c.product_name,
        claimType: c.status,
        claimAmount: c.claim_amount,
        status: c.status,
        submittedDate: c.reported_date,
        incidentDate: c.incident_date,
        assignedTo: c.assigned_to,
        priority: c.priority
      }));

      setClaims(formattedClaims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleSelectApplication = (app: PolicyApplication) => {
    const currentApp = applications.find(a => a.id === app.id);
    if (currentApp) {
      setSelectedApplication(currentApp);
    }
  };

  const handleSelectClaim = (claim: Claim) => {
    const currentClaim = claims.find(c => c.id === claim.id);
    if (currentClaim) {
      setSelectedClaim(currentClaim);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedApplication(null);
    setActiveView('queue');
  };

  const handleBackToClaims = () => {
    setSelectedClaim(null);
    setActiveView('claims');
  };

  const handleUpdateApplication = (updatedApp: PolicyApplication) => {
    setApplications(prev =>
      prev.map(app => app.id === updatedApp.id ? updatedApp : app)
    );
    setSelectedApplication(updatedApp);
  };

  const handleUpdateClaim = (updatedClaim: Claim) => {
    setClaims(prev =>
      prev.map(claim => claim.id === updatedClaim.id ? updatedClaim : claim)
    );
    setSelectedClaim(updatedClaim);
  };

  const handleNavigate = (view: string) => {
    const normalizedView = view.toLowerCase();

    // Direct view mapping
    if (['dashboard', 'queue', 'policies', 'products', 'customers', 'claims', 'rule_engine', 'risk_reports', 'performance', 'settings', 'support', 'audit_trail', 'reports'].includes(normalizedView.replace('_', '-'))) {
      setActiveView(normalizedView.replace('_', '-'));
    } else {
      // Special case mappings from CommandPalette
      switch (view) {
        case 'DASHBOARD': setActiveView('dashboard'); break;
        case 'UNDERWRITERS': setActiveView('queue'); break;
        case 'RISK_REPORTS': setActiveView('risk-reports'); break;
        case 'PERFORMANCE': setActiveView('performance'); break;
        case 'POLICIES': setActiveView('policies'); break;
        case 'SETTINGS': setActiveView('settings'); break;
        default: console.warn('Unknown view:', view);
      }
    }
  };

  if (selectedApplication) {
    return (
      <ReviewCockpit
        application={selectedApplication}
        onBack={handleBackToDashboard}
        onUpdate={handleUpdateApplication}
      />
    );
  }

  if (selectedClaim) {
    return (
      <ClaimReviewView
        claim={selectedClaim}
        onBack={handleBackToClaims}
        onUpdate={handleUpdateClaim}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => { setActiveView(view); setIsMobileSidebarOpen(false); }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} transition-all duration-300`}>
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 h-14">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Insurtopia</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsActivityFeedOpen(true)} className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                DA
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-10">
          <div className="animate-fade-in">
            {activeView === 'dashboard' && <DashboardView applications={applications} />}

            {activeView === 'queue' && (
              <QueueView
                applications={applications}
                onSelectApplication={handleSelectApplication}
              />
            )}

            {activeView === 'policies' && <PoliciesView />}

            {activeView === 'products' && <ProductsView />}

            {activeView === 'customers' && <CustomersView />}

            {activeView === 'claims' && (
              <ClaimsView
                claims={claims}
                onSelectClaim={handleSelectClaim}
              />
            )}

            {activeView === 'rule-engine' && <RuleEngineView />}

            {activeView === 'risk-reports' && <RiskReportsView />}

            {activeView === 'performance' && <PerformanceView />}

            {activeView === 'settings' && <SettingsView />}

            {activeView === 'support' && <SupportView />}

            {activeView === 'audit-trail' && <AuditTrailView />}

            {activeView === 'reports' && <ReportsView />}
          </div>
        </div>
      </div>

      <ActivityFeed isOpen={isActivityFeedOpen} onClose={() => setIsActivityFeedOpen(false)} />
    </div>
  );
}

export default App;

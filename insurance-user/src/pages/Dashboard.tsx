import DashboardLayout from '../components/dashboard/DashboardLayout';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

interface DashboardProps {
  onLogout: () => void;
  onAddPolicy: () => void;
  onNavigate: (view: string) => void;
  onPayment?: (applicationId: string) => void;
}

export default function Dashboard({ onLogout, onAddPolicy, onNavigate, onPayment }: DashboardProps) {
  return (
    <DashboardLayout onLogout={onLogout} activeView="dashboard" onNavigate={onNavigate}>
      <CustomerDashboard onAddPolicy={onAddPolicy} onPayment={onPayment} onNavigate={onNavigate} />
    </DashboardLayout>
  );
}

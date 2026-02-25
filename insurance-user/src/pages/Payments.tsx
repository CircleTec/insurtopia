import { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { getPendingPayments, type PendingPayment } from '../lib/payments';

interface PaymentsProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onPayment: (applicationId: string) => void;
}

export default function Payments({ onLogout, onNavigate, onPayment }: PaymentsProps) {
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingPayments();
  }, []);

  const loadPendingPayments = async () => {
    setLoading(true);
    const payments = await getPendingPayments();
    setPendingPayments(payments);
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout onLogout={onLogout} activeView="payments" onNavigate={onNavigate}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600">Manage your pending premium payments</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : pendingPayments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Payments</h3>
            <p className="text-gray-600">You're all caught up! No payments are due at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingPayments.map((payment) => {
              const daysUntilDue = getDaysUntilDue(payment.dueDate);
              const isOverdue = daysUntilDue < 0;
              const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0;

              return (
                <div
                  key={payment.application.id}
                  className={`bg-white rounded-2xl shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                    isOverdue
                      ? 'border-red-200 bg-red-50'
                      : isUrgent
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isOverdue ? 'bg-red-100' : isUrgent ? 'bg-orange-100' : 'bg-emerald-100'
                        }`}>
                          <CreditCard className={`w-6 h-6 ${
                            isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-emerald-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {payment.application.product_name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Application #{payment.application.id.substring(0, 8).toUpperCase()}
                          </p>

                          {(isOverdue || isUrgent) && (
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                              isOverdue
                                ? 'bg-red-100 text-red-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              <AlertCircle className="w-3.5 h-3.5" />
                              {isOverdue
                                ? `Overdue by ${Math.abs(daysUntilDue)} days`
                                : `Due in ${daysUntilDue} days`}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDate(payment.dueDate)}</span>
                        </div>
                        <div className={`font-semibold ${
                          isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-emerald-600'
                        }`}>
                          Status: {payment.application.status === 'approved' ? 'Payment Required' : 'Pending Payment'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Amount Due</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(payment.dueAmount)}
                        </p>
                      </div>
                      <button
                        onClick={() => onPayment(payment.application.id)}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                          isOverdue
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : isUrgent
                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Payments are due within 7 days of application approval</p>
            <p>• Late payments may result in application cancellation</p>
            <p>• Multiple payment methods are accepted including Mobile Money, Bank Transfer, and Card</p>
            <p>• Your policy will be activated immediately upon successful payment</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

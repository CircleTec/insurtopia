import { useState, useEffect } from 'react';
import { AlertCircle, CreditCard } from 'lucide-react';
import { getPendingPayments, PendingPayment } from '../../lib/payments';

interface PendingPaymentsCardProps {
  onPayment: (applicationId: string) => void;
}

export default function PendingPaymentsCard({ onPayment }: PendingPaymentsCardProps) {
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (pendingPayments.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Pending Payments</h3>
          <p className="text-sm text-gray-600">
            You have {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''} pending
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {pendingPayments.map((payment) => (
          <div
            key={payment.application.id}
            className="bg-white rounded-xl p-4 border border-amber-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {payment.application.product_name}
                </h4>
                <p className="text-xs text-gray-500">
                  Application ID: {payment.application.id.slice(0, 13).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ETB {payment.dueAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Due: {formatDate(payment.dueDate)}
                </p>
              </div>
            </div>

            <button
              onClick={() => onPayment(payment.application.id)}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2.5 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

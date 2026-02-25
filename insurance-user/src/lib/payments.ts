import { supabase } from './supabase';

export interface Application {
  id: string;
  user_id: string;
  product_name: string;
  product_type: string;
  status: string;
  application_data: Record<string, unknown>;
  quote?: {
    basePremium: number;
    taxes: number;
    fees: number;
    totalPremium: number;
  };
  progress: number;
  submitted_at?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  application_id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  payment_provider?: string;
  status: string;
  transaction_reference?: string;
  payment_details: Record<string, unknown>;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PendingPayment {
  application: Application;
  dueAmount: number;
  dueDate: string;
}

export async function getApplicationById(applicationId: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', applicationId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching application:', error);
    return null;
  }

  return data;
}

export async function getPendingApplications(): Promise<Application[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['submitted', 'under_review', 'approved', 'payment_pending'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending applications:', error);
    return [];
  }

  return data || [];
}

export async function getPendingPayments(): Promise<PendingPayment[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['approved', 'payment_pending'])
    .order('approved_at', { ascending: true });

  if (error) {
    console.error('Error fetching pending payments:', error);
    return [];
  }

  return (data || []).map(app => ({
    application: app,
    dueAmount: app.quote?.totalPremium || 0,
    dueDate: calculateDueDate(app.approved_at)
  }));
}

export async function createPayment(
  applicationId: string,
  amount: number,
  paymentMethod: string,
  paymentProvider?: string,
  paymentDetails?: Record<string, unknown>
): Promise<Payment | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('payments')
    .insert({
      application_id: applicationId,
      user_id: user.id,
      amount,
      payment_method: paymentMethod,
      payment_provider: paymentProvider,
      status: 'processing',
      payment_details: paymentDetails || {}
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating payment:', error);
    return null;
  }

  return data;
}

export async function completePayment(
  paymentId: string,
  transactionReference: string
): Promise<boolean> {
  const { error: paymentError } = await supabase
    .from('payments')
    .update({
      status: 'completed',
      transaction_reference: transactionReference,
      paid_at: new Date().toISOString()
    })
    .eq('id', paymentId);

  if (paymentError) {
    console.error('Error completing payment:', paymentError);
    return false;
  }

  const { data: payment } = await supabase
    .from('payments')
    .select('application_id')
    .eq('id', paymentId)
    .single();

  if (payment) {
    const { error: appError } = await supabase
      .from('applications')
      .update({
        status: 'payment_completed',
        progress: 90
      })
      .eq('id', payment.application_id);

    if (appError) {
      console.error('Error updating application:', appError);
      return false;
    }
  }

  return true;
}

export async function getPaymentsByApplication(applicationId: string): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payments:', error);
    return [];
  }

  return data || [];
}

function calculateDueDate(approvedAt?: string): string {
  if (!approvedAt) return new Date().toISOString();

  const approved = new Date(approvedAt);
  approved.setDate(approved.getDate() + 7);
  return approved.toISOString();
}

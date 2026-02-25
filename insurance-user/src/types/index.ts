export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  category: 'auto' | 'health' | 'life' | 'home' | 'travel';
  basePrice: number;
  coverageAmount: number;
  benefits: string[];
  exclusions: string[];
  requirements: string[];
  features: { icon: string; title: string; description: string }[];
}

export interface ApplicationFormField {
  id: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'file' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditional?: {
    field: string;
    value: string | string[];
  };
}

export interface ApplicationFormStep {
  id: string;
  title: string;
  description: string;
  fields: ApplicationFormField[];
}

export interface Application {
  id: string;
  productId: string;
  productName: string;
  status: 'draft' | 'submitted' | 'under_review' | 'documents_required' | 'quote_ready' | 'quote_accepted' | 'payment_pending' | 'payment_completed' | 'policy_issued' | 'declined';
  progress: number;
  submittedDate?: string;
  lastUpdated: string;
  formData: Record<string, any>;
  documents: UploadedDocument[];
  quote?: Quote;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: string;
  url?: string;
}

export interface Quote {
  id: string;
  applicationId: string;
  basePremium: number;
  taxes: number;
  fees: number;
  totalPremium: number;
  coverageAmount: number;
  deductible: number;
  validUntil: string;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  method: 'mobile_money' | 'bank_transfer' | 'card';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  date: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  productName: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  premium: number;
  coverageAmount: number;
  documentUrl?: string;
}

export interface Claim {
  id: string;
  policyId: string;
  policyNumber: string;
  productName: string;
  type: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid';
  filedDate: string;
  lastUpdated: string;
  amount: number;
  description: string;
  documents: UploadedDocument[];
  timeline: ClaimTimelineEvent[];
}

export interface ClaimTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

